import React, { Component } from "react";
import * as d3 from "d3";

export default class UGNormativePanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stackByScore: true,
    };

    this.onClick = this.onClick.bind(this);
    this.toggleStackFlag = this.toggleStackFlag.bind(this);
  }

  toggleStackFlag(event) {
    this.setState({ stackByScore: event.target.checked });
  }

  onClick(event) {
    const nsid = event.target.id.slice(3).split("_").join(" ");
    this.props.onStudentSelect({ nsid });
  }

  render() {
    const { stackByScore } = this.state,
      {
        recordData = [],
        width,
        currentStudent = "",
        academicYear,
      } = this.props;

    let residentGroupedRecords = _.groupBy(recordData, (d) => d.nsid),
      // nsid , number of records , records in date period, name
      data = _.map(residentGroupedRecords, (d, key) => [
        key,
        d.length,
        0,
        d[0].name,
      ]);

    let height = 500,
      margin = 50,
      itemSize = data.length > 0 ? (width - margin) / data.length : 2,
      chartWidth = width;

    // if item size is too big set it to 50px
    if (itemSize > 50) {
      chartWidth = chartWidth / 2;
      itemSize = data.length > 0 ? (chartWidth - margin) / data.length : 2;
    }

    let dataMax = d3.max(data.map((d) => Math.max(d[1], d[2])));

    // set it to nearest multiple of 25
    dataMax = 25 * Math.ceil(dataMax / 25);

    // create the X and Y scales
    let scaleX = d3
        .scaleLinear()
        .range([margin, chartWidth - margin - 0.75 * itemSize])
        .domain([0, data.length - 1]),
      scaleY = d3
        .scaleLinear()
        .range([height - margin, margin])
        .domain([0, dataMax]);

    // sort the data list based on the overall value
    data = data.sort((a, b) => a[1] - b[1]);

    // create bars
    const bars = data.map((d, i) => {
      const records = _.groupBy(residentGroupedRecords[d[0]], (d) => d.rating);

      const scoreShare = _.map([1, 2, 3, 4, 5], (d) => {
        return records[d] ? records[d].length : 0;
      });

      const fivePointColorScale = [
        "#e15759",
        "#f28e2c",
        "#76b7b2",
        "#4e79a7",
        "#59a14f",
      ];

      if (stackByScore) {
        return [
          <rect
            x={scaleX(i)}
            y={scaleY(
              scoreShare[0] +
                scoreShare[1] +
                scoreShare[2] +
                scoreShare[3] +
                scoreShare[4]
            )}
            height={
              height -
              margin -
              scaleY(
                scoreShare[0] +
                  scoreShare[1] +
                  scoreShare[2] +
                  scoreShare[3] +
                  scoreShare[4]
              )
            }
            fill={d[0] == currentStudent ? "yellow" : fivePointColorScale[4]}
            width={itemSize - 0.25 * itemSize}
            stroke={"transparent"}
            key={d[0] + "-stack-1"}
            opacity={"0.50"}
          ></rect>,

          <rect
            x={scaleX(i)}
            y={scaleY(
              scoreShare[0] + scoreShare[1] + scoreShare[2] + scoreShare[3]
            )}
            height={
              height -
              margin -
              scaleY(
                scoreShare[0] + scoreShare[1] + scoreShare[2] + scoreShare[3]
              )
            }
            fill={d[0] == currentStudent ? "yellow" : fivePointColorScale[3]}
            width={itemSize - 0.25 * itemSize}
            stroke={"transparent"}
            key={d[0] + "-stack-2"}
            opacity={"0.50"}
          ></rect>,

          <rect
            x={scaleX(i)}
            y={scaleY(scoreShare[0] + scoreShare[1] + scoreShare[2])}
            height={
              height -
              margin -
              scaleY(scoreShare[0] + scoreShare[1] + scoreShare[2])
            }
            fill={d[0] == currentStudent ? "yellow" : fivePointColorScale[2]}
            width={itemSize - 0.25 * itemSize}
            stroke={"transparent"}
            key={d[0] + "-stack-3"}
            opacity={"0.50"}
          ></rect>,
          <rect
            x={scaleX(i)}
            y={scaleY(scoreShare[0] + scoreShare[1])}
            height={height - margin - scaleY(scoreShare[0] + scoreShare[1])}
            fill={d[0] == currentStudent ? "yellow" : fivePointColorScale[1]}
            width={itemSize - 0.25 * itemSize}
            stroke={"transparent"}
            key={d[0] + "-stack-4"}
            opacity={"0.50"}
          ></rect>,
          <rect
            x={scaleX(i)}
            y={scaleY(scoreShare[0])}
            height={height - margin - scaleY(scoreShare[0])}
            fill={d[0] == currentStudent ? "yellow" : fivePointColorScale[0]}
            width={itemSize - 0.25 * itemSize}
            stroke={"transparent"}
            key={d[0] + "-stack-5"}
            opacity={"0.50"}
          ></rect>,
        ];
      } else {
        return (
          <rect
            x={scaleX(i)}
            y={scaleY(d[1])}
            height={height - margin - scaleY(d[1])}
            fill={d[0] == currentStudent ? "yellow" : "#1ca8dd"}
            width={itemSize - 0.25 * itemSize}
            stroke={"transparent"}
            key={d[0] + "-stack-3"}
            opacity={"0.65"}
          ></rect>
        );
      }
    });

    // this fuctional automatically set the tick format based on the track type
    const axisTickTextsFormat = (d) => {
      return Math.round(d);
    };

    // create the 5 vertical tick lines
    let axisTickLines = _.times(5, (index) => {
      let verticalPosition = dataMax * (index / 4);
      return d3
        .line()
        .x((d) => d[0])
        .y((d) => scaleY(d[1]))([
        [margin, verticalPosition],
        [chartWidth - margin, verticalPosition],
      ]);
    });

    // The numbers of the Y axis ticks are created and format
    let axisTickTexts = _.map(axisTickLines, (unused, index) => {
      return (
        <text
          key={"axis-tick" + index}
          x={margin / 2}
          y={height - margin - index * ((height - 2 * margin) / 4)}
          fontWeight="bold"
          fill="#a9a1a1"
        >
          {" "}
          {axisTickTextsFormat(dataMax * (index / 4))}
        </text>
      );
    });

    const hoverLines = data.map((d, i) => {
      return (
        <rect
          className={"hoverable-rectangle"}
          id={"ug_" + d[0].split(" ").join("_")}
          x={scaleX(i)}
          y={margin}
          height={height - 2 * margin}
          fill={"black"}
          width={itemSize - 0.25 * itemSize}
          stroke={"transparent"}
          key={d[0]}
          onClick={this.onClick}
          opacity={0}
        >
          <title>{d[3] + "\nOverall: " + d[1]}</title>
        </rect>
      );
    });

    return (
      <div className="ug-normative-container">
        {/* <div className="checkbox custom-control text-center custom-checkbox">
                <label className='filter-label'>
                    {"Show Score Distribution"}
                    <input id='toggle-stack' type="checkbox"
                        checked={stackByScore} onChange={this.toggleStackFlag} />
                    <span className="custom-control-indicator"></span>
                </label>
            </div> */}
        <h3 className="ug-year-label">{"Academic Year: " + academicYear}</h3>
        <svg
          className="supervisor-line-chart"
          width={chartWidth}
          height={height}
        >
          <path
            d={axisTickLines}
            fill="none"
            stroke="#564d4d4d"
            strokeWidth="2px"
          ></path>
          <g>{bars}</g>
          <g>{axisTickTexts}</g>
          <g>{hoverLines}</g>
        </svg>
        <div
          className="supervisor-line-chart-info-box text-left"
          style={{ width: chartWidth }}
        >
          <p className='m-b-0'>
           * Each bar in the line chart corresponds to a single student. The
            height of the bar represents the number of observations collected by
            the student.When a student is selected, the bar corresponding to the
            student turns yellow and their data is show in the panel below.
          </p>
          <p >
            * The colors in the bar represent the breakdown of the observation
            rating. Red-(1,low), Orange-(2), Light blue-(3), Blue-(4), Green-(5,high).
          </p>
        </div>
      </div>
    );
  }
}
