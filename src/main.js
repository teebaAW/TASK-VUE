import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
const vuetify = createVuetify({
  components,
  directives
})

const app = createApp(App)

app.use(router)
app.use(store)
app.use(vuetify)

app.mount('#app')

const $toast = useToast()
let instance = $toast.success('You did it!')

// Force dismiss specific toast
instance.dismiss()

// Dismiss all opened toast immediately
$toast.clear()
