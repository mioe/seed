<script setup lang="ts">
defineProps({
	modelValue: {
		type: Boolean,
		default: false,
	},
})

const emit = defineEmits<{
	(e: 'update:modelValue', value: boolean): void,
}>()

const onToggleModal = (bool: boolean) => {
	emit('update:modelValue', bool)
}
</script>

<template>
	<Teleport to="body">
		<Transition
			enter-active-class="transition ease-out duration-100"
			enter-from-class="transform opacity-0 scale-95"
			enter-to-class="transform opacity-100 scale-100"
			leave-active-class="transition ease-in duration-75"
			leave-from-class="transform opacity-100 scale-100"
			leave-to-class="transform opacity-0 scale-95"
		>
			<section
				v-if="modelValue"
				class="mi-modal"
			>
				<div class="mi-modal--container">
					<div
						class="mi-modal--shadow"
						@click="onToggleModal(false)"
					/>
					<div class="mi-modal--context">
						<slot name="header">
							<header class="mi-modal--slot-header flex justify-between">
								<p style="margin: 0;">
									header
								</p>
								<button
									class="btn--tiny"
									@click="onToggleModal(false)"
								>
									Close
								</button>
							</header>
						</slot>
						<div class="mi-modal--slot-default">
							<slot />
						</div>
					</div>
				</div>
			</section>
		</Transition>
	</Teleport>
</template>

<style lang="sass">
.mi-modal
	position: fixed
	z-index: 99
	top: 0
	left: 0
	width: 100%
	height: 100%
	background-color: hsla(0, 0%, 0%, 0.85)
	overscroll-behavior-y: contain
	overflow-y: auto

.mi-modal--shadow
	position: fixed
	z-index: 1
	top: 0
	left: 0
	width: 100%
	height: 100%

.mi-modal--container
	min-height: 100vh
	display: flex
	align-items: center
	justify-content: center

.mi-modal--context
	position: relative
	z-index: 2
	background-color: var(--document)
	margin: 40px 0
	border-radius: 4px

.mi-modal--slot-default
	padding: 8px 16px

.mi-modal--slot-header
	position: sticky
	top: 0
	left: 0
	padding: 8px 16px
	background-color: var(--document)
	margin: 20px 0
</style>
