import React from 'react';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';
export default class Header extends React.Component {
  renderUser() {
    const {userData} = this.props;

    if(null === userData) {
      return (<div className="spinner-border text-dark"></div>)
    }

    return (<li className="nav-item">Hello {userData.email}</li>)
  }
    render() {
      const {isAuthenticated} = this.props;
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-3">
<div className="container">
  <a href="/" className="navbar-brand">Fudbal</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
    <span className="navbar-toggle-icon"></span>
  </button>
  

  <div className="collapse navbar-collapse" id="mobile-nav">
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <a href="/" className="nav-link">Home</a>
      </li>
      {isAuthenticated ? this.renderUser():<li className="nav-item">
      <Link to = "/login" className="nav-link">
                    Sign In
                </Link>
      </li> }
      
      <li className="nav-item">
        <a href="/player" className="nav-link">Players</a>
      </li>
      <li className="nav-item">
        <a href="/club" className="nav-link">Clubs</a>
      </li>
      <li className="nav-item">
        <a href="/game" className="nav-link">Games</a>
      </li>
      <li className="nav-item">
        <a href="/competition" className="nav-link">Competitions</a>
      </li>
    </ul>
  </div>
  
</div>
</nav>
            



                
          
        )
    }
}