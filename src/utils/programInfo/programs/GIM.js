const programInfo = {
    programName: "GIM",
    infoCardsVisible: false,
    examScoresVisible: false,
    narrativesVisible: true,
    rotationList: ["AHD", "Ambulatory", "CDM", "CTU", "Community (SWFT CRNT)", "Elective", "Electrodignostics", "Fellows Clinic", "GIM-RUH", "GOT Foundations", "ICU", "Obstetrics", "On Call", "Other", "PACS", "QI", "SIM", "SPH-ACU", "SPH-ER"],
    rotationRequired: {
        "GIM-RUH": 5,
        "SPH-ACU": 5,
        "SPH-ER": 5,
        "Community (SWFT CRNT)": 5,
        "Elective": 5,
        "GOT Foundations": 5,
        "PACS": 5,
        "Ambulatory": 5,
        "ICU": 5,
        "CTU": 5,
        "Electrodignostics": 5,
        "AHD": 5,
        "SIM": 5,
        "On Call": 5,
        "CDM": 5,
        "Obstetrics": 5,
        "QI": 5,
        "Fellows Clinic": 5,
        "Other": 5
    },
    epaSourceMap: {
        1: {
            'ID': 'TTD',
            'topic': 'Transition to Discipline (D)',
            subRoot: {
                '1.1': "Assessing and proposing management for patients with common internal medicine presentations",
                '1.2': "Assessing, resuscitating, and providing initial management for patients with acute, unstable medical presentations"
            },
            maxObservation: {
                '1.1': 1,
                '1.2': 2,
            },
            assessmentInfo: {
                '1.1': `Collect one direct observation by GIM attending.`,
                '1.2': `Part A:
                Submit evidence of active ACLS certification.

                Part B:
                One direct observation by attending staff.`,
            },
            clinicalPresentation: {},
            patientDemographic: {},
            filterTitles: {},
            filterValuesDict: {
                '1.1': {},
                '1.2': {}
            }
        },
        2: {
            'ID': 'F',
            'topic': 'Foundations of Discipline (F)',
            subRoot: {
                '2.1': "Applying the GIM approach to the assessment and initial management for patients with any general internal medicine presentation in the acute care setting",
                '2.2': "Applying the GIM approach to the ongoing management of patients with common acute general internal medicine presentations",
                '2.3': "Assessing and providing initial management for patients with common presentations in an outpatient clinic"
            },
            maxObservation: {
                '2.1': 4,
                '2.2': 4,
                '2.3': 4
            },
            assessmentInfo: {
                '2.1': `Collect at least 4 observations of achievement
                - At least 2 high case complexity
                - At least 2 assessors`,
                '2.2': `Collect at least 4 observations of achievement: 
                - At least 3 different conditions`,
                '2.3': `Collect 4 observations of achievement
                - At least 3 GIM clinic
                - At least 2 medium complexity
                - Range of decisions
                - At least 2 assessors`
            },
            clinicalPresentation: {
                '2.1': ["low", "medium", "high"],
                '2.3': ["low", "medium", "high"]

            },
            patientDemographic: {
                '2.3': ["followup", "refer back", "refer on", "admit"]
            },
            filterTitles: {
                '2.1': ["Complexity"],
                '2.3': ["Complexity", "Decision"]
            },
            filterValuesDict: {
                '2.1': {
                    'Complexity': ["low", "medium", "high"]
                },
                '2.2': {},
                '2.3': {
                    'Complexity': ["low", "medium", "high"],
                    'Decision': ["followup", "refer back", "refer on", "admit"]
                }
            }
        },
        3: {
            'ID': 'CORE',
            'topic': 'Core of Discipline (C)',
            subRoot: {
                '3.1': "Applying the GIM approach to the ongoing management of complex patients with acute general internal medicine presentations",
                '3.2': "Applying the GIM approach to the management of patients with any general internal medicine presentation in the outpatient setting",
                '3.3': "Assessing and managing perioperative patients",
                '3.4': "Assessing and managing pregnant patients with common or emergent obstetrical medical presentations",
                '3.5': "Assessing and counselling women of reproductive age with common chronic general internal medicine conditions",
                '3.6': "Providing preventive care and health promotion",
                '3.7': "Providing care for patients with end stage disease",
                '3.8': "Stabilizing patients who are critically ill and providing or arranging definitive care",
                '3.9': "Documenting clinical encounters",
                '3.10': "Leading discussions with patients, their families and/or other health care professionals in emotionally charged situations",
                '3.11': "Providing interpretation of cardiac and respiratory diagnostic tests",
                '3.12': "Leading a GIM inpatient team",
                '3.13': "Leading a GIM consultation service and/or team",
                '3.14': "Managing a longitudinal clinic",
                '3.15': "Teaching, coaching and assessing learners in the clinical setting",
                '3.16': "Advancing the discipline and/or patient care through scholarly activity",
                '3.17': "Assessing and managing patients in whom there is uncertainty in diagnosis and/or treatment",
                '3.18': "Planning and completing personalized training experiences aligned with career plans and/or specific learning needs",
                '3.19': "Performing the procedures of General Internal Medicine"
            },
            maxObservation: {
                '3.1': 6,
                '3.2': 10,
                '3.3': 10,
                '3.4': 8,
                '3.5': 3,
                '3.6': 2,
                '3.7': 3,
                '3.8': 9,
                '3.9': 5,
                '3.10': 3,
                '3.11': 12,
                '3.12': 2,
                '3.13': 2,
                '3.14': 2,
                '3.15': 8,
                '3.16': 1,
                '3.17': 4,
                '3.18': 1,
                '3.19': 22
            },
            assessmentInfo: {
                '3.1': `Collect at least 6 observations of achievement
                - A range of complexity
                - At least 2 of each stage of care`,
                '3.2': `Collect at least 10 observations of achievement
                - At least 4 undifferentiated presentations
                - At least 2 newly diagnosed conditions
                - At least 4 chronic medical conditions
                - At least 4 assessors`,
                '3.3': `Part A: Collect 5 observations of achievement
                - At least 2 urgent
                - All medium or high complexity.
                
                Part B: Collect 5 observations of achievement
                - At least 4 medium or high complexity
                - At least 2 with unstable clinical status`,
                '3.4': `Part A: Collect 6 observations of achievement
                - At least 2 inpatient
                - At least 3 each antepartum and postpartum
                - At least 4 different diagnoses
                - At least one diabetes
                - At least one hypertension.
                
                Part B: Collect 2 observations of achievement.`,
                '3.5': `Part A: Collect 1 observation of achievement.
                
                Part B: Collect 2 observations of achievement 
                - At least one outpatient.`,
                '3.6': `Part A: Collect 2 observations
                - At least one behavioural change.
                
                Part B: Collect 2 observations of achievement.`,
                '3.7': `Collect 3 observations of achievement
                - At least one transition from disease-modifying therapy to symptom management
                - At least one transition to end of life care.`,
                '3.8': `Part A: Collect 8 observations of achievement
                - At least two invasive ventilation
                - At least two non-invasive ventilation
                - At least two patients on vasopressor support
                - No more than two that required transfer.
                
                Part B: Collect 1 observation of achievement.
                
                Part C: Collect feedback from at least 3 observers
                - At least one supervisor
                - At least one nurse or other health care professional.`,
                '3.9': `Collect 5 observations of achievement
                - At least one of each type of document
                - At least 2 different assessors.`,
                '3.10': `Collect 3 observations of achievement
                - At least one with patient/family
                - At least one with other health care professional(s).`,
                '3.11': `Part A: Collect on observation of achievement 
                - Must be a mix of studies
                
                Part B: Competence committee reviews resident’s procedure log.
                
                Part C: Supervision and interpretation of exercise stress tests.
                Collect 10 observations of achievement.`,
                '3.12': ` Part A: Collect feedback from at least 6 observers
                - At least one supervisor
                - At least one nurse or other health care professional.
                
                Part B: Direct and/or indirect observation by supervisor of a week of clinical activity.
                Collect 2 observations of achievement.`,
                '3.13': `Collect 2 observations
                - At least one day of high complexity.`,
                '3.14': `Part A: Collect one observation of achievement.
                
                Part B: Collect one observation of achievement.
                
                Part C: Collect at least one observation of achievement
                ---	if supervisor including input from at least 3 individuals or
                ---	if multisource feedback - feedback from at least 3 individuals`,
                '3.15': `Part A: Collect 4 observations of achievement
                -	At least one of each type of teaching 
                - At least two different assessors
                
                Part B: Collect 4 observations of achievement.
                
                Part C: Collect feedback from at least 6 learners
                - At least one medical student
                - At least one junior resident.`,
                '3.17': `Collect 4 observations of achievement
                - At least one review of consult note/written communication to other MD
                - At least one direct observation of communication with patient.`,
                '3.19': `Part A: Collect 21 observations of achievement
                - At least one of each procedure in the clinical setting
                - At least 5 central line placements using ultrasound guidance
                --- Must include different sites
                - At least 3 thoracentesis using ultrasound guidance
                - At least 3 paracentesis using ultrasound guidance
                - At least 3 lumbar puncture
                - At least 2 knee arthrocentesis
                - At least 3 airway management (bag and mask ventilation) and endotracheal
                intubations
                - At least 2 arterial line catheter insertions
                
                Part B: Log to track
                -	Setting: clinical; simulation
                -	Procedure: airway management & endotracheal intubation; arterial line catheter
                insertion; central line placement; thoracentesis; paracentesis; lumbar puncture;
                knee arthrocentesis
                - Site: not applicable; femoral; internal jugular; subclavian; knee
                - Use of ultrasound guidance: yes; no`
            },
            clinicalPresentation: {
                '3.1': ["social", "undifferentiated condition", "multi-system"],
                '3.2': ["undifferentiated", "new diagnosis", "chronic medical condition"],
                '3.3': ["low", "medium", "high"],
                '3.4': ["inpatient", "outpatient"],
                '3.8': ["none", "invasive", "non-invasive"],
                '3.9': ["consultations", "discharge summary", "progress notes"],
                '3.19': ["airway management & endotracheal intubation", "non-invasive ventilation", "invasive ventilation", "arterial line catheter insertion", "central line placement", "thoracentesis", "paracentesis", "lumbar puncture", "joint arthrocentesis"]
            },
            patientDemographic: {
                '3.1': ["transition planning", "ongoing management"],
                '3.4': ["acute dyspnea", "asthma", "acute respiratory failure", "chest pain", "acute heart failure", "dysrhythmias", "edema", "headache", "Type 1 diabetes", "Type 2 diabetes", "gestational diabetes", "pre-existing hypertension", "gestational hypertension", "thromboembolic disease", "thrombocytopenia", "other"],
                '3.19': ["not applicable", "femoral", "internal jugular", "subclavian", "knee"]
            },
            filterTitles: {
                '3.1': ["Complexity", "Stage of Care"],
                '3.2': ["Presentation"],
                '3.3': ["Complexity"],
                '3.4': ["Setting", "Presentation"],
                '3.8': ["Ventilation"],
                '3.9': ["Document"],
                '3.19': ["Procedure", "Site"]
            },
            filterValuesDict: {
                '3.1': {
                    'Complexity': ["social", "undifferentiated condition", "multi-system"],
                    'Stage of Care': ["transition planning", "ongoing management"]
                },
                '3.2': {
                    'Presentation': ["undifferentiated", "new diagnosis", "chronic medical condition"]
                },
                '3.3': {
                    'Complexity': ["low", "medium", "high"]
                },
                '3.4': {
                    'Setting': ["inpatient", "outpatient"],
                    'Presentation': ["acute dyspnea", "asthma", "acute respiratory failure", "chest pain", "acute heart failure", "dysrhythmias", "edema", "headache", "Type 1 diabetes", "Type 2 diabetes", "gestational diabetes", "pre-existing hypertension", "gestational hypertension", "thromboembolic disease", "thrombocytopenia", "other"]
                },
                '3.5': {},
                '3.6': {},
                '3.7': {},
                '3.8': {
                    'Ventilation': ["none", "invasive", "non-invasive"]
                },
                '3.9': {
                    'Document': ["consultations", "discharge summary", "progress notes"]
                },
                '3.10': {},
                '3.11': {},
                '3.12': {},
                '3.13': {},
                '3.14': {},
                '3.15': {},
                '3.16': {},
                '3.17': {},
                '3.18': {},
                '3.19': {
                    'Procedure': ["airway management & endotracheal intubation", "non-invasive ventilation", "invasive ventilation", "arterial line catheter insertion", "central line placement", "thoracentesis", "paracentesis", "lumbar puncture", "joint arthrocentesis"],
                    'Site': ["not applicable", "femoral", "internal jugular", "subclavian", "knee"]
                }
            }
        },
        4: {
            'ID': 'TP',
            'topic': 'Transition to Practice (P)',
            subRoot: {
                '4.1': 'Managing a GIM case load/practice',
                '4.2': 'Developing a personal learning plan for future practice and ongoing professional development',
            },
            maxObservation: {
                '4.1': 3,
                '4.2': 1,
            },
            assessmentInfo: {
                '4.1': `Collect 3 observations of achievement.
                - At least one that includes after hours coverage.`,
                '4.2': `Collect 1 successful observation`
            },
            clinicalPresentation: {},
            patientDemographic: {},
            filterTitles: {},
            filterValuesDict: {
                '4.1': {},
                '4.2': {}
            }
        },
    }
};

module.exports = programInfo;