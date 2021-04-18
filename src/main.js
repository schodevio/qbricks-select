import { createApp } from 'vue'
import App from './App.vue'

import './assets/styles/main.scss'

import clickawayDirective from './directives/clickaway'

const app = createApp(App)

app.directive('click-away', clickawayDirective)
app.mount('#app')
