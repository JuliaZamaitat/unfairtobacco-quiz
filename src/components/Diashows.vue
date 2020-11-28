<template>
  <div>
    <h1>Diashows</h1>
      <div class="diashow" v-for="diashow in diashows" :key="diashow.id">
        <h2>{{ diashow.post_name }}</h2>
      </div>
  </div>
</template>

<script>
 import ApiService from '@/services/ApiService.js'

export default {
  name: 'Diashows',
  data () {
    return {
      diashows: []
    }
  },
  created () {
    this.getDiashows()
  },
  methods: {
    async getDiashows () {
      this.diashows = await ApiService.getDiashows()
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
