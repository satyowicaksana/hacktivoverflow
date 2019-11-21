<template>
  <div class="questions">
    <div class="header">
      <div>
        <h1>Random Question</h1>
        <!-- <h1 v-if="tag">Questions tagged [{{ tag }}]</h1> -->
      </div>
      <div>
        <router-link to="/questions/ask"><button class="button is-info">Ask Question</button></router-link>
      </div>
    </div>
    <hr>
    <div class="columns">
      <div class="column">
        <Question v-if="randomQuestion.title" :question="randomQuestion">
        </Question>
      </div>
      <div class="column is-narrow">
        <!-- <WatchedTagCard></WatchedTagCard> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Question from '../components/Question'

export default {
  name: 'Questions',
  components: {
    Question
  },
  computed: {
    ...mapState(['randomQuestion', 'watchedTags'])
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
