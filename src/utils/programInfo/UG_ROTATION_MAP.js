// we are going to start tracking historical scores from 2019 onwards
//  basic assumptions are that the schedule are continuous and 6 weeks long
const UG_ROTATION_MAP = {
    "2019": ["12-Aug-2019", "23-Sep-2019", "04-Nov-2019", "02-Jan-2019",
        "18-Feb-2019", "30-Mar-2019", "11-May-2019", "29-Jun-2020", "11-Aug-2020"
    ],
    "2020": ["12-Aug-2020", "23-Sep-2020", "04-Nov-2020", "02-Jan-2021",
        "18-Feb-2021", "30-Mar-2021", "11-May-2021", "29-Jun-2021", "11-Aug-2021"
    ],
    "2021": ["12-Aug-2021", "23-Sep-2021", "04-Nov-2021", "02-Jan-2022",
        "18-Feb-2022", "30-Mar-2022", "11-May-2022", "29-Jun-2022", "11-Aug-2022"
    ]
};

module.exports = UG_ROTATION_MAP;