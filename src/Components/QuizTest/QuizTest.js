import { Component } from 'react';
import './QuizTest.css';
// import questionJson from "./questions.json";

class QuizTest extends Component {
    selectedAnswers = [];
    constructor(props) {
        super(props);
        this.state = {
            currentQuestion: 0,
            questionJson:''
        }
    }

    componentDidMount() {
        console.log(this.props.testInfo)
        fetch(`https://quizapi.io/api/v1/questions?apiKey=${process.env.REACT_APP_QUIZ_API_KEY}&category=` + this.props.testInfo.subject + "&difficulty=" + this.props.testInfo.level + "&limit=10").then(response => response.json()).then(data => this.setState({ questionJson: data }))
    }


    selectAnswer = (value) => {
        this.selectedAnswers.push(value)
        if (this.state.currentQuestion < this.state.questionJson.length - 1) {
            this.setState({ currentQuestion: this.state.currentQuestion + 1 })
        }
        else {
            this.submitTest(this.selectedAnswers);
        }

    }


    submitTest = (selectedAnswers) => {
        
        let correctAnswers = [];
        correctAnswers = this.state.questionJson.map(questionObject => {
            if (questionObject.correct_answer === null) {
                return questionObject.answers.answer_a
            }
            else {
                return questionObject.answers[questionObject.correct_answer]
            }
        })

        let scoreTemp = 0;
        for (let i = 0; i < correctAnswers.length; i++) {
            if (correctAnswers[i] === selectedAnswers[i]) {
                scoreTemp++;
            }
        }

        let percentage = (scoreTemp / this.state.questionJson.length) * 100;


        this.props.goToResult(percentage)

    }



    render() {
        if (this.state.questionJson.length === 0) {
            return <div className="quizContainer"><h1>Loading...</h1></div>
        }
        else if( this.state.questionJson.error ==="No questions found"){
           return <div>OUCH !! No test available for your selection. Your can try our other tests.  <p style={{color:"blue",size:"20px"}}onClick={() =>this.props.onRouteChange('home')}> Click here to go to other tests</p></div>;
        }
        else {
            const { currentQuestion } = this.state;
            const values = Object.values(this.state.questionJson[currentQuestion].answers)
            return (
                <div className="quizContainer">
                    <div className="quizDiv">
                        <h1>{currentQuestion + 1 + ". " + this.state.questionJson[currentQuestion].question}</h1>
                        <div className="answerOptionDiv">
                            {
                                values.map(value => (value == null) ? console.log() : <div key={value} className="optionDiv"><button onClick={() => this.selectAnswer(value)}>{value}</button><br /></div>)
                            }
                        </div>
                    </div>
                </div>
            );
        }
    }

}

export default QuizTest;