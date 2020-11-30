<template>
  <div>
    <h1>Diashows</h1>
      <div class="diashow" v-for="diashow in diashows" :key="diashow.id">
        <Diashow 
          :id="diashow.ID"
          :title="diashow.post_name"
          :classLevel="diashow.acf.diashow_klassenstufe[0].name" 
          :slides="diashow.acf.diashow_slides"
          :quiz="diashow.acf.quiz">
        </Diashow>
      </div>
  </div>
</template>

<script>
import ApiService from '@/services/ApiService.js'
import Diashow from '@/components/Diashow'

export default {
  components: {
    Diashow
  },
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
