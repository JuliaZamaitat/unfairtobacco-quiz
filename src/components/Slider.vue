<template>
<div class="slider slider--background" >
    <font-awesome-icon class="slider slider__quit-button" :icon="['fas', 'times']" size="lg" @click="$emit('hide-slides')"/>
        <splide :options="options">
         <splide-slide>
                <img class="slider slider__firstSlide slider__image slider__image-front" :src="firstPicture">
                <div class="slider slider__firstSlide slider__firstSlide-title">
                    <p class="slider slider__firstSlide-text" v-html="title"></p>
                </div>
        </splide-slide>   
        <splide-slide v-for="slide in slidesAndTexts" :key="slide.imageURL">
                <img class="slider slider__image slider__image-front" :src="slide.imageURL" :alt="slide.imageAlt">
                <div class="slider slider__text-box-front" v-bind:class="{ 'slider--is-left': slide.position }">
                    <p class="slider slider__text" v-html="slide.text"></p>
                </div>
            <div class="slider slider__image slider__image-back" @click="turnImage" >  
                <img class="slider slider__image" :src="slide.imageURL" :alt="slide.imageAlt" v-bind:class="{'slider--hide-image': hideImage}" >   
                <div class="slider slider__text-box-back" v-bind:class="{'slider--text-is-visible': isVisible}" >
                    <p class="slider slider__text" v-html="slide.text"></p>
                </div>
            </div>
        </splide-slide>
        <splide-slide >    
            <div class="slider slider__image slider__lastSlide">    
                <div class="slider slider__container">
                    <h2 class="slider slider__heading">Lust auf ein kleines Quiz?</h2>
                    <p class="slider slider__link-text">Teste <router-link :to="{name: 'Quiz', params: {id: id, quiz: quiz, title: title }}"><a class="slider slider__link">hier</a></router-link> dein Wissen</p>
                    <div class="slider slider__video-container">
                        <iframe class="slider slider__video" src="https://www.youtube.com/embed/tgbNymZ7vqY"></iframe>
                    </div>    
                    <p class="slider slider__follow">Folge uns auf</p>
                    <div class="slider slider__social-media-icons">
                        <a href="https://www.facebook.com/unfairtobacco"><font-awesome-icon class="slider slider__icon" :icon="['fab', 'facebook-square']" /></a>
                        <a href="https://www.instagram.com/unfairtobacco/"><font-awesome-icon class="slider slider__icon" :icon="['fab', 'instagram-square']" /></a>
                        <a href="https://twitter.com/unfairtobacco"><font-awesome-icon class="slider slider__icon" :icon="['fab', 'twitter-square']" /></a>
                        <a href="https://www.youtube.com/channel/UCD2EWWfHa4tgbcHhjlFmGxg"><font-awesome-icon class="slider slider__icon" :icon="['fab', 'youtube-square']" /></a>
                    </div>
                </div>
            </div>
        </splide-slide>
    </splide>  
</div>

</template>

<script>
import "@splidejs/splide/dist/css/themes/splide-default.min.css";

import { Splide, SplideSlide } from '@splidejs/vue-splide';

export default {
    components: {
        Splide,
        SplideSlide,
    },
    name: 'Slider',
    props: {
        slides: [Array, Boolean],
        id: Number,
        title: String,
        quiz: [Array, Boolean],
        firstPicture: [String, Boolean]
       
    },
    
    data() {
        return {
            textIsLeft: true,
            mobileHidden: true,
            isVisible: false,
            hideImage: false,
            options: {
                height: '100vh',
                width: '90vw',
                classes: {
                    arrows: 'splide__arrows splide__arrows--mobile',
                }
            },
        };
    },
    computed: {
        slidesAndTexts() { 
            console.log(this.slides)
            const slidesAndTexts = new Array()
            if (Array.isArray(this.slides)) {
                for(var slide in this.slides){
                    if(!this.slides[slide].diashow_bild || !this.slides[slide].diashow_text) return []
                    slidesAndTexts.push({
                        position: this.slides[slide].diashow_position_text[0] === "links",
                        text: this.slides[slide].diashow_text,
                        imageURL: this.slides[slide].diashow_bild.sizes["1536x1536"],
                        imageAlt: this.slides[slide].diashow_bild.alt
                    })
                }
            }
            return slidesAndTexts
        }
    },
    methods: {
        turnImage() {
            this.isVisible = !this.isVisible
            this.hideImage = !this.hideImage
        }
    }
}
</script>
<style lang="scss" scoped>

* {
 font-family: Lato, sans-serif;
}

