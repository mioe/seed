import 'virtual:windi.css'
import './assets/sass/main.sass'

import { defineSetupVue3 } from 'histoire/client'

export const setupVue3 = defineSetupVue3(({ app }) => {
	console.log('🦕 init defineSetupVue3')
})
