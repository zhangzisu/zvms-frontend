import Vue from 'vue'
import Vuetify from 'vuetify'
import zhHans from 'vuetify/es5/locale/zh-Hans'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify, {
  lang: {
    locales: { zhHans },
    current: 'zhHans'
  },
  theme: {
    accent: '#F44336'
  }
})
