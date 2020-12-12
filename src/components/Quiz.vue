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

    <!-- Task for question -->   
    <p v-if="!this.isValidated" class="quiz quiz__question-explanation" v-html="currentTask"></p>
    <p v-if="this.isValidated" class="quiz quiz__question-explanation" v-html="solutionText()"></p> 

    

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
            <p v-if="this.isValidated" class="quiz quiz__answers-free-answer-solution-heading">Eine mögliche Antwort von uns</p>
            <p v-if="this.isValidated" v-html="this.ourAnswer" class="quiz quiz__answers-free-answer-solution"></p>
        </div>


        <!-- LUECKENTEXT -->
        <div v-if="quizType === 'lueckentext'" class="quiz quiz__answers-lueckentext">
            <p v-for="(textUndLuecke, index) in currentAnswers" class="quiz quiz__answers-lueckentext-text-luecke" :key="index">
            {{ textUndLuecke.luecke_text }} 
            <!-- NOT YET VALIDATED -->
            <select v-if="!isValidated" @change="setSelected($event.target.value)" class="quiz quiz__answers-lueckentext-select">
                <option hidden disabled selected value></option>
                 <option v-for="(tL, i) in currentAnswers" v-bind:value="[tL.luecke_luecke, textUndLuecke.luecke_luecke, index]" :key="i" >
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
                <div v-for="(liste) in draggableLists" :key="liste.id">
                    <div class="drop-area" :class="{'answer--correct': isValidated && isCorrect()}">
                        <draggable group="drop-quiz" :list="liste" :disabled="disable(liste)">
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
            <button v-if="currentAnswers.length === 0 && !this.isValidated" v-on:click="validateAnswers()" class="quiz quiz__button">Auflösung</button>
            </div>
           
            <div v-if="isValidated">
                <div v-for="(answer,index) in storedAnswers" :key="answer.id">
                    <div class="drop-area" :class="{'answer--correct': isValidated && isCorrect(index), 'answer--false': isValidated && !isCorrect(index)}">
                           {{ answer.connection_description }}      
                    </div>
                </div>
            </div>
        </div>


    <!-- FOOTER -->
        <p v-if="!this.answerSelected && !this.isValidated" class="quiz quiz__question-count">Frage {{ currentQuestionIndex + 1 }} von {{ questionCount }}</p>
        <button v-if="this.answerSelected && !this.isValidated" v-on:click="validateAnswers()" class="quiz quiz__button">Auflösung</button>
        <button v-if="this.isValidated && !this.quizFinished" v-on:click="getNextQuestion()" class="quiz quiz__button">Weiter</button>

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
        quiz: Array
    },

    data () {
        return {
            questionCount: null,
            correctAnswersCount: 0,
            quizFinished: false,
            currentQuestionIndex: 3,
            answerSelected: null,
            isValidated: false,
            freeAnswer: null,
            dropdownOptions: [],
            correctLuecke: [],
            correct: false,
            ourAnswer: null,
            draggableLists: [],
            storedAnswers: []
        }
    },
    watch: {
        currentQuestionIndex: function () {
            if (this.quizType === "lueckentext") {
                const luecken = []
                const lueckentext = this.quiz[this.currentQuestionIndex].lueckentext_text;
                for(var luecke in lueckentext){
                    luecken.push(lueckentext[luecke].luecke_luecke)
                }
             this.dropdownOptions = luecken
            }
            console.log(this.quizType)

            if(this.quizType ==="connection_quiz"){
                 const connectionPairs = this.quiz[this.currentQuestionIndex].connection_pair;
                 // eslint-disable-next-line no-unused-vars
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
        disable(value){
            if (value.length === 1) {
                return true
            }
        },
        toggleAnswer(answer) {
            if(answer === undefined && this.quizType === "free_answer" && this.freeAnswer?.length > 1) {
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

            switch (this.quizType) {
                case "multiple_choice": 
                    if (this.isCorrect(this.answerSelected)) {
                        this.correctAnswersCount += 1
                        this.correct = true
                    }
                    break
                case "lueckentext": {
                    let errorCount = 0
                    for(var element in this.correctLuecke){
                        if (this.correctLuecke[element]?.correct === false) errorCount += 1
                    }
                    if (errorCount === 0) {
                        this.correctAnswersCount +=1
                         this.correct = true
                    }
                    break
                }
                case "free_answer":
                    this.correctAnswersCount += 1
                    this.correct = true
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

            console.log(this.correctAnswersCount)
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
            if (this.currentQuestionIndex === this.questionCount) {
                this.quizFinished = true
                // calculating number of not correctly answered questions, used for displaying flowers correctly in evaluation
            }
        },
        setSelected(value) {
            const values = value.split(",")
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
        },
        solutionText() { 
            const question = this.quiz[this.currentQuestionIndex]
             switch (this.quizType) {
                 case "multiple_choice":
                   return this.correct ? question.multiple_aufloesung[0].positive_answer : question.multiple_aufloesung[0].negative_answer
                case "lueckentext":
                    return this.correct ? question.lueckentext_aufloesung[0].positive_answer : question.lueckentext_aufloesung[0].negative_answer
                case "free_answer":
                    this.ourAnswer = question.our_answer
                    return question.free_aufloesung[0].positive_answer
                case "connection_quiz":
                    return this.correct ? question.connection_aufloesung[0].positive_answer : question.connection_aufloesung[0].negative_answer
                default:
                   return ""  
            }
        }
    },
    computed: {
        quizType() {
            return this.quiz[this.currentQuestionIndex].acf_fc_layout
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
                case "lueckentext":
                    return this.quiz[this.currentQuestionIndex].lueckentext_text
                case "free_answer":
                    return this.quiz[this.currentQuestionIndex].free_aufloesung
                case "connection_quiz":
                    return this.quiz[this.currentQuestionIndex].connection_pair
                default:
                   return []  
            }
        },
        currentTask() {
            switch (this.quizType) {
                 case "multiple_choice": 
                    return "Wähle eine richtige Antwort aus!"
                case "lueckentext":
                    return "Wähle die passenden Begriffe aus!"
                case "free_answer":
                     return "Schreib hier deine Anwort!"
                case "connection_quiz":
                     return "Ordne die passenden Beschreibungen zu!"
                default:
                   return ""  
            }
        },
    }
}
</script>

<style lang="scss" scoped>



* {
 font-family: Lato, sans-serif;
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
        border-top: 3px solid rgb(143, 44,27);
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
    }

    &__question {
        background-color: rgb(143, 44,27);
        padding: 15px;
        border-radius: 9px; 

        &-explanation {
            font-style: italic;
            font-weight: bold;
            margin-top: 60px;
            margin-bottom: 30px;
           
            color: #000000;
        }

        p {
            color: white;
            text-align: left;
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
        &-multiple-list {
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
  
                &--is-validated {
                    cursor: initial;
                     &:hover, &:focus, &:active {
                        background-color: rgb(143, 44,27);
                        color: white;
                        border: 2px solid transparent;
                        transition: 0;
                        outline: none;
                    }
                }

                &--correct {
                    background-color: white !important;
                    border: 2px solid rgb(81, 214,35) !important;
                    color:  rgb(81, 214,35) !important;
                }

                 &--false {
                    background-color: white !important;
                    border: 2px solid rgb(214, 35,35) !important;
                    color:  rgb(214, 35,35) !important;
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
                border: 2px solid rgb(143, 44,27) !important;
             }

            .answer-image {
                height: 100%;
                border-radius: 5px;
                cursor: pointer;
                &:hover, &:focus, &:active {
                    color: rgb(143, 44,27);
                    border: 2px solid rgb(143, 44,27);
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
            border: 3px solid rgba(128,127,127,1);
            resize: none;
            overflow: auto;
            outline: none;
            padding: 10px;


            &:hover, &:focus, &:active {
                border: 2px solid rgb(143, 44,27); 
            }

            &--correct {
                border: 3px solid rgb(81, 214,35) !important;
                background-color: white;
            }
        }

        &-free-answer-solution {
            text-align: left;
            font-style: italic;
            font-weight: bold;
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
            line-height: 170%;
            font-weight: bold;
            
            &-select{
                height: 30px;
                margin: 5px 0;
                border: 1px solid rgb(143, 44,27);
                border-radius: 6px;
            }
            &-text-luecke {
                display: inline;
               
                .dropdown {
                    width: 200px !important;
                    display: inline-block !important;
                    height: 100% !important;

                } 
                .answer--correct {
                     border: 2px solid rgb(81, 214,35);
                     color: rgb(81, 214,35);
                }
                 .answer--false {
                    border:  2px solid rgb(214, 35,35);
                    opacity: 1;
                    color: rgb(214, 35,35) !important;
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
                width: 90%;
                margin: 0 auto;
                background-color: rgb(143, 44,27);
                color: white;
                margin: 20px;
                padding: 10px 15px;
                font-weight: bold;
                font-size: 12px;
                border-radius: 6px;
                min-height: 50px;
            }

            .drop-area {
                width: 90%;
                margin: 0 auto;
                background-color: white;
                border: 1px solid rgb(143, 44,27);
                border-radius: 6px;
                min-height: 40px;
                margin-bottom: 20px;
                margin-top: 10px;
                padding: 10px 15px;
            }
            .answer--correct {
                border: 2px solid rgb(81, 214,35);
                color: rgb(81, 214,35);
            }

            .answer--false {
                 border: 2px solid rgb(214, 35,35);
                color: rgb(214, 35,35);
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
    } 
}



</style>

