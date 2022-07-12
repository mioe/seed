<script setup lang="ts">
import { ref, nextTick, onMounted, onBeforeUnmount, computed } from 'vue'
import type { Ref, ComputedRef } from 'vue'

const props = defineProps({
	positionX: {
		type: String,
		default: 'left',
		validator: (x: string) => ['left', 'right'].includes(x),
	},
	positionY: {
		type: String,
		default: 'bottom',
		validator: (x: string) => ['bottom', 'top'].includes(x),
	},
	keepOnContentClick: {
		type: Boolean,
		default: false,
	},
	disabled: {
		type: Boolean,
		default: false,
	},
})

interface IRePosition {
	propName: 'positionX' | 'positionY'
	firstValue: 'left' | 'top'
	secondValue: 'right' | 'bottom'
}

/**
 * Data
 */
const isOpen: Ref<boolean> = ref(false)
const local: Ref<any> = ref({
	positionX: props.positionX,
	positionY: props.positionY,
})

/**
 * Hooks
 */
const targetHook: Ref<Element | null> = ref(null)
const menuHook: Ref<Element | null> = ref(null)

/**
 * Styles
 */
const stateClasses: ComputedRef<any> = computed(() => {
	const positionXClass = `position-${local.value.positionX}`
	const positionYClass = `position-${local.value.positionY}`
	return {
		[positionXClass]: true,
		[positionYClass]: true,
		'is-open': isOpen.value,
		'is-disabled': props.disabled,
	}
})

const flipPositionForTransform: ComputedRef<string> = computed(() =>
	local.value.positionY === 'bottom'
		? 'top'
		: 'bottom',
)

/**
 * Methods
 */
const onResetPosition = (position: 'x' | 'y' | 'all') => {
	const CASES = {
		x: () => { local.value.positionX = props.positionX },
		y: () => { local.value.positionY = props.positionY },
		all: () => {
			local.value.positionX = props.positionX
			local.value.positionY = props.positionY
		},
	}
	CASES[position]()
}

const getOverflow = () => {
	const menuRect = menuHook.value?.getBoundingClientRect() || { bottom: 0, top: 0, left: 0, right: 0 }
	const spacingX = 40
	const spacingY = 40

	return {
		left: menuRect.right + spacingX > window.innerWidth,
		right: menuRect.left - spacingX < 0,
		bottom: menuRect.bottom + spacingY > window.innerHeight,
		top: menuRect.top - spacingY < 0,
	}
}

const CHECK_RE_POSITION_KEYS = {
	x: {
		propName: 'positionX',
		firstValue: 'left',
		secondValue: 'right',
	},
	y: {
		propName: 'positionY',
		firstValue: 'top',
		secondValue: 'bottom',
	},
}

const checkRePosition = (position: 'x' | 'y') => {
	const overflow = getOverflow()
	const { propName, firstValue, secondValue } = CHECK_RE_POSITION_KEYS[position] as IRePosition
	if (props[propName] === firstValue && overflow[firstValue]) {
		local.value[propName] = secondValue
	}
	else if (props[propName] === secondValue && overflow[secondValue]) {
		local.value[propName] = firstValue
	}
	else {
		onResetPosition(position)
	}
}

const handleClickAway = (ev: any) => {
	const shouldClose = props.keepOnContentClick
		? !menuHook.value?.contains(ev.target)
		: true
	if (!targetHook.value?.contains(ev.target) && shouldClose) {
		isOpen.value = false
	}
}

const toggle = () => {
	if (props.disabled) return
	isOpen.value = !isOpen.value
	if (isOpen.value) {
		nextTick(() => {
			checkRePosition('x')
			checkRePosition('y')
		})
	}
}

onMounted(() => { document.addEventListener('click', handleClickAway) })
onBeforeUnmount(() => { document.removeEventListener('click', handleClickAway)})
</script>

<template>
	<div
		class="mi-dropdown"
		:class="stateClasses"
	>
		<header ref="targetHook">
			<slot :toggle="toggle" />
		</header>

		<Transition
			enter-active-class="transition ease-out duration-100"
			enter-from-class="transform opacity-0 scale-95"
			enter-to-class="transform opacity-100 scale-100"
			leave-active-class="transition ease-in duration-75"
			leave-from-class="transform opacity-100 scale-100"
			leave-to-class="transform opacity-0 scale-95"
			@after-leave="onResetPosition('all')"
		>
			<div
				v-if="isOpen"
				ref="menuHook"
				role="menu"
				class="mi-dropdown--menu"
				:style="{
					transformOrigin: `${local.positionX} ${flipPositionForTransform}`,
				}"
			>
				<slot
					name="menu"
					:local-position="local"
				/>
			</div>
		</Transition>
	</div>
</template>

<style lang="sass">
.mi-dropdown
	position: relative
	display: inline-block
	&:not(.position-top)
		.mi-dropdown--menu
			top: calc(100% + 10px)
	&.position-top
		.mi-dropdown--menu
			top: -10px
			transform: translateY(-100%)
	&.position-right
		.mi-dropdown--menu
			right: 0

.mi-dropdown--menu
	position: absolute
	z-index: 2
	min-width: 160px
	border-radius: 4px
	background-color: var(--secondary)
	box-shadow: 0 8px 24px rgba(0,0,0,.3)
	overflow-x: hidden
	overflow-y: auto
</style>
