<template>
<div class="quiz quiz--viewport">
      <h1 class="quiz quiz__heading">Quiz</h1>
      <div class="quiz quiz__line"></div>
      <h2 class="quiz quiz__title">{{ title }}</h2>
     
      <div v-if="!this.quizFinished" class="quiz quiz__container">
    
    <!-- Frage -->
        <div class="quiz quiz__question">
            <div class="quiz quiz__question--background">
                <p v-html="currentQuestion"></p> 
            </div>
        </div>
         <div class="quiz quiz__question quiz__question-hidden"><p v-html="currentQuestion"></p></div> <!--to have the right margins to the elements below-->

    <!-- Task for question -->   
        <p v-if="!this.isValidated" class="quiz quiz__question-explanation" v-html="currentTask"></p>
        <p v-if="this.isValidated" class="quiz quiz__question-explanation" :class="{'quiz__question--correct-solution': this.correct, 'quiz__question--false-solution': !this.correct }" v-html="solutionText"></p> 

    <!-- ANSWERS -->

       <!-- MULTIPLE CHOICE -->
        <div v-if="quizType === 'multiple_choice'" class="quiz quiz__answers quiz__multiple-choice">
            <ul class="quiz quiz__answers-multiple-list">
                <li v-for="answer in currentAnswers" :key="answer.id">
                    <!-- Antworten aus Text bestehend -->
                    <button v-if="answer.multiple_answer" v-on:click="toggleAnswer(answer)" :disabled="isValidated" class="answer" 
                            :class="{'answer--correct': isValidated && isCorrect(answer), 'answer--false': answerSelected === answer && isValidated && !isCorrect(answer), 'answer--is-validated': isValidated}">
                        {{ answer.multiple_answer }}
                    </button>
                    <!-- Antworten aus Bildern bestehend -->
                     <button v-if="answer.multiple_bild" v-on:click="toggleAnswer(answer)"  :disabled="isValidated" class="multiple-bild" >
                         <img :src="answer.multiple_bild.sizes.woocommerce_thumbnail" class="answer-image" :class="{'selected': answerSelected === answer && !isValidated, 'answer--correct': isValidated && isCorrect(answer), 'answer--false': answerSelected === answer && isValidated && !isCorrect(answer), 'answer--image-is-validated': isValidated}">
                     </button>

                </li>
            </ul>
        </div>

        <!-- FREE TEXT -->
        <div v-if="quizType === 'free_answer'" class="quiz quiz__answers quiz__free-answer">
            <textarea v-model="freeAnswer" class="quiz quiz__answers-free-answer-input" 
                    :class="{'quiz__answers-free-answer-input--correct': isValidated }" 
                    :keyup="toggleAnswer(undefined)"
                    :disabled="isValidated">
            </textarea>
            <p v-if="this.isValidated && lang === 'de'" class="quiz quiz__answers-free-answer-solution-heading">Eine mögliche Antwort von uns</p>
            <p v-if="this.isValidated && lang !== 'de'" class="quiz quiz__answers-free-answer-solution-heading">One possible answer from us</p>
            <p v-if="this.isValidated" v-html="this.ourAnswer" class="quiz quiz__answers-free-answer-solution"></p>
        </div>

        <!-- LUECKENTEXT -->
        <div v-if="quizType === 'lueckentext'" class="quiz quiz__answers-lueckentext">
            <p v-for="(textUndLuecke, index) in currentAnswers" class="quiz quiz__answers-lueckentext-text-luecke" :key="index">
            {{ textUndLuecke.luecke_text }} 
            <!-- NOT YET VALIDATED -->
            <select v-if="!isValidated" @change="toggleAnswer($event.target.value)" class="quiz quiz__answers-lueckentext-select">
                <option hidden disabled selected value></option>
                 <option v-for="(tL, i) in dropdownOptions" v-bind:value="[tL.luecke_luecke, textUndLuecke.luecke_luecke, index]" :key="i" >
                    {{ tL.luecke_luecke }}
                </option>
            </select>
            <!-- VALIDATED -->
            <select v-if="isValidated" disabled=true class="quiz quiz__answers-lueckentext-select" :class="{'answer--correct': isValidated && isCorrect(index), 'answer--false': isValidated && !isCorrect(index)}">
                 <option>{{ textUndLuecke.luecke_luecke }}</option>
            </select>
            </p>
        </div>

        <!-- ZUORDNEN -->
        <div v-if="quizType === 'connection_quiz'" class="quiz quiz__answers-connection-quiz">
            <!-- DROP AREA -->
            <div v-if="!isValidated">
                <div v-for="(liste, i) in draggableLists" :key="liste.id">
                     <p class="expression">{{ storedAnswers[i].connection_expression }}</p>
                    <div class="drop-area">
                        <draggable group="drop-quiz" :list="liste" @change="checkOnlyOneSelected(liste)">
                            <div class="descriptions" v-for="item in liste" :key="item.id">
                                {{ item ? item.connection_description : item }}
                            </div>
                        </draggable>
                    </div>
                </div>
            <div class="quiz quiz__line quiz__line--red"></div>
            <!-- SELECT ITEMS -->
            <draggable group="drop-quiz" :list="currentAnswers">
                <div class="descriptions" v-for="expressionPair in currentAnswers" :key="expressionPair.id">
                    {{ expressionPair.connection_description }}
                    </div> 
            </draggable>
            
            <!-- Different conditions apply for this button -->
            <button v-if="currentAnswers.length === 0 && !this.isValidated && this.onlyOneSelected" v-on:click="validateAnswers()" class="quiz quiz__button">Auflösung</button>
            </div>
           
           <!-- After Validation -->
            <div v-if="isValidated">
                <div v-for="(answer,index) in storedAnswers" :key="answer.id">
                    <p class="expression">{{ answer.connection_expression }}</p>
                    <div class="drop-area" :class="{'answer--correct': isValidated && isCorrect(index), 'answer--false': isValidated && !isCorrect(index)}">
                           {{ answer.connection_description }}      
                    </div>
                </div>
            </div>
        </div>

    <!-- FOOTER -->
        <p v-if="!this.answerSelected && !this.isValidated" class="quiz quiz__question-count">Frage {{ currentQuestionIndex + 1 }} von {{ questionCount }}</p>
        <button v-if="this.answerSelected && !this.isValidated && this.quizType !=='connection_quiz'" v-on:click="validateAnswers()" class="quiz quiz__button">Auflösung</button>
        <button v-if="this.isValidated && !this.quizFinished" v-on:click="getNextQuestion()" class="quiz quiz__button">Weiter</button>

      </div>    

