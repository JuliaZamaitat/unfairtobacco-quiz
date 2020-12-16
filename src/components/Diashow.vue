<template>
    <div class="diashow diashow--diashow" :class="{'closed': !showSlider}" :style="{ backgroundImage: 'url(' + thumbnails.small + ')' }" @click.self="toggleSlides" >
        <h2 class="diashow diashow__title" @click.self="toggleSlides">{{ title }}</h2>
        <Slider class="diashow diashow__slider" v-if="showSlider" @hide-slides="toggleSlides" :slides="slides" :id="id" :title="title" :quiz="quiz" :firstPicture="thumbnails" :video="videoUrl" :lang="lang"></Slider>
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
        quiz: [Array, Boolean],
        thumbnail: Object,
        videoUrl: String,
        lang: String
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
        thumbnails() {
            return { small: this.thumbnail.sizes.medium, medium: this.thumbnail.sizes.large, large: this.thumbnail.sizes["1536x1536"]}
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
        transition: 0.3s;
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
        font-style: normal;
        font-weight: bold;
        font-size: 20px;
         transition: 0.3s;
    }
    
    &:hover {
        .diashow__title {
            background-color: hsla(0,0%,100%,0);
         }     
    }
}

.closed {
    &:hover {
        box-shadow:inset 0 0 0 2000px hsla(0,0%,100%,0.7);

    }
}
</style>
