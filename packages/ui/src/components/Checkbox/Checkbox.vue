<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
	modelValue: {
		type: [
			Boolean,
			String,
			Number,
			Array as () => (string | number)[],
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
	trueValue: {
		type: [Boolean, String, Number],
		default: true,
	},
	falseValue: {
		type: [Boolean, String, Number],
		default: false,
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
	indeterminate: {
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

const handleChange = (ev: InputEvent | Event) => {
	const target = ev.target as HTMLInputElement
	const value = target.checked
		? props.trueValue ?? true
		: props.falseValue ?? false
	emit('change', value)
}
</script>

<template>
	<label
		:for="id"
		:aria-checked="indeterminate ? 'mixed' : undefined"
		:aria-disabled="disabled"
		role="checkbox"
		class="mi-checkbox"
		:class="[
			{'is-disabled': disabled},
		]"
	>
		<input
			:id="id"
			v-model="computedValue"
			type="checkbox"
			:name="name"
			:disabled="disabled"
			:indeterminate="indeterminate"
			:true-value="trueValue"
			:false-value="falseValue"
			:value="value"
			class="mi-checkbox--check"
			@change="handleChange"
		>
		<slot />
	</label>
</template>

<style lang="sass">
.mi-checkbox
	position: relative
	display: inline-flex
	cursor: pointer
	user-select: none
	&.is-disabled
		opacity: .5
		cursor: not-allowed

.mi-checkbox--check
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
	border-radius: 4px
	margin-top: 2px
	margin-right: 6px
	&:checked,
	&:indeterminate
		background-color: var(--primary)
		border-color: var(--primary)
		background-position: center
		background-repeat: no-repeat
	&:checked
		background-image: url('data:image/svg+xml,%3Csvg viewBox="0 0 16 16" fill="white" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z"/%3E%3C/svg%3E')
	&:indeterminate
		background-image: url('data:image/svg+xml,%3Csvg fill="white" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath fill-rule="evenodd" d="M3 8c0-.552.407-1 .909-1h8.182c.502 0 .909.448.909 1s-.407 1-.909 1H3.909C3.407 9 3 8.552 3 8z"/%3E%3C/svg%3E')
	&:focus
		box-shadow: 0 0 0 2px var(--primary)
	&:focus,
	&:focus-visible,
	&:focus-within
		outline: none
	&:disabled
		cursor: not-allowed
	&:hover:not(:checked):not(:indeterminate):not(:disabled)
		background-color: var(--secondary)
</style>
