<script setup lang="ts">
	import Sortable from 'sortablejs';
	import { onMounted, useTemplateRef, ref } from 'vue';
	import { WordType, WordBank } from './word-bank';

	const open = ref(false);

	const date = new Date();
	const seed = date.toLocaleDateString('en-US', { timeZone : 'GMT'});

	const bank = new WordBank(seed)
	const adjectives = bank.chooseWords(WordType.Adjective, 10, false);
	const common = bank.chooseWords(WordType.Common, 20, true);
	const logic = bank.chooseWords(WordType.Logic, 10, true);
	const nouns = bank.chooseWords(WordType.Noun, 20, false);
	const prepositions = bank.chooseWords(WordType.Preposition, 5, false);
	const pronouns = bank.chooseWords(WordType.Pronoun, 10, true);
	const punctuation = bank.chooseWords(WordType.Punctuation, 10, true);
	const verbs = bank.chooseWords(WordType.Verb, 10, false);

	const magnets : string[] = nouns.concat(verbs, adjectives, common, logic, prepositions, pronouns, punctuation).sort();

	const fridgeRef = useTemplateRef('fridge');
	const magnetRef = useTemplateRef('magnet-board');
	function setupMagnets() {
		if( !fridgeRef.value || !magnetRef.value) {
			return;
		}

		const magnetGroup = { 
			name: 'magnets',
			pull: true,
			put: true
		};
		Sortable.create(fridgeRef.value, {
			group: magnetGroup
		});
		Sortable.create(magnetRef.value, {
			group: magnetGroup
		});

		fridgeRef.value.addEventListener('click', e => {
			const target = e.target as HTMLDivElement;
			if(target.classList.contains('magnet')) {
				magnetRef.value?.appendChild(target);
			}
		});

		magnetRef.value.addEventListener('click', e => {
			const target = e.target as HTMLDivElement;
			if(target.classList.contains('magnet')) {
				fridgeRef.value?.appendChild(target)
			}
		});
	}

	onMounted(() => {
		setupMagnets();
	})

	function clear() {
		if ( !fridgeRef.value || !magnetRef.value) {
			return;
		}
		Array.from(fridgeRef.value.childNodes).forEach(node => {
			magnetRef.value?.appendChild(node);
		})
	}

	const nextDay = new Date();
	nextDay.setUTCDate(date.getUTCDate() + 1);
	nextDay.setUTCHours(0);
	nextDay.setUTCMinutes(0);
	nextDay.setUTCSeconds(0);
	nextDay.setUTCMilliseconds(0);

	const timeUntil = ref('');
	function updateTimeUntil() {
		const currentTime = new Date();	
		const msUntil = nextDay.getTime() - currentTime.getTime();
		if ( msUntil < 0 ) {
			timeUntil.value = 'refresh to see new words!';
			return;
		}
		const hoursUntil = Math.floor(msUntil / (1000 * 60 * 60));
		const minutesUntil = Math.floor((msUntil % (1000 * 60 * 60) / (1000 * 60)));
		const secondsUntil = Math.floor((msUntil % (1000* 60) / 1000));
		timeUntil.value = `${hoursUntil} hour(s), ${minutesUntil} minute(s), and ${secondsUntil} second(s)`;
	}
	updateTimeUntil();
	setInterval(updateTimeUntil, 100);
</script>

<template>
	<div id="app">
		<div id="containers">
			<div id="fridge" :class="{ 'magnet-container': true, 'fridge-open': open }" ref="fridge"></div>
			<div id="board" class="magnet-container" ref="magnet-board">
				<div class="magnet" v-for="magnet in magnets">{{ magnet }}</div>
			</div>
		</div>
		<div class="control-tray">
			<input type="button" value="Clear" class="magnet" @click="clear">
			<input type="button" :value="`${open ? 'Close' : 'Open'} the fridge`" class="magnet" @click="() => open = !open">
		</div>
		<div class="control-tray">
			<div id="timer" ref="timer" class="magnet"> Magnets reset in: {{ timeUntil }}. </div>
		</div>
	</div>
	<div id="footer">
		<div>
			<a href="https://github.com/estivalbloom/fridge-magnet">Github page</a>
		</div>
		<div>
			<a href="https://ko-fi/estivalbloom">Buy me a coffee</a>
		</div>
		<div>© Estivalbloom 2026</div>
	</div>
</template>

<style scoped>

#app {
	display: flex;
	flex-direction: column;
	gap: 12px;
	padding: 8px;
}

#containers {
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	gap: 12px;
}

.magnet-container {
	height: 700px;
	width: 375px;
	display: flex;
	flex-wrap: wrap;
	align-items: flex-start;
	align-content: start;
	box-sizing: border-box;
	padding: 10px;
	gap: 5px;
	row-gap: 5px;
	background-size: cover;
	@media screen and (max-width: 777px) {
		height: 300px;
		overflow-y: scroll;
	}
}

#fridge {
	background-image: url('./fridge.png');
}

.fridge-open {
	background-image: url('./fridge-open.png') !important;
}

#board {
	background-image: url('./drawer.png');
}

.magnet {
	padding: 2px;
	background-color: beige;
	border: 5px solid #0000;
	border-image: url('./border-img.png') 5 fill / 5px;
	font-family:'Courier New', Courier, monospace;
	background-clip: padding-box;
}

.control-tray {
	display: flex;
	justify-content: center;
	gap: 4px;
}

#footer {
	margin: 8px 0 0 0;
	padding :4px;
	width: 100%;
	display: flex;
	justify-content: center;
	background: #0007;
}

#footer * {
	color: #AFAFAF;
	font-family:'Courier New', Courier, monospace;
	font-size: 12px;
}

#footer *:nth-child(n + 2)::before {
	content: "|";
	margin: 0px 8px;
}
</style>
