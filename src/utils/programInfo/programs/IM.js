const programInfo = {
    programName: "IM",
    infoCardsVisible: false,
    examScoresVisible: false,
    narrativesVisible: true,
    hidePercentages: true, //hide percentages in each training stage
    hideTogoNumbers: true, // hide count to go in each EPA
    rotationList: ["(S) CTU", "(S) FLOAT", "(S) CCU", "(S) ELECTIVE", "(S) GERIATRIC", "(S) ID", "(S) NEPHRO", "(S) RESP", "(S) HEME", "(S) NEURO", "(S) EMERG", "(S) GASTRO", "(S) ENDO", "(S) AMBU", "(S) GIM", "(S) ICU", "(S) ONC", "(S) RHEUM", "(S) RESEARCH", "(S) ALLERGY", "(S) CSU", "(S) DERM", "(S) PALL", "(S) OTHER", "(R) CTU", "(R) FLOAT", "(R) CCU", "(R) ELECTIVE", "(R) GERIATRIC", "(R) ID", "(R) NEPHRO", "(R) RESP", "(R) HEME", "(R) NEURO", "(R) EMERG", "(R) GASTRO", "(R) ENDO", "(R) AMBU", "(R) GIM", "(R) ICU", "(R) ONC", "(R) RHEUM", "(R) RESEARCH", "(R) ALLERGY", "(R) CSU", "(R) DERM", "(R) PALL", "(R) OTHER"],
    rotationRequired: {
        "(S) CTU": 10,
        "(S) FLOAT": 10,
        "(S) CCU": 10,
        "(S) ELECTIVE": 10,
        "(S) GERIATRIC": 10,
        "(S) ID": 10,
        "(S) NEPHRO": 10,
        "(S) RESP": 10,
        "(S) HEME": 10,
        "(S) NEURO": 10,
        "(S) EMERG": 10,
        "(S) GASTRO": 10,
        "(S) ENDO": 10,
        "(S) AMBU": 10,
        "(S) GIM": 10,
        "(S) ICU": 10,
        "(S) ONC": 10,
        "(S) RHEUM": 10,
        "(S) RESEARCH": 10,
        "(S) ALLERGY": 10,
        "(S) CSU": 10,
        "(S) DERM": 10,
        "(S) PALL": 10,
        "(S) OTHER": 10,
        "(R) CTU": 10,
        "(R) FLOAT": 10,
        "(R) CCU": 10,
        "(R) ELECTIVE": 10,
        "(R) GERIATRIC": 10,
        "(R) ID": 10,
        "(R) NEPHRO": 10,
        "(R) RESP": 10,
        "(R) HEME": 10,
        "(R) NEURO": 10,
        "(R) EMERG": 10,
        "(R) GASTRO": 10,
        "(R) ENDO": 10,
        "(R) AMBU": 10,
        "(R) GIM": 10,
        "(R) ICU": 10,
        "(R) ONC": 10,
        "(R) RHEUM": 10,
        "(R) RESEARCH": 10,
        "(R) ALLERGY": 10,
        "(R) CSU": 10,
        "(R) DERM": 10,
        "(R) PALL": 10,
        "(R) OTHER": 10,
    },
    epaSourceMap: {
        1: {
            'ID': 'TTD',
            'topic': 'Transition to Discipline (D)',
            "subRoot": {
                "1.1": "Performing histories and physical exams, documenting and presenting findings, across clinical settings for initial and subsequent care",
                "1.2": "Identifying and assessing unstable patients, providing initial management, and obtaining help",
                "1.3": "Performing the basic procedures of Internal Medicine"
            },
            "maxObservation": {
                "1.1": 2,
                "1.2": 3,
                "1.3": 10
            },
            clinicalPresentation: {
                '1.1': ['new patient', 'focused follow-up'],
                '1.2': ["acute respiratory distress", "hemodynamic instability", "altered level of consciousness"],
                '1.3': ["venipuncture", "peripheral intravenous placement", "radial arterial blood gas sampling", "nasogastric tube placement", "preparation of sterile field with local anesthetic injection for invasive procedures"]
            },
            patientDemographic: {
                '1.1': [],
                '1.2': ['clinical', 'simulation'],
                '1.3': ['clinical', 'simulation']
            },
            type: {
                '1.1': ['Part A: Initial assessments'],
                '1.2': ['Part A: Unstable patients'],
                '1.3': ['Part A: Procedures']
            },
            filterTitles: {
                '1.1': ['Type of Patient Visit', 'Type'],
                '1.2': ['Presentation', 'Setting', 'Type', 'Direct vs Indirect\t1', 'Staff Observations\t1'],
                '1.3': ['Procedure', 'Setting', 'Type']
            },
            filterValuesDict: {
                '1.1': {
                    'Type of Patient Visit': ['new patient', 'focused follow-up'],
                    'Type': ['Part A: Initial assessments']
                },
                '1.2': {
                    'Presentation': ["acute respiratory distress", "hemodynamic instability", "altered level of consciousness"],
                    'Setting': ['clinical', 'simulation'],
                    'Type': ['Part A: Unstable patients'],
                    'Direct vs Indirect': ['direct\f1', 'indirect'],
                    'Staff Observations': ['staff\f1']
                },
                '1.3': {
                    'Procedure': ["venipuncture", "peripheral intravenous placement", "radial arterial blood gas sampling", "nasogastric tube placement", "preparation of sterile field with local anesthetic injection for invasive procedures"],
                    'Setting': ['clinical', 'simulation'],
                    'Type': ['Part A: Procedures']
                }
            },
            assessmentInfo: {
                "1.1": `Collect 2 observations of achievement:
                - At least one new patient visit
                - At least one focused follow-up visit `,
                "1.2": `Collect 3 observations of achievement:
                - At least one direct observation
                - At least one observation each of acute respiratory distress; hemodynamic instability;
                altered level of consciousness
                - At least one clinical observation
                - At least 2 different assessors; at least 1 faculty`,
                "1.3": `Collect 10 observations of achievement:
                - Two observations of each procedure`
            }
        },
        2: {
            'ID': 'F',
            'topic': 'Foundations of Discipline (F)',
            subRoot: {
                "2.1": "Assessing, diagnosing, and providing initial management for patients with common acute medical presentations in acute care settings",
                "2.2": "Managing patients admitted to acute care settings with common medical problems and advancing their care plans",
                "2.3": "Consulting specialists and other health professionals, synthesizing recommendations, and integrating these into the care plan",
                "2.4": "Formulating, communicating, and implementing discharge plans for patients with common medical conditions in acute care settings",
                "2.5": "Assessing unstable patients, providing targeted treatment and consulting as needed",
                "2.6": "Discussing and establishing patients’ goals of care",
                "2.7": "Identifying personal learning needs while caring for patients, and addressing those needs"
            },
            maxObservation: {
                "2.1": 10,
                "2.2": 13,
                "2.3": 4,
                "2.4": 4,
                "2.5": 7,
                "2.6": 3,
                "2.7": 12
            },
            assessmentInfo: {
                "2.1": `Collect 10 observations of achievement:
                - At least 5 direct observation
                - At least 3 must be in the emergency department
                - At least 1 of each of the following: chest pain; shortness of breath; altered level of
                consciousness; fever; hemodynamic instability
                - At least 3 from staff `,
                "2.2": `Part A: Collect 8 observations of achievement
                - At least 8 different categories
                - At least 6 different assessors`,
                "2.3": `Collect 4 observations of achievement:
                - At least two from supervisor
                - At least one from other physician specialist
                - At least one from other health professional
                - At least two in ambulatory care setting`,
                "2.4": `Part A: Collect 2 observations of achievement:
                - At least one complex hospital stay `,
                "2.5": `Collect 7 observations of achievement
                - At least one from each category: acute respiratory distress; hemodynamic instability
                altered level of consciousness
                - No more than 3 in simulation setting
                - At least one in each category by most responsible physician`,
                "2.6": `Collect 3 observations of achievement
                - One from each category
                - Not more than one in simulation setting
                - At least 1 involves a substitute decision-maker
                - At least 2 staff as supervisor
                - At least 2 different assessors`,
                "2.7": `Competence Committee review of resident submissions
                Collect 12 submitted personal learning plans. `
            },
            filterTitles: {
                '2.1': ['Patient Visit', 'Case Mix', '', 'Direct vs Indirect\t5', 'Staff Observations\t3'],
                '2.2': ['', '', 'Type'],
                '2.3': ["Role of Observer", 'Setting', ''],
                '2.4': ["Complex Hospital Stay", '', 'Type'],
                '2.5': ["Presentation", "Setting", '', '', 'Staff Observations\t1'],
                '2.6': ["Category", "Setting", '', '', 'Staff Observations\t1'],
                '2.7': ['', '', '']
            },
            filterValuesDict: {
                '2.1': {
                    'Patient Visit': ["emergency department", "ward"],
                    'Case Mix': ["chest pain", "shortness of breath", "altered level of consciousness", "fever", "hemodynamic instability", "other"],
                    'Direct vs Indirect': ['direct\f5', 'indirect'],
                    'Staff Observations': ['staff\f3']
                },
                '2.2': {
                    'Type': ["Part A: Patient Assessment and Management", "Part B: Communication with Patient/Family", "Part C: Handover"],
                    'Staff Observations': ['staff\f2']
                },
                '2.3': {
                    'Role of Observer': ["supervisor", "physician specialist being consulted", "other health professional"],
                    'Setting': ["ambulatory care", "inpatient", "emergency department"]
                },
                '2.4': {
                    'Complex Hospital Stay': ["yes", 'no'],
                    'Type': ["Part A: Discharge plan documentation", "Part B: Discharge plan communication"]
                },
                '2.5': {
                    'Presentation': ["acute respiratory distress", "hemodynamic instability", "altered level of consciousness"],
                    'Setting': ["emergency department", "step-down unit", "critical care unit", "ward", "simulation"],
                    'Staff Observations': ['staff\f1']
                },
                '2.6': {
                    'Category': ["stable acute condition", "unstable acute condition", "progressive chronic condition"],
                    'Setting': ["ambulatory", "inpatient", "simulation"],
                    'Staff Observations': ['staff\f1']
                },
                '2.7': {}
            },
            clinicalPresentation: {
                '2.1': ["emergency department", "ward"],
                '2.2': [],
                '2.3': ["supervisor", "physician specialist being consulted", "other health professional"],
                '2.4': ["yes", 'no'],
                '2.5': ["acute respiratory distress", "hemodynamic instability", "altered level of consciousness"],
                '2.6': ["stable acute condition", "unstable acute condition", "progressive chronic condition"],
                '2.7': []
            },
            type: {
                '2.1': ["Part A: Initial assessments"],
                '2.2': ["Part A: Patient Assessment and Management", "Part B: Communication with Patient/Family", "Part C: Handover"],
                '2.3': ["Part A: Consulting others"],
                '2.4': ["Part A: Discharge plan documentation", "Part B: Discharge plan communication"],
                '2.5': ["Part A: Unstable patients"],
                '2.6': ["Part A: Goals of care"],
                '2.7': ["Part A: Acute presentations"]
            },
            patientDemographic: {
                '2.1': ["chest pain", "shortness of breath", "altered level of consciousness", "fever", "hemodynamic instability", "other"],
                '2.2': [],
                '2.3': ["ambulatory care", "inpatient", "emergency department"],
                '2.4': [],
                '2.5': ["emergency department", "step-down unit", "critical care unit", "ward", "simulation"],
                '2.6': ["ambulatory", "inpatient", "simulation"],
                '2.7': []
            }
        },
        3: {
            'ID': 'CORE',
            'topic': 'Core of Discipline (C)',
            subRoot: {
                "3.1": "Assessing, diagnosing, and managing patients with complex or atypical acute medical presentations",
                "3.2": "Assessing and managing patients with complex chronic conditions",
                "3.3": "Providing internal medicine consultation to other clinical services",
                "3.4": "Assessing, resuscitating, and managing unstable and critically ill patients",
                "3.5": "Performing the procedures of Internal Medicine",
                "3.6": "Assessing capacity for medical decision-making",
                "3.7": "Discussing serious and/or complex aspects of care with patients, families, and caregivers",
                "3.8": "Caring for patients who have experienced a patient safety incident (adverse event)",
                "3.9": "Caring for patients at the end of life",
                "3.10": "Implementing health promotion strategies in patients with or at risk for disease",
                "3.11": "Supervising junior learners in the clinical setting."
            },
            maxObservation: {
                "3.1": 18,
                "3.2": 17,
                "3.3": 18,
                "3.4": 14,
                "3.5": 22,
                "3.6": 3,
                "3.7": 3,
                "3.8": 2,
                "3.9": 5,
                "3.10": 4,
                "3.11": 6
            },
            assessmentInfo: {
                "3.1": `Collect 18 observations of achievement
                - At least 6 direct observations
                - At least 6 observations in ambulatory care setting
                - At least 4 of each focus of care
                - At least 6 different assessors`,
                "3.2": `Part A: Collect 12 observations of achievement
                - At least 6 in ambulatory care setting
                - Case mix must include a variety of conditions
                - At least 6 different faculty.

                Part B: Collect 5 observations of achievement
                - At least one from faculty
                - At least one from other health professional
                - At least 3 from different patients and/or families
                - Role of observer: faculty; other health professional; patient and/or family`,
                "3.3": `Part A: Collect 10 observations of achievement
                - At least 4 in peri-operative
                - At least one in obstetrical medicine
                - At least 3 in ambulatory setting
                - At least 3 different assessors.

                Part B: Collect 6 observations of achievement.
                Part C: Collect 2 observations of achievement`,
                "3.4": `Part A: Collect 14 observations of achievement
                - At least one from each presentation
                - At least 3 from each focus of care category
                - At least one from faculty for each presentation
                
                Part B: Collect multisource feedback from at least 6 observers
                - At least 2 nurses
                - At least 2 other health professions`,
                "3.5": `Part A: Collect 21 observations of achievement
                - At least one of each procedure in the clinical setting
                - At least 5 central line placements using ultrasound guidance
                -- Must include different sites
                - At least 3 thoracentesis
                - At least 3 paracentesis
                - At least 3 lumbar puncture
                - At least 2 arthrocentesis
                -- At least one knee
                - At least 3 airway management (bag and mask ventilation) and endotracheal
                intubations
                - At least 2 arterial line catheter insertions`,
                "3.6": `Collect 3 observations of achievement
                - At least one direct observation
                - At least one faculty/staff observer
                - At least 2 categories`,
                "3.7": `Collect 3 observations of achievement `,
                "3.8": `Collect 2 observations of achievement
                - At least one clinical
                - At least one observation of disclosure
                - At least one by a faculty member`,
                "3.9": `Part A: Collect 3 observations of achievement.

                Part B: Collect 2 observations of achievement:
                - Two different scenarios
                - At least one from clinical setting`,
                "3.10": `Collect 4 observations of achievement:
                - Case mix must include a range of conditions`,
                "3.11": `Part A: Collect 4 observations of achievement
                - At least 2 different junior learners.

                Part B: Collect 2 observations of achievement
                - At least one case load of medium complexity
                - Two different supervisors.`
            },
            filterTitles: {
                '3.1': ["Focus of Care", "Setting", '', 'Direct vs Indirect\t6', 'Staff Observations\t3'],
                '3.2': ["Condition", "Setting", 'Type'],
                '3.3': ["Case Mix", "Setting", 'Type'],
                '3.4': ["Focus of Care", "Presentation", 'Type'],
                '3.5': ["Procedure", "Site", 'Type'],
                '3.6': ["Category", "Type of Observation", '', '', 'Staff Observations\t3'],
                '3.7': ["Complexity", "Issue", ''],
                '3.8': ["Type of Event", "Setting", '', '', 'Staff Observations\t1'],
                '3.9': ["Scenario", '', 'Type'],
                '3.10': ["Condition", '', ''],
                '3.11': ['', '', 'Type']
            },
            filterValuesDict: {
                '3.1': {
                    'Focus of Care': ["initial assessment", "diagnosis", "management"],
                    'Setting': ["ambulatory care", "inpatient"],
                    'Direct vs Indirect': ['direct\f6', 'indirect'],
                    'Staff Observations': ['staff\f3']
                },
                '3.2': {
                    'Condition': ["asthma", "anemia", "arthritis", "cancer", "chronic fatigue", "chronic kidney disease", "chronic obstructive pulmonary disease", "congestive heart failure", "connective tissue disease", "coronary artery disease", "cirrhosis", "dementia", "diabetes mellitus", "hypertension", "other"],
                    'Setting': ["ambulatory care", "inpatient"],
                    'Type': ["Part A: Assessment, Diagnosis, and Management", "Part B: Patient Education/Communication"]
                },
                '3.3': {
                    'Case Mix': ["perioperative", "obstetrical medicine", "other clinical service"],
                    'Setting': ["ambulatory care", "inpatient"],
                    'Type': ["Part A: Patient Assessment and Decision-Making", "Part B: Written Communication", "Part C: Oral Communication"],
                    'Staff Observations': ['staff\f3']
                },
                '3.4': {
                    'Focus of Care': ["resuscitation", "initiating plan", "ongoing management"],
                    'Presentation': ["shock", "systemic inflammatory response syndrome/sepsis", "acute respiratory distress", "unstable cardiac rhythms", "acute coronary syndrome", "seizures/altered level of consciousness", "coagulation emergencies"],
                    'Type': ["Part A: Patient Care", "Part B: Interprofessional Care"]
                },
                '3.5': {
                    'Procedure': ["airway management & endotracheal intubation", "arterial line catheter insertion", "central line placement", "thoracentesis", "paracentesis", "lumbar puncture", "joint arthrocentesis"],
                    'Site': ["not applicable", "femoral", "internal jugular", "subclavian", "knee", "other joint"],
                    'Type': ["Part A: Procedure", "Part B: Submission of Procedure Log"]
                },
                '3.6': {
                    'Category': ["patient leaving hospital against medical advice", "patient refusing recommended treatment", "patient or substitute decision maker refusing recommended home supports or nursing home placement", "other"],
                    'Type of Observation': ["direct", "indirect"],
                    'Staff Observations': ['staff\f3']
                },
                '3.7': {
                    'Complexity': ["low", "medium", "high"],
                    'Issue': ["futility of care", "breaking bad news", "discharge related discussion", "conflicting recommendations of consultants"]
                },
                '3.8': {
                    'Type of Event': ["error", "near miss", "adverse event"],
                    'Setting': ['clinical', 'simulation'],
                    'Staff Observations': ['staff\f1']
                },
                '3.9': {
                    'Scenario': ["cancer", "organ failure", "neurodegenerative diseases"],
                    'Type': ["Part A: Symptom Management in End of Life Care", "Part B: Discussion about transition away from disease modifying treatment"]
                },
                '3.10': {
                    'Condition': ["asthma/COPD", "cancer screening in at risk populations", "diabetes", "falls/frailty", "immunocompromised patient", "medication reviews", "vaccinations", "vascular risk reduction", "other"]
                },
                '3.11': {
                    'Type': ["Part A: Teaching", "Part B: Running the Team"]
                },
            },
            clinicalPresentation: {
                '3.1': ["initial assessment", "diagnosis", "management"],
                '3.2': ["asthma", "anemia", "arthritis", "cancer", "chronic fatigue", "chronic kidney disease", "chronic obstructive pulmonary disease", "congestive heart failure", "connective tissue disease", "coronary artery disease", "cirrhosis", "dementia", "diabetes mellitus", "hypertension", "other"],
                '3.3': ["perioperative", "obstetrical medicine", "other clinical service"],
                '3.4': ["resuscitation", "initiating plan", "ongoing management"],
                '3.5': ["airway management & endotracheal intubation", "arterial line catheter insertion", "central line placement", "thoracentesis", "paracentesis", "lumbar puncture", "joint arthrocentesis"],
                '3.6': ["patient leaving hospital against medical advice", "patient refusing recommended treatment", "patient or substitute decision maker refusing recommended home supports or nursing home placement", "other"],
                '3.7': ["low", "medium", "high"],
                '3.8': ["error", "near miss", "adverse event"],
                '3.9': ["cancer", "organ failure", "neurodegenerative diseases"],
                '3.10': ["asthma/COPD", "cancer screening in at risk populations", "diabetes", "falls/frailty", "immunocompromised patient", "medication reviews", "vaccinations", "vascular risk reduction", "other"],
                '3.11': []
            },
            type: {
                '3.1': ["Part A: Acute presentations"],
                '3.2': ["Part A: Assessment, Diagnosis, and Management", "Part B: Patient Education/Communication"],
                '3.3': ["Part A: Patient Assessment and Decision-Making", "Part B: Written Communication", "Part C: Oral Communication"],
                '3.4': ["Part A: Patient Care", "Part B: Interprofessional Care"],
                '3.5': ["Part A: Procedure", "Part B: Submission of Procedure Log"],
                '3.6': ["Part A: Capacity"],
                '3.7': ["Part A: Complex discussions"],
                '3.8': ["Part A: Patient safety"],
                '3.9': ["Part A: Symptom Management in End of Life Care", "Part B: Discussion about transition away from disease modifying treatment"],
                '3.10': ["Part A: Health promotion"],
                '3.11': ["Part A: Teaching", "Part B: Running the Team"]
            },
            patientDemographic: {
                '3.1': ["ambulatory care", "inpatient"],
                '3.2': ["ambulatory care", "inpatient"],
                '3.3': ["ambulatory care", "inpatient"],
                '3.4': ["shock", "systemic inflammatory response syndrome/sepsis", "acute respiratory distress", "unstable cardiac rhythms", "acute coronary syndrome", "seizures/altered level of consciousness", "coagulation emergencies"],
                '3.5': ["not applicable", "femoral", "internal jugular", "subclavian", "knee", "other joint"],
                '3.6': ["direct", "indirect"],
                '3.7': ["futility of care", "breaking bad news", "discharge related discussion", "conflicting recommendations of consultants"],
                '3.8': ['clinical', 'simulation'],
                '3.9': [],
                '3.10': [],
                '3.11': []
            }
        },
        4: {
            'ID': 'TP',
            'topic': 'Transition to Practice (P)',
            subRoot: {
                "4.1": "Managing an inpatient medical service",
                "4.2": "Managing longitudinal aspects of care in a medical clinic",
                "4.3": "Assessing and managing patients in whom there is uncertainty in diagnosis and/or treatment",
                "4.4": "Providing consultation to off-site health care providers",
                "4.5": "Initiating and facilitating transfers of care through the health care system",
                "4.6": "(SA) EPA: Working with other physicians and healthcare providers to develop collaborative patient care plans",
                "4.7": "(SA) Identifying learning needs in clinical practice, and addressing them with a personal learning plan",
                "4.8": "(SA) Identifying and analyzing system-level safety, quality, or resource stewardship concerns in healthcare delivery"
            },
            maxObservation: {
                "4.1": 10,
                "4.2": 10,
                "4.3": 4,
                "4.4": 2,
                "4.5": 2,
                "4.6": 1,
                "4.7": 1,
                "4.8": 1
            },
            assessmentInfo: {
                "4.1": `Part A: Collect ten observations of achievement
                - A variety of medical diagnoses
                - A mix of acute and chronic conditions
                - At least 4 different assessors.
                
                Part B: Collect multisource feedback from at least 10 observers
                - At least 2 other health care professionals`,
                "4.2": `Part A: Collect ten observations of achievement.
                
                Part B: Collect feedback from 5 observers
                - At least 2 supervisors
                - At least 1 member of clinic staff.
                
                Part C: Collect feedback from 15 patients and collate into one report. `,
                "4.3": `Collect 4 observations of achievement
                - At least one review of consult note/written communication to other MD
                - At least one direct observation of communication with patient`,
                "4.4": `Collect 2 observations of achievement
                - At least one transfer to ward
                - At least one transfer to ICU/CCU`,
                "4.5": `Collect 2 observations of achievement
                - No more than one simulation`,
                "4.6": `Collect feedback from 8 observers
                - At least 2 supervisors
                - At least 3 consulting physicians
                - At least 2 other health care professionals`,
                "4.7": `Review of documentation by supervisor
                a. Review a submission-ready documentation of a “Personal Learning Plan (PLP)”
                appropriate for entry into MAINPORT in which a resident identifies:
                i) a personal knowledge or performance gap, or
                ii) an emerging need in the community that they serve
                and then creates and implements a plan to update their knowledge/skills
                b. Review the resident’s e-portfolio for evidence of literature searches, attendance at
                conferences, or other activity that addresses their learning needs over the TTP stage `,
                "4.8": `Resident submission must include all of the following:
                - For Project: Summary of data identifying the concern(s) in safety, quality or resource
                stewardship; Analysis of the human and system factors related to that concern
                - For advanced course: syllabus and evidence of participation
                - For committee: Summary of participation including examples of the concern(s) in
                safety, quality or resource stewardship and analysis of the human and system
                factors related to that concern`
            },
            filterTitles: {
                "4.1": ["Category", '', 'Type'],
                "4.2": ["Clinic Type", '', 'Type'],
                "4.3": ["Condition", "Type of undifferentiated issue", ''],
                "4.4": ['', '', ''],
                "4.5": ['', '', ''],
                "4.6": ['', '', ''],
                "4.7": ['', '', ''],
                "4.8": ['', '', '']
            },
            filterValuesDict: {
                '4.1': {
                    'Category': ["acute", "chronic", "both acute and chronic"],
                    'Type': ["Part A: Overall Patient Care", "Part B: Interprofessional Care"],
                },
                '4.2': {
                    'Clinic Type': ["general IM", "focused", "general subspecialty"],
                    'Type': ["Part A: Overall Patient Care", "Part B: Collaboration and Efficiency"],
                },
                '4.3': {
                    'Condition': ["acute", "chronic", "both acute and chronic"],
                    'Type of undifferentiated issue': ["limited data", "non-diagnostic data", "conflicting data"]
                },
                '4.4': {},
                '4.5': {},
                '4.6': {},
                '4.7': {},
                '4.8': {}
            },
            clinicalPresentation: {
                "4.1": ["acute", "chronic", "both acute and chronic"],
                "4.2": ["general IM", "focused", "general subspecialty"],
                "4.3": ["acute", "chronic", "both acute and chronic"],
                "4.4": [],
                "4.5": [],
                "4.6": [],
                "4.7": [],
                "4.8": []
            },
            patientDemographic: {
                "4.1": [],
                "4.2": [],
                "4.3": ["limited data", "non-diagnostic data", "conflicting data"],
                "4.4": [],
                "4.5": [],
                "4.6": [],
                "4.7": [],
                "4.8": []
            },
            type: {
                "4.1": ["Part A: Overall Patient Care", "Part B: Interprofessional Care"],
                "4.2": ["Part A: Overall Patient Care", "Part B: Collaboration and Efficiency"],
                "4.3": ["Part A: Uncertainty"],
                "4.4": ["Part A: Off-site consultations"],
                "4.5": ["Part A: Transfers"],
                "4.6": ["Part A: Interprofessional care"],
                "4.7": ["Part A: PLP"],
                "4.8": ["Part A: QA"]
            },
        },
    }
};

module.exports = programInfo;