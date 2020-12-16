<template>
  <div class="diashows diashows--viewport">
    <h1 class="diashows diashows__heading">Diashows & Quiz</h1>
      <div class="diashows diashows__line"></div>
      <pulse-loader :loading="loading" :color="color"></pulse-loader>
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
              :quiz="diashow.acf.quiz"
              :lang="lang">
            </Diashow>
            </div>
        </div>
      </div>
</template>

<script>
import Diashow from '@/components/Diashow'
import axios from 'axios'
const url = 'https://unfairtobacco.org/wp-json/endpoint/v1/'

export default {
  name: 'Diashows',
  components: {
    Diashow
  },
  data () {
    return {
      lang: "de",
      diashows: [],
      loading: true,
      color: "rgb(143, 44,27)"
     }
  },
  created () {
    this.getDiashows(this.lang)
  },
  methods: {
    async getDiashows (lang) {
      this.loading = true
      return axios.get(url + 'diashows/' + lang)
        .then((diashows) => { this.loading = false; this.diashows = diashows.data })
        .catch((err) => console.log(err))
      },
    groupedDiashows(klassenstufe) {
        return this.diashows
            .filter(diashow => diashow.acf.diashow_klassenstufe[0].name === klassenstufe)
    },
  },
  computed: {
    klassenstufen() {
        const klassenstufen = new Set();
        this.diashows.forEach(diashow => klassenstufen.add(diashow.acf.diashow_klassenstufe[0].name));
        let sortedKlassenstufen = Array.from(klassenstufen);  
        return sortedKlassenstufen.sort(function (a,b) {
            return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
        });
    }
  },
}

</script>

<style lang="scss" scoped>

.diashows {
    &--viewport {
      width: 100vw;
      height: 100%;   
    }  

    &__heading {
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
