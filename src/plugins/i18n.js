import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export const i18n = new VueI18n({
  fallbackLocale: 'en',
  messages: {
    en: {
      hello: 'Hello',
      english: 'English',
      zerotohero: 'Zero to Hero'
    },
    zh: {
      hello: '你好',
      english: '英语',
      zerotohero: '英雄'
    },
    fr: {
      hello: 'Bonjour',
      english: 'Anglais',
      zerotohero: 'Zéro à héro'
    }
  }
})
