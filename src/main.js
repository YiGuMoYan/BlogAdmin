import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/assets/css/global.css'

import VMdEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'

import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'

import Prism from 'prismjs'

import moment from 'moment'

Vue.prototype.$moment = moment

Vue.prototype.$url = 'http://127.0.0.1:8080/'

Vue.config.productionTip = false

VMdEditor.use(vuepressTheme, {
  Prism
})

Vue.use(VMdEditor)

Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
