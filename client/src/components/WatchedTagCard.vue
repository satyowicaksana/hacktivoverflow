<template>
  <div class="card">
  <header class="card-header has-background-light">
    <p class="card-header-title has-text-grey">
      <b-icon
        icon="eye"
        size="is-small"
        style="margin-right: 5px;">
      </b-icon>
      Watched Tags
    </p>
  </header>
  <div class="card-content text-center">
    <div class="content">
      <div v-if="!showForm && watchedTags.length === 0">
        <img src="https://cdn.sstatic.net/Img/ico-binoculars.svg?v=d4dbaac4eec9">
        <p style="font-size: 12px; margin-top: 5px;" class="has-text-grey-light">Watch tags to curate your list of questions.</p>
        <b-button @click="showForm = true" style="background: #E1ECF4; color: #39739D;">
          <b-icon
          icon="eye"
          size="is-small"
          style="margin-right: 5px;">
          </b-icon>
          Watch a tag
        </b-button>
      </div>
      <div v-if="showForm || watchedTags.length > 0">
        <div style="margin-bottom: 10px">
        <b-tag
        closable
        aria-close-label="Close tag"
         v-for="(tag, i) in watchedTags" :key="'tag' + i" class="tag"
         @close="deleteTag(tag)">{{ tag }}</b-tag>
        </div>
        <WatchedTagForm></WatchedTagForm>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import WatchedTagForm from './WatchedTagForm'
import { mapState } from 'vuex'

export default {
  name: 'WatchedTagCard',
  components: {
    WatchedTagForm
  },
  data () {
    return {
      showForm: false
    }
  },
  computed: mapState(['watchedTags']),
  methods: {
    deleteTag (tag) {
      let payload = { tag }
      this.$store.dispatch('deleteWatchedTag', payload)
    }
  }
}
</script>

<style>
.tag {
  margin-left: 5px;
  background: #E1ECF4 !important;
  color: #0077CC !important;
}
</style>
