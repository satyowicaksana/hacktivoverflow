<template>
  <div class="questions">
    <div class="header">
      <div>
        <h1>All Questions</h1>
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
    ...mapState(['questions'])
  },
  created () {
    if (this.questions.length === 0) {
      console.log('masuk fetch created')
      this.$store.dispatch('fetchQuestions')
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
