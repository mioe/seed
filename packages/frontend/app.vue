<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
const username = ref('')
const email = ref('')
const password = ref('')

const onSubmit = async() => {
	console.log('🦕 onSubmit', username.value, email.value, password.value)
	await axios.post('/api/v1/sign-up', {
		body: {
			username: username.value,
			email: email.value,
			password: password.value,
		},
		fingerprint: await useFingerprint(),
	})
}
</script>

<template>
	<div>
		<form @submit.prevent="onSubmit">
			<input
				v-model="username"
				type="text"
				placeholder="username"
			>
			<input
				v-model="email"
				type="email"
				placeholder="email"
			>
			<input
				v-model="password"
				type="password"
				placeholder="password"
			>
			<button type="submit">
				submit
			</button>
		</form>
	</div>
</template>
