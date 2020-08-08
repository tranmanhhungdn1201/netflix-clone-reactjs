import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import logo from '../../assets/netflix.png';
import avatar from '../../assets/avatar.jpg';
import './Nav.scss';

Nav.propTypes = {
    
};

function Nav(props) {
    const [show, handleShow] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if ( window.scrollY > 100) {
                handleShow(true);
            } else {
                handleShow(false);
            }
        });
        return () => {
            window.removeEventListener('scroll');
        };
    }, []);

    return (
        <div className={`nav ${show && 'nav__blank'}`}>
            <img className="nav__logo" src={logo} alt="logo" />
            <img className="nav__avatar" src={avatar} alt="avatar" />
        </div>
    );
}

export default Nav;