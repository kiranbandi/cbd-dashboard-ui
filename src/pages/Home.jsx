import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <div>

        <div className="home-header">
          <div className="container">
            <div className='col-lg-12 text-lg-left text-md-center text-sm-center text-xs-center'><h1>SynVisio</h1>
              <p>An Interactive Multiscale Synteny Visualization Tool for <a href="http://chibba.pgml.uga.edu/mcscan2/">McScanX</a>.</p>
            </div>
          </div>
        </div>

        <div className="container home-body">
          <h1>How does it work ?</h1>
          <p>SynVisio lets you explore the results of <a href='http://chibba.pgml.uga.edu/mcscan2/'>McScanX</a> a popular synteny and collinearity detection toolkit. </p>
          <p>SynVisio requires two files to run:</p>

          <h1>What Next ?</h1>
          <p>We are working on adding several new features to this tool.The current development progress is documented <a href="https://trello.com/b/ag1Upk33/mcscanx-synteny-visualizer">here</a>.We have loaded up several sample files below that you can play around with :</p>

        </div>
      </div>

    )
  }
};

export default Home;


