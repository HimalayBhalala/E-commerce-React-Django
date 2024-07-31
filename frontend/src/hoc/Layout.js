import React,{useEffect} from 'react';
import Navbar from '../componenets/Navbar';
import { checkAuthenticated } from '../actions/auth';
import { connect } from 'react-redux';

const Layout = (props) => {

  useEffect (() => {
    checkAuthenticated();
  },[checkAuthenticated])

  return (
    <div>
        <Navbar />
        {props.children}
    </div>
  )
};

export default connect(null,checkAuthenticated())(Layout);

 