<!-- FINISHED -->
        <!-- POSITIVE SCREEN -->
        <div v-if="this.quizFinished && ((correctAnswersCount * 100) / questionCount) > 70" class="quiz quiz__container">
            <div class="quiz quiz__question quiz__question--congrats">
                <div v-if="lang === 'de'" class="quiz quiz__question--background quiz__question--background-congrats">
                    <p>Herzlichen Glückwunsch! <br> Du hast {{ correctAnswersCount }} von {{ questionCount}} Fragen richtig beantwortet!</p>
                </div>
                 <div v-else class="quiz quiz__question--background quiz__question--background-congrats">
                    <p>Congrats! <br> You answered {{ correctAnswersCount }} out of {{ questionCount}} questions correctly!</p>
                </div>
            </div> 
            <p v-if="lang === 'de'" class="quiz quiz__finished-text">Du hast dein Wissen in diesem Quiz unter Beweis gestellt!</p>
            <p v-else class="quiz quiz__finished-text">You proved your knowledge in this quiz!</p>
            <p v-if="lang === 'de'" class="quiz quiz__finished-text--share">Teile das mit deinen Freunden!</p>
            <p v-else class="quiz quiz__finished-text--share">Share this with your friends!</p>
             <div class="quiz quiz__social-media-icons">
                <a href="https://www.facebook.com/unfairtobacco"><font-awesome-icon class="quiz quiz__icon" :icon="['fab', 'facebook-square']" /></a>
                <a href="https://www.instagram.com/unfairtobacco/"><font-awesome-icon class="quiz quiz__icon" :icon="['fab', 'instagram-square']" /></a>
                <a href="https://twitter.com/unfairtobacco"><font-awesome-icon class="quiz quiz__icon" :icon="['fab', 'twitter-square']" /></a>
            </div>
            <p v-if="lang === 'de'" class="quiz quiz__link-text"><router-link :to="{name: 'Diashows'}"><a class="quiz quiz__link">Zurück zur Diashow-Übersicht</a></router-link></p>
            <p v-else class="quiz quiz__link-text"><router-link :to="{name: 'Diashows'}"><a class="quiz quiz__link">Back to diashows</a></router-link></p>
        </div>
        <!-- NEGATIVE SCREEN -->
        <div v-else-if="this.quizFinished" class="quiz quiz__container">
            <div class="quiz quiz__question quiz__question--no-congrats">
                <div class="quiz quiz__question--background quiz__question--background-no-congrats">
                    <p v-if="lang === 'de'">Schade! <br> Leider waren nicht alle Antworten richtig!</p>
                    <p v-else>Oh no! <br> Unfortunately, not all answers were correct!</p>
                </div>
            </div>
            <p v-if="lang === 'de'" class="quiz quiz__finished-text">Möchtest du es nochmal probieren?</p>
            <p v-else class="quiz quiz__finished-text">Do you want to try again?</p>
            <button v-if="lang === 'de'" class="quiz quiz__finished-try-again" @click="resetData()">Neuer Versuch</button>
            <button v-else class="quiz quiz__finished-try-again" @click="resetData()">Try again</button>
            <p  v-if="lang === 'de'" class="quiz quiz__link-text"><router-link :to="{name: 'Diashows'}"><a class="quiz quiz__link">Zurück zur Diashow-Übersicht</a></router-link></p>
            <p v-else class="quiz quiz__link-text"><router-link :to="{name: 'Diashows'}"><a class="quiz quiz__link">Back to diashows</a></router-link></p>
        </div>

    </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
    components: {
            draggable,
        },
    props: {
        title: String,
        quiz: Array,
        lang: String
    },
    data () {
        return {
            questionCount: null,
            correctAnswersCount: 0,
            quizFinished: false,
            currentQuestionIndex: 0,
            answerSelected: null,
            isValidated: false,
            freeAnswer: null,
            dropdownOptions: [],
            correctLuecke: [],
            correct: false,
            ourAnswer: null,
            draggableLists: [],
            storedAnswers: [],
            onlyOneSelected: false,
        }
    },
    watch: {
        currentQuestionIndex: function () {
            if(this.quizType === "connection_quiz") { //don't move to currentAnswers, as the dropdown relies on no sideeffects there
                 const connectionPairs = this.quiz[this.currentQuestionIndex].connection_pair;
                 for(var pair in connectionPairs){
                    const emptyArray = []
                    this.storedAnswers.push(connectionPairs[pair])
                    this.draggableLists.push(emptyArray)
                 }
            }
        },
    },
    created() {
        this.questionCount = this.quiz.length
    },

    methods: {
        resetData() {
            Object.assign(this.$data, this.$options.data.call(this));
            this.questionCount = this.quiz.length
        },
        toggleAnswer(answer) { //multiple choice & lueckentext & free text
            if(answer === undefined && this.quizType === "free_answer" && this.freeAnswer?.length > 1) {
                this.answerSelected = true
                return
            }
            if(this.quizType === "lueckentext") {
                console.log(answer)
                const values = answer.split(",")
                const selectedValue = values[0]
                const actualValue = values[1]
                const index = values[2] //The index of the text paragraph
                //check if a value for a paragraph with that id was added before
                for(var element in this.correctLuecke){
                    if (this.correctLuecke[element]?.id === index) this.correctLuecke[element] = null;       
                }

                if (selectedValue === actualValue) this.correctLuecke.push({id: index, correct: true})
                else this.correctLuecke.push({id: index, correct: false})

                this.answerSelected = true
                return
             }

            if (this.answerSelected === answer) {
                this.answerSelected = null
            } else {
                this.answerSelected = answer
            }
        },
        validateAnswers() {
            this.isValidated = true;
            window.scrollTo(0,0);  
            switch (this.quizType) {
                case "multiple_choice": 
                    if (this.isCorrect(this.answerSelected)) {
                        this.correctAnswersCount += 1
                        this.correct = true
                    }
                    break
                case "lueckentext": {
                    const filtered = this.correctLuecke.filter(Boolean); //remove empty entries
                    for(var i in filtered){
                        if (filtered[i].correct === false) {
                            this.correct = false;
                            return
                        } else if (filtered.length < this.dropdownOptions.length) {
                            this.correct = false;
                            return
                        }
                    }
                    this.correct = true
                    this.correctAnswersCount += 1
                    break
                }
                case "free_answer":
                    this.correctAnswersCount += 1
                    this.correct = true //always correct
                   break
                case "connection_quiz":
                    this.correct = true   
                   for(var index in this.draggableLists) {
                        if (this.draggableLists[index][0].connection_description !== this.storedAnswers[index].connection_description) {
                            this.correct = false
                        }
                    } 
                    if (this.correct) this.correctAnswersCount +=1
                    break
                default:
                   return ""
            }
        },
        isCorrect(answer) {
             switch (this.quizType) {
                case "multiple_choice": 
                    return answer.multiple_truth ||  answer.multiple_truth_image
                   
                case "lueckentext":
                   for(var element in this.correctLuecke){
                        if (this.correctLuecke[element]?.id === answer.toString()) {
                            return this.correctLuecke[element].correct
                        }
                    }
                    break
                case "connection_quiz":
                    return this.draggableLists[answer][0].connection_description === this.storedAnswers[answer].connection_description
                default:
                   return false  
            }
        },
        checkOnlyOneSelected(){
            this.answerSelected = true
            this.onlyOneSelected = true
            for(var liste in this.draggableLists) {
                if(this.draggableLists[liste].length > 1) this.onlyOneSelected = false;
            } 
        },
        getNextQuestion() {
            this.currentQuestionIndex += 1
            this.isValidated = false
            this.freeAnswer = null
            this.correct = false
            this.correctLuecke = []
            this.dropdownOptions = []
            this.ourAnswer = null
            this.draggableLists = []
            this.storedAnswers = []
            this.answerSelected = null
            this.onlyOneSelected = false
            if (this.currentQuestionIndex === this.questionCount) {
                this.quizFinished = true
                if((this.correctAnswersCount * 100 / this.questionCount) > 70) {
                     this.$confetti.start();
                    setTimeout(() => this.$confetti.stop(), 3000);
                }
            }  
        },
    shuffle(a) {
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
        }
    },
    computed: {
        quizType() {
            return this.quiz[this.currentQuestionIndex]?.acf_fc_layout
        },
        currentQuestion() {
            switch (this.quizType) {
                case "multiple_choice": 
                    return this.quiz[this.currentQuestionIndex].multiple_question
                case "lueckentext":
                    return this.quiz[this.currentQuestionIndex].quiz_frage
                case "free_answer":
                    return this.quiz[this.currentQuestionIndex].free_question
                case "connection_quiz":
                    return this.quiz[this.currentQuestionIndex].connection_question
                default:
                   return ""  
            }
        },
        currentAnswers() {
            switch (this.quizType) {
                case "multiple_choice": 
                    return this.quiz[this.currentQuestionIndex].multiple_answers_text || this.quiz[this.currentQuestionIndex].multiple_answers_images
                case "lueckentext": {
                    const lueckentext = this.quiz[this.currentQuestionIndex].lueckentext_text
                    const luecken = []
                    for(var luecke in lueckentext){
                        luecken.push(lueckentext[luecke].luecke_luecke)
                    }
                    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                    this.dropdownOptions = this.shuffle([...lueckentext])
                    return lueckentext
                }
                case "free_answer":
                    return this.quiz[this.currentQuestionIndex].free_aufloesung
                case "connection_quiz": {
                    const answers = []
                    //needs not to be pointed to the object directly, because dragging would alter the object
                    const connectionPairs = this.quiz[this.currentQuestionIndex].connection_pair; 
                    for(var pair in connectionPairs){
                        answers.push(connectionPairs[pair])
                    }
                    let a = this.shuffle(answers);
                    return a
                    // return answers
                }
                default:
                   return []  
            }
        },
        currentTask() {
            switch (this.quizType) {
                 case "multiple_choice": 
                    return this.lang === "de" ? "Wähle eine richtige Antwort aus!" : "Choose one right answer!"
                case "lueckentext":
                    return this.lang === "de" ? "Wähle die passenden Begriffe aus!" : "Choose the right terms!"
                case "free_answer":
                     return this.lang === "de" ? "Schreib hier deine Anwort!" : "Write your answer here!"
                case "connection_quiz":
                     return this.lang === "de" ? "Ordne die passenden Beschreibungen zu!" : "Match the appropriate descriptions!"
                default:
                   return ""  
            }
        },
        solutionText() { 
            const question = this.quiz[this.currentQuestionIndex]
             switch (this.quizType) {
                 case "multiple_choice":
                   return this.correct ? question.multiple_aufloesung[0].positive_answer : question.multiple_aufloesung[0].negative_answer
                case "lueckentext":
                    return this.correct ? question.lueckentext_aufloesung[0].positive_answer : question.lueckentext_aufloesung[0].negative_answer
                case "free_answer":
                    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                    this.ourAnswer = question.our_answer
                    return question.free_aufloesung[0].positive_answer
                case "connection_quiz":
                    return this.correct ? question.connection_aufloesung[0].positive_answer : question.connection_aufloesung[0].negative_answer
                default:
                   return ""  
            }
        }
    }
}
</script>

