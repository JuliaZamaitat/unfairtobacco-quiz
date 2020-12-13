<template>
    <div class="diashow diashow--diashow" :style="{ backgroundImage: 'url(' + thumbnailMedium + ')' }" @click.self="toggleSlides" >
        <h2 class="diashow diashow__title">{{ title }}</h2>
        <Slider class="diashow diashow__slider" v-if="showSlider" @hide-slides="toggleSlides" :slides="slides" :id="id" :title="title" :quiz="quiz" :firstPicture="thumbnailLarge"></Slider>
    </div>
</template>

<script>
import Slider from '@/components/Slider'

export default {
    components: {
        Slider
    },
    name: 'Diashow',
    props: {
        id: Number,
        title: String,
        classLevel: String,
        slides: [Array, Boolean],
        quiz: [Array, Boolean]
    },

    data () {
        return {
            showSlider: false
        }
    },
    methods: {
        toggleSlides () {
            this.showSlider = !this.showSlider;
         } 
    },
    computed: {
        thumbnailMedium() {
            return this.slides[0]?.thumbnail.sizes.medium
        },
        thumbnailLarge() {
            return this.slides[0]?.thumbnail.sizes["1536x1536"]
        }
    }

}
</script>

<style lang="scss" scoped>

.diashow {

     
    &--diashow {
        position: relative;
        background-size: cover;
        height: 318px;
        width: 387px;
        max-width: 80%;
    }

    &__title {
        position: absolute;
        display: inline-block;
        top: 50%;
        left: 50%;
        margin: 0 auto;
        transform: translate(-50%, -50%);
        text-align: center;
        background-color: hsla(0,0%,100%,.85);
        padding: .3em .7em;
        max-width: 80%;
        min-width: 60%;
        font-family: Lato, sans-serif;
        font-style: normal;
        font-weight: bold;
        font-size: 20px;
        transition: 0.3s;
    }
    
    &:hover {
        .diashow__title {
            background-color: hsla(0,0%,100%,1);
         }     
    }
}


</style>