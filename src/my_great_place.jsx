import React, {PropTypes, Component} from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { Link } from "react-router-dom";

import {greatPlaceStyle} from './my_great_place_styles.js';

export default class Annotation extends Component {

  constructor() {
      super();
      this.annoAction = this.annoAction.bind(this);

  }    

  static propTypes = {
    text: ""
  };
  state = {
    showResults: false,
  };

  annoAction(index, e, post) {  

    post.showing = !post.showing

    console.log("hi");
  }

  static defaultProps = {};

  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    return (
       <div style={greatPlaceStyle} background-image={this.props.tyProImg}>
          <div>
          <Link className="labelHall" to={{pathname: '/location/' + this.props.text}}>

            <i className="material-icons sideButton">{this.props.tyImg}</i>
            </Link>

          </div>
          { this.state.showResults ? 
          
                <div className="hoverDialog">
                    <Link className="labelHall" to={{pathname: '/location/' + this.props.text}}>
                        <div className="profileImage"><img src={this.props.tyProImg}></img></div>
                        <h3 className="placeName">{this.props.text}</h3>
                    </Link>
                </div>
          : 
          
              <div></div>
          
          }

 
       </div>
    ); 
  }
}