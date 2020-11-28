<template>
  
   
    <div class="wrapper">
         <!-- <h2>{{ title}}</h2>
        <splide :options="options" @splide:moved="moved">
        <splide-slide v-for="slide in slides" :key="slide.src">
            <img :src="slide.src" alt="slide.alt">
        </splide-slide>
        </splide>   -->
    </div>


</template>

<script>
// import { Splide, SplideSlide } from '@splidejs/vue-splide';
import { createSlides } from "../utils/slides";


export default {
    components: {
        // Splide,
        // SplideSlide,
    },
    name: 'Diashow',
    props: {
        id: Number,
        title: String,
        classLevel: String,
        sliderImagesAndTexts: Boolean,
        quiz: Array 
    },
    data() {
        return {
            options: {
                rewind: true,
                gap   : '1rem',
            },
            slides: createSlides(),
        };
    },
    methods: {
        moved( splide, newIndex ) {
            console.log( 'moved', newIndex );
        },
    },
}
</script>

<style lang="scss" scoped>

</style>