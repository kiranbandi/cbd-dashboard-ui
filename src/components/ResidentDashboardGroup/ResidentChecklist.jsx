import React, { Component } from 'react';

// This is shown as a mid screen modal
// There will be tabs for each year
// Residents get to create items in each year
//  They can be default for now



class ResidentChecklist extends Component {

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
                {filteredNarratives.length > 0 && <div>
                    <h4 onClick={this.toggleVisibility} className="text-left">
                        {this.state.isVisible ? <span className="icon icon-chevron-down"></span> : <span className="icon icon-chevron-right"></span>}
                        View Narratives
                        </h4>
                    <div className={'table-box ' + (this.state.isVisible ? '' : 'hidden-table-box')}>
                        <ReactTable
                            data={filteredNarratives}
                            columns={columns}
                            defaultPageSize={5}
                            filterable={true}
                            className='-highlight'
                            noDataText='No Narratives Available'
                            defaultSorted={[{ id: "Date", desc: true }]} />
                    </div>
                </div>}
            </div>)
    }
}

function mapStateToProps(state) {
    return {
        narrativeData: state.oracle.narrativeData
    };
}

export default connect(mapStateToProps, null)(ResidentChecklist);

