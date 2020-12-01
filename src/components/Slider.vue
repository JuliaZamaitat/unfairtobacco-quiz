<template>
<div class="background" >
    <font-awesome-icon class="quit" :icon="['fas', 'times']" size="lg" @click="$emit('hide-slides')"/>
    <div class="wrapper">
        <splide :options="options">
        <splide-slide v-for="slide in slides" :key="slide.url">
            <div class="image" >
                <img :src="slide.url" alt="slide.alt">
                <div class="text-box-front" v-bind:class="{ 'is-left': textIsLeft }">
                     <p>Allein in Malawi arbeiten etwa 78.000 Kinder auf den Tabakplantagen. Aber auch in Brasilien, Indonesien, den USA und anderen Ländern ist Kinderarbeit im Tabakanbau weit verbreitet.</p>
                     <p>Das US-amerikanische Arbeitsministerium veröffentlicht jedes Jahr eine Liste der Waren, die mit Zwangs- und Kinderarbeit produziertwerden. Im Jahr 2016 standen für Tabak 16 Länder auf der Liste, die USA werden dort allerdings nicht genannt.</p>
                </div>
            </div>   
            <div class="image-back" @click="turnImage">
                <img :src="slide.url" alt="slide.alt" v-bind:class="{'hide-image': hideImage}">   
                <div class="text-box-back" v-bind:class="{'is-visible': isVisible}" >
                    <p>Allein in Malawi arbeiten etwa 78.000 Kinder auf den Tabakplantagen. Aber auch in Brasilien, Indonesien, den USA und anderen Ländern ist Kinderarbeit im Tabakanbau weit verbreitet.</p>
                    <p>Das US-amerikanische Arbeitsministerium veröffentlicht jedes Jahr eine Liste der Waren, die mit Zwangs- und Kinderarbeit produziertwerden. Im Jahr 2016 standen für Tabak 16 Länder auf der Liste, die USA werden dort allerdings nicht genannt.</p>
                </div>
            </div>

        </splide-slide>
        </splide>  
    </div>
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
        slidesAndTexts: [Array, Boolean]
    },
    
    data() {
        return {
            options: {},
            // slides: createSlides(),
            textIsLeft: true,
            mobileHidden: true,
            isVisible: false,
            hideImage: false
            
        };
    },
    computed: {
        slides() { //TODO
            const sliderImages = new Array()
               console.log("slidesandtexts", this.slidesAndTexts)
            if (Array.isArray(this.slidesAndTexts)) {
                console.log("slidesandtexts", this.slidesAndTexts)
                sliderImages.push(this.slidesAndTexts.forEach(slideWithText =>  slideWithText["diashow_bild"]["url"]))
            }
            console.log(sliderImages)
            return sliderImages
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

$breakpoint-phone: 430px;

.background {
    position: fixed;
    width: 100%;
    height: 100%;
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
    height: auto;
}

.text-box-front {
   position: absolute; 
    bottom: 27px; 
    right: 22px;
    background: rgba(97, 97, 97, 0.84);
    width: 550px;
    min-height: 220px;
}

.image-back {
    display: none;
}


.text-box-back {
    background: rgba(143, 44, 27, 1);
    width: 80%;
    margin: 0 auto;
    min-height: 380px;
 }



.is-left {
    right: initial;
    left: 12%; 
}

p  { 
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
    position: absolute;
    top: 0.5em;
    right: 0.5em;
    color: rgb(255, 255, 255, 0.5);
}

.quit:hover {
    color: rgb(255, 255, 255, 0.7);
}

@media (max-width: $breakpoint-phone) {
  img {
      width: 70%
  }

  .text-box-back {
      width: 70%
  }
  .quit {
      top: 1em;
      right: 1em;
  }
}

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
        
   

    p {
        font-size: 11px;
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

// Tablet Landscape
@media only screen and (max-width: 850px) and (orientation: landscape) {
    .text-box-front {
       min-height: 100px;
       width: 400px;
    }
    p {
       font-size: 10px;
    }
}




       
</style>

