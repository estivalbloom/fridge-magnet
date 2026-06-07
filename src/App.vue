<script setup lang="ts">
	import Sortable from 'sortablejs';
	import { onMounted, useTemplateRef } from 'vue';
	import { WordType, WordBank} from './word-bank';

	const date = new Date()
	const seed = date.toLocaleDateString('en-US', { timeZone : 'GMT'});

	const bank = new WordBank(seed)
	const adjectives = bank.chooseWords(WordType.Adjective, 10, false);
	const common = bank.chooseWords(WordType.Common, 10, true);
	const logic = bank.chooseWords(WordType.Logic, 10, true);
	const nouns = bank.chooseWords(WordType.Noun, 20, false);
	const prepositions = bank.chooseWords(WordType.Preposition, 5, false);
	const pronouns = bank.chooseWords(WordType.Pronoun, 10, true);
	const punctuation = bank.chooseWords(WordType.Punctuation, 10, true);
	const verbs = bank.chooseWords(WordType.Verb, 15, false);

	const magnets : string[] = nouns.concat(verbs, adjectives, common, logic, prepositions, pronouns, punctuation);

	const fridgeRef = useTemplateRef('fridge');
	const magnetRef = useTemplateRef('magnet-board');

	onMounted(() => {
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
		})
	})

	function clear() {
		if ( !fridgeRef.value || !magnetRef.value) {
			return;
		}
		Array.from(fridgeRef.value.childNodes).forEach(node => {
			magnetRef.value?.appendChild(node);
		})
	}
</script>

<template>
	<div id="app">
		<div id="containers">
			<div id="fridge" class="magnet-container" ref="fridge"></div>
			<div id="board" class="magnet-container" ref="magnet-board">
				<div class="magnet" v-for="magnet in magnets">{{ magnet }}</div>
			</div>
		</div>
		<div id="controls">
			<input type="button" value="Clear" class="magnet" @click="clear">
		</div>
	</div>
</template>

<style scoped>

#app {
	display: flex;
	flex-direction: column;
	gap: 12px;
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
	overflow-y: scroll;
	padding: 10px;
	gap: 5px;
	row-gap: 5px;
	background-size: cover;
	@media screen and (max-width: 777px) {
		height: 300px;
	}
}

#fridge {
	background-image: url('./fridge.png');
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

#controls {
	display: flex;
	justify-content: center;
}
</style>
