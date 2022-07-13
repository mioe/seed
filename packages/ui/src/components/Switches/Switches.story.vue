<script setup lang="ts">
import { ref } from 'vue'
import Switch from './Switch.vue'

function initState() {
	return {
		disabled: false,
	}
}
</script>

<template>
	<Story
		title="Switches"
		:layout="{
			type: 'grid',
			width: 200,
		}"
	>
		<Variant
			title="Switch"
			:init-state="initState"
		>
			<template #default="{ state }">
				<div class="p-2">
					<Switch v-model="state.disabled" />
				</div>
			</template>
		</Variant>
	</Story>
</template>
