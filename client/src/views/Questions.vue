<template>
  <div class="questions">
    <div class="header">
      <div>
        <h1 v-if="!tag">All Questions</h1>
        <h1 v-if="tag">Questions tagged [{{ tag }}]</h1>
      </div>
      <div>
        <router-link to="/questions/ask"><button class="button is-info">Ask Question</button></router-link>
      </div>
    </div>
    <hr>
    <div class="columns">
      <div class="column">
        <Question v-for="question in questions" :key="question._id" :question="question">
        </Question>
      </div>
      <div class="column is-narrow">
        <WatchedTagCard></WatchedTagCard>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Question from '../components/Question'
import WatchedTagCard from '../components/WatchedTagCard'

export default {
  name: 'Questions',
  components: {
    Question,
    WatchedTagCard
  },
  computed: {
    tag () {
      return this.$route.params.tag
    },
    ...mapState(['questions', 'watchedTags'])
  },
  created () {
    if (this.questions.length === 0) {
      this.$store.dispatch('fetchQuestions', this.tag)
    }
    this.$store.dispatch('getWatchedTags')
  },
  watch: {
    tag () {
      this.$store.dispatch('fetchQuestions', this.tag)
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 28px;
}
.header {
  display: flex;
  justify-content: space-between;
  margin: 15px;
}
</style>
