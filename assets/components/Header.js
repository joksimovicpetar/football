import React from 'react';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';

import '../styles/app.css';
export default class Header extends React.Component {
  renderUser() {
    const { userData, logout } = this.props;

    if (null === userData) {
      return (<div className="spinner-border text-dark"></div>)
    }

    return (
      <li className="nav-link">{userData.email}<button className="btn btn-default " href="#" onClick={logout}>Logout
      </button> 
      </li>)
  }
  render() {
    const { isAuthenticated } = this.props;
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-3">
        <div className="container">
          <a href="/" className="navbar-brand">Fudbal</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
            <span className="navbar-toggle-icon"></span>
          </button>


          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav ml-auto">
              {/* <li className="nav-item">
                <a href="/" className="nav-link">Home</a>
              </li> */}
              {isAuthenticated ? this.renderUser() : <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Sign In
                </Link>
              </li>}
              {isAuthenticated && <li className="nav-item">
                <Link to="/blog-post-form" className="nav-link">
                  Add New
                </Link>
              </li>}
              <li className="nav-item">
                <a href="/players" className="nav-link">Players</a>
              </li>
              <li className="nav-item">
                <a href="/clubs" className="nav-link">Clubs</a>
              </li>
              <li className="nav-item">
              <a href="/games" className="nav-link">Games</a>
              </li>
              <li className="nav-item">
                <a href="/competitions" className="nav-link">Competitions</a>
              </li>
              <li className="nav-item">
                <a href="/performances" className="nav-link">Performances</a>
              </li>
              <li className="nav-item">
                <a href="/footballapi" className="nav-link">Champions League Matches</a>
              </li>
            </ul>
          </div>
          
        </div>
      </nav>






    )
  }
}