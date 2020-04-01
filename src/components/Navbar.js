import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import logo from '../logo.svg';
import styled from 'styled-components';
import {ButtonContainer} from './Button';
import Sign_in from './SignInScreen'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyA8mLNugplWZFXG1mTSe9kv4YXTpsaPk4I',
  authDomain: 'fir-auth-f5663.firebaseapp.com',
  // ...
};


export default class Navbar extends Component {
  // The component's Local state.
  state = {
    isSignedIn: false // Local signed-in state.
  };

  
 
  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }
  };
 
  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
        (user) => this.setState({isSignedIn: !!user})
    );
  }
  
  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }
  
  render() {
    var profile  = "profile";
      if(this.state.isSignedIn){
        profile = firebase.auth().currentUser.displayName;
      }
    return (
      <NavWrapper className = "navbar navbar-expand-sm navbar-dark px-sm-5">
        {/* https://www.iconfinder.com/icons/1243689/call_phone_icon Creative Commons (Attribution 3.0 Unported);
           https://www.iconfinder.com/Makoto_msk */}
        <Link to='/'>
          <img src={logo} alt="store" className="navbar-brand"/>
        </Link>
        <ul className="navbar-nav align-items-center">
          <li className="nav-item ml-5">
            <Link to="/" className="nav-link">
              girls Kurtis
            </Link>
            
          </li>
        </ul>
        <Link to='/cart' className="ml-auto">
        <ButtonContainer>
          <span className="mr-2">
          <i className="fas fa-cart-plus" />
          </span>
          
          my cart
        </ButtonContainer>
        </Link>   
        <span className="nav-link"> {profile} </span>

        <Link to='/signin' >
        <ButtonContainer>
          <span className="mr-2">
          <i className="fas fa-sign-in" />
          </span>
          signin
        </ButtonContainer>
        </Link> 
        
        
        <ButtonContainer onClick={() => firebase.auth().signOut()}>
          <span className="mr-2">
          <i className="fas fa-sign-in" />
          </span>
          signout
        </ButtonContainer>
        
       
      </NavWrapper>
    );
  }
}

const NavWrapper = styled.nav`
background: var(--mainBlue);
.nav-link{
  color:var(--mainWhite)!important;
  font-size:1.3rem;
  text-transform:capitalize;
}
`