import './App.css';
import NavigationBar from './Components/NavigationBar/NavigationBar';
import Footer from './Components/Footer/Footer';
import QuizTest from "./Components/QuizTest/QuizTest";
import SignIn from "./Components/SignIn/SignIn";
import Register from "./Components/Register/Register"
import Report from './Components/Report/Report';
import { Component } from 'react';
import Subject from './Components/Subject/Subject';
import MyReports from './Components/MyReports/MyReports';
import { connectToServer } from './utils/allActions';
import ConnectToServer from './Components/ConnectToServer/ConnectToServer';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

class App extends Component {
  constructor() {
    super();
    this.state = {
      route: 'signin',
      isSignedIn: false,
      testInfo: {
        subject: '',
        level: '',
      },
      score: 0,
      user: {
        id: '',
        name: '',
        email: '',
      },
      reports: [],
      isConnectedToServer :false,
    }
  }


  componentDidMount = async() =>{
    try{
      const response =  await connectToServer();
      if(response.status){
        this.setState({ isConnectedToServer: true })
      }
    }
    catch(err){
      console.log("Something went wrong")
    }
  }


  loadUser = (user) => {
    this.setState({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        token:user.token,
      }
    })
  }

  loadReports = () => {
    fetch(`${BACKEND_URL}/report/` + this.state.user.email)
      .then(response => response.json())
      .then(data => {
        this.setState({ reports: data })
        this.onRouteChange('myresult')
      })
      .catch(err => alert("Error fetching reports"))
  }

  componentDidUpdate = ()=>{
    console.log("statre",this.state)
  }
  

  onRouteChange = (route) => {
    if (route === 'home' || route === 'report') {
      this.setState({ isSignedIn: true })
    }
    else if (route === 'signin' || route === 'register') {
      this.setState({ isSignedIn: false })
    }

    this.setState({ route: route });
  }

  goToResult = (score) => {
    fetch(`${BACKEND_URL}/storereport`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subject: this.state.testInfo.subject,
        level: this.state.testInfo.level,
        status: (score > 50) ? "Passed" : "Failed",
        score: score,
        email: this.state.user.email
      })
    })
      .then(response => response.json())
      .then(console.log)
      .catch(err => console.log)

    this.setState({ score: score })
    this.onRouteChange('report')
  }


  setTestInfo = (testInfoReceived) => {
    this.setState(
      {
        testInfo: {
          subject: testInfoReceived.subject,
          level: testInfoReceived.level,
        }
      })
  }




  render() {
    return (
      <div className="App">
        {this.state.isConnectedToServer?
        <>
        <header>
          <NavigationBar onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} loadReports={this.loadReports} />
        </header>
        <section className="marginForNav">
          {this.state.route === 'home' ? <Subject onRouteChange={this.onRouteChange} setTestInfo={this.setTestInfo} />
            : this.state.route === 'signin' ? <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
              : this.state.route === 'register' ? <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
                : this.state.route === 'quizTest' ? <QuizTest goToResult={this.goToResult} testInfo={this.state.testInfo} onRouteChange={this.onRouteChange} />
                  : this.state.route === "myresult" ? <MyReports reports={this.state.reports} userInfo={this.state}/>
                    : <Report score={this.state.score} testInfo={this.state.testInfo} user={this.state.user} />}
        </section>
        <footer>
          <Footer />
        </footer>
        </>
        :
        <>
          <ConnectToServer/>
        </>
        }
      </div>
    );
  }
}

export default App;
