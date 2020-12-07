<template>
  <div class="quiz quiz--viewport">
      <h1 class="quiz quiz__heading">Quiz</h1>
      <div class="quiz quiz__line"></div>
      <h2 class="quiz quiz__title">{{ title }}</h2>
     
      <div class="quiz quiz__container">
    
    <!-- Frage -->
        <div class="quiz quiz__question">
            <div class="quiz quiz__question--background">
                <p>Die Arbeitsbedingungen auf den Tabakfeldern sind gesundheitsgefährdend, da Nikotin über die grünen Tabakblätter in die Haut gelangt. Wie hoch ist der Nikotingehalt, den die Pflücker*innen innerhalb einer Woche aufnehmen?</p>
            </div>
        </div>

    <!-- Task for question -->   
    <p class="quiz quiz__question-request">Wähle die richtige Antwort aus!</p>

       
       <!-- ANSWERS -->
        <div class="quiz quiz__answers">
            <ul class="quiz quiz__answers-list">
                <li>
                    <button v-on:click="toggleAnswer(a)" class="answer" :class="{selected:answerSelected === a}">Nikotingehalt von 50 Zigaretten</button>
                </li>
                <li>
                    <button v-on:click="toggleAnswer(a)" class="answer" :class="{selected:answerSelected === a}">Nikotingehalt von 50 Zigaretten</button>
                </li>
                <li>
                    <button v-on:click="toggleAnswer(a)" class="answer" :class="{selected:answerSelected === a}">Nikotingehalt von 50 Zigaretten</button>
                </li>
                <li>
                    <button v-on:click="toggleAnswer(a)" class="answer" :class="{selected:answerSelected === a}">Nikotingehalt von 50 Zigaretten</button>
                </li>
            </ul>
        </div>

        <!-- FOOTER -->
             <button v-on:click="toggleAnswer(a)" class="quiz quiz__button" :class="{selected:answerSelected === a}">Weiter</button>


      </div>    

  </div>
</template>

<script>
export default {
    props: {
        title: String,
        quiz: Array
    },
    mounted(){
        console.log(this.title)
    }
}
</script>

<style lang="scss" scoped>


.quiz {
  
    &--viewport {
      width: 100%;
      height: 100%;   
    }  

    &__heading {
        margin-bottom: 10px;
    }

    &__line {
      border-top: 3px solid #000000;
      margin: 0 auto;
      padding: 0;
      width: 30px;
      height: 39px; 
    }

    &__title {
        font-family: Lato, sans-serif;
        font-style: italic;
        font-weight: bold;
        margin: 5px 0 30px;
    }

    &__container {
        width: 500px;
        max-width: 90%;
        height: 100%;
        background-color: rgba(196,196,196,.42);
        border-radius: 9px;
        padding: 20px;
        padding-top: 45px;
        margin: 0 auto 30px;
    }

    &__question {
        background-color: rgb(143, 44,27);
        padding: 15px;
        border-radius: 9px; 


        &-request {
            font-family: Lato, sans-serif;
            font-style: italic;
            font-weight: bold;
            margin-top: 60px;
            margin-bottom: 30px;
           
            color: #000000;
        }

        p {
            color: white;
            text-align: left;
            font-family: Lato, sans-serif;
            font-style: normal;
            font-weight: bold;
            line-height: 25px;
            padding: 10px;
        }

        &--background {
            background-color: rgba(0, 0, 0, .34);
            border-radius: 9px;
            padding: 15px;
        }   
    }

    &__answers {
        &-list {
            list-style: none;
            padding: 0;

            .answer {
                width: 90%;
                padding: 1.5em 0.3em 1.3em;
                margin: 4% auto 0;
                color: white;
                background-color: rgb(143, 44,27);
                border-style: none;
                border-radius: 11px;
                font-family: Lato, sans-serif;
                font-weight: bold;
                border: 2px solid transparent;
                cursor: pointer;
                transition: .3s ease-out;
            
                &:hover, &:focus, &:active {
                    background-color: white;
                    color: rgb(143, 44,27);
                    border: 2px solid rgb(143, 44,27);
                    transition: background-color .3s ease-out;
                    outline: none;
                }
            }
        }
    }

    &__button {
        font-family: Lato, sans-serif;
        font-size: 16px;
        font-weight: bold;
        color: rgb(143, 44,27);
        border: 2px solid rgb(143, 44,27);
        border-radius: 11px;
        padding: 8px 23px 6px;
        margin-top: 25px;
        cursor: pointer;
        transition: background-color .2s ease-out;

        &:hover, &:focus, &:active {
            background-color: white;
            border: 2px solid rgb(143, 44,27);
            transition: background-color .2s ease-out;
            outline: none;
        }

    }
}

@media screen and (max-width: 500px) {
    .quiz {
        &__heading {
            font-size: 23px;
        }
        &__line {
            height: 15px;
        }

        &__title {
            font-size: 18px;
            margin: 0 0 30px;
        }
        &__container {
            padding-top: 25px;
        }
        &__question {
            &-request {
                margin-top: 25px;
                margin-bottom: 17px;
                font-size: 13px;
            }

            p {
                font-size: 14px;
                line-height: 22px;
                padding: 5px;
            }

            &--background {
                padding: 10px;
            }   
        }

        &__answers {
            &-list {
                .answer {
                    width: 90%;
                    padding: 1em 0.3em 0.9em;
                    font-size: 12px;
                }
            }
        }

        &__button {
            font-size: 14px;
            margin-top: 10px;
        }
    }
}



</style>

