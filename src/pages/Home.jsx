import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <div>

        <div className="home-header">
          <div className="container">
            <div className='col-lg-12 text-lg-left text-md-center text-sm-center text-xs-center'><h1>EM-CBD Dashboard</h1>
              <p>A Dashboard Designed for Competency Committees to Optimize Decision Making.</p>
            </div>
          </div>
        </div>

        <div className="container home-body">
          <h1> What is this ?</h1>
          <p>This dashboard has been designed and developed as part of a research project to determine the essential elements of <a href="http://www.royalcollege.ca/rcsite/cbd/competence-by-design-cbd-e">CBD</a>(Competence By Design) dashbaords for competency committees in Emergency Medicine.The dashboards are primarily used for analysing resident progression.Competency Commitees often have to process huge amounts of assessment information that they receive under CBD and a dashboard that consolidates this data visually is an effective solution to this problem.</p>
        </div>
      </div>

    )
  }
};

export default Home;


