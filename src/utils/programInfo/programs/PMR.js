const programInfo = {
    infoCardsVisible: false,
    examScoresVisible: false,
    narrativesVisible: true,
    rotationList: ["PM&R", "GERIATRICS", "GIM", "CRITICAL CARE", "ENDOCRINOLOGY",
        "SPORTS MED", "ANESTHESIA", "ONCOLOGY", "NEUROLOGY",
        "RHEUMATOLOGY", "ORTHOPEDIC SURG", "UROLOGY", "PLASTIC SURG",
        "VASCULAR SURG", "NEUROSURGERY", "EMERGENCY", "CARDIOLOGY",
        "INFECTIOUS DISEASE", "RESPIROLOGY", "PSYCHIATRY", "PALLIATIVE MED",
        "PEDIATRICS", "SPINAL CORD INJURY", "ACQUIRED BRAIN INJURY", "STROKE",
        "PROSTHETICS & ORTHO", "NEUROMUSCULAR", "MUSCULOSKELETAL", "CARDIOPULMONARY",
        "PEDIATRIC REHAB", "RESEARCH", "SENIOR ROTATION", "ELECTIVES", "OTHER"
    ],
    rotationRequired: {
        "ACQUIRED BRAIN INJURY": 5,
        "ANESTHESIA": 5,
        "CARDIOLOGY": 5,
        "CARDIOPULMONARY": 5,
        "CRITICAL CARE": 5,
        "ELECTIVES": 5,
        "EMERGENCY": 5,
        "ENDOCRINOLOGY": 5,
        "GERIATRICS": 5,
        "GIM": 5,
        "INFECTIOUS DISEASE": 5,
        "MUSCULOSKELETAL": 5,
        "NEUROLOGY": 5,
        "NEUROMUSCULAR": 5,
        "NEUROSURGERY": 5,
        "ONCOLOGY": 5,
        "ORTHOPEDIC SURG": 5,
        "PALLIATIVE MED": 5,
        "PEDIATRIC REHAB": 5,
        "PEDIATRICS": 5,
        "PLASTIC SURG": 5,
        "PM&R": 5,
        "PROSTHETICS & ORTHO": 5,
        "PSYCHIATRY": 5,
        "RESEARCH": 5,
        "RESPIROLOGY": 5,
        "RHEUMATOLOGY": 5,
        "SENIOR ROTATION": 5,
        "SPINAL CORD INJURY": 5,
        "SPORTS MED": 5,
        "STROKE": 5,
        "UROLOGY": 5,
        "VASCULAR SURG": 5,
        "OTHER": 5
    },
    epaSourceMap: {
        1: {
            'ID': 'TTD',
            'topic': 'Transition to Discipline (D)',
            subRoot: {
                '1.1': "Performing physiatry-focused histories",
                '1.2': "Performing physiatry-focused physical examinations",
                '1.3': "Generating a problem list based on the ICF Framework",
                '1.4': "Completing clinical documentation",
                '1.5': "Providing patient handover"
            },
            maxObservation: {
                '1.1': 2,
                '1.2': 2,
                '1.3': 2,
                '1.4': 2,
                '1.5': 2

            },
            clinicalPresentation: {},
            patientDemographic: {},
            filterTitles: {},
            filterValuesDict: {
                '1.1': {},
                '1.2': {},
                '1.3': {},
                '1.4': {}
            }
        },
        2: {
            'ID': 'F',
            'topic': 'Foundations of Discipline (F)',
            subRoot: {
                '2.1': "Assessing and managing patients with non-emergent commonly encountered medical and surgical issues",
                '2.2': "Identifying, assessing, and providing initial management of patients with emergent and urgent medical issues, and recognizing when to ask for assistance",
                '2.3': "Performing procedures"
            },
            maxObservation: {
                '2.1': 10,
                '2.2': 10,
                '2.3': 10,

            },
            clinicalPresentation: {
                '2.1': ['direct', 'indirect'],
                '2.2': ['direct', 'indirect'],
                '2.3': ["bladder catheterization", "casting", "cast removal", "IV insertion", "joint aspiration/injection", "musculoskeletal injection", "NG tube insertion", "PEG tube removal", "removal of sutures", "superficial skin suturing", "tracheostomy removal", "other"]
            },
            patientDemographic: {
                '2.1': ["emergency room", "medicine inpatient unit", "surgery inpatient unit", "outpatient medicine clinic", "outpatient surgery clinic", "simulation", "other"],
                '2.2': ["emergency room", "medicine inpatient unit", "surgery inpatient unit", "outpatient medicine clinic", "outpatient surgery clinic", "simulation", "other"],
                '2.3': ["consultation service", "inpatient unit", "outpatient clinic", "simulation"]
            },
            filterTitles: {
                '2.1': ['Observation Type', 'Setting'],
                '2.2': ['Observation Type', 'Setting'],
                '2.3': ['Procedure', 'Setting'],
            },
            filterValuesDict: {
                '2.1': {
                    'Observation Type': ['direct', 'indirect'],
                    'Setting': ["emergency room", "medicine inpatient unit", "surgery inpatient unit", "outpatient medicine clinic", "outpatient surgery clinic", "simulation", "other"]
                },
                '2.2': {
                    'Observation Type': ['direct', 'indirect'],
                    'Setting': ["emergency room", "medicine inpatient unit", "surgery inpatient unit", "outpatient medicine clinic", "outpatient surgery clinic", "simulation", "other"]
                },
                '2.3': {
                    'Procedure': ["bladder catheterization", "casting", "cast removal", "IV insertion", "joint aspiration/injection", "musculoskeletal injection", "NG tube insertion", "PEG tube removal", "removal of sutures", "superficial skin suturing", "tracheostomy removal", "other"],
                    'Setting': ["consultation service", "inpatient unit", "outpatient clinic", "simulation"]
                }
            }
        },
        3: {
            'ID': 'CORE',
            'topic': 'Core of Discipline (C)',
            subRoot: {
                '3.1': "Providing consultation and developing comprehensive management plans for patients with complex presentations",
                '3.2': "Providing ongoing assessment and management for patients with complex presentations",
                '3.3': "Identifying, assessing and managing patients with emergent and urgent medical issues",
                '3.4': "Providing consultation and developing management plans for children with common pediatric rehabilitation conditions",
                '3.5': "Performing common physiatric procedures",
                '3.6': "Selecting and interpreting investigations relevant to Physiatry",
                '3.7': "Leading interprofessional meetings",
                '3.8': "Facilitating the learning of others"
            },
            maxObservation: {
                '3.1': 30,
                '3.2': 30,
                '3.3': 10,
                '3.4': 6,
                '3.5': 33,
                '3.6': 26,
                '3.7': 10,
                '3.8': 5
            },
            clinicalPresentation: {
                '3.1': ['low', 'high'],
                '3.2': ['low', 'high'],
                '3.3': ["inpatient rehabilitation", "outpatient physiatry clinic", "outpatient electrodiagnostic clinic", "consultation service", "simulation"],
                '3.4': ["inpatient pediatric rehabilitation", "outpatient pediatric rehabilitation or transition clinic"],
                '3.5': ["consultation service", "inpatient rehabilitation", "outpatient physiatry", "electrodiagnostic clinic", "simulation"],
                '3.6': ['low', 'high'],
                '3.7': ["interprofessional family/care conference", "team conference/encounter"],
            },
            patientDemographic: {
                '3.1': ["inpatient rehabilitation", "outpatient physiatry clinic", "outpatient electrodiagnostic clinic", "consultation service"],
                '3.2': ["inpatient rehabilitation", "outpatient physiatry clinic", "outpatient electrodiagnostic clinic", "consultation service"],
                '3.3': ["acute joint swelling", "acute limb swelling", "acute undifferentiated functional deterioration", "acute wound deterioration", "altered level of consciousness", "altered neurological status", "angioedema/anaphylaxis", "autonomic dysreflexia", "code blue", "critical abnormal investigation result", "critical abnormal vitals", "falls/acute trauma", "major hemorrhage", "overdose", "palpitations", "post-traumatic agitation", "pulseless limb", "respiratory distress", "severe acute pain", "urgent mental health and behavioral issues"],
                '3.4': ["amputee/limb deficiency", "brain injury/tumour", "cerebral palsy", "spina bifida", "muscular dystrophy", "MSK (e.g., scoliosis, JIA, apophysitis, SCFE, osteochondritis dessicans)"],
                '3.6': ["consultation service", "inpatient unit", "outpatient clinic", "electrodiagnostic clinic", "simulation"],
                '3.7': ["inpatient unit", "outpatient clinic", "simulation"]
            },
            filterTitles: {
                '3.1': ['Complexity', 'Setting'],
                '3.2': ['Complexity', 'Setting'],
                '3.3': ['Setting', 'Medical Issue'],
                '3.4': ['Setting', 'Pediatric rehabilitation population'],
                '3.5': ['Setting'],
                '3.6': ['Complexity', 'Setting'],
                '3.7': ['Meeting Type', 'Setting']
            },
            filterValuesDict: {
                '3.1': {
                    'Complexity': ['low', 'high'],
                    'Setting': ["inpatient rehabilitation", "outpatient physiatry clinic", "outpatient electrodiagnostic clinic", "consultation service"]
                },
                '3.2': {
                    'Complexity': ['low', 'high'],
                    'Setting': ["inpatient rehabilitation", "outpatient physiatry clinic", "outpatient electrodiagnostic clinic", "consultation service"]
                },
                '3.3': {
                    'Setting': ["inpatient rehabilitation", "outpatient physiatry clinic", "outpatient electrodiagnostic clinic", "consultation service", "simulation"],
                    'Medical Issue': ["acute joint swelling", "acute limb swelling", "acute undifferentiated functional deterioration", "acute wound deterioration", "altered level of consciousness", "altered neurological status", "angioedema/anaphylaxis", "autonomic dysreflexia", "code blue", "critical abnormal investigation result", "critical abnormal vitals", "falls/acute trauma", "major hemorrhage", "overdose", "palpitations", "post-traumatic agitation", "pulseless limb", "respiratory distress", "severe acute pain", "urgent mental health and behavioral issues"]
                },
                '3.4': {
                    'Setting': ["inpatient pediatric rehabilitation", "outpatient pediatric rehabilitation or transition clinic"],
                    'Pediatric rehabilitation population': ["amputee/limb deficiency", "brain injury/tumour", "cerebral palsy", "spina bifida", "muscular dystrophy", "MSK (e.g., scoliosis, JIA, apophysitis, SCFE, osteochondritis dessicans)"]
                },
                '3.5': {
                    'Setting': ["consultation service", "inpatient rehabilitation", "outpatient physiatry", "electrodiagnostic clinic", "simulation"]
                },
                '3.6': {
                    'Complexity': ['low', 'high'],
                    'Setting': ["consultation service", "inpatient unit", "outpatient clinic", "electrodiagnostic clinic", "simulation"]
                },
                '3.7': {
                    'Meeting Type': ["interprofessional family/care conference", "team conference/encounter"],
                    'Setting': ["inpatient unit", "outpatient clinic", "simulation"]
                },
                '3.8': []
            }
        },
        4: {
            'ID': 'TP',
            'topic': 'Transition to Practice (P)',
            subRoot: {
                '4.1': "Managing a physiatric practice",
                '4.2': "Developing a strategy for continuing professional development",
                '4.3': "(SA) Planning and completing personalized training experiences aligned with career plans and/or specific learning needs",
                '4.4': "(SA) Contributing to the improvement of health care delivery for persons with impairments/disabilities",
                '4.5': "(SA) Conducting a scholarly project from inception to completion"
            },
            maxObservation: {
                '4.1': 3,
                '4.2': 9,
                '4.3': 1,
                '4.4': 3,
                '4.5': 1
            },
            clinicalPresentation: {
                '4.2': ["MOC section 3 - knowledge ( accredited self-assessment program)", "MOC section 3 – performance (accredited simulation, chart audit, MSF, practice assessment)", "personal learning project/critical appraisal", "narrative on plans for improvement", "narrative on areas of interest and plan to address", "rotation specific teaching", "grand rounds presentations", "journal club presentations"]
            },
            patientDemographic: {},
            filterTitles: {
                '4.2': ['Learning Activity']
            },
            filterValuesDict: {
                '4.1': {},
                '4.2': {
                    'Learning Activity': ["MOC section 3 - knowledge ( accredited self-assessment program)", "MOC section 3 – performance (accredited simulation, chart audit, MSF, practice assessment)", "personal learning project/critical appraisal", "narrative on plans for improvement", "narrative on areas of interest and plan to address", "rotation specific teaching", "grand rounds presentations", "journal club presentations"]
                },
                '4.3': {},
                '4.4': {},
                '4.5': {}
            }
        },
    }
};

module.exports = programInfo;