<style lang="scss" scoped>

$dark-red: rgb(143, 44,27);
$false-answer:rgb(214, 35,35);
$correct-answer: rgb(81, 214,35);
$grey-background:rgba(128,127,127,1);


* {
 color: black;
}

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

      &--red {
        border-top: 3px solid $dark-red;
        margin-top: 40px;
        margin-bottom: 0;
        height: 20px; 
      }
    }

    &__title {
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
        margin: 0 auto;
        position: relative;
    }

    &__question {
        background-color: $dark-red;
        padding: 15px;
        border-radius: 9px; 
        position: absolute;
        left: -30px;
        width: 100%;

        &-hidden{
            visibility: hidden;
            position: relative;
        }

        &-explanation {
            font-style: italic;
            font-weight: bold;
            margin-top: 80px;
            margin-bottom: 30px;
            color: #000000;
        }

        &--correct-solution {
            color: $correct-answer;
        }

         &--false-solution {
            color: $false-answer;
        }

        p {
            color: white;
            text-align: left;
            font-style: normal;
            font-weight: bold;
            line-height: 25px;
            padding: 10px;
        }

        &--congrats {
            background-color: $correct-answer;
             
        }

        &--no-congrats {
            background-color:$false-answer;
        }

        &--background {
            background-color: rgba(0, 0, 0, .34);
            border-radius: 9px;
            padding: 15px;

            &-congrats {
                padding-top: 30px;
                padding-bottom: 30px;
            }
            &-no-congrats {
                padding-top: 30px;
                padding-bottom: 30px;
            }
        }   
    }

    &__answers {
        &-multiple-list {
            list-style: none;
            padding: 0;

            .answer {
                width: 90%;
                padding: 1.5em 0.3em 1.3em;
                margin: 4% auto 0;
                color: white;
                background-color: $dark-red;
                border-style: none;
                border-radius: 11px;
                font-weight: bold;
                border: 2px solid transparent;
                cursor: pointer;
                transition: .3s ease-out;
            
                &:hover, &:focus, &:active {
                    background-color: white;
                    color: $dark-red;
                    border: 2px solid $dark-red;
                    transition: background-color .3s ease-out;
                    outline: none;
                }
  
                &--is-validated {
                    cursor: initial;
                     &:hover, &:focus, &:active {
                        background-color: $dark-red;
                        color: white;
                        border: 2px solid transparent;
                        transition: 0;
                        outline: none;
                    }
                }

                &--correct {
                    background-color: white !important;
                    border: 2px solid $correct-answer !important;
                    color:  $correct-answer !important;
                }

                 &--false {
                    background-color: white !important;
                    border: 2px solid$false-answer !important;
                    color: $false-answer !important;
                }
            }

            .multiple-bild {
                height: 200px;
                padding: 0;
                margin: 4% auto 0;
                border-style: none;
                background-color: none;
                outline: none;
                border-radius: 5px;
            }

            .selected {
                border: 2px solid $dark-red !important;
             }

            .answer-image {
                height: 100%;
                border-radius: 5px;
                cursor: pointer;

                &:hover, &:focus, &:active {
                    color: $dark-red;
                    border: 2px solid $dark-red;
                    outline: none;
                } 
            }
                
            .answer--image-is-validated {
                cursor: initial;
                    
                &:hover, &:focus, &:active {
                    color:  white !important;
                    border: inherit;
                    outline: none;
                }
            }
        }

        &-free-answer-input {
            width: 90%;
            min-height: 170px;
            border-radius: 10px;
            border: 3px solid $grey-background;
            resize: none;
            overflow: auto;
            outline: none;
            padding: 10px;


            &:hover, &:focus, &:active {
                border: 2px solid $dark-red; 
            }

            &--correct {
                border: 3px solid $correct-answer !important;
                background-color: white;
            }
        }

        &-free-answer-solution {
            text-align: left;
            font-style: italic;
            font-size: 14px;
            width: 90%;
            margin: 30px auto;
            line-height: 148%;
            
            &-heading {
                margin-top: 50px;
                font-style: italic;
                font-weight: bold;
            }
        }


        &-lueckentext{
            width: 90%;
            margin: 0 auto;
            text-align: justify;
            font-size: 17px;
            line-height: 260%;
            font-weight: bold;
            
            &-select{
                height: 30px;
                margin: 5px 0;
                border: 1px solid $dark-red;
                border-radius: 6px;
                outline-color: $dark-red;
                font-weight: bold;
                font-family: Lato, sans-serif;
                font-size: 17px;
            }
            &-text-luecke {
                display: inline;
               
                .dropdown {
                    width: 200px !important;
                    display: inline-block !important;
                    height: 100% !important;
                } 
                .answer--correct {
                     border: 2px solid $correct-answer;
                     color: $correct-answer;
                }
                 .answer--false {
                    border:  2px solid $false-answer;
                    opacity: 1;
                    color: $false-answer !important;
                }
                    
            }
        }

        &-connection-quiz {
            width: 80%;
            margin: 0 auto;

            .expression {
                font-weight: bold;
                 margin-bottom: 0px;
            }

            .descriptions {
                width: 100%;
                margin: 0 auto;
                background-color: $dark-red;
                color: white;
                margin-bottom: 20px;
                padding: 10px 15px;
                font-weight: bold;
                font-size: 12px;
                border-radius: 6px;
                min-height: 50px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .drop-area {
                width: 100%;
                margin: 0 auto;
                background-color: white;
                // border: 1px solid $dark-red;
                border-radius: 6px;
                min-height: 40px;
                margin-bottom: 20px;
                margin-top: 10px;
                // padding: 10px 15px;
            }
            .answer--correct {
                border: 2px solid $correct-answer;
                color: $correct-answer;
                padding: 10px 15px;
                font-size: 12px;
                font-weight: bold;

            }

            .answer--false {
                border: 2px solid $false-answer;
                color: $false-answer;
                padding: 10px 15px;
                font-size: 12px;
                font-weight: bold;
            }
        }
       
    }

    &__question-count {
        margin-top: 55px;
        margin-bottom: 4px;
    }

    &__button {
        font-size: 16px;
        font-weight: bold;
        color: $dark-red;
        border: 2px solid $dark-red;
        border-radius: 11px;
        padding: 8px 23px 6px;
        margin-top: 25px;
        cursor: pointer;
        background-color: rgba(0,0,0,0);
        transition: background-color .2s ease-out;

        &:hover, &:focus, &:active {
            background-color: white;
            border: 2px solid $dark-red;
            transition: background-color .2s ease-out;
            outline: none;
        }
    }

    &__finished-text {
        font-weight: bold;
        font-size: 18px;
        margin: 0 auto;
        margin-top: 240px;
        width: 80%;
        line-height: 160%;
        
        &--share {
            font-style: italic;
            font-weight: bold;
            margin-top: 60px;
        }
    }
    &__icon {
        color: black;
        font-size: 3em;
        margin: 30px 0.3em;
    }

    &__link-text {
        margin-top: 40px;

        &--try-again {
            font-weight: bold;
            margin-top: 60px;
            margin-bottom: 70px;
        }
    }

    .router-link-active{
       color: black;
    }

    &__finished-try-again {
        border-style: none;
        cursor: pointer;
        text-decoration: underline;
        background-color:rgba(196,196,196,0);
        font-weight: bold;
        margin-top: 50px;
        margin-bottom: 40px;
        font-size: 16px;
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
            position: relative;
            left: 0;

            &-hidden{
                display: none;
            }
            
            &-explanation {
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

            &-multiple-list {

                .answer {
                    width: 90%;
                    padding: 1em 0.3em 0.9em;
                    font-size: 12px;
                }
            }

            &-free-answer-solution {
                font-size: 12px;

                &-heading {
                    margin-top: 30px;
                    font-style: italic;
                    font-weight: bold;
                    font-size: 13px;
                }
            }
        }

        &__button {
            font-size: 14px;
            margin-top: 10px;
        }

         &__question-count {
             font-size: 14px;
             margin-top: 40px;
         }

    &__finished-text {
        margin-top: 50px;
        }
    }
}
</style>

