<template>
  <div class="quiz">
      <h1>Willkommen zum Quiz! </h1>
      <p>{{ quiz.length}} Fragen sind für dich bereit</p>
     

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
        quiz: Array
    }
}
</script>

<style lang="scss" scoped>

.quiz {
    &__container {
        // display: flex;
        // flex-direction: column;
        width: 500px;
        // max-width: 90%;
        height: 100%;
        background-color: rgba(196,196,196,.42);
        border-radius: 9px;
        padding: 20px;
        padding-top: 45px;
        margin: 0 auto;
    }

    &__question {
        background-color: rgb(143, 44,27);
        padding: 15px;
        border-radius: 9px; 


        &-request{
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

        &:hover, &:focus, &:active {
            background-color: white;
            border: 2px solid rgb(143, 44,27);
            transition: background-color .2s ease-out;
            outline: none;
        }

    }
}

</style>

