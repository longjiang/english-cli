import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home-redirect',
      redirect: `/de/dictionary` // defaulting to /de if no language is set
    },
    {
      path: '/:lang',
      name: 'home',
      redirect: `/:lang/dictionary`
    },
    {
      path: '/:lang/dictionary/:method?/:args?',
      name: 'dictionary',
      props: true,
      component: () => import('./views/Dictionary.vue'),
      meta: {
        title: 'Dictionary | English Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content: 'Look up and learn English words.'
          }
        ]
      }
    },
    {
      path: '/:lang/phrase/:method?/:args?',
      name: 'phrase',
      component: () => import('./views/Phrase.vue'),
      props: true,
      meta: {
        title: 'Phrase | English Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content: 'See how English phrases are used in real context..'
          }
        ]
      }
    },
    {
      path: '/:lang/saved-words',
      name: 'saved-words',
      component: () => import('./views/SavedWords.vue'),
      meta: {
        title: 'Saved Words | English Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content: 'Study, manage, import, export the words you saved.'
          }
        ]
      }
    },
    {
      path: '/:lang/library',
      name: 'library',
      component: () => import('./views/Library.vue'),
      props: true,
      meta: {
        title: 'Library | English Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content:
              'Read free, open English books with hover dictionary and save new words for review.'
          }
        ]
      }
    },
    {
      path: '/:lang/reader/:method?/:arg?',
      name: 'reader',
      component: () => import('./views/Reader.vue'),
      meta: {
        title: 'Reader | English Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content:
              'Read English text with annotation and save new words for review.'
          }
        ]
      }
    },
    {
      path: '/:lang/book/chapter/:args?',
      name: 'book-chapter',
      component: () => import('./views/BookChapter.vue'),
      props: true,
      meta: {
        title: 'Book Chapter | English Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content:
              'Read free, open English books with hover dictionary and save new words for review.'
          }
        ]
      }
    },
    {
      path: '/:lang/book/index/:args?',
      name: 'book-index',
      component: () => import('./views/BookIndex.vue'),
      props: true,
      meta: {
        title: 'Book | English Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content:
              'Read free, open English books with hover dictionary and save new words for review.'
          }
        ]
      }
    },
    {
      path: '/:lang/book/list/:args?',
      name: 'book-list',
      component: () => import('./views/BookList.vue'),
      props: true,
      meta: {
        title: 'Books | English Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content:
              'Read free, open English books with hover dictionary and save new words for review.'
          }
        ]
      }
    },
    {
      path: '/:lang/youtube/search/:args?',
      name: 'youtube-search',
      component: () => import('./views/YouTubeSearch.vue'),
      props: true,
      meta: {
        title: 'YouTube Reader | English Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content: 'Watch English YouTube videos and study the subtitles.'
          }
        ]
      }
    },
    {
      path: '/:lang/youtube/view/:args?',
      name: 'youtube-view',
      component: () => import('./views/YouTubeView.vue'),
      props: true,
      meta: {
        title: 'YouTube Reader | English Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content: 'Watch English YouTube videos and study the subtitles.'
          }
        ]
      }
    },
    {
      path: '/:lang/youtube/browse/:args?',
      name: 'youtube-browse',
      component: () => import('./views/YouTubeBrowse.vue'),
      props: true,
      meta: {
        title: 'Study YouTube Subtitles | English Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content: 'Watch English YouTube videos and study the subtitles.'
          }
        ]
      }
    },
    {
      path: '/:lang/youtube/channel/:args?',
      name: 'youtube-channel',
      component: () => import('./views/YouTubeChannel.vue'),
      props: true,
      meta: {
        title: 'Study YouTube Subtitles | English Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content: 'Watch English YouTube videos and study the subtitles.'
          }
        ]
      }
    },
    {
      path: '/:lang/youtube/playlist/:args?',
      name: 'youtube-playlist',
      component: () => import('./views/YouTubePlaylist.vue'),
      props: true,
      meta: {
        title: 'Study YouTube Subtitles | English Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content: 'Watch English YouTube videos and study the subtitles.'
          }
        ]
      }
    },
    {
      path: '/:lang/settings',
      name: 'settings',
      component: () => import('./views/Settings.vue'),
      meta: {
        title: 'Settings | English Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content: 'Change preferences: choose a different text corpus.'
          }
        ]
      }
    }
  ]
})
