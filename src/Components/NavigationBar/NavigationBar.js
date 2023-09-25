import logo from './logo2.png';
import './NavigationBar.css';
import { useState } from 'react';

const NavigationBar = ({ onRouteChange, isSignedIn,loadReports}) => {
    const [navbar, setnavbar] = useState(false)

    const enableStickyNavBar = () => {
        if(window.scrollY>=70){
            setnavbar(true)
        }
        else{
            setnavbar(false)
        }
    }
    
    window.addEventListener('scroll', enableStickyNavBar)

    if (isSignedIn) {
        return (
            <div className={navbar?"navigationbarDiv active":"navigationbarDiv"}>
                <img src={logo} alt="logo" width="80px" height="60px" />
                <h3 onClick={() => onRouteChange('home')}>Home</h3>
                <h3 onClick={loadReports}>My Reports</h3>
                <h3 onClick={() => onRouteChange('signin')}>Sign Out</h3>
            </div>
        );
    }
    else {
        return (
            <div className={navbar?"navigationbarDiv active":"navigationbarDiv"}>
                <img src={logo} alt="logo" width="80px" height="60px" />
                <h3 onClick={() => onRouteChange('signin')}>Sign in</h3>
                <h3 onClick={() => {
                    console.log('clicked here')
                    onRouteChange('register')
                    }}>Register</h3>
            </div>
        );
    }

}

export default NavigationBar;