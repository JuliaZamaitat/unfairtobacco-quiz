<template>
    <div>
        <h2 @click="toggleSlides">{{ title }}</h2>
        <Slider v-if="showSlider" @hide-slides="toggleSlides"></Slider>
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
        sliderImagesAndTexts: Boolean,
        quiz: Array 
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
}
</script>

<style lang="scss" scoped>

</style>