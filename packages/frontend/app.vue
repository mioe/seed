<script setup lang="ts">
import { ref } from 'vue'
const username = ref('')
const email = ref('')
const password = ref('')

onMounted(async() => {
	const print = await useFingerprint()
	console.log('🦕 msg', print)
})

const onSubmit = async() => {
	console.log('🦕 onSubmit', username.value, email.value, password.value)
}
</script>

<template>
	<div>
		<form @submit.prevent="onSubmit">
			<input type="text">
			<input type="email">
			<input type="password">
			<button>submit</button>
		</form>
	</div>
</template>
