import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { RolePermissions } from '@seed/common/constants/permissions'
console.log('🦕 RolePermissions', RolePermissions.Create)

createApp(App).mount('#app')
