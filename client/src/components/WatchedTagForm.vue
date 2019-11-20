<template>
  <section>
    <form @submit.prevent="addTag">
      <b-field>
        <b-autocomplete
          v-model="name"
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
      data: [
        'Angular',
        'Angular 2',
        'Aurelia',
        'Backbone',
        'Ember',
        'jQuery',
        'Meteor',
        'Node.js',
        'Polymer',
        'React',
        'RxJS',
        'Vue.js'
      ],
      name: '',
      selected: null
    }
  },
  computed: {
    filteredDataArray () {
      return this.data.filter((option) => {
        return option
          .toString()
          .toLowerCase()
          .indexOf(this.name.toLowerCase()) >= 0
      })
    }
  },
  methods: {
    addTag () {
      console.log('add tag')
    }
  }
}
</script>
