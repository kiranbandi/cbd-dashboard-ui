const programInfo = {
    infoCardsVisible: false,
    examScoresVisible: false,
    narrativesVisible: false,
    rotationList: ["EM", "EM(REGINA)", "EM(PED)", "EM(RGNL)", "ACE", "ANESTHESIA", "CARDIO", "ICU", "GIM", "GEN SURG", "NEURO", "OBS/GYN", "OPTHO", "ORTHO", "OTHER", "PICU", "PLASTICS", "PSYCH", "SELECTIVE", "TOXICOLOGY", "TRAUMA", "TRANSPORT"],
    rotationRequired: {
        "ACE": 6,
        "EM": 13,
        "EM(REGINA)": 20,
        "EM(PED)": 12,
        "EM(RGNL)": 6,
        "ANESTHESIA": 9,
        "CARDIO": 8,
        "ICU": 6,
        "GIM": 8,
        "GEN SURG": 7,
        "NEURO": 4,
        "OPTHO": 8,
        "ORTHO": 4,
        "PLASTICS": 6,
        "SELECTIVE": 8,
        "TRAUMA": 7,
        "TOXICOLOGY": 4,
        "TRANSPORT": 6,
        "OBS/GYN": 4,
        "PICU": 4,
        "PSYCH": 4,
        "OTHER": 4
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