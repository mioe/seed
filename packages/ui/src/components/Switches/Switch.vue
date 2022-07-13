<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
	modelValue: {
		type: Boolean,
		default: false,
	},
})

const emit = defineEmits<{
	(e: 'update:modelValue', value: boolean): void,
}>()

const computedValue = computed({
	get(): boolean { return props.modelValue },
	set(value: boolean) { emit('update:modelValue', value) },
})
</script>

<template>
	<button
		role="switch"
		aria-label="toggle theme mode"
		class="switch"
		:class="{'is-active': computedValue}"
		@click="computedValue = !computedValue"
	>
		<span class="switch--check">
			<span class="switch--icon" />
		</span>
	</button>
</template>

<style lang="sass">
.switch
	position: relative
	border-radius: 11px
	display: block
	width: 40px
	height: 22px
	flex-shrink: 0
	border: 1px solid var(--vp-c-divider)
	background-color: var(--vp-c-bg-mute)
	&.is-active
		background-color: var(--vp-c-brand-lighter)
	&:focus
		border-color: var(--vp-c-brand)
		box-shadow: 0 0 0 2px var(--vp-c-green-dimm-1)

.htw-dark .switch.is-active,
.dark .switch.is-active
	background-color: var(--vp-c-brand-darker)

.switch--check
	position: absolute
	top: 1px
	left: 1px
	width: 18px
	height: 18px
	border-radius: 50%
	background-color: var(--vp-c-white)
	box-shadow: var(--vp-shadow-1)
	transform: translateX(0)
	transition: transform .25s

.switch.is-active .switch--check
	transform: translateX(18px)

.htw-dark .switch--check,
.dark .switch--check
	background-color: var(--vp-c-black-soft)

.switch--icon
	position: relative
	display: block
	width: 18px
	height: 18px
	border-radius: 50%
	overflow: hidden
</style>
