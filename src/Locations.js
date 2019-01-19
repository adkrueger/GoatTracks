import React, { Component } from 'react';

class Locations extends Component {
    render() {
      return (
      <div className="mainContent">
          <div className="row">
            <div className="col-sm-1"></div>
            <div className="col-sm-10">
            
              <br></br>
              <h2>{this.props.match.params.name}</h2>
              <p>
              <img src="https://geo0.ggpht.com/cbk?panoid=LggpA-Onxp8Ny4zM2vfX9A&output=thumbnail&cb_client=search.TACTILE.gps&thumb=2&w=408&h=200&yaw=158.89134&pitch=0&thumbfov=100"/>
              </p>
                          
            </div>
            <div className="col-sm-1"></div>
          </div> 
            
      </div>
      );
    }
}

export default Locations;