<template>
<div class="background" @click.self="$emit('hide-slides')" >
    <div class="wrapper">
    <font-awesome-icon class="quit" :icon="['fas', 'times']" size="lg" @click="$emit('hide-slides')"/>
        <splide :options="options">
        <splide-slide v-for="slide in slides" :key="slide.src">
            <div class="image" >
                <img :src="slide.src" alt="slide.alt">
                <div class="text-box-front" v-bind:class="{ 'is-left': textIsLeft }">
                     <p>Allein in Malawi arbeiten etwa 78.000 Kinder auf den Tabakplantagen. Aber auch in Brasilien, Indonesien, den USA und anderen Ländern ist Kinderarbeit im Tabakanbau weit verbreitet.</p>
                     <p>Das US-amerikanische Arbeitsministerium veröffentlicht jedes Jahr eine Liste der Waren, die mit Zwangs- und Kinderarbeit produziertwerden. Im Jahr 2016 standen für Tabak 16 Länder auf der Liste, die USA werden dort allerdings nicht genannt.</p>
                </div>
            </div>   
            <div class="image-back" @click="turnImage">
                <img :src="slide.src" alt="slide.alt" v-bind:class="{'hideImage': hideImage}">   
                <div class="text-box-back" v-bind:class="{'isVisible': isVisible}" >
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
import { createSlides } from "../utils/slides";


export default {
    components: {
        Splide,
        SplideSlide,
    },
    name: 'Slider',
    
    data() {
        return {
            options: {},
            slides: createSlides(),
            textIsLeft: true,
            mobileHidden: true,
            isVisible: false,
            hideImage: false
            
        };
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
    height : auto;
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
    background: rgba(97, 97, 97, 0.84);
    width: 100%;
    min-height: 100%;
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

     .image-back  {
         display: block;
     }

     .hideImage {
         display: none;
     }

     .text-box-back {
        display: none;
    }

     .isVisible {
         display: block;
    }
        

    .turn-around {
         transform: rotateY(180deg);
    }
    
}

// Smartphone Landscape
@media only screen and (max-width: 850px) and (max-height: 450px)
 and (orientation: landscape) {
      .image {
         display: none;
     }

     .image-back  {
         display: block;
     }

     .hideImage {
         display: none;
     }

     .text-box-back {
        display: none;
    }

     .isVisible {
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

