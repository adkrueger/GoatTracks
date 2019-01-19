import React, { Component } from 'react';

class Events extends Component {
    render() {
      return (
      <div className="mainContent">
          <div className="row">
            <div className="col-sm-1"></div>
            <div className="col-sm-10">
            
              <br></br>
              <h2>{this.props.match.params.topic}</h2>
              <p>Duis a turpis sed lacus dapibus elementum sed eu lectus.</p>
                          
            </div>
            <div className="col-sm-1"></div>
          </div>
            
      </div>
      );
    }
}

export default Events;