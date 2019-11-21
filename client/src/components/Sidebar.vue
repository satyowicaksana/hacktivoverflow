<template>
  <aside style="text-align: left;" class="menu">
    <ul class="menu-list">
      <li><a @click="$router.push('/questions/random')">Home</a></li>
    </ul>
    <p class="menu-label">
      PUBLIC
    </p>
    <ul class="menu-list">
      <li><a @click="$router.push('/questions')">
        <b-icon
          icon="earth"
          size="is-small"
          style="margin-right: 5px;">
        </b-icon>Fake Overflow</a></li>
    </ul>
  </aside>
</template>

<script>
export default {
}
</script>

<script>
export default {

}
</script>

<style scoped>
</style>
