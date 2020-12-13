<template>
  <div class="diashows diashows--viewport">
    <h1 class="diashows diashows__heading">Diashows & Quiz</h1>
      <div class="diashows diashows__line"></div>
        <div class="diashows diashows__klassenstufen" v-for="(klassenstufe, index) in klassenstufen" :key="index">
          <h2 class="diashows diashows__title" v-html=klassenstufe></h2>
          <div class="diashows diashows--grid" v-for="(diashow, innerIndex) in groupedDiashows(klassenstufe)" :key="innerIndex">
            <Diashow class="diashows diashows__diashow"
              :id="diashow.ID"
              :title="diashow.post_title"
              :classLevel="diashow.acf.diashow_klassenstufe[0].name" 
              :slides="diashow.acf.diashow_slides"
              :thumbnail="diashow.acf.thumbnail"
              :videoUrl="diashow.acf.videoLink"
              :quiz="diashow.acf.quiz">
            </Diashow>
            <Diashow class="diashows diashows__diashow"
              :id="diashow.ID"
              :title="diashow.post_title"
              :classLevel="diashow.acf.diashow_klassenstufe[0].name" 
              :slides="diashow.acf.diashow_slides"
              :thumbnail="diashow.acf.thumbnail"
              :videoUrl="diashow.acf.videoLink"
              :quiz="diashow.acf.quiz">
            </Diashow>
            <Diashow class="diashows diashows__diashow"
              :id="diashow.ID"
              :title="diashow.post_title"
              :classLevel="diashow.acf.diashow_klassenstufe[0].name" 
              :slides="diashow.acf.diashow_slides"
              :thumbnail="diashow.acf.thumbnail"
              :videoUrl="diashow.acf.videoLink"
              :quiz="diashow.acf.quiz">
            </Diashow>
           
            </div>
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
    this.getDiashowsDe()
  },
  methods: {
    async getDiashowsDe () {
      this.diashows = await ApiService.getDiashowsDe()
    },
    groupedDiashows(klassenstufe) {
        return this.diashows
            .filter(diashow => diashow.acf.diashow_klassenstufe[0].name === klassenstufe)
    }
  },
  computed: {
    klassenstufen() {
        const klassenstufen = new Set();
        this.diashows.forEach(diashow => klassenstufen.add(diashow.acf.diashow_klassenstufe[0].name));
        return Array.from(klassenstufen); 
    }
},
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.diashows {
    &--viewport {
      width: 100vw;
      height: 100%;   
    }  

    &__heading {
      font-family: Lato, sans-serif;
      font-style: normal;
      font-weight: bold;
      font-size: 30px;
      color: #000000;
      margin: 1em 0;
    }

    &__line {
      border-top: 3px solid #000000;
      margin: 0 auto;
      padding: 0;
      width: 50px;
      height: 39px; 
    }

    &__diashow-title {
      margin-bottom: 2em;
      font-family: Lato, sans-serif;
      font-style: normal;
      font-weight: 500;
      font-size: 27px;
      color: rgba(0, 0, 0, 0.77);
    }

    &--grid {
      display: grid;
      width: 80%;
      margin: 0 auto;
      margin-bottom: 5em;
      margin-top: 2em;
      grid-template-columns: repeat(auto-fit, minmax(387px, 1fr));;
      justify-content: center;
      place-items: center;
      gap: 2.2em;
    }
}

</style>
