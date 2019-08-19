// we are going to start tracking historical scores from 2016 onwards
//  basic assumptions are that the schedule for 
// every year should start on 1 July of the year 
// and end on the 30th Jun of the next year
const ROTATION_SCHEDULE_MAP = {
    "2016": ["01-Jul-2016", "30-Jul-2016", "27-Aug-2016", "24-Sep-2016",
        "22-Oct-2016", "19-Nov-2016", "17-Dec-2016", "14-Jan-2017",
        "11-Feb-2017", "11-Mar-2017", "08-Apr-2017", "06-May-2017",
        "03-Jun-2017", "30-Jun-2017"
    ],
    "2017": ["01-Jul-2017", "30-Jul-2017", "27-Aug-2017", "24-Sep-2017",
        "22-Oct-2017", "19-Nov-2017", "17-Dec-2017", "14-Jan-2018",
        "11-Feb-2018", "11-Mar-2018", "08-Apr-2018", "06-May-2018",
        "03-Jun-2018", "30-Jun-2018"
    ],
    "2018": ["01-Jul-2018", "30-Jul-2018", "27-Aug-2018", "24-Sep-2018",
        "22-Oct-2018", "19-Nov-2018", "17-Dec-2018", "14-Jan-2019",
        "11-Feb-2019", "11-Mar-2019", "08-Apr-2019", "06-May-2019",
        "03-Jun-2019", "30-Jun-2019"
    ],
    "2019": ["01-Jul-2019", "29-Jul-2019", "26-Aug-2019", "23-Sep-2019",
        "21-Oct-2019", "18-Nov-2019", "16-Dec-2019", "13-Jan-2020",
        "10-Feb-2020", "09-Mar-2020", "06-Apr-2020", "04-May-2020",
        "01-Jun-2020", "30-Jun-2020"
    ],
    "2020": ["01-Jul-2020", "27-Jul-2020", "24-Aug-2020", "21-Sep-2020",
        "19-Oct-2020", "16-Nov-2020", "14-Dec-2020", "11-Jan-2021",
        "08-Feb-2021", "08-Mar-2021", "05-Apr-2021", "03-May-2021",
        "31-May-2021", "30-Jun-2021"
    ],
    "2021": ["01-Jul-2021", "02-Aug-2021", "30-Aug-2021", "27-Sep-2021",
        "25-Oct-2021", "22-Nov-2021", "20-Dec-2021", "17-Jan-2022",
        "14-Feb-2022", "14-Mar-2022", "11-Apr-2022", "09-May-2022",
        "06-Jun-2022", "30-Jun-2022"
    ]
};

module.exports = ROTATION_SCHEDULE_MAP;