import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// components
import Credits from './Credits';

// styles
import '../styles/Home.css';

// images
import screenshot from '../assets/screenshot1.png';
import screenshotMobile from '../assets/screenshot-mobile.png';

// Firebase
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

export default function Home(props) {

  // set the page title
  useEffect(() => {
    document.title = `Ultimate Stats - ${props.title}`
  }, [props.title])

  let user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className={`App home-main`}>
      <>
        {user &&
          <>
            <div className='home-btn-group'>
              <Link
                className='btn btn-primary'
                to='/teams'>My Teams
                                  </Link>
              <Link
                className='btn btn-primary'
                to='/games'>My Games
                                  </Link>
              {(!localStorage.getItem('currentGame') || localStorage.getItem('currentGame') === 'null') &&
                <Link
                  className='btn btn-green'
                  to='/newgame'
                >Start New Game</Link>
              }
            </div>
            <Credits />
          </>
        }
        {!user &&
          <div className='home-no-login'>
            <div id='home-info'>
              <div>
                <p className='home-primary'>Statistics for Ultimate games. </p>
                <p className='text-dark-med home-secondary'>Ultimate Stats is a mobile friendly web app that lets you
                                    quickly and easily track statistics during Ultimate games.</p>
              </div>
              <div id="login-form" className="login-form">
                <StyledFirebaseAuth uiConfig={props.uiConfig} firebaseAuth={props.firebaseApp.auth()} />
              </div>
              <Credits />
            </div>
            <div className='card home-screenshot-card'>
              {props.isMobile ?
                <img id='home-screenshot' className='scaled-img' src={screenshotMobile} alt="Home Screenshot" />
                :
                <img id='home-screenshot' className='scaled-img' src={screenshot} alt="Home Screenshot" />}
            </div>
          </div>
        }
      </>
    </div>
  )
}
