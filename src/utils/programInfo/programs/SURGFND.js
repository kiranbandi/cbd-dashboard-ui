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
                "2.1": "Providing initial management for critically ill surgical patients.",
                "2.2": "Inserting central venous lines.",
                "2.3": "Providing initial management for trauma patients.",
                "2.4": "Providing risk assessment and management for preoperative patients in preparation for surgery.",
                "2.5": "Providing patient education and informed consent in preparation for surgical care.",
                "2.6": "Participating in surgical procedures",
                "2.7": "Managing uncomplicated postoperative surgical patients",
                "2.8": "Managing postoperative patients with complications",
                "2.9": "Supervising junior learners in the clinical setting"
            },
            maxObservation: {
                '2.1': 3,
                '2.2': 2,
                '2.3': 2,
                '2.4': 4,
                '2.5': 3,
                '2.6': 4,
                '2.7': 6,
                '2.8': 8,
                '2.9': 3
            },
            assessmentInfo: {
                '2.1': `Part A: Critically ill

                Direct observation or case discussion by supervisor (surgeon, physician, senior resident or fellow)
                Collect 3 observations of achievement
                - At least 2 different presentations
                - No more than 1 observation in a simulation setting
                - At least 2 different assessors`,
                '2.2': `Part A: Central venous

                Direct observation by supervisor (surgeon, physician, senior resident or fellow)
                Collect 2 observations of achievement
                - No more than 1 in a simulation setting
                - At least 2 different assessors`,
                '2.3': `Part A: Trauma

                Direct observation by trauma team leader, fellow or senior resident with trauma experience
                Collect 2 observations of achievement
                - At least 1 each primary and secondary survey`,
                '2.4': `Part A: Pre-op optimization

                Direct or indirect observation by supervisor (surgeon, senior resident or fellow)
                Collect 4 observations of achievement
                - At least 1 elective
                - At least 1 emergent
                - At least 1 high risk 
                - At least 2 different assessors`,
                '2.5': `Part A: Consent

                Direct observation by supervisor (surgeon, senior resident or fellow)
                Collect 3 observations of achievement
                - At least 1 emergency procedure
                - At least 1 elective procedure
                - At least 2 in clinical settings
                - At least 2 different assessors`,
                '2.6': `Collect 4 observations of achievement
                - At least 2 by faculty
                - At least 2 different types of procedures
                - At least 2 different assessors.`,
                '2.7': `Part A: Postoperative management

                Direct observation or case discussion by supervisor (surgeon, senior resident or fellow)
                Collect 4 observations of achievement
                - At least 2 high complexity patients
                - At least 2 different assessors
                
                Part B: Collaborative care
                
                Direct observation and/or case discussion by supervisor, with input from members of the clinical team
                Collect feedback on at least 2 occasions
                - At least 3 observers for each encounter
                - At least 2 different team member roles for each encounter`,
                '2.8': `Collect 8 observations of achievement
                - At least 4 different complications
                - At least 3 assessors.`,
                '2.9': `Part A: Supervising Juniors

                Direct observation by supervisor (surgeon, senior resident or fellow) or junior learners (medical students) 
                Collect 3 observations of achievement
                - At least 2 different senior residents or faculty.`

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