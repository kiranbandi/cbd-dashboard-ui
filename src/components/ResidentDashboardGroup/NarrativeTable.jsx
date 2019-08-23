import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import { customFilter } from '../../utils/genericUtility';

const columns = [{
    Header: 'DATE',
    accessor: 'observation_date text-center',
    maxWidth: 100,
    filterMethod: customFilter
}, {
    Header: 'OBSERVER',
    accessor: 'observer_name',
    className: 'text-left',
    maxWidth: 150,
    filterMethod: customFilter
},
{
    Header: 'FEEDBACK',
    accessor: 'feedback',
    className: 'feedback-cell',
    sortable: false,
    filterMethod: customFilter
}];

class NarrativeTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isVisible: false
        };
        this.toggleVisibility = this.toggleVisibility.bind(this);
    }

    toggleVisibility(event) {
        event.preventDefault();
        this.setState({ isVisible: !this.state.isVisible });
    }


    render() {

        const { residentFilter, narrativeData } = this.props;

        let filteredNarratives;

        //  the narratives already come premarked for the date range
        //  we just check if the date filter is active and 
        // based on that removed the marked narratives and show them
        if (residentFilter && !residentFilter.isAllData) {
            filteredNarratives = _.filter(narrativeData, (d) => d.mark);
        }
        else {
            filteredNarratives = _.clone(narrativeData);
        }

        return (
            <div className='narrative-box' >
                {filteredNarratives.length > 0 &&
                    <div>
                        <h4 onClick={this.toggleVisibility} className="text-left">
                            {this.state.isVisible ? <span className="icon icon-chevron-down"></span> : <span className="icon icon-chevron-right"></span>}
                            NARRATIVES
                        </h4>
                        <div className={'table-box ' + (this.state.isVisible ? '' : 'hidden-table-box')}>
                            <ReactTable
                                data={filteredNarratives}
                                columns={columns}
                                showPagination={false}
                                className='-highlight'
                                noDataText='No Narratives Available'
                                defaultSorted={[{ id: "Date", desc: true }]} />
                        </div>
                    </div>
                }
            </div>)
    }
}

function mapStateToProps(state) {
    return {
        narrativeData: state.oracle.narrativeData
    };
}

export default connect(mapStateToProps, null)(NarrativeTable);

