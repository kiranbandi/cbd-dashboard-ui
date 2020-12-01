const programInfo = {
    programName: "ORTHOSURG",
    infoCardsVisible: false,
    examScoresVisible: false,
    narrativesVisible: true,
    rotationList: ["COLD TRAUMA SEL", "COMMUNITY SEL", "ELECTIVE - OUT OF PROVINCE",
        "FOOT AND ANKLE", "HIP & KNEE RECON/ONCO", "KNOWLEDGE CONSOLIDATION",
        "PED ORTHO", "RESEARCH", "SPINE SURG", "SPORTS MED", "TRANSITION TO PRACTICE",
        "TRAUMA", "UPPER LIMB", "TRAUMA - ACS", "ICU", "VASCULAR SURG",
        "PLASTIC SURG", "GIM", "EMERG MEDICINE", "RADIOLOGY", "RHEUMATOLOGY", "OTHER"
    ],
    rotationRequired: {
        "COLD TRAUMA SEL": 5,
        "COMMUNITY SEL": 5,
        "ELECTIVE - OUT OF PROVINCE": 5,
        "EMERG MEDICINE": 5,
        "FOOT AND ANKLE": 5,
        "GIM": 5,
        "HIP & KNEE RECON/ONCO": 5,
        "ICU": 5,
        "KNOWLEDGE CONSOLIDATION": 5,
        "PED ORTHO": 5,
        "PLASTIC SURG": 5,
        "RADIOLOGY": 5,
        "RESEARCH": 5,
        "RHEUMATOLOGY": 5,
        "SPINE SURG": 5,
        "SPORTS MED": 5,
        "TRANSITION TO PRACTICE": 5,
        "TRAUMA - ACS": 5,
        "TRAUMA": 5,
        "UPPER LIMB": 5,
        "VASCULAR SURG": 5,
        "OTHER": 5
    },
    epaSourceMap: {
        1: {
            'ID': 'TTD',
            'topic': 'Transition to Discipline (D)',
            subRoot: {
                '1.1': 'Assessing and diagnosing patients with orthopedic illness or injury',
            },
            maxObservation: {
                '1.1': 3
            },
            clinicalPresentation: {
                '1.1': ["direct", "case review"]
            },
            patientDemographic: {},
            filterTitles: {
                '1.1': ["Observation"]
            },
            filterValuesDict: {
                '1.1': {
                    'Observation': ["direct", "case review"]
                }
            }
        },
        2: {
            'ID': 'F',
            'topic': 'Foundations of Discipline (F)',
            subRoot: {
                '2.1': "Assessing, investigating, and initiating a management plan for patients with orthopedic trauma",
                '2.2': "Assessing, investigating, and initiating a management plan for patients with common non-urgent orthopedic conditions",
                '2.3': "Assessing, investigating, and initiating a management plan for patients with urgent conditions",
                '2.4': "Assessing, investigating, and initiating a management plan for pediatric patients with fractures and MSK infections",
                '2.5': "Performing critical appraisal and presenting current orthopedic literature",
                '2.6': "Performing common non-operative orthopedic procedures",
                '2.7': "Performing technical skills in the surgical management of fractures",
                '2.8': "Performing technical procedures for the surgical management of simple fractures in pediatric patients",
                '2.9': "Performing basic elective arthroplasty",
                '2.10': "Performing diagnostic arthroscopy"
            },
            maxObservation: {
                '2.1': 4,
                '2.2': 4,
                '2.3': 3,
                '2.4': 4,
                '2.5': 1,
                '2.6': 5,
                '2.7': 3,
                '2.8': 2,
                '2.9': 2,
                '2.10': 2
            },
            clinicalPresentation: {
                '2.6': ["ward", "clinic", "emergency department", "operating room", "simulation"]
            },
            patientDemographic: {
                '2.6': ["closed reduction and casting", "skeletal traction", "skin traction", "joint aspiration and fluid analysis", "joint injection", "other procedure"]
            },
            filterTitles: {
                '2.6': ['Setting', 'Procedure']
            },
            filterValuesDict: {
                '2.1': {},
                '2.2': {},
                '2.3': {},
                '2.4': {},
                '2.5': {},
                '2.6': {
                    'Setting': ["ward", "clinic", "emergency department", "operating room", "simulation"],
                    'Procedure': ["closed reduction and casting", "skeletal traction", "skin traction", "joint aspiration and fluid analysis", "joint injection", "other procedure"]
                },
                '2.7': {},
                '2.8': {},
                '2.9': {},
                '2.10': {}
            }
        },
        3: {
            'ID': 'CORE',
            'topic': 'Core of Discipline (C)',
            subRoot: {
                '3.1': "Assessing, diagnosing, and managing adult patients with any orthopedic illness or injury",
                '3.2': "Assessing, diagnosing, and managing pediatric patients with any orthopedic illness or injury",
                '3.3': "Assessing, diagnosing, and managing patients with complications of orthopedic surgeries",
                '3.4': "Obtaining informed consent in preparation of orthopedic procedures",
                '3.5': "Running an orthopedic service",
                '3.6': "Documenting patient care encounters",
                '3.7': "Conducting scholarly work",
                '3.8': "Supervising, teaching, and assessing medical students and residents",
                '3.9': "Implementing the principles of quality improvement and patient safety",
                '3.10': "Providing surgical management for patients with acute, semi-acute, or chronic complications of orthopedic surgeries",
                '3.11': "Performing lower extremity amputations",
                '3.12': "Providing surgical management for patients with soft tissue disorders and tendinopathies of the upper or lower extremity",
                '3.13': "Using closed reduction and external fixation to provide initial management for patients with complex fractures and/or dislocations",
                '3.14': "Using an intramedullary nail to provide definitive surgical management for patients with simple and/or complex diaphyseal and meta-diaphyseal fractures",
                '3.15': "Using a plate to provide definitive surgical management for patients with simple and/or complex diaphyseal and meta-diaphyseal fractures",
                '3.16': "Providing definitive surgical management for patients with peri-/intra-articular fractures (AO/OTA B and C-type fractures)",
                '3.17': "Using internal fixation to provide definitive surgical management for patients with any hip fracture pattern (trans-cervical, basicervical, intertrochanteric)",
                '3.18': "Performing arthroplasty for the definitive surgical management for patients with a hip fracture",
                '3.19': "Performing surgical management for patients with a forefoot deformity",
                '3.20': "Providing surgical management for patients with foot and ankle arthritis",
                '3.21': "Performing primary TKA/THA",
                '3.22': "Performing complex primary or simple revision TKA/THA",
                '3.23': "Providing arthroscopic management for patients with hip, knee, shoulder, and ankle disorders",
                '3.24': "Providing surgical management for patients with upper extremity conditions",
                '3.25': "Providing surgical management for patients with compressive neuropathy",
                '3.26': "Performing open biopsies",
                '3.27': "Providing surgical management for patients with metastatic bone lesions",
                '3.28': "Providing surgical management for pediatric patients with urgent conditions",
                '3.29': "Recognizing and providing initial management for pediatric patients with conditions requiring non-urgent intervention",
                '3.30': "Performing posterior spinal column exposure and closure",
                '3.31': "Performing laminectomy/decompression",
                '3.32': "Performing primary posterior instrumented spine fusions",
                '3.33': "Applying external spinal fixation and/or traction"
            },
            maxObservation: {
                '3.1': 14,
                '3.2': 4,
                '3.3': 4,
                '3.4': 3,
                '3.5': 1,
                '3.6': 4,
                '3.7': 1,
                '3.8': 5,
                '3.9': 2,
                '3.10': 4,
                '3.11': 2,
                '3.12': 4,
                '3.13': 4,
                '3.14': 4,
                '3.15': 4,
                '3.16': 4,
                '3.17': 4,
                '3.18': 2,
                '3.19': 2,
                '3.20': 1,
                '3.21': 4,
                '3.22': 2,
                '3.23': 3,
                '3.24': 2,
                '3.25': 1,
                '3.26': 1,
                '3.27': 1,
                '3.28': 3,
                '3.29': 2,
                '3.30': 2,
                '3.31': 1,
                '3.32': 1,
                '3.33': 1
            },
            clinicalPresentation: {
                '3.1': ["trauma", "foot and ankle", "hip and knee", "sports", "upper extremity/hand", "oncology", "spine"],
                '3.8': ["ward", "OR", "clinic", "small group"]
            },
            patientDemographic: {
                '3.1': ["direct", "case review"],
                '3.8': ["orthopedic surgeon", "fellow", "TTP resident", "Core resident", "Foundations resident", "TTD resident"]
            },
            filterTitles: {
                '3.1': ['Domain', 'Observation'],
                '3.8': ['Setting', 'Observer']
            },
            filterValuesDict: {
                '3.1': {
                    'Domain': ["trauma", "foot and ankle", "hip and knee", "sports", "upper extremity/hand", "oncology", "spine"],
                    'Observation': ["direct", "case review"]
                },
                '3.2': {},
                '3.3': {},
                '3.4': {},
                '3.5': {},
                '3.6': {},
                '3.7': {},
                '3.8': {
                    'Setting': ["ward", "OR", "clinic", "small group"],
                    'Observer': ["orthopedic surgeon", "fellow", "TTP resident", "Core resident", "Foundations resident", "TTD resident"]
                },
                '3.9': {},
                '3.10': {},
                '3.11': {},
                '3.12': {},
                '3.13': {},
                '3.14': {},
                '3.15': {},
                '3.16': {},
                '3.17': {},
                '3.18': {},
                '3.19': {},
                '3.20': {},
                '3.21': {},
                '3.22': {},
                '3.23': {},
                '3.24': {},
                '3.25': {},
                '3.26': {},
                '3.27': {},
                '3.28': {},
                '3.29': {},
                '3.30': {},
                '3.31': {},
                '3.32': {},
                '3.33': {}
            }
        },
        4: {
            'ID': 'TP',
            'topic': 'Transition to Practice (P)',
            subRoot: {
                '4.1': 'Managing an outpatient clinic',
                '4.2': 'Coordinating, organizing and executing a list of core surgical procedures',
                '4.3': 'Providing on-call coverage for an orthopedic service',
            },
            maxObservation: {
                '4.1': 1,
                '4.2': 1,
                '4.3': 2
            },
            clinicalPresentation: {},
            patientDemographic: {},
            filterTitles: {},
            filterValuesDict: {
                '4.1': {},
                '4.2': {},
                '4.3': {}
            }
        },
    }
};

module.exports = programInfo;