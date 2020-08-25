const programInfo = {
    infoCardsVisible: false,
    examScoresVisible: false,
    narrativesVisible: true,
    rotationList: ["ACS", "EM", "GIM", "GSX (Regina)", "GSX (SToon)", "ICU", "IM", "NEURO", "NSX", "O&G", "SPINE", "ORTHO", "PLASTICS", "RADS", "RESEARCH", "RHEUM", "SELECTIVE", "ONCOLOGY", "THORACIC", "TRAUMA", "VASCULAR", "OTHER"],
    rotationRequired: {
        "ACS": 10,
        "EM": 10,
        "GIM": 10,
        "GSX (Regina)": 10,
        "GSX (SToon)": 10,
        "ICU": 10,
        "IM": 10,
        "NEURO": 10,
        "NSX": 10,
        "O&G": 10,
        "SPINE": 10,
        "ORTHO": 10,
        "PLASTICS": 10,
        "RADS": 10,
        "RESEARCH": 10,
        "RHEUM": 10,
        "SELECTIVE": 10,
        "ONCOLOGY": 10,
        "THORACIC": 10,
        "TRAUMA": 10,
        "VASCULAR": 10,
        "OTHER": 10
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