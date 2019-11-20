<template>
  <section>
    <form @submit.prevent="addWatchedTag">
      <b-field>
        <b-autocomplete
          v-model="tag"
          :data="filteredDataArray"
          @select="option => selected = option">
          <template slot="empty">No results found</template>
        </b-autocomplete>
        <p class="control">
          <button class="button is-info">Add</button>
        </p>
    </b-field>
    </form>
  </section>
</template>

<script>
export default {
  data () {
    return {
      data: ['javascript', 'java', 'c#', 'php', 'pyhton', 'android', 'jquery', 'html', 'c++', 'ios', 'css', 'mysql', 'sql'],
      tag: '',
      selected: null
    }
  },
  computed: {
    filteredDataArray () {
      return this.data.filter((option) => {
        return option
          .toString()
          .toLowerCase()
          .indexOf(this.tag.toLowerCase()) >= 0
      })
    }
  },
  methods: {
    addWatchedTag () {
      console.log('add tag')
      let payload = {
        tag: this.tag
      }
      this.$store.dispatch('addWatchedTag', payload)
    }
  }
}
</script>