.slider {
    &--background {  
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: rgba(0,0,0,1);
        z-index: 10;
    }

    &__quit-button { 
        z-index: 500000;
        position: absolute;
        top: 0.5em;
        right: 0.5em;
        color: rgb(255, 255, 255, 0.5);

        &:hover {
            color: rgb(255, 255, 255, 0.7);
        }
    }

    .splide {  
        margin: 0 auto;
    }

    &__image { 
        position: absolute;
        width: 80%;
        height: 80%;
        max-height: 80%;
        top: 50%;
        right: 0;
        left: 0;
        margin: 0 auto;
        transform: translateY(-50%);
        object-fit: cover;
        object-position: center; 
    }

    &__image-back {
        display: none;
    }

    &__firstSlide-title {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(97, 97, 97, 0.84);
        min-width: 25%;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 10px;
    }

    &__firstSlide-text {
        font-weight: bold;
        color: #FFFFFF;
        font-size: 20px;
        
       
    }

    &__text-box-front {
        position: absolute; 
        bottom: 12%; 
        right: 12%;
        background: rgba(97, 97, 97, 0.84);
        max-width: 40%;
        min-height: 220px;
    }

    &--is-left {  
        right: initial;
        left: 12%; 
    }


    &__text-box-back { 
        position: absolute;
        width: 80%;
        height: 80%;
        top: 50%;
        right: 0;
        left: 0;
        margin: 0 auto;
        transform: translateY(-50%);
        display: none;
        background: rgba(143, 44, 27, 1);
        
    }

    &__text { 
        font-style: normal;
        font-weight: 550;
        font-size: 16px;
        line-height: 131%;
        color: #FFFFFF;
        text-align: left;
        padding: 0 1em;
    }



   /* Last Slide */

    &__lastSlide {
        background-color: rgba(143, 44, 27, 1);
    }

    &__container {
        height: 100%;
        max-height: 100%;
        display: flex;
        flex-direction: column;
    }

    &__heading {
        min-width: 0;
        min-height: 0;   
        font-family: Lato, sans-serif;
        font-style: normal;
        font-weight: bold;
        font-size: 2.3em;
        color: #FFFFFF;
        margin: 0;
        padding-top: 3%;
    }

    &__link-text {
        min-width: 0;
        min-height: 0;   
        font-family: Lato, sans-serif;
        font-style: normal;
        font-weight: bold;
        font-size: 1.8em;
        line-height: 131%;
        color: #FFFFFF;
    }   

    &__link {
       color:  #FFFFFF;
    }

    &__follow {
        min-width: 0;
        min-height: 0;   
        font-family: Lato, sans-serif;
        font-style: italic;
        font-weight: bold;
        font-size: 1.5em;
        color: #FFFFFF;
        padding-top: 1em;
    }

    &__icon { 
        color: white;
        font-size: 3em;
        margin: 0.2em 0.2em;
    }

    &__video-container {
        min-width: 0;
        min-height: 0;   
        width: 100%;
        margin: 0 auto;
        height: 50%;
    }

    &__video {
        min-width: 0;
        min-height: 0;   
        width: 60%;
        height: 100%;
    }

}

$breakpoint-phone: 430px;


@media  only screen and (max-width : 1200px) and (orientation: portrait){
 .slider {
         &__image { 
            width: 80%;
            height: 40%;
            max-height: 40%;
        }

        &__text-box-front {
            position: absolute; 
            bottom: 32%; 
            right: 12%;
            background: rgba(97, 97, 97, 0.84);
            max-width: 40%;
            min-height: 220px;
        }

         &__heading {
            font-size: 2em;
        }
         &__link-text {
            font-size: 1.5em;
        } 
         &__follow {
            font-size: 1em;
        }  

 }
}


// Smartphone & Tablet Portrait
@media only screen and (max-width : 1023px) and (orientation: portrait) {
    .slider {
         &__image { 
            width: 90%;
            height: 60%;
            max-height: 60%;
        }

        &__text-box-back { 
            width: 90%;
            height: 60%;
        }

        &__image-front {
            display: none;
        }

        &__text-box-front {
            display: none;
        }

        &--text-is-visible {
            display: block;
        }

        &__image-back  {
            display: block;
        }
         &--hide-image {
            display: none;
        }

        &__text { 
            font-size: 18px;
        }     
    }
}

@media only screen and (max-width: 700px) and (orientation: portrait) {
    .slider {
        &__text { 
            font-size: 14px;
        }
    } 
}

@media only screen and (max-width: 500px) and (orientation: portrait) {
    .slider {
        &__text { 
            font-size: 11px;
        }
    }
        
}

//Smartphone Portrait smaller
@media only screen and (max-width: $breakpoint-phone) and (orientation: portrait) {
    .splide__arrows--mobile { //not working
        display: none !important;
    }

    .slider {
        &__image { 
            width: 100%;
            height: 60%;
            max-height: 60%;
        }


        &__text-box-back { 
            width: 100%;
            height: 60%;
        }

        &__text { 
            font-size: 12px;
        }

        &__quit-button {
            top: 1em;
            right: 1em;
        }
        
    }
}


// Tablet Landscape
@media only screen and (max-width: 850px) and (orientation: landscape) {
    .slider {
          &__text { 
            font-size: 11px;
        }
        
    }  
}

// Smartphone Landscape
@media only screen and (max-width: 850px) and (max-height: 450px)
 and (orientation: landscape) {
    .slider {
        &__image-front {
            display: none;
        }

        &--hide-image {
            display: none;
        }

        &__text-box-back {
            display: none;
        }

        &__image-back  {
            display: block;
        }

        &__text-box-front {
            display: none;
        }

        &--text-is-visible {
            display: block;
        }

        &__text { 
            font-size: 14px;
        }

    }
}

</style>

