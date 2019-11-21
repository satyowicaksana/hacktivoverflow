import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../helpers/axios'
import router from '../router'
import alert from '../helpers/alert'
import cron from 'node-cron'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedUser: {},
    isLogin: false,
    errMessages: '',
    questions: [],
    question: {
      title: '',
      description: '',
      upvotes: [],
      downvotes: [],
      user: {
        username: ''
      },
      answers: []
    },
    profileQuestions: [],
    profileAnswers: [],
    watchedTags: [],
    randomQuestion: {
      title: '',
      description: '',
      upvotes: [],
      downvotes: [],
      user: {
        username: ''
      },
      answers: []
    },
    isLoading: false
  },
  mutations: {
    SET_LOGGED_USER (state, payload) {
      state.loggedUser = payload
    },
    SET_IS_LOGIN (state, payload) {
      state.isLogin = payload
    },
    SET_QUESTIONS (state, payload) {
      state.questions = payload
    },
    SET_QUESTION (state, payload) {
      state.question = payload
    },
    SET_PROFILE_QUESTIONS (state, payload) {
      state.profileQuestions = payload
    },
    SET_PROFILE_ANSWERS (state, payload) {
      state.profileAnswers = payload
    },
    SET_WATCHED_TAGS (state, payload) {
      state.watchedTags = payload
    },
    SET_RANDOM_QUESTION (state, payload) {
      state.randomQuestion = payload
    },
    SET_IS_LOADING (state, payload) {
      state.isLoading = payload
    }
  },
  actions: {
    register ({ commit }, payload) {
      commit('SET_IS_LOADING', true)
      axios.post('users/register', payload)
        .then(({ data }) => {
          commit('SET_IS_LOADING', false)
          const { username, email } = data
          commit('SET_LOGGED_USER', { id: data.id, username, email })
          localStorage.setItem('id', data.id)
          localStorage.setItem('username', data.username)
          localStorage.setItem('email', data.email)
          localStorage.setItem('access_token', data.access_token)
          commit('SET_IS_LOGIN', true)
          router.push('/home')
        })
        .catch(alert)
    },
    login ({ commit }, payload) {
      commit('SET_IS_LOADING', true)
      axios.post('users/login', payload)
        .then(({ data }) => {
          commit('SET_IS_LOADING', false)
          const { username, email } = data
          commit('SET_LOGGED_USER', { id: data.id, username, email })
          localStorage.setItem('id', data.id)
          localStorage.setItem('username', data.username)
          localStorage.setItem('email', data.email)
          localStorage.setItem('access_token', data.access_token)
          commit('SET_IS_LOGIN', true)
          router.push('/home')
        })
        .catch(alert)
    },
    logout ({ commit }) {
      commit('SET_IS_LOGIN', false)
      commit('SET_LOGGED_USER', {})
      localStorage.clear()
      router.push('/')
    },
    fetchQuestions ({ commit, dispatch }, payload) {
      let query = ''
      if (payload) {
        query = `?tag=${payload}`
      }
      commit('SET_IS_LOADING', true)
      axios.get(`/questions${query}`, {
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          commit('SET_QUESTIONS', data)
          commit('SET_IS_LOADING', false)
          dispatch('initiateRandomQuestion')
        })
        .catch(err => {
          alert(err)
        })
    },
    addQuestion ({ dispatch, commit }, payload) {
      commit('SET_IS_LOADING', true)
      axios.post('/questions', payload, {
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          commit('SET_IS_LOADING', false)
          dispatch('fetchQuestions')
          router.push('/questions')
        })
        .catch(alert)
    },
    updateQuestion ({ dispatch, commit }, payload) {
      commit('SET_IS_LOADING', true)
      axios.patch(`/questions/${payload.id}`, payload, {
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          commit('SET_IS_LOADING', false)
          dispatch('fetchQuestions')
          dispatch('fetchProfileQuestions')
          router.push(`/questions/${payload.id}`)
        })
        .catch(alert)
    },
    addAnswer ({ dispatch, commit }, payload) {
      commit('SET_IS_LOADING', true)
      axios.post('/answers', payload, {
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          commit('SET_IS_LOADING', false)
          dispatch('fetchQuestions')
          dispatch('fetchQuestion', payload.questionId)
        })
        .catch(alert)
    },
    updateAnswer ({ dispatch, commit }, payload) {
      commit('SET_IS_LOADING', true)
      axios.patch(`/answers/${payload.id}`, payload, {
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          commit('SET_IS_LOADING', false)
          dispatch('fetchQuestions')
          dispatch('fetchProfileAnswers')
          router.push(`/questions/${data.question}`)
        })
        .catch(alert)
    },
    fetchQuestion ({ commit, dispatch }, payload) {
      commit('SET_IS_LOADING', true)
      axios.get(`questions/${payload}`)
        .then(({ data }) => {
          commit('SET_IS_LOADING', false)
          commit('SET_QUESTION', data)
        })
        .catch(alert)
    },
    vote ({ dispatch, commit }, payload) {
      commit('SET_IS_LOADING', true)
      axios.patch(`${payload.collection}/${payload.type}/${payload.id}`, null, {
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          commit('SET_IS_LOADING', false)
          dispatch('fetchQuestions')
          dispatch('fetchQuestion', payload.questionId)
        })
        .catch(alert)
    },
    fetchProfileQuestions ({ commit }) {
      commit('SET_IS_LOADING', true)
      axios.get(`/questions?userId=${localStorage.getItem('id')}`, {
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          commit('SET_IS_LOADING', false)
          commit('SET_PROFILE_QUESTIONS', data)
        })
        .catch(alert)
    },
    fetchProfileAnswers ({ commit }) {
      commit('SET_IS_LOADING', true)
      axios.get(`/answers?userId=${localStorage.getItem('id')}`, {
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          commit('SET_IS_LOADING', false)
          commit('SET_PROFILE_ANSWERS', data)
        })
        .catch(alert)
    },
    addWatchedTag ({ dispatch }, payload) {
      axios.patch('/users/tag', payload, {
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          dispatch('getWatchedTags')
        })
        .catch(alert)
    },
    getWatchedTags ({ commit }, payload) {
      axios.get('/users/tag', {
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          commit('SET_WATCHED_TAGS', data)
        })
        .catch(alert)
    },
    deleteWatchedTag ({ dispatch }, payload) {
      axios.patch('/users/tag/remove', payload, {
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          dispatch('getWatchedTags')
        })
        .catch(alert)
    },
    fetchRandomQuestion ({ commit, state }, payload) {
      cron.schedule('* * * * *', function () {
        let result = []
        if (state.questions.length > 0) {
          let rand = Math.floor(Math.random() * Math.floor(state.questions.length))
          result = state.questions[rand]
        }
        commit('SET_RANDOM_QUESTION', result)
      })
    },
    initiateRandomQuestion ({ commit, state, dispatch }, payload) {
      if (!state.randomQuestion.title) {
        let result = []
        if (state.questions.length > 0) {
          let rand = Math.floor(Math.random() * Math.floor(state.questions.length))
          result = state.questions[rand]
        }
        commit('SET_RANDOM_QUESTION', result)
        dispatch('fetchRandomQuestion')
      }
    }
  },
  modules: {
  }
})
