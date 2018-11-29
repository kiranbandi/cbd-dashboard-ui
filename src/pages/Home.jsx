import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <div>

        <div className="home-header">
          <div className="container">
            <div className='col-lg-12 text-lg-left text-md-center text-sm-center text-xs-center'><h1>EM-CBD Dashboard</h1>
              <p>A Dashboard Designed for Competency Committees in Emergency Medicine to Optimize Decision Making on Resident Progression.</p>
            </div>
          </div>
        </div>

        <div className="container home-body">
          <h1> What is this ?</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, eaque placeat. Veritatis, alias quaerat eos, sint quisquam facere, velit cupiditate culpa dignissimos ipsam perferendis doloremque esse. Ad fugiat sunt, voluptatem accusamus laboriosam perspiciatis ullam repudiandae, qui vero doloribus accusantium quibusdam alias consequuntur magnam corporis harum laudantium ab deleniti error nihil! </p>
        </div>
      </div>

    )
  }
};

export default Home;


