import React, {Component, Fragment} from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/auth';
import { HashRouter as  Redirect } from 'react-router-dom';
import Login from "../accounts/Login";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import  HomePage from '../home/Home'




export class Header extends Component {
  static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired,
      };

      state = {
        modal: false
    };

      toggle = () => {
        this.setState(previous => ({
            modal: !previous.modal
        }))
    };

    render(){
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <span className="navbar-text mr-3">
              <strong>{user ? `Welcome ${user.username}` : ''}</strong>
            </span>
            <li className="nav-item">
              <button onClick={this.props.logout} className="nav-link btn btn-info btn-sm text-light">
                Logout
              </button>
            </li>
          </ul>
        );

        const guestLinks = (
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <li className="nav-item">
                <Link to="/login/" className="nav-link">Login</Link>
            </li>
          </ul>
        );

        return(
            <Fragment>
            <div className="site-banner">
              <h1> Fox's Forestry </h1>
            </div>
            <nav className="navbar navbar-expand-lg" style={{ display:"inline-block", paddingTop: "10vh", left:"50%", transform: "translate(-30%, -20%)"}}>

              <button className="navbar-toggler navbar-dark" style={{background:"#333", float:"left"}} type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarColor02">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                    <Link to="/home/" className="nav-link">Home</Link>
                  </li>
                  <li className="nav-item active">
                    <Link to="/gallery/" className="nav-link">Gallery</Link>
                  </li>
                  <li className="nav-item">
                    {isAuthenticated ? authLinks : guestLinks}
                  </li>
                </ul>
              </div>
            </nav>
            </Fragment>
        )
    }
}


const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Header);
