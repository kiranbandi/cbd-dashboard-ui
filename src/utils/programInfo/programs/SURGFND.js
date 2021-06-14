const programInfo = {
    programName: "SURGFND",
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
            assessmentInfo: {
                '1.1': `Collect 1 observation of achievement`,
                '1.2': `Collect 2 observations of achievement`,
                '1.3': `Collect 2 observations of achievement
                - At least 1 inpatient
                - At least 1 outpatient`,
                '1.4': `Collect 2 observations of achievement`,
                '1.5': `Collect 1 observation of achievement`,
                '1.6': `Collect 1 observation of achievement
                - Wound must be at least 5 cm long`,
                '1.7': `Collect 1 observation of achievement`
            },
            filterValuesDict: {
                '1.1': {},
                '1.2': {
                    'Scenario': ['clinical', 'simulated']
                },
                '1.3': {
                    'Setting': ['inpatient', 'outpatient']
                },
                '1.4': {},
                '1.5': {
                    'Scenario': ['clinical', 'simulation']
                },
                '1.6': {
                    'Scenario': ['clinical', 'simulation'],
                    'Wound Size': ['< 2 cm', '2-5 cm', '>5 cm']
                },
                '1.7': {}
            }
        },
        2: {
            'ID': 'F',
            'topic': 'Foundations of Discipline (F)',
            subRoot: {
                "2.1": "Providing initial management for critically ill surgical patients",
                "2.2": "Providing initial management for trauma patients.",
                "2.3": "Assessing and performing risk optimization for preoperative patients in preparation for surgery",
                "2.4": "Providing patient education and informed consent in preparation for surgical care",
                "2.5": "Demonstrating the fundamental aspects of surgical procedures",
                "2.6": "Participating in surgical procedures",
                "2.7": "Managing uncomplicated postoperative surgical patients",
                "2.8": "Managing postoperative patients with complications",
                "2.9": "Supervising junior learners in the clinical setting"
            },
            maxObservation: {
                '2.1': 7,
                '2.2': 2,
                '2.3': 4,
                '2.4': 3,
                '2.5': 4,
                '2.6': 4,
                '2.7': 8,
                '2.8': 8,
                '2.9': 6
            },
            assessmentInfo: {
                '2.1': `Part A: Patient Assessment
                Collect 3 observations of achievement
                - At least 2 different presentations.
                
                Part B: Procedure
                Collect 4 observations of achievement
                - At least one needle thoracostomy
                - At least one tube thoracostomy
                - At least one surgical airway
                - At least one central venous line insertion`,
                '2.2': `Part A: ATLS Certification
                Submission of the certificate of course completion upon successful completion of ATLS
                course, to the Competence Committee.

                Part B: Patient assessment
                Direct observation by trauma team leader.
                
                Collect 2 observations of achievement
                - At least one each primary and secondary survey.`,
                '2.3': `Collect 4 observations of achievement
                - At least one elective, one emergent
                - At least one high risk
                - At least one critically ill
                - At least 2 assessors`,
                '2.4': `Collect 3 observations of achievement
                - At least 2 different assessors
                - At least one emergency procedure
                - At least one elective procedure
                - At least two in clinical setting`,
                '2.5': `Part A: Collect 4 observations of achievement
                - At least 2 by faculty
                - At least 2 different types of procedures
                - At least 2 different assessors.
                
                Part B: Collect feedback from at least 6 observers
                - At least one each of surgeon, nurse, and anesthetist.`,
                '2.6': `Collect 4 observations of achievement
                - At least 2 by faculty
                - At least 2 different types of procedures
                - At least 2 different assessors.`,
                '2.7': `Part A: Collect 8 observations of achievement
                - At least 2 from each stage of management
                - A range of hospital stays
                - A range of patient complexity
                - At least 4 different assessors.
                
                Part B: Collect feedback from at least 6 observers
                - At least 2 different roles`,
                '2.8': `Collect 8 observations of achievement
                - At least 4 different complications
                - At least 3 assessors.`,
                '2.9': `Collect 6 observations of achievement
                - At least 3 different junior learners
                - At least 3 different senior residents or faculty.`
            },
            filterValuesDict: {
                '2.1': {
                    'Type': ['Part A: Patient Assessment', 'Part B: Procedure'],
                    'Case Complexity': ["low", "medium", "high"],
                    'Presentation': ["hemodynamic", "airway/respiratory", "deceased level of consciousness/acute change in mental status", "sepsis"],
                    'Procedure Type': ["needle thoracostomy", "tube thoracostomy", "central line insertion", "surgical airway"],
                    'Setting': ['clinical', 'simulation']
                },
                '2.2': {
                    'Type': ['Part A: ATLS Certification', 'Part B: Patient assessment'],
                    'Resident Role': ['primary', 'secondary survey']
                },
                '2.3': {
                    'Surgical Priority': ['elective', 'emergent'],
                    'Patient risk category': ["low", "moderate", "high", "critically ill"]
                },
                '2.4': {
                    'Procedure Type': ['elective', 'emergency'],
                    'Setting': ['clinical', 'simulation']
                },
                '2.5': {
                    'Type': ['Part A: Foundational aspects of procedures', 'Part B: Participating in a team'],
                    'Role': ["surgeon", "nurse", "anesthetist", "other"]
                },
                '2.6': {
                    'Resident Role': ["primary assistant to the operator", "secondary assistant to the operator"],
                    'Observer Role': ["faculty", "fellow", "senior resident", "other"]
                },
                '2.7': {
                    'Type': ['Part A: Postoperative Management', 'Part B: Collaborative Care'],
                    'Stage of Management': ["post-op orders", "clinical management", "documentation of postop course", "discharge planning"],
                    'Hospital stay': ["day surgery", "same day admit", "inpatients"],
                    'Surgical Complexity': ["major procedure", "minor procedure"],
                    'Patient Complexity': ["low", "medium", "high"],
                    'Role': ["resident", "faculty", "nurse", "other health professional"]
                },
                '2.8': {
                    'Complication Type': ["post-op fever", "low urine output", "hypotension", "chest pain", "shortness of breath", "bleeding", "delirium", "ileus"],
                    'Hemodynamic Status': ['stable', 'unstable']
                },
                '2.9': {
                    'Assessor’s Role': ['junior learner', 'senior resident', 'faculty']
                }
            }
        },
        3: {
            'ID': 'CORE',
            'topic': 'Core of Discipline (C)',
            subRoot: {},
            maxObservation: {},
            clinicalPresentation: {},
            patientDemographic: {},
            filterTitles: {},
            filterValuesDict: {}
        },
        4: {
            'ID': 'TP',
            'topic': 'Transition to Practice (P)',
            subRoot: {},
            maxObservation: {},
            clinicalPresentation: {},
            patientDemographic: {},
            filterTitles: {},
            filterValuesDict: {}
        },
    }
};

module.exports = programInfo;