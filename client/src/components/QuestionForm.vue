<template>
  <div class="container">
    <div class="notification has-background-white">
      <form @submit.prevent="addQuestion">
        <b-field label="Title">
          <b-input v-model="title" placeholder="e.g. Is there an R function for finding the index of an element in a vector?"></b-input>
        </b-field>
        <wysiwyg v-model="description" />
        <b-field label="Enter some tags">
          <b-taginput
            v-model="tags"
            :data="filteredTags"
            autocomplete
            :allow-new="allowNew"
            :open-on-focus="openOnFocus"
            field="user.first_name"
            icon="label"
            placeholder="e. g. (ajax javascript regex)"
            @typing="getFilteredTags">
          </b-taginput>
        </b-field>
        <button class="button is-info">Post Your Question</button>
      </form>
    </div>
  </div>
</template>

<script>
const data = ['javascript', 'java', 'c#', 'php', 'pyhton', 'android', 'jquery', 'html', 'c++', 'ios', 'css', 'mysql', 'sql']

export default {
  name: 'QuestionForm',
  data () {
    return {
      title: '',
      description: '',
      filteredTags: data,
      isSelectOnly: false,
      tags: [],
      allowNew: false,
      openOnFocus: false
    }
  },
  methods: {
    addQuestion () {
      this.$store.dispatch('addQuestion', {
        title: this.title,
        description: this.description
      })
    },
    getFilteredTags (text) {
      this.filteredTags = data.filter((option) => {
        return option
          .toString()
          .toLowerCase()
          .indexOf(text.toLowerCase()) >= 0
      })
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 700px;
  padding-top: 50px;
}
.notification {
  margin: 10px;
  text-align: left;
}
.button {
  margin-top: 10px;
  float: right;
}
.has-image-centered {
  margin-left: auto;
  margin-right: auto;
}
</style>
