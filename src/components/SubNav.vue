<template>
  <div>
    <nav
      class="secondary-menu text-center"
      v-if="
        $route.name === 'courses' ||
          $route.name === 'video-count' ||
          $route.name === 'pricing' ||
          $route.name === 'course-release-schedule' ||
          $route.name === 'textbooks-workbooks'
      "
    >
      <router-link class="secondary-menu-item" :to="{ name: 'courses' }">
        <font-awesome-icon icon="chalkboard-teacher" />{{ $t('Language Courses')}}
      </router-link>
      <router-link
        class="secondary-menu-item"
        :to="{ name: 'textbooks-workbooks' }"
      >
        <font-awesome-icon icon="book" />{{$t('Textbooks')}}
      </router-link>
      <router-link class="secondary-menu-item" :to="{ name: 'video-count' }">
        <font-awesome-icon icon="list-ol" />{{$t('Video Count')}}
      </router-link>
      <router-link class="secondary-menu-item" :to="{ name: 'pricing' }">
        <font-awesome-icon icon="tag" />{{$t('Pricing')}}
      </router-link>
      <router-link
        class="secondary-menu-item"
        :to="{ name: 'course-release-schedule' }"
      >
        <font-awesome-icon icon="clock" />{{$t('Schedule')}}
      </router-link>
    </nav>

    <nav
      class="secondary-menu text-center"
      v-if="
        $route.name &&
          ($route.name === 'dictionary' ||
            $route.name === 'compare' ||
            $route.name === 'phrase' ||
            $route.name === 'levels' ||
            $route.name === 'learn' ||
            $route.name === 'saved-words' ||
            $route.name.startsWith('explore'))
      "
    >
      <router-link class="secondary-menu-item" :to="{ name: 'dictionary' }">
        <font-awesome-icon icon="font" />{{$t('Lookup Words')}}
      </router-link>
      <router-link class="secondary-menu-item" :to="{ name: 'saved-words' }">
        <font-awesome-icon icon="star" />{{$t('Saved')}}
        <span class="saved-words-count" v-cloak>{{ savedWordsCount() }}</span>
      </router-link>
    </nav>

    <nav class="secondary-menu text-center" v-if="$route.name && $route.name.startsWith('youtube')">
      <router-link class="secondary-menu-item" :to="{ name: 'youtube-browse' }">
        <font-awesome-icon :icon="['fab', 'youtube']" />{{ $t('YouTube Transcript') }}
      </router-link>
    </nav>

    <nav
      class="secondary-menu text-center"
      v-if="
        ($route.name &&
          ($route.name.startsWith('book') || $route.name === 'library')) ||
          $route.name === 'reader'
      "
    >
      <router-link class="secondary-menu-item" :to="{ name: 'reader' }">
        <font-awesome-icon icon="file-alt" />{{$t('Text Reader')}}
      </router-link>
      <router-link class="secondary-menu-item" :to="{ name: 'library' }">
        <font-awesome-icon icon="book-open" />{{$t('Library')}}
      </router-link>
    </nav>

    <nav
      class="secondary-menu text-center"
      v-if="
        $route.name === 'contact' ||
          $route.name === 'faq' ||
          $route.name === 'affiliate-program'
      "
    >
      <router-link class="secondary-menu-item" :to="{ name: 'contact' }">
        <font-awesome-icon icon="id-card" />{{$t('Contact Us')}}
      </router-link>
      <router-link class="secondary-menu-item" :to="{ name: 'faq' }">
        <font-awesome-icon icon="question" />{{$t('FAQ')}}
      </router-link>
      <router-link
        class="secondary-menu-item"
        :to="{ name: 'affiliate-program' }"
      >
        <font-awesome-icon icon="share-alt" />{{$t('Affiliate Program')}}
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    savedWordsCount() {
      let count = this.$store.getters.savedWordCount({ lang: this.$lang.code })
      // eslint-disable-next-line vue/no-parsing-error
      return count < 100 ? count : '多'
    }
  }
}
</script>

<style scoped>
a svg,
a i {
  margin-right: 0.5rem;
}
.secondary-menu {
  white-space: nowrap;
  overflow: scroll;
  overflow-y: hidden;
  padding-left: 1rem;
  padding-right: 1rem;
}

.saved-words-count {
  background: #666;
  border-radius: 100%;
  font-size: 0.8rem;
  color: white;
  font-weight: bold;
  display: inline-block;
  width: 1.3rem;
  height: 1.3rem;
  line-height: 1.4rem;
  text-align: center;
  position: relative;
  top: -0.1rem;
}

.router-link-active .saved-words-count {
  color: #fd4f1c;
  background: white;
}

.secondary-menu-item {
  padding: 0.5rem 1rem;
  margin: 0.2rem;
  border-radius: 0.3rem;
  color: #666;
  display: inline-block;
}

.secondary-menu-item:hover {
  text-decoration: none;
  color: inherit;
  background-color: #f7f7f7;
}

.secondary-menu-item.router-link-active {
  background: #fd4f1c;
  color: white;
}
</style>
