<template>
<div class="background" >
    
    <font-awesome-icon class="quit" :icon="['fas', 'times']" size="lg" @click="$emit('hide-slides')"/>
        <splide :options="options">
        <splide-slide v-for="slide in slidesAndTexts" :key="slide.imageURL">
            <div class="image" >
                <img :src="slide.imageURL" :alt="slide.imageAlt">
                <div class="text-box-front" v-bind:class="{ 'is-left': slide.position }">
                    <p class="slider-text" v-html="slide.text"></p>
                </div>
            </div>   
            <div class="image-back" @click="turnImage">
                <img :src="slide.imageURL" :alt="slide.imageAlt" v-bind:class="{'hide-image': hideImage}">   
                <div class="text-box-back" v-bind:class="{'is-visible': isVisible}" >
                    <p class="slider-text" v-html="slide.text"></p>
                </div>
            </div>
        </splide-slide>
        <splide-slide >    
            <div class="lastSlide">
                <div class="container">
                        <h2>Lust auf ein kleines Quiz?</h2>
                        <p class="link-text">Teste hier dein Wissen</p>
                        <iframe width="70%" height="400px" src="https://www.youtube.com/embed/tgbNymZ7vqY"></iframe>
                            <p class="follow">Folge uns auf</p>
                            <div class="social-media">
                                <font-awesome-icon class="social-icons facebook" :icon="['fab', 'facebook-square']" />
                                <font-awesome-icon class="social-icons instagram" :icon="['fab', 'instagram-square']" />
                                <font-awesome-icon class="social-icons twitter" :icon="['fab', 'twitter-square']" />
                                <font-awesome-icon class="social-icons youtube" :icon="['fab', 'youtube-square']" />
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
// import { createSlides } from "../utils/slides";


export default {
    components: {
        Splide,
        SplideSlide,
    },
    name: 'Slider',
    props: {
        slides: [Array, Boolean]
    },
    
    data() {
        return {
            options: {
          

            },
            textIsLeft: true,
            mobileHidden: true,
            isVisible: false,
            hideImage: false
            
        };
    },
    computed: {
        slidesAndTexts() { 
            const slidesAndTexts = new Array()
            if (Array.isArray(this.slides)) {
                for(var slide in this.slides){
                    slidesAndTexts.push({
                        position: this.slides[slide].diashow_position_text[0] === "links",
                        text: this.slides[slide].diashow_text,
                        imageURL: this.slides[slide].diashow_bild.sizes["1536x1536"],
                        imageAlt: this.slides[slide].diashow_bild.alt
                    })
                }
            }
            console.log(slidesAndTexts)
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


.social-media{
    padding-bottom: 2em;
}

.social-icons {
    width: 50px;
    height: 50px;
    color: white;
    padding: 0 0.4em;
}

.lastSlide {
    position: relative;
    background-color: rgba(143, 44, 27, 1);
    height: 100%; 
    width: 80%;
    margin: 0 auto;

}


h2 {
    font-family: Lato, sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 2.3em;
    color: #FFFFFF;
    margin: 0;
    padding-top: 7%;

}

.link-text {
    font-family: Lato, sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 1.8em;
    line-height: 131%;
    color: #FFFFFF;
    padding-bottom: 1em;
}

.follow {
    font-family: Lato, sans-serif;
    font-style: italic;
    font-weight: bold;
    font-size: 1.5em;
    color: #FFFFFF;
    padding-top: 1em;

}

.background {
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    background: rgba(0,0,0,1);
    z-index: 10;
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: auto;
}


img {
    position: relative;
    width: 80%;
    height: 100%;
    object-fit: cover; 
}

.image {
    object-fit: cover;
    height: 100%; 
}


.text-box-front {
    position: absolute; 
    bottom: 27px; 
    right: 12%;
    background: rgba(97, 97, 97, 0.84);
    width: 550px;
    min-height: 220px;
}

.image-back {
    display: none;
    object-fit: cover;
    height: 100%; 
}


.text-box-back {
    background: rgba(143, 44, 27, 1);
    width: 80%;
    margin: 0 auto;
    height: 100%;
 }


.is-left {
    right: initial;
    left: 12%; 
}

.slider-text  { 
   font-family: Lato, sans-serif;
    font-style: normal;
    font-weight: 550;
    font-size: 16px;
    line-height: 131%;
    color: #FFFFFF;
    text-align: left;
    padding: 0 1em;

}

.quit {
    z-index: 5000;
    position: absolute;
    top: 0.5em;
    right: 0.5em;
    color: rgb(255, 255, 255, 0.5);
}

.quit:hover {
    color: rgb(255, 255, 255, 0.7);
}


$breakpoint-phone: 430px;





// Smartphone & Tablet Portrait
@media only screen and (max-width : 1023px) and (orientation: portrait)
 {
     .image {
         display: none;
     }

     .hide-image {
         display: none;
     }

     .text-box-back {
        display: none;
    }

     .image-back  {
         display: block;
     }

     .is-visible {
         display: block;
    }
        

    .slider-text {
        font-size: 11px;
    }

    
}


//Smartphone Portrait smaller
@media only screen and (max-width: $breakpoint-phone) and (orientation: portrait) {


  .text-box-back {
      width: 70%
  }
  .quit {
      top: 1em;
      right: 1em;
  }
}



// Tablet Landscape
@media only screen and (max-width: 850px) and (orientation: landscape) {
    .text-box-front {
       min-height: 100px;
       width: 400px;
    }
    .slider-text {
       font-size: 10px;
    }
   
}


// Smartphone Landscape
@media only screen and (max-width: 850px) and (max-height: 450px)
 and (orientation: landscape) {
      .image {
         display: none;
     }

     .hide-image {
         display: none;
     }

     .text-box-back {
        display: none;
    }

     .image-back  {
         display: block;
     }

     .is-visible {
         display: block;
    }

}

       
</style>

