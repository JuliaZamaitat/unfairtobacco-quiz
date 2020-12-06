<template>
  <div>
      <h1>Willkommen zum Quiz! </h1>
      <p>{{ quiz.length}} Fragen sind für dich bereit</p>
  </div>
</template>

<script>
export default {
    props: {
        quiz: Array
    }
}
</script>

<style lang="scss" scoped>

</style>