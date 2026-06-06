<script setup lang="ts">
	import Sortable from 'sortablejs';
	import { onMounted, useTemplateRef } from 'vue';
	const punctuation : string[] = [
		',',
		'.',
		'?',
		'!'
	]
	const magnets : string[] = [
		'rock',
		'ball',
		'sky',
		'rain',
		'grass',
		'breath',
		'toast',
		'foot',
		'mountain',
		'river',
		'ocean',
		'grass',
		'rainbow',
		'brain',
		'eyes',
		'seal',
		'wide',
		'narrow',
		'throw',
		'touch',
		'open',
		'bite',
		'break',
		'push',
		'taste',
		'touch',
		'see',
		'silly',
		'wide',
		'narrow',
		'open',
		'hollow',
		'smooth',
		'large',
		'shiny',
		'golden',
		'vast',
		'hopeful',
		'slow',
		'all',
		'none',
		'I',
		'me',
		'my',
		'we',
		'us',
		'our',
		'you',
		'your',
		'is',
		'is',
		'am',
		'are',
		'are',
		'can',
		'the',
		'the',
		'the',
		'by',
		'over',
		'under',
		'around',
		'out',
		'behind',
		'outside',
		'and',
		'and',
		'but',
		'also',
		'not',
		'not',
		'not',
		',',
		',',
		',',
		'.',
		'.',
		'?',
		'!'
	]

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
			<input type="button" value="Clear" @click="clear">
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
	@media screen and (max-width: 777px) {
		height: 300px;
	}
}

#fridge {
	background-color: gray;
	border: 12px solid black;
}

#board {
	background-color:darkgoldenrod;
	border: 12px solid saddlebrown;
}

.magnet {
	padding: 4px;
	background-color: beige;
	margin: 4px;
	border: 2px solid black;
	border-radius: 2px;
}

#controls {
	display: flex;
	justify-content: center;
}
</style>
