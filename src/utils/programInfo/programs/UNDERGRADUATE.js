const programInfo = {
    infoCardsVisible: false,
    examScoresVisible: false,
    narrativesVisible: false,
    rotationList: ["EM/ANES", "FAMILY", "GSX", "IM/SURG", "OBS/GYN", "PED", "PSYCH", "ELECTIVE", "SELECTIVE", "OTHER"],
    rotationRequired: {
        "EM/ANES": 6,
        "FAMILY": 6,
        "GSX": 6,
        "IM/SURG": 6,
        "OBS/GYN": 6,
        "PED": 6,
        "PSYCH": 6,
        "ELECTIVE": 6,
        "SELECTIVE": 6,
        "OTHER": 6
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