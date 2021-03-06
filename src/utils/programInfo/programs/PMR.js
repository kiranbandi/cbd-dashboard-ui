const programInfo = {
    programName: "PMR",
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
            assessmentInfo: {
                '1.1': `Collect 2 observations of achievement.
                - At least 1 physiatrist `,
                '1.2': `Collect 2 observations of achievement.
                - At least 1 physiatrist observer`,
                '1.3': `Collect 2 observations of achievement.
                - At least 1 physiatrist observer`,
                '1.4': `Collect 2 observations of achievement.
                - At least 1 physiatrist observer`,
                '1.5': `Collect 2 observations of achievement.
                - At least 1 physiatrist observer`
            },
            filterValuesDict: {
                '1.1': {
                    "Setting": ["inpatient", "outpatient"]
                },
                '1.2': {
                    "Setting": ["inpatient", "outpatient"]
                },
                '1.3': {
                    "Setting": ["inpatient", "outpatient"]
                },
                '1.4': {
                    "Setting": ["inpatient", "outpatient"]
                },
                '1.5': {
                    "Setting": ["inpatient", "outpatient"]
                }
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
            assessmentInfo: {
                '2.1': `Collect 10 observations of achievement.
                - At least 4 direct observations
                - At least 4 different issues
                - A variety of settings
                - No more than 1 in simulation setting
                - At least 4 different observers
                - At least 4 physician observers`,
                '2.2': `Collect 10 observations of achievement.
                - At least 4 direct observations
                - At least 4 different medical issues
                - At least 2 different settings
                - No more than 2 in simulation setting
                - At least 4 different observers
                - At least 4 physician observers`,
                '2.3': `Collect 10 observations of achievement.
                - No more than 3 in simulation setting
                - At least 3 different procedures
                - At least 3 different observers`,

            },
            filterValuesDict: {
                '2.1': {
                    'Observation Type': ['direct', 'indirect'],
                    'Issue': ["abnormal investigation result", "abnormal vitals", "bowel/urinary dysfunction", "dizziness", "falls", "glycemic control", "line dysfunction", "minor bleeding", "nausea/vomiting", "subacute or progressive neurological decline", "pain", "rash", "sleep disturbance", "wound care", "non-urgent mental health and/or behavioral issues", "other (write in)"],
                    'Setting': ["emergency room", "medicine inpatient unit", "surgery inpatient unit", "outpatient medicine clinic", "outpatient surgery clinic", "simulation"]
                },
                '2.2': {
                    'Observation Type': ['direct', 'indirect'],
                    'Medical Issue': ["acute joint swelling", "acute limb swelling", "acute wound deterioration", "altered level of consciousness", "altered neurological status", "angioedema/anaphylaxis", "chest pain", "code blue", "critical abnormal investigation result", "critical abnormal vitals", "falls/acute trauma", "major hemorrhage", "overdose", "palpitations", "pulseless limb", "respiratory distress", "severe acute pain", "urgent mental health and behavioral issues", "other (write in)"],
                    'Setting': ["emergency room", "medicine inpatient unit", "surgery inpatient unit", "outpatient medicine clinic", "outpatient surgery clinic", "simulation"]
                },
                '2.3': {
                    'Observation Type': ['direct', 'indirect'],
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
            assessmentInfo: {
                '3.1': `Collect 30 observations of achievement.
                - At least 2 of each rehab population group
                - At least 1 assessment per population group must comprise history, physical, and
                diagnosis and management
                - Variety of inpatient and outpatient settings
                - At least 1 physiatrist per rehabilitation population group`,
                '3.2': `Collect 30 observations of achievement.
                - At least 2 of each rehab population group
                - Variety of inpatient and outpatient settings
                - At least 1 assessment per population group must comprise history, physical, and
                diagnosis and management
                - At least 1 physiatrist per rehabilitation population group`,
                '3.3': `Collect 10 observations of achievement.
                - At least 2 direct observations
                - At least 4 different medical issues
                - At least 1 autonomic dysreflexia (may be observed in simulation)
                - No more than 4 in simulation setting
                - At least 4 different observers
                - At least 4 observations from faculty`,
                '3.4': `Collect 6 observations of achievement.
                - At least 3 observations of history
                - At least 3 observations of physical examination
                - At least 3 observations of management plan
                - At least 5 observations of communication
                - At least 1 comprehensive observation that covers a complete assessment and
                management plan
                - At least 1 of each pediatric rehabilitation population
                - At least 2 different observers`,
                '3.5': `Collect 33 successful observations of achievement
                - At least 3 of each procedure
                - No more than 1 of each procedure in simulation setting
                - At least 3 different observers`,
                '3.6': `Part A: Interpreting electrodiagnostic testing (NCS/EMG)
                Collect 20 observations of achievement.
                - At least 10 upper limb
                - At least 10 lower limb
                - At least 5 complex cases
                - No more than 3 simulated
                - At least 3 different observers
                
                Part B: Interpreting other investigations 
                Collect 6 observations of achievement.
                - At least 3 different procedures
                - No more than 3 simulated
                - At least 3 observers`,
                '3.7': `Collect 10 observations of achievement.
                - At least 3 of each meeting type
                - No more than 2 in simulation setting
                - At least 5 different patient populations
                - At least 3 different observers`,
                '3.8': `Part A: Informal/bedside teaching
                Collect 3 observations of achievement 
                
                Part B: Formal scheduled teaching
                Collect 2 observations of achievement
                - At least 2 different settings/presentation types`
            },
            filterValuesDict: {
                '3.1': {
                    'Focus of observation': ["history", "physical", "diagnosis and management"],
                    'Rehabilitation population group ': ["amputee", "brain injury", "musculoskeletal", "neurological", "neuromuscular", "spinal cord injury", "stroke", "complex medical condition (burns/cancer/cardiorespiratory)", "other (write in)"],
                    'Rehabilitation issue': ["not applicable", "advocacy", "agitation", "aphasia", "assistive devices (walkers, mobility aids)", "ataxia", "autonomic dysreflexia", "cognition", "mood disorder", "contracture", "dysarthria", "dysphagia", "exercise prescription", "heterotopic ossification", "immobilization complications", "falls", "fitness/wellbeing", "hobbies/avocation", "medical comorbidity management/surveillance", "neurogenic bladder", "neurogenic bowel", "orthotic management", "osteoporosis", "pain", "prosthetic management", "school needs", "seating/wheelchair issues", "seizure", "sexual dysfunction", "spasticity", "vocation needs", "wound management", "other (write in)"],
                    'Complexity': ['low', 'high'],
                    'Setting': ["inpatient rehabilitation", "outpatient physiatry clinic", "outpatient electrodiagnostic clinic", "consultation service"]
                },
                '3.2': {
                    'Observation focus': ["history", "physical", "diagnosis and management"],
                    'Rehabilitation population group': ["amputee", "brain injury", "musculoskeletal", "neurological", "neuromuscular", "spinal cord injury", "stroke", "complex medical condition(burns/cancer/cardiorespiratory)", "other (write in)"],
                    'Rehabilitation issue': ["not applicable", "advocacy", "agitation", "aphasia", "assistive devices (walkers, mobility aids)", "ataxia", "autonomic dysreflexia", "cognition", "mood disorder", "contracture", "dysarthria", "dysphagia", "exercise prescription", "heterotopic ossification", "immobilization complications", "falls", "fitness/wellbeing", "hobbies/avocation", "medical comorbidity management/surveillance", "neurogenic bladder", "neurogenic bowel", "orthotic management", "osteoporosis", "pain", "prosthetic management", "school needs", "seating/wheelchair issues", "seizure", "sexual dysfunction", "spasticity", "vocation needs", "wound management", "other (write in)"],
                    'Complexity': ['low', 'high'],
                    'Setting': ["inpatient rehabilitation", "outpatient physiatry clinic", "outpatient electrodiagnostic clinic", "consultation service"]
                },
                '3.3': {
                    'Observation type': ["direct", "indirect"],
                    'Rehabilitation population group': ["amputee", "brain injury", "musculoskeletal", "neurological", "neuromuscular", "spinal cord injury", "stroke", "other diagnoses (burns/cancer/cardiorespiratory)", "other (write in)"],
                    'Setting': ["inpatient rehabilitation", "outpatient physiatry clinic", "outpatient electrodiagnostic clinic", "consultation service", "simulation"],
                    'Medical Issue': ["acute joint swelling", "acute limb swelling", "acute undifferentiated functional deterioration", "acute wound deterioration", "altered level of consciousness", "altered neurological status", "angioedema/anaphylaxis", "autonomic dysreflexia", "code blue", "critical abnormal investigation result", "critical abnormal vitals", "falls/acute trauma", "major hemorrhage", "overdose", "palpitations", "post-traumatic agitation", "pulseless limb", "respiratory distress", "severe acute pain", "urgent mental health and behavioral issues"]
                },
                '3.4': {
                    'Observation type': ["direct", "indirect"],
                    'Observation Focus': ["history", "physical examination", "management plan", "communication"],
                    'Setting': ["inpatient pediatric rehabilitation", "outpatient pediatric rehabilitation or transition clinic"],
                    'Pediatric rehabilitation population': ["amputee/limb deficiency", "brain injury/tumour", "cerebral palsy", "spina bifida", "muscular dystrophy", "MSK (e.g., scoliosis, JIA, apophysitis, SCFE, osteochondritis dessicans)", "other (write in)"]
                },
                '3.5': {
                    'Procedure': ["arthrocentesis and/or intra-articular injections – upper limb", "arthrocentesis and/or intra-articular injections-lower limb", "chemodenervation-upper proximal", "chemodenervation–upper distal", "chemodenervation-lower proximal", "chemodenervation–lower distal", "myofascial trigger point injection", "nerve block", "soft tissue injections-tendon sheath", "soft tissue injections–bursa", "superficial sharp debridement of wounds", "other"],
                    'Setting': ["consultation service", "inpatient rehabilitation", "outpatient physiatry", "electrodiagnostic clinic", "simulation"]
                },
                '3.6': {
                    'Type': ["Part A: Interpreting electrodiagnostic testing (NCS/EMG)", "Part B: Interpreting other investigations"],
                    'Complexity': ['low', 'high'],
                    'Observation Type': ['direct', 'indirect'],
                    'Procedure': ["lower limb", "upper limb", "cranial/trunk"],
                    'Setting': ["consultation service", "inpatient unit", "outpatient clinic", "electrodiagnostic clinic", "simulation"]
                },
                '3.7': {
                    'Meeting Type': ["interprofessional family/care conference", "team conference/encounter"],
                    'Setting': ["inpatient unit", "outpatient clinic", "simulation"],
                    'Patient Population': ["ABI", "amputee", "MSK", "neuromuscular", "neurological", "pediatric", "stroke", "SCI", "other (write in)"]
                },
                '3.8': {
                    "Type": ["Part A: Informal/bedside teaching", "Part B: Formal scheduled teaching"]
                }
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
            assessmentInfo: {
                '4.1': `Collect 3 observations of achievement.
                - At least 3 different experience types
                - Strongly recommended to include both an inpatient and outpatient setting
                - At least 3 different observers`,
                '4.2': `Part A: Engaging in self-directed learning
                Collect 8 observations of achievement.
                - At least 1 MOC section 3 activity
                
                Part B: Participating in Mainport MOC
                Collect 1 observation of achievement.`,
                '4.3': `Review of resident’s plan and outcome by Competence Committee, program director or
                supervisor.
                Collect 1 observation of achievement.`,
                '4.4': `Part A: Engagement in management and leadership
                Collect evidence of participation in at least two management and/or leadership activities.
                
                Part B: Self-reflection
                Collect evidence of one completed self-reflection activity`,
                '4.5': `Collect 1 observation of achievement.`
            },
            filterValuesDict: {
                '4.1': {
                    'Experience Type': ["bed flow meeting", "billing for clinical encounters and forms", "booking and running senior’s clinic", "completion of forms", "completion of health records", "responding to requests from staff, other physicians & health professionals", "running any physiatry outpatient clinic", "running consultation service", "running inpatient service", "other (write in)"],
                    'Setting': ["inpatient rehabilitation unit", "outpatient physiatry clinic", "consultation service"]
                },
                '4.2': {
                    'Type': ["Part A: Engaging in self-directed learning", "Part B: Participating in Mainport MOC"],
                    'Learning Activity': ["MOC section 3 - knowledge ( accredited self-assessment program)", "MOC section 3 – performance (accredited simulation, chart audit, MSF, practice assessment)", "personal learning project/critical appraisal", "narrative on plans for improvement", "narrative on areas of interest and plan to address", "rotation specific teaching", "grand rounds presentations", "journal club presentations", "other (write in)"]
                },
                '4.3': {},
                '4.4': {
                    'Type': ["Part A: Engagement in management and leadership", "Part B: Self-reflection"]
                },
                '4.5': {}
            }
        },
    }
};

module.exports = programInfo;