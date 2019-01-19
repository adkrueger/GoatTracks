import React, {PropTypes, Component} from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { Link } from "react-router-dom";

import {greatPlaceStyle} from './my_great_place_styles.js';

export default class Annotation extends Component {
  static propTypes = {
    text: ""
  };

  static defaultProps = {};

  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    return (
       <div style={greatPlaceStyle}>
          <Link className="labelHall" to={{pathname: '/location/' + this.props.text}}>{this.props.text}</Link>
       </div>
    ); 
  }
}