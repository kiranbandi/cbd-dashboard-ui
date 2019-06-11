import React, { Component } from 'react';
//  Image url handling is convoluted in scss , much easier to set inline and get images from root
let backgroundStyle = { background: 'url(assets/img/background.png)' };
import YouTube from 'react-youtube';

class Home extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    //200px to offset the margin on both sides and vertical scroll bar width
    let widthOfPage = document.body.getBoundingClientRect().width;

    if (widthOfPage > 1170) {
      widthOfPage = 1000
    }
    else if (widthOfPage < 700) {
      widthOfPage = 0.90 * widthOfPage;
    }
    else {
      widthOfPage = 0.75 * widthOfPage;
    }


    return (
      <div>

        <div className="home-header" style={backgroundStyle}>
          <div className="container">
            <div className='col-lg-12 text-lg-left text-md-center text-sm-center text-xs-center'><h1>The CBD Dashboard Project</h1>
              <p>Designing Dashboards to Enhance Resident Learning, Facilitate Competency Committee Decision Making, Support Faculty Development, Enable Program Evaluation, and Foster Educational Research</p>
            </div>
          </div>
        </div>

        <div className="container home-body">
          <h1> What is this ?</h1>
          <p>These dashboards have been developed as part of a research project to determine the essential elements for presenting Competency-Based Medical Education dashboards. They display data from Competency By Design<a href="http://www.royalcollege.ca/rcsite/cbd/competence-by-design-cbd-e">(CBD)</a> assessment systems in intuitive ways that support the needs of learners, teachers, and program administrators.</p>
          <h1> Where is the data coming from ?</h1>
          <p>The data displayed on the dashboard has been compiled from assessment forms filled by physician observers based upon observations of EPAs(Entrustable Professional Activities) that are characteristic of each learners stage of training and discipline.</p>

          <h1> Resident Dashboard Demonstration</h1>
          <YouTube
            containerClassName='youtube-container'
            videoId="hACPB0YyOyA"
            opts={{ width: widthOfPage, height: widthOfPage / 2 }} />


        </div>

      </div>

    )
  }
};

export default Home;


