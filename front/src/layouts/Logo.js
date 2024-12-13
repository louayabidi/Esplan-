import React from 'react';
import { ReactComponent as LogoDark } from '../assets/images/logos/logo.svg';
import { Link } from 'react-router-dom';
import './logo.css';

const Logo = () => {
  return (
    <Link to="/">
      <LogoDark className="logo" />
    </Link>
  );
};

export default Logo;
