const programInfo = {
    infoCardsVisible: false,
    examScoresVisible: false,
    narrativesVisible: false,
    rotationList: ["Anesthesia", "EM", "Elective", "Family", "Medicine", "OBS/GYN", "Other", "PED", "Psych", "Selective", "Surgery", "LIC"],
    rotationRequired: {
        "EM": 6,
        "Anesthesia": 6,
        "Family": 6,
        "Surgery": 6,
        "Medicine": 6,
        "OBS/GYN": 6,
        "PED": 6,
        "Psych": 6,
        "Elective": 6,
        "Selective": 6,
        "Other": 6,
        "LIC": 6
    },
    epaSourceMap: {
        subRoot: {
            '1': 'Obtain a history and perform a physical examination adapted to the patient’s clinical situation',
            '2': 'Formulate and justify a prioritized differential diagnosis',
            '3': 'Formulate an initial plan of investigation based on the diagnostic hypotheses',
            '4': 'Interpret and communicate results of common diagnostic and screening tests',
            '5': 'Formulate, communicate and implement management plans',
            '6': 'Present oral and written reports that document a clinical encounter',
            '7': 'Provide and receive the handover in transitions of care',
            '8': 'Recognize a patient requiring urgent or emergent care, provide initial management and seek help',
            '9': 'Communicate in difficult situations',
            '10': 'Participate in health quality improvement initiatives',
            '11': 'Perform general procedures of a physician',
            '12': 'Educate patients on disease management, health promotion and preventive medicine',
        },
        maxObservation: {
            '1': 20,
            '2': 20,
            '3': 20,
            '4': 20,
            '5': 20,
            '6': 20,
            '7': 20,
            '8': 20,
            '9': 20,
            '10': 20,
            '11': 20,
            '12': 20
        }
    }
};

module.exports = programInfo;