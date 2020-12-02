<template>
    <div class="diashow" @click.self="toggleSlides" >
        <h2 >{{ title }}</h2>
        <Slider v-if="showSlider" @hide-slides="toggleSlides" :slides="slides"></Slider>
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
            console.log("toggle", this.id)
            this.showSlider = !this.showSlider;
         }
    }
}
</script>

<style lang="scss" scoped>

h2 {
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

.diashow {
    position: relative;
    background-image: url(https://www.zeitenspiegel.de/image/2/625/410/5/media/images/malawi-tabak_neon03-11.jpg);
    height: 318px;
    width: 387px;
    
}

.diashow:hover h2 {
   background-color: hsla(0,0%,100%,1);
}



</style>