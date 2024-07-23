import React,{useEffect} from 'react';
import Navbar from '../componenets/Navbar';
import { connect } from 'react-redux';
import {CheckAuthenticated} from '../actions/auth';

const Layout = (props) => {
  const {CheckAuthenticated} = props;

  useEffect(() => {
    CheckAuthenticated();
  },[CheckAuthenticated]);

  return (
    <div>
        <Navbar />
        {props.children}
    </div>
  )
};

export default connect(null,{CheckAuthenticated})(Layout);

 