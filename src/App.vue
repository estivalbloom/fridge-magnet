<script setup lang="ts">
	import Sortable from 'sortablejs';
	import { onMounted, useTemplateRef } from 'vue';
	const magnets : string[] = [
		'fuck',
		'it',
		',',
		'we',
		'ball'
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
			<div>fuck</div>
			<div>it</div>
			<div>,</div>
			<div>we</div>
			<div>ball</div>
		</div>
		<div id="fridge" class="magnet-container" ref="fridge">
		</div>
	</div>
</template>

<style scoped>
#room {
	display: flex;
	justify-content: space-around;
}

.magnet-container {

	height: 600px;
	width: 300px;
	display: flex;
	align-items: flex-start;
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
