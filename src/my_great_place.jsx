import React, {PropTypes, Component} from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { Link } from "react-router-dom";

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
       <div className={"waypoint"} background-image={this.props.tyProImg}>
 
          <div>

          <Link  to={{pathname: '/location/' + this.props.text}}>

            <i className="material-icons sideButton">{this.props.tyImg}</i>
            </Link>
            <div className="imageDiaOne">
             <img src={this.props.tyProImg}></img>
             <div className="overlayIm"></div>
             <i className="material-icons centerIconGrad">{this.props.tyImg}</i>
             

             <div class="overlay">
                <div className="hoverDialog">
                    <Link className="labelHall" to={{pathname: '/location/' + this.props.text}}>
                        <div className="profileImage"><img src={this.props.tyProImg}></img></div>
                        <h3 className="placeName">{this.props.text}</h3>
                    </Link>
                </div>
            </div>
            </div>


            <div className="imageDia">
             <img src={this.props.tyProImg}></img>
            </div>

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