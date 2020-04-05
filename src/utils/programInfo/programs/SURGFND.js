const programInfo = {
    infoCardsVisible: true,
    examScoresVisible: true,
    narrativesVisible: true,
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
        1: {
            'ID': 'TTD',
            'topic': 'Transition to Discipline (D)',
            subRoot: {
                '1.1': 'Performing the preoperative preparation of patients for basic surgical procedures',
                '1.2': 'Recognizing and initiating early management for critically ill surgical patients',
                '1.3': 'Documenting clinical encounters',
                '1.4': 'Demonstrating handover technique',
                '1.5': 'Demonstrating ability to function in the operating room',
                '1.6': 'Repairing simple skin incisions/lacerations',
                '1.7': 'Managing tubes, drains and central lines'
            },
            maxObservation: {
                '1.1': 1,
                '1.2': 2,
                '1.3': 2,
                '1.4': 2,
                '1.5': 1,
                '1.6': 1,
                '1.7': 1
            },
            clinicalPresentation: {},
            patientDemographic: {},
            filterTitles: {}
        },
        2: {
            'ID': 'F',
            'topic': 'Foundations of Discipline (F)',
            subRoot: {
                "2.1": "Providing initial management for critically ill surgical patients",
                "2.2": "Providing initial management for trauma patients",
                "2.3": "Assessing and performing risk optimization for preoperative patients in preparation for surgery",
                "2.4": "Providing patient education and informed consent in preparation for surgical care",
                "2.5": "Demonstrating the fundamental aspects of surgical procedures",
                "2.6": "Participating in surgical procedures",
                "2.7": "Managing uncomplicated postoperative surgical patients",
                "2.8": "Managing postoperative patients with complications",
                "2.9": "Supervising junior learners in the clinical setting"
            },
            maxObservation: {
                '2.1': 3,
                '2.2': 2,
                '2.3': 4,
                '2.4': 3,
                '2.5': 4,
                '2.6': 4,
                '2.7': 8,
                '2.8': 8,
                '2.9': 6
            },
            clinicalPresentation: {},
            patientDemographic: {},
            filterTitles: {}
        },
        3: {
            'ID': 'CORE',
            'topic': 'Core of Discipline (C)',
            subRoot: {},
            maxObservation: {},
            clinicalPresentation: {},
            patientDemographic: {},
            filterTitles: {}
        },
        4: {
            'ID': 'TP',
            'topic': 'Transition to Practice (P)',
            subRoot: {},
            maxObservation: {},
            clinicalPresentation: {},
            patientDemographic: {},
            filterTitles: {}
        },
    }
};

module.exports = programInfo;