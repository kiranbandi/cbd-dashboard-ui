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
            assessmentInfo: {
                '1.1': `Collect 3 observations of achievement
                    - At least 1 direct observation by orthopedic surgeon`
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
            assessmentInfo: {
                '2.1': `Collect 4 observations of achievement
                - At least 1 open fracture
                - At least 1 fracture or joint dislocation`,
                '2.2': `Collect 4 observations of achievement
                - At least 2 different domains
                - At least 1 direct observation`,
                '2.3': `Collect 3 observations achievement `,
                '2.4': `Collect 4 observations of achievement
                - At least 1 of each, fracture and MSK infection `,
                '2.5': `Collect 1 observation of achievement`,
                '2.6': `Collect 5 observations of achievement
                - At least 1 closed reduction in an adult patient
                - At least 1 closed reduction in a pediatric patient
                - At least 1 skeletal traction
                - At least 1 joint aspiration and fluid analysis
                - At least 1 joint injection`,
                '2.7': `Collect 3 observations of achievement
                - At least 3 different procedures`,
                '2.8': `Collect 2 observations of achievement`,
                '2.9': `Collect 2 observations of achievement
                - At least 1 THA
                - At least 1 TKA `,
                '2.10': `Collect 2 observations of achievement
                - At least 1 knee
                - At least 1 shoulder`
            },
            filterValuesDict: {
                '2.1': {
                    'Injury': ["open fracture", "fracture", "joint dislocation", "soft tissue injury"]
                },
                '2.2': {
                    'Domain': ["trauma", "foot and ankle", "hip and knee", "sports", "upper extremity/hand", "oncology", "spine"],
                    'Observation': ["direct", "case review"]
                },
                '2.3': {
                    'Condition': ["compartment syndrome", "joint infection", "urgent soft tissue infection", "cauda equine", "neurovascular compromise", "other condition"],
                    'Setting': ["emergency department", "inpatient unit", "simulation"]
                },
                '2.4': {
                    'Setting': ["emergency department", "outpatient", "inpatient", "operating room"],
                    'Condition': ["fracture", "MSK infection"]
                },
                '2.5': {
                    'Presentation': ["literature review based on clinical question", "paper or grant presentation", "paper review at journal club"]
                },
                '2.6': {
                    'Setting': ["ward", "clinic", "emergency department", "operating room", "simulation"],
                    'Procedure': ["closed reduction and casting", "skeletal traction", "skin traction", "joint aspiration and fluid analysis", "joint injection", "other procedure"],
                    'Demographic': ['adult', 'pediatric']
                },
                '2.7': {
                    'Procedure': ["cannulated screws", "sliding hip screw", "IM nail", "diaphyseal plating", "periarticular fracture plating"]
                },
                '2.8': {
                    'Site': ["forearm", "distal radius", "tibia", "ankle"]
                },
                '2.9': {
                    'Setting': ["operating room", "simulation lab"],
                    'Procedure': ["primary THA", "primary TKA"]
                },
                '2.10': {
                    'Procedure': ["knee scope", "shoulder scope"],
                    'Simulation': ['yes', 'no']
                }
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
            assessmentInfo: {
                '3.1': `Collect 14 observations of achievement
                - At least 2 from each domain
                - At least 1 direct observation for each domain`,
                '3.2': `Collect 4 observations of achievement
                - At least 2 complex conditions
                - At least 1 direct observation`,
                '3.3': `Collect 4 observations of achievement
                - At least 4 different complications`,
                '3.4': `Collect 3 observations of achievement
                - At least 1 pediatric patient
                - At least 3 different observers`,
                '3.5': `Part A: Overall patient care
                Collect 1 observation of achievement 
                
                Part B: Working effectively with the interprofessional team
                Collect observations from multiple observers at least 2 times during the Core stage
                - At least 3 observers at each time point`,
                '3.6': `Part A: Written documentation
                Collect 3 observations of achievements
                - At least 1 operative note
                - At least 1 discharge summary or transfer of care note
                - At least 1 consult note or admission note

                Part B: CMPA module completion 
                Collect 1 observation of achievement`,
                '3.7': `Collect 1 observation of achievement `,
                '3.8': `Collect feedback from at least 5 observers
                - At least 1 from orthopedic surgeon
                - At least 4 from different residents
                - At least 2 different settings`,
                '3.9': `Collect 2 observations of achievement `,
                '3.10': `Collect 4 observations of achievement
                - At least 4 different complications`,
                '3.11': `Collect 2 observation of achievement
                - At least 1 ankle/foot amputation
                - At least 1 AKA, through knee or BKA`,
                '3.12': `Collect 4 observations of achievement
                - At least 1 upper extremity
                - At least 1 lower extremity`,
                '3.13': `Collect 4 observations of achievement
                - At least 1 application of external fixator to pelvis
                - At least 1 application of external fixator to an extremity
                - No more than 2 in simulation `,
                '3.14': `Collect 4 observations of achievement
                - At least 2 femur
                - At least 2 tibia
                - At least 1 complex case`,
                '3.15': `Collect 4 observations of achievement
                - At least 1 upper extremity
                - At least 1 lower extremity`,
                '3.16': `Collect 4 observations of achievement
                - At least 1 distal radius
                - At least 1 tibial plateau
                - At least 1 ankle `,
                '3.17': `Collect 4 observations of achievement
                - At least 1 with screws or plate and screws
                - At least 1 with proximal femoral nail
                - At least 1 complex case`,
                '3.18': `Collect 2 observations of achievement`,
                '3.19': `Collect 2 observation of achievement
                - At least 2 different conditions`,
                '3.20': `Collect 1 observation of achievement`,
                '3.21': `Collect 4 observations of achievement
                - At least 2 of each procedure `,
                '3.22': `Collect 2 observation of achievement
                - At least 1 hip and 1 knee`,
                '3.23': `Collect 3 observations of achievement
                - At least 2 knee
                - At least 1 shoulder`,
                '3.24': `Collect 2 observations of achievement
                - At least 1 shoulder or elbow
                - At least 1 wrist or hand`,
                '3.25': `Collect 1 observation of achievement`,
                '3.26': `Collect 1 observation of achievement`,
                '3.27': `Collect 1 observation of achievement`,
                '3.28': `Collect 3 observations of achievement
                - At least 1 elbow fracture (supracondylar or lateral condyle fracture)
                - At least 1 physeal fractures (may include SCFE)
                - At least 1 arthrotomy for infection`,
                '3.29': `Collect 2 observations of achievement
                - At least 1 Pavlik or hip spica
                - At least 1 cast for clubfoot`,
                '3.30': `Collect 2 observations of achievement `,
                '3.31': `Collect 1 observation of achievement`,
                '3.32': `Collect 1 observation of achievement`,
                '3.33': `Collect 1 observation of achievement`
            },
            filterValuesDict: {
                '3.1': {
                    'Domain': ["trauma", "foot and ankle", "hip and knee", "sports", "upper extremity/hand", "oncology", "spine"],
                    'Observation': ["direct", "case review"]
                },
                '3.2': {
                    'Complexity': ['simple', 'complex'],
                    'Condition': ["foot abnormality", "club foot", "angular or rotational deformity", "DDH", "perthes", "scoliosis", "SCFE", "syndromes", "other"],
                    'Observation': ["direct", "case review"]
                },
                '3.3': {
                    'Complication': ["soft tissue infection/dehiscence", "peripheral nerve injury", "deep vein thrombosis/pulmonary embolus", "vascular injury", "loss of reduction or implant complication post-ORIF", "mal-union", "non-union", "peri-prosthetic fracture", "joint dislocation", "other"]
                },
                '3.4': {
                    'Age': ['pediatric', 'adult']
                },
                '3.5': {},
                '3.6': {
                    'Document': ["consultation note", "admission note", "operative note", "transfer of care note", "progress note", "discharge summary"]
                },
                '3.7': {},
                '3.8': {
                    'Setting': ["ward", "OR", "clinic", "small group"],
                    'Observer': ["orthopedic surgeon", "fellow", "TTP resident", "Core resident", "Foundations resident", "TTD resident"]
                },
                '3.9': {},
                '3.10': {
                    'Complication': ["loss of reduction", "implant complication", "infection", "mal-union", "nonunion", "peri-prosthetic fracture", "joint dislocation"]
                },
                '3.11': {
                    'Procedure': ["AKA", "through knee", "BKA", "ankle/foot"]
                },
                '3.12': {
                    'Site': ["upper extremity", "lower extremity"]
                },
                '3.13': {
                    'Site': ["upper extremity", "lower extremity", "pelvis"],
                    'Setting': ['ER/OR', 'simulation']
                },
                '3.14': {
                    'Site': ['femur', 'tibia'],
                    'Complexity': ['simple', 'complex']
                },
                '3.15': {
                    'Location': ["diaphyseal", "meta-diaphyseal"],
                    'Site': ["upper extremity", "lower extremity"],
                    'Complexity': ['simple', 'complex']
                },
                '3.16': {
                    'Site': ["proximal humerus", "distal humerus", "olecranon", "distal radius", "distal femur", "tibial plateau", "pilon", "ankle"],
                    'Complexity': ['simple', 'complex']
                },
                '3.17': {
                    'Fixation': ["plate and/or screws", "proximal femoral nail"],
                    'Complexity': ['simple', 'complex']
                },
                '3.18': {
                    'Procedure': ["hemiarthroplasty", "total hip arthroplasty"]
                },
                '3.19': {
                    'Condition': ["hallux valgus", "hammer toes", "hallux rigidus", "rheumatoid forefoot deformity"],
                    'Procedure': ["metatarsophalangeal (MTP) fusion", "hallux valgus correction", "toe corrections", "other procedure"]
                },
                '3.20': {
                    'Site': ['ankle', 'hindfoot', 'midfoot']
                },
                '3.21': {
                    'Procedure': ['TKA', 'THA']
                },
                '3.22': {
                    'Site': ['hip', 'knee']
                },
                '3.23': {
                    'Site': ['shoulder', 'hip', 'knee', 'ankle']
                },
                '3.24': {
                    'Site': ["shoulder", "elbow", "wrist", "hand"],
                    'Procedure': ["arthroplasty", "fusion", "osteotomy", "resection", "debridement/release"]
                },
                '3.25': {
                    'Procedure': ["decompression of ulnar nerve", "cubital tunnel release", "decompression of median nerve", "carpal tunnel release"]
                },
                '3.26': {},
                '3.27': {
                    'Fixation': ["upper extremity", "lower extremity", "NA"]
                },
                '3.28': {
                    'Presentation': ["supracondylar fracture", "lateral condyle fracture", "growth plate fracture", "SCFE", "diaphyseal bone fracture", "Monteggia fracture/dislocation", "infection"],
                    'Arthrotomy': ["yes", "no"]
                },
                '3.29': {
                    "Procedure": ["application of Pavlik harness", "application of cast for clubfoot", "application of hip spica"]
                },
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
            assessmentInfo: {
                '4.1': `Collect 1 observation of achievement `,
                '4.2': `Part A: Overall surgical management
                Collect 1 observation of achievement

                Part B: Interprofessional skills
                Collect 1 observation of achievement
                - At least 2 team members providing feedback`,
                '4.3': `Collect 2 observations of achievement`
            },
            filterValuesDict: {
                '4.1': {},
                '4.2': {},
                '4.3': {
                    'Complexity': ['simple', 'complex']
                }
            }
        },
    }
};

module.exports = programInfo;