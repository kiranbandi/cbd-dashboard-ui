# CBD Dashboard UI

A react web application built on MERN Stack (MongoDB , Express , React and Node.JS) for visualizing data compiled from assessments by physician observers to enhance the Competency-Based medical Education model.

This is the repository for the front-end code,the corresponding backend-code is available here:
https://github.com/kiranbandi/cbd-dashboard-server

**WARNING**: This is a work in progress in its pre-alpha state. It is completely functional, so feel free to fork it and try it out but expect changes that break your code in future versions.

## WEB Demo

The current version of the CBD Dashboard is live at :  
https://cbme.usask.ca

### Issues,Bugs and Feature Requests
If something doesnt work or you have noticed a bug please create an issue using the template provided
alternatively you can also drop a mail to the developer contact address below.

Since this project is supported by funding from the University of Saskatchewan we wont be
able to support major Feature Requests unless they come through the official channels 
but if there is something tiny that you might want the tool to have please drop a mail to
the contact address below. 

Also the current development history of the tool including new features that we are working on 
can be seen here - https://trello.com/b/SuLCQr1u/cbd-design-board

## Contact 
This project is sponsored by the Emergency Department at University of Saskatchewan.

For bugs, feature requests -
Drop a mail to the developer at venkat.bandi@usask.ca or bvenkatkiran@gmail.com

To get a demo of the tool - 
Drop a mail to the project lead Dr.Brent Thoma - brent.thoma@usask.ca

## Architecture 

Please read the design document and the site map provided below, to get an understanding of the base architecture of the project.

https://github.com/kiranbandi/cbd-dashboard-ui/blob/master/cbd_sitemap.png

https://github.com/kiranbandi/cbd-dashboard-ui/blob/master/design_document.pdf


## Features

### Resident Dashboard
 - base EPA acquisition metrics 
 - Rotation schendule of a resident 
 - Recent EPAs that have been completed in the last month
 - A complete chart with EPAs scores corresponding to each Learning Stage
 - History of Expired EPAs if any
 - Percentage completed in each Learning stage (Transition to Discipline,Foundation,Core,Transiton to Practice)

### Faculty Development Dashboard
 - base EPA observation metrics ,Number observed
 - Average EPA score and Dove Factor (Probablity of being generous in awarding higher scores)
 - Table of all EPA observtions filterable and sortable on the basis of Rating, Feedback Given or    Observation Date

### Export Data
 - Ability to export all the results in an CSV file for further research and analysis.

### Program Evaluation 
 - EPA Split Distribtuon for each learning stage.
 - EPA Monthly Distrubtion Curve 

### Tools
 - File processor to parse and export the difficult to analyze Royal college of medicine Export file.
 - Visualize the data on the file.


## Core Dependencies
 - React 
 - Redux 
 - Axios
 - React-Router
 - [xlsx](https://www.npmjs.com/package/xlsx)

## Development
This project is a mix of both React and D3 with D3 handling creation of visual components 
and React handling the actual rendering.
Redux is used for managing the data store and styling is done through SaSS.

### Webpack bundles
Install webpack and some plugins and loaders,
```bash
$ npm install
```
Webpack config can be found in `build-config\webpack.config.js`.
Watch for changes and compile bundle if found,
```bash
$ npm run start
```
Generate minified production files,
```bash
$ npm run build
```
