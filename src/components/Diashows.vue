<template>
  <div>
    <h1>Diashows & Quiz</h1>
      <div class="line"></div>

      <div class="diashow-grid">
        <div class="klassenstufen" v-for="(klassenstufe, index) in klassenstufen" :key="index">
          <h2 v-html=klassenstufe />
          <div class="diashows" v-for="(diashow, innerIndex) in groupedDiashows(klassenstufe)" :key="innerIndex">
            <Diashow class="grid-item"
              :id="diashow.ID"
              :title="diashow.post_name"
              :classLevel="diashow.acf.diashow_klassenstufe[0].name" 
              :slides="diashow.acf.diashow_slides"
              :quiz="diashow.acf.quiz">
            </Diashow>
            <Diashow class="grid-item"
              :id="diashow.ID"
              :title="diashow.post_name"
              :classLevel="diashow.acf.diashow_klassenstufe[0].name" 
              :slides="diashow.acf.diashow_slides"
              :quiz="diashow.acf.quiz">
            </Diashow>
            <Diashow class="grid-item"
              :id="diashow.ID"
              :title="diashow.post_name"
              :classLevel="diashow.acf.diashow_klassenstufe[0].name" 
              :slides="diashow.acf.diashow_slides"
              :quiz="diashow.acf.quiz">
            </Diashow>
           
            </div>
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

.diashow-grid {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2em;
  align-items: baseline;
}
.diashows {
 display: grid;
  grid-template-columns: repeat(auto-fit, minmax(387px, 1fr));;
  grid-template-rows: auto;
  justify-content: center;
  place-items: center;
  gap: 2.2em;
}


.klassenstufen {
  margin: 0 6em;
}


h2  {
  margin-bottom: 2em;
  font-family: Lato, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 27px;
  color: rgba(0, 0, 0, 0.77);
}

h1 {
  font-family: Lato, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 30px;
  color: #000000;
  margin: 1em 0;
}

.line {
    border-top: 3px solid #000000;
    margin: 0 auto;
    padding: 0;
    width: 50px;
    height: 39px; 
}


$breakpoint-phone: 450px;
@media (max-width: $breakpoint-phone) {
  .klassenstufen {
    margin: 0;
  }

  .grid-item {
   max-width: 70%;
}
}




</style>
