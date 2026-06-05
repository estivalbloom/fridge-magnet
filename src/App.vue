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

	const magnetRef = useTemplateRef('magnet-board');
	const fridgeRef = useTemplateRef('fridge');

	onMounted(() => {
		if( magnetRef.value && fridgeRef.value) {
			const magnetGroup = { 
				name: 'magnets',
				pull: true,
				put: true
			};
			Sortable.create(magnetRef.value, {
				group: magnetGroup
			});
			Sortable.create(fridgeRef.value, {
				group: magnetGroup
			});
		}
	})
</script>

<template>
	<div id="room">
		<div id="board" class="magnet-container" ref="magnet-board">
			<div v-for="magnet in magnets">{{ magnet }}</div>
		</div>
		<div id="fridge" class="magnet-container" ref="fridge">
		</div>
	</div>
</template>

<style scoped>

#room {
	display: flex;
	justify-content: center;
	gap: 12px;
}

.magnet-container {

	height: 600px;
	width: 350px;
	display: flex;
	flex-wrap: wrap;
	align-items: flex-start;
	align-content: start;
	box-sizing: border-box;
}

#fridge {
	background-color: gray;
	border: 12px solid black;
}

#board {
	background-color:darkgoldenrod;
	border: 12px solid saddlebrown;
}

.magnet-container div {
	padding: 4px;
	background-color: beige;
	margin: 4px;
	border: 2px solid black;
	border-radius: 2px;
}
</style>
