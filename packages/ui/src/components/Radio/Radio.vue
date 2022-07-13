<script setup lang="ts">
import { computed, nextTick } from 'vue'

const props = defineProps({
	modelValue: {
		type: [
			Boolean,
			String,
			Number,
		],
		default: null,
	},
	value: {
		type: [
			Boolean,
			String,
			Number,
		],
		default: null,
	},
	id: {
		type: String,
		default: undefined,
	},
	name: {
		type: String,
		default: undefined,
	},
	disabled: {
		type: Boolean,
		default: undefined,
	},
})

const emit = defineEmits<{
	(e: 'update:modelValue', value: any): void,
	(e: 'change', value: any): void,
}>()

const computedValue = computed({
	get(): any { return props.modelValue },
	set(value: any) { emit('update:modelValue', value) },
})

const handleChange = () => {
	nextTick(() => emit('change', props.modelValue))
}
</script>

<template>
	<label
		:for="id"
		:aria-checked="modelValue === value"
		:aria-disabled="disabled"
		role="radio"
		class="mi-radio"
		:class="[
			{'is-disabled': disabled},
		]"
	>
		<input
			:id="id"
			v-model="computedValue"
			type="radio"
			:name="name"
			:disabled="disabled"
			:value="value"
			class="mi-radio--check"
			@change="handleChange"
		>
		<slot />
	</label>
</template>

<style lang="sass">
.mi-radio
	position: relative
	display: inline-flex
	cursor: pointer
	user-select: none
	&.is-disabled
		opacity: .5
		cursor: not-allowed

.mi-radio--check
	-webkit-appearance: none
	appearance: none
	-webkit-print-color-adjust: exact
	color-adjust: exact
	display: inline-block
	user-select: none
	background-origin: border-box
	flex-shrink: 0
	width: 16px
	height: 16px
	padding: 1px
	border: 2px solid var(--secondary)
	cursor: pointer
	border-radius: 9999px
	margin-top: 2px
	margin-right: 6px
	&:checked
		background-color: var(--primary)
		border-color: var(--primary)
		background-position: center
		background-repeat: no-repeat
		background-image: url('data:image/svg+xml,%3Csvg fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"%3E%3Ccircle cx="8" cy="8" r="3" fill="white"/%3E%3C/svg%3E')
	&:focus
		box-shadow: 0 0 0 2px var(--primary)
	&:focus,
	&:focus-visible,
	&:focus-within
		outline: none
	&:disabled
		cursor: not-allowed
	&:hover:not(:checked):not(:disabled)
		background-color: var(--secondary)
</style>
