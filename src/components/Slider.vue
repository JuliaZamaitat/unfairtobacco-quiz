<template>
<div class="background">
    <div class="wrapper">
  
        <splide :options="options" @splide:moved="moved">
        <splide-slide v-for="slide in slides" :key="slide.src">
            <img :src="slide.src" alt="slide.alt">
        </splide-slide>
        </splide>  
    </div>
</div>

</template>

<script>
import "@splidejs/splide/dist/css/themes/splide-default.min.css";

import { Splide, SplideSlide } from '@splidejs/vue-splide';
import { createSlides } from "../utils/slides";


export default {
    components: {
        Splide,
        SplideSlide,
    },
    name: 'Slider',
    
    data() {
        return {
            options: {
                breakPoints: {
                    640: {

                    }
                }
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

$breakpoint-phone: 430px;

.background {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(0,0,0,0.78);
    z-index: 10;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: auto;
}

img {
    width: 80%;
    height : auto;
}

@media (max-width: $breakpoint-phone) {
  img {
      width: 70%
  }
}
       
</style>

