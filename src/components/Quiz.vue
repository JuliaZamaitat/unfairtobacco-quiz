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
    <p v-if="this.isValidated && !this.quizType === 'free_answer'" class="quiz quiz__question-explanation" v-html="solutionText"></p> <!--TODO: Positive/negative Anwort-->
    <p v-if="this.isValidated && this.quizType === 'free_answer'" class="quiz quiz__question-explanation">Deine Antwort</p>

    

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
                    <!-- TODO Antworten aus Bildern bestehend -->
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
            <p v-if="this.isValidated" v-html="solutionText" class="quiz quiz__answers-free-answer-solution"></p>
        </div>



    <!-- FOOTER -->
        <p v-if="!this.answerSelected && !this.isValidated" class="quiz quiz__question-count">Frage {{ currentQuestionIndex + 1 }} von {{ questionCount }}</p>
        <button v-if="this.answerSelected && !this.isValidated" v-on:click="validateAnswers()" class="quiz quiz__button">Auflösung</button>
        <button v-if="this.isValidated && !this.quizFinished" v-on:click="getNextQuestion()" class="quiz quiz__button">Weiter</button>



      </div>    

  </div>
</template>

<script>
export default {
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
            freeAnswer: null
        }
    },
    created() {
        this.questionCount = this.quiz.length
    },

    methods: {
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
                    if (this.isCorrect(this.answerSelected)) this.correctAnswersCount += 1
                    break
                // case "lueckentext":
                //     return this.quiz[this.currentQuestionIndex].quiz_frage
                case "free_answer":
                   this.correctAnswersCount += 1
                   break
                // case "connection_quiz":
                //     return this.quiz[this.currentQuestionIndex].connection_question
                // default:
                //    return ""  
            }

            console.log(this.correctAnswersCount)
        },
        isCorrect(answer) {
             switch (this.quizType) {
                case "multiple_choice": 
                    return answer.multiple_truth ||  answer.multiple_truth_image
                   
                // case "lueckentext":
                //     return this.quiz[this.currentQuestionIndex].quiz_frage
                // case "free_answer":
                //     return this.quiz[this.currentQuestionIndex].free_question
                // case "connection_quiz":
                //     return this.quiz[this.currentQuestionIndex].connection_question
                default:
                   return false  
            }
        },

        getNextQuestion() {
            this.currentQuestionIndex += 1
            this.isValidated = false
            this.freeAnswer = null

            this.answerSelected = null
            if (this.currentQuestionIndex === this.questionCount) {
                this.quizFinished = true
                // calculating number of not correctly answered questions, used for displaying flowers correctly in evaluation
            }
      },
    
    
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

        solutionText() {
             switch (this.quizType) {
                 case "multiple_choice": 
                    return this.quiz[this.currentQuestionIndex].multiple_aufloesung
                case "lueckentext":
                    return this.quiz[this.currentQuestionIndex].lueckentext_aufloesung
                case "free_answer":
                    return this.quiz[this.currentQuestionIndex].free_aufloesung
                case "connection_quiz":
                    return this.quiz[this.currentQuestionIndex].connection_aufloesung
                default:
                   return ""  
            }
        }
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

