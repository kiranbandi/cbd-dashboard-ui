const programInfo = {
    infoCardsVisible: false,
    examScoresVisible: false,
    narrativesVisible: true,
    // anesthesia uniquely has an epa mismatch where some residents
    // have epa 1.4 but the official guide doesnt 
    rotationList: ["CHR PAIN", "CV ANE", "ELECTIVE ", "EMERGENCY", "GIM", "GSX", "ICU", "IM SELECTIVE", "NICU", "OBS ANE", "OBSTETRICS", "OTHER", "PACU", "PALLIATIVE", "PEDIATRICS", "PEDS ANE", "PICU", "RADIOLOGY", "REG ANE", "REG CARDIO", "REG CV ANE", "RESEARCH", "RUH ANE", "SCH ANE", "SPEC", "SPH ANES", "STOON CARDIO", "SURG SELECTIVE", "TEE", "TRAUMA"],
    rotationRequired: {
        "SCH ANE": 5,
        "CV ANE": 5,
        "RUH ANE": 5,
        "OBS ANE": 5,
        "PACU": 5,
        "PEDS ANE": 5,
        "SPEC": 5,
        "SPH ANES": 5,
        "STOON CARDIO": 5,
        "REG CARDIO": 5,
        "IM SELECTIVE": 5,
        "GIM": 5,
        "CHR PAIN": 5,
        "TRAUMA": 5,
        "GSX": 5,
        "SURG SELECTIVE": 5,
        "OBSTETRICS": 5,
        "EMERGENCY": 5,
        "ICU": 5,
        "NICU": 5,
        "RADIOLOGY": 5,
        "PALLIATIVE": 5,
        "PICU": 5,
        "PEDIATRICS": 5,
        "REG ANE": 5,
        "REG CV ANE": 5,
        "RESEARCH": 5,
        "ELECTIVE ": 5,
        "TEE": 5,
        "OTHER": 5
    },
    epaSourceMap: {
        1: {
            'ID': 'TTD',
            'topic': 'Transition to Discipline (D)',
            subRoot: {
                '1.1': "Performing preoperative assessments for healthy adult patients who will be undergoing a non-complex scheduled surgical procedure",
                '1.2': "Monitoring adult patients undergoing non-complex surgical procedures, under general or regional anesthesia",
                '1.3': "Performing the postoperative transfer of care of healthy adult patients following a non-complex surgical procedures, including postoperative orders"
            },
            maxObservation: {
                '1.1': 4,
                '1.2': 3,
                '1.3': 3
            },
            assessmentInfo: {
                '1.1': `Part A: Collect observations from a large breadth of training experience with the expectations not
                all will be achieved, with a minimum of 3 observations of achievement.
                
                Part B: Submit logbook of patient assessment encounters.`,
                '1.2': `Collect observations from a large breadth of training experience with the expectations not
                all will be achieved, with a minimum of 3 observations of achievement `,
                '1.3': `Collect a minimum of 3 observations
                - At least 1 general anesthesia
                - At least 2 different assessors`,
            },
            clinicalPresentation: {
                '1.1': ["general surgery", "gynecology", "ophthalmology", "orthopedic surgery", "otolaryngology", "plastic surgery", "urology", "other surgery"],
                '1.2': ["general surgery", "gynecology", "ophthalmology", "orthopedic surgery", "otolaryngology", "plastic surgery", "urology", "other surgery"],
                '1.3': ["general surgery", "gynecology", "ophthalmology", "orthopedic surgery", "otolaryngology", "plastic surgery", "urology", "other surgery"]
            },
            patientDemographic: {
                '1.3': ["general", "regional", "monitored anesthesia care (MAC)"]
            },
            filterTitles: {
                '1.1': ['Procedure Type'],
                '1.2': ['Procedure Type'],
                '1.3': ['Procedure Type', 'Anesthesia Type'],
            },
            filterValuesDict: {
                '1.1': {
                    'Procedure Type': ["general surgery", "gynecology", "ophthalmology", "orthopedic surgery", "otolaryngology", "plastic surgery", "urology", "other surgery"]
                },
                '1.2': {
                    'Procedure Type': ["general surgery", "gynecology", "ophthalmology", "orthopedic surgery", "otolaryngology", "plastic surgery", "urology", "other surgery"]
                },
                '1.3': {
                    'Procedure Type': ["general surgery", "gynecology", "ophthalmology", "orthopedic surgery", "otolaryngology", "plastic surgery", "urology", "other surgery"],
                    'Anesthesia Type': ["general", "regional", "monitored anesthesia care (MAC)"]
                }
            }
        },
        2: {
            'ID': 'F',
            'topic': 'Foundations of Discipline (F)',
            subRoot: {
                '2.1': "Using the anesthetic assessment to generate the anesthetic considerations and management plan including postoperative disposition, and obtaining informed consent, for non-complex patients and non-complex surgery",
                '2.2': "Providing perioperative anesthetic management for non-complex cases in adult patients",
                '2.3': "Performing the non-airway basic procedures of Anesthesiology",
                '2.4': "Identifying patients presenting with an anticipated difficult airway and preparing for management options",
                '2.5': "Managing and coordinating patient positioning during anesthesia care and preventing and recognizing related complications",
                '2.6': "Anticipating, preventing and managing common or expected intraoperative events and physiologic changes during non-complex cases",
                '2.7': "(SA) Assessing the indications for transfusion of blood products and managing side effects and complications",
                '2.8': "Diagnosing and managing common issues in the post-anesthesia care unit (PACU), or the surgical ward",
                '2.9': "Initiating resuscitation and diagnosis of patients with life-threatening conditions in a time-appropriate manner",
                '2.10': "Assessing, diagnosing and managing patients with common medical or surgical presentations in acute care settings, and advancing their care plans.",
                '2.11': "Assessing pregnant patients and providing routine obstetric care or initial medical management for acute medical, surgical or obstetric conditions",
                '2.12': "Assessing and providing labour analgesia for healthy parturients with an uncomplicated pregnancy, including the management of common complications of labour analgesia",
                '2.13': "Providing anesthesia for patients undergoing non-complex cesarean section",
                '2.14': "Providing perioperative anesthetic management for non-complex cases in pediatric patients",
                '2.15': "Managing pediatric patients with common postoperative complications in the post anesthesia care unit or ward",
                '2.16': "Assessing and initiating management for pediatric patients with common medical conditions",
            },
            maxObservation: {
                '2.1': 8,
                '2.2': 21,
                '2.3': 21,
                '2.4': 5,
                '2.5': 8,
                '2.6': 6,
                '2.7': 1,
                '2.8': 8,
                '2.9': 3,
                '2.10': 8,
                '2.11': 3,
                '2.12': 13,
                '2.13': 5,
                '2.14': 3,
                '2.15': 3,
                '2.16': 4
            },
            assessmentInfo: {
                '2.1': `Collect observations from a large breadth of training experience with the expectations not
                all will be achieved, with a minimum of 8 observations of achievement
                - At least 3 involving consent`,
                '2.2': `Part A: Collect observations from a large breadth of training experiences including different types of
                anesthesia and priority of surgery with the expectations not all will be achieved, with a
                minimum of 20 observations of achievement.
                
                Part B: Feedback must come from different environments.
                
                Part C: Submit resident logbook of anesthetic cases.`,
                '2.3': `Part A: Collect 20 observations of achievement:
                - At least 2 arterial lines
                - At least 5 central lines
                - At least 5 spinals.
                
                Part B: Submit logbook of procedures performed.
                Logbook should demonstrate performance of at least 20 of each procedure.`,
                '2.4': `Collect observations of a variety of management plans, with a minimum of 5 observations of
                achievement`,
                '2.5': `Collect a minimum of 8 observations
                - At least five different positions`,
                '2.6': `Part A: Collect observations from a large breadth of training experience with the expectations not
                all will be achieved, with a minimum of 5 observations of achievement.
                
                Part B: Written submission to supervisor of a reflection on a patient safety event or near miss.
                Supervisor’s summary of the debrief is submitted to the Competence Committee.`,
                '2.7': `The Specialty Committee has not provided guidance for the entrustment of this EPA.
                Entrustment decisions are left to discretion of the Competence Committee`,
                '2.8': `Collect observations from a large breadth of training experience and issues with the
                expectations not all will be achieved, with a minimum of 8 observations of achievement
                These observations should be performed in both the PACU and on the surgical ward
                - At least 4 managing pain `,
                '2.9': `Collect at least 3 observations of achievement `,
                '2.10': `Collect observations from a large breadth of training experience with the expectations not
                all will be achieved, with a minimum of 8 observations of achievement
                - At least 4 observations of achievement for patient assessment, diagnosis and/or
                management (including at least 1 staff and both medical and surgical conditions)
                - At least 2 observations of handover (including 1 staff observation)`,
                '2.11': `Collect at least 3 observations of achievement
                At least 1 observation of a routine assessment
                At least 1 observation of an acute medical, surgical or obstetric condition`,
                '2.12': `Part A: Collect observations from a large breadth of training experience with the expectations not
                all will be achieved, with a minimum of 10 observations of achievement
                - At least 6 direct observations.
                
                Part B: Collect at least 3 observations of achievement.`,
                '2.13': `Collect a minimum of 5 observations of achievement.`,
                '2.14': `Collect observations from a large breadth of training experience with the expectations not
                all will be achieved, with at least 3 observations of achievement
                - At least two observations of patients under the age of 10`,
                '2.15': `Collect observations from a large breadth of training experience with the expectations not
                all will be achieved, with a minimum of 3 observations of achievement
                - At least two patients under the age of 10
                - At least two different settings `,
                '2.16': `Collect observations from a large breadth of training experience with the expectations not
                all will be achieved, with at least 4 observations of achievement
                - At least 2 patients under the age of 10`
            },
            clinicalPresentation: {
                '2.1': ["general surgery", "gynecology", "ophthalmology", "orthopedic surgery", "otolaryngology", "plastic surgery", "trauma", "urology", "other surgery"],
                '2.2': ["general surgery", "gynecology", "ophthalmology", "orthopedic surgery", "otolaryngology", "plastic surgery", "trauma", "urology", "other surgery"],
                '2.3': ["arterial line", "central line", "spinal"],
                '2.5': ["general surgery", "gynecology", "ophthalmology", "orthopedic surgery", "otolaryngology", "plastic surgery", "urology", "spine surgery", "neurosurgery", "other surgery"],
                '2.8': ["general surgery", "gynecology", "neurosurgery", "ophthalmology", "orthopedic surgery", "otolaryngology", "plastic surgery", "thoracic surgery", "urology", "vascular surgery", "other surgery"],
                '2.10': ["surgical condition", "chest pain", "shortness of breath", "altered LOC", "fever", "hemodynamic instability", "other condition"],
                '2.12': ['direct', 'case review'],
                '2.13': ['scheduled', 'urgent']
            },
            patientDemographic: {
                '2.1': ["not done", "done", "language barrier", "cognitive impairment", "substitute decision maker"],
                '2.2': ["general", "neuraxial", "regional", "monitored anesthesia care (MAC)"],
                '2.3': ["not applicable", "jugular", "subclavian", "femoral", "PICC"],
                '2.5': ["supine", "supine with laparoscopic surgery", "gynecologic positioning/lithotomy", "lateral decubitus", "prone", "sitting/semi-sitting", "other"],
                '2.8': ["pain", "nausea and/or vomiting", "hypotension", "hypertension", "arrhythmias", "cardiac ischemia", "hypoxemia", "respiratory depression", "bronchospasm", "pulmonary edema", "deep venous thrombosis", "delirium", "slow awakening", "decreased urine output", "other issue"],
                '2.10': ["surgical ward", "medical ward", "coronary care unit", "ICU", "ER", "other location"],
                '2.12': ['epidural', 'other analgesia'],
                '2.13': ["spinal", "use of epidural previously inserted for labor analgesia", "GA"]
            },
            filterTitles: {
                '2.1': ['Procedure Type', 'Observation Consent'],
                '2.2': ['Procedure Type', 'Anesthesia Type'],
                '2.3': ['Procedure Type', 'Site of Central Line'],
                '2.5': ['Procedure Type', 'Patient Position'],
                '2.8': ['Procedure Type', 'Issue Type'],
                '2.10': ['Condition', 'Location'],
                '2.12': ['Observation Type', 'Analgesia Type'],
                '2.13': ['Surgery Priority', 'Anesthesia Type']
            },
            filterValuesDict: {
                '2.1': {
                    'Procedure Type': ["general surgery", "gynecology", "ophthalmology", "orthopedic surgery", "otolaryngology", "plastic surgery", "trauma", "urology", "other surgery"],
                    'Observation Consent': ["not done", "done", "language barrier", "cognitive impairment", "substitute decision maker"]
                },
                '2.2': {
                    'Procedure Type': ["general surgery", "gynecology", "ophthalmology", "orthopedic surgery", "otolaryngology", "plastic surgery", "trauma", "urology", "other surgery"],
                    'Anesthesia Type': ["general", "neuraxial", "regional", "monitored anesthesia care (MAC)"]
                },
                '2.3': {
                    'Procedure Type': ["arterial line", "central line", "spinal"],
                    'Site of Central Line': ["not applicable", "jugular", "subclavian", "femoral", "PICC"]
                },
                '2.4': {},
                '2.5': {
                    'Procedure Type': ["general surgery", "gynecology", "ophthalmology", "orthopedic surgery", "otolaryngology", "plastic surgery", "urology", "spine surgery", "neurosurgery", "other surgery"],
                    'Patient Position': ["supine", "supine with laparoscopic surgery", "gynecologic positioning/lithotomy", "lateral decubitus", "prone", "sitting/semi-sitting", "other"]
                },
                '2.6': {},
                '2.7': {},
                '2.8': {
                    'Procedure Type': ["general surgery", "gynecology", "neurosurgery", "ophthalmology", "orthopedic surgery", "otolaryngology", "plastic surgery", "thoracic surgery", "urology", "vascular surgery", "other surgery"],
                    'Issue Type': ["pain", "nausea and/or vomiting", "hypotension", "hypertension", "arrhythmias", "cardiac ischemia", "hypoxemia", "respiratory depression", "bronchospasm", "pulmonary edema", "deep venous thrombosis", "delirium", "slow awakening", "decreased urine output", "other issue"]
                },
                '2.9': {},
                '2.10': {
                    'Condition': ["surgical condition", "chest pain", "shortness of breath", "altered LOC", "fever", "hemodynamic instability", "other condition"],
                    'Location': ["surgical ward", "medical ward", "coronary care unit", "ICU", "ER", "other location"]
                },
                '2.11': {},
                '2.12': {
                    'Observation Type': ['direct', 'case review'],
                    'Analgesia Type': ['epidural', 'other analgesia']
                },
                '2.13': {
                    'Surgery Priority': ['scheduled', 'urgent'],
                    'Anesthesia Type': ["spinal", "use of epidural previously inserted for labor analgesia", "GA"]
                },
                '2.14': {},
                '2.15': {},
                '2.16': {}
            }
        },
        3: {
            'ID': 'CORE',
            'topic': 'Core of Discipline (C)',
            subRoot: {
                '3.1': "Using the anesthetic assessment to generate the anesthetic considerations and management plan, including prioritization and optimization, for patients with complex medical issues or surgeries",
                '3.2': "Providing anesthetic management for patients with defined critical illness",
                '3.3': "Providing perioperative anesthetic management for patients with significant cardiac disease",
                '3.4': "Managing patients presenting with a difficult airway, including developing plans for extubation",
                '3.5': "Initiating and leading resuscitation for unstable patients in the perioperative period",
                '3.6': "Demonstrating required skills in POCUS (point of care ultrasound) to answer a clinical question.",
                '3.7': "Providing peripartum anesthetic management for high-risk parturients",
                '3.8': "(SA) Initiating resuscitation and providing anesthetic management for unstable parturients",
                '3.9': "Assessing, investigating, optimizing and formulating anesthetic plans for more complex pediatric cases",
                '3.10': "Providing perioperative anesthetic management for pediatric patients with more complex cases",
                '3.11': "Providing perioperative anesthetic management incorporating a peripheral nerve block technique",
                '3.12': "Diagnosing and providing management for patients with complications of regional anesthesia",
                '3.13': "Providing anesthetic management for patients undergoing procedures outside the usual environment of the operating room",
                '3.14': "Providing perioperative management for patients requiring airway diagnostic and therapeutic procedures",
                '3.15': "Providing perioperative anesthetic management for patients undergoing vascular surgery",
                '3.16': "Providing perioperative anesthetic management for patients undergoing spinal procedures",
                '3.17': "Providing perioperative anesthetic management for patients undergoing intracranial procedures",
                '3.18': "Providing perioperative anesthetic management for patients undergoing thoracic surgery",
                '3.19': "Assessing and providing comprehensive multi-modal management for patients with complex acute pain",
                '3.20': "Assessing, diagnosing and formulating management options for patients with common chronic pain disorders",
                '3.21': "Providing comprehensive ongoing management of critically ill patients in an intensive care setting",
                '3.22': "Initiating and leading resuscitation for unstable patients, outside of the operating room or PACU",
                '3.23': "Managing goals of care discussions with patients and families, including perioperative care plans",
                '3.24': "(SA) Providing care for patients who have experienced a patient safety incident",
                '3.25': "(SA) Recognizing and managing ethical dilemmas that arise in the course of patient care"
            },
            maxObservation: {
                '3.1': 10,
                '3.2': 5,
                '3.3': 6,
                '3.4': 6,
                '3.5': 6,
                '3.6': 3,
                '3.7': 10,
                '3.8': 2,
                '3.9': 5,
                '3.10': 5,
                '3.11': 11,
                '3.12': 5,
                '3.13': 3,
                '3.14': 5,
                '3.15': 6,
                '3.16': 6,
                '3.17': 8,
                '3.18': 8,
                '3.19': 6,
                '3.20': 4,
                '3.21': 7,
                '3.22': 7,
                '3.23': 3,
                '3.24': 1,
                '3.25': 1
            },
            assessmentInfo: {
                '3.1': `Collect observations from a large breadth of training experience with the expectations not
                all will be achieved, with a minimum of 10 observations of achievement`,
                '3.2': `Collect observations from a large breadth of training experiences including patients with
                various critical illnesses with the expectations not all will be achieved, with a minimum of 5
                observations of achievement `,
                '3.3': `Collect observation from a large breadth of training experiences including patients with
                various cardiac disease with the expectations not all will be achieved, with a minimum of 6
                observations of achievement
                - At least one each of: severe mitral valve disease; severe aortic stenosis;
                significant left ventricular dysfunction.`,
                '3.4': `Collect observations from a large breadth of both anticipated and unanticipated difficult
                airway with the expectations not all will be achieved, with a minimum of six (6)
                observations of achievement `,
                '3.5': `Collect observations from a large breadth of training experiences including major
                polytraumatic injury, with the expectations not all will be achieved, with a minimum of 6
                observations of achievement. `,
                '3.6': `Collect observations from a large breadth of situations including different types of exams
                with the expectation not all will be achieved, with a minimum of
                - 3 direct observations obtaining transthoracic cardiac standard views
                - 3 direct observations applying ultrasound data to answer a clinical question`,
                '3.7': `Part A: Collect observations from a large breadth of training experience with the expectations not
                all will be achieved, with a minimum of 10 observations of achievement
                - At least one cesarean section under general anesthesia.
                
                Part B: Multiple observers provide feedback individually, which is then collated to one report.`,
                '3.8': `Collect observations from a large breadth of training experience with the expectations not
                all will be achieved, with a minimum of 2 observations of achievement`,
                '3.9': `Collect observations from a large breadth of training experiences including different types of
                procedures and patient comorbidity with the expectations not all will be achieved, with a
                minimum of 5 observations of achievement
                - At least two patients under the age of 3`,
                '3.10': `Collect observations from a large breadth of training experiences including different types of
                procedures and patient comorbidity with the expectations not all will be achieved, with a
                minimum of 5 observations of achievement
                - At least two patients under the age of three
                - For achievement, the complexity of cases should be in line with what is expected to
                be managed by an anesthesiologist who does not have pediatric anesthesiology
                training. However, observations should also be completed for more complex cases.`,
                '3.11': `Part A: Collect observations from a large breadth of regional anesthesia experience with the
                expectations not all will be achieved, with a minimum of10 observations of achievement
                - At least 3 upper limb
                - At least 3 lower limb
                - At least 1 trunk block.
                
                Part B: Submit logbook of regional anesthesia experience
                Logbook tracks
                - Location of block: upper limb; lower limb; trunk; other
                - Type of block: interscalenic; supra-clavicular; infra-clavicular; axillary; peripheral
                block; transversus abdominis plane block; sciatic nerve; femoral nerve; popliteal
                sciatic; ankle block; other block.`,
                '3.12': `Collect observations from a large breadth of training experience and issues with the
                expectations not all will be achieved, with a minimum of 5 observations of achievement.`,
                '3.13': `Collect observations from a large breadth of training experiences including various
                environments, various patient populations and various types of anesthesia with the
                expectations not all will be achieved, with a minimum of 3 observations of achievement.`,
                '3.14': `Collect observations from a large breadth of training with the expectations not all will be
                achieved, with a minimum of 5 observations of achievement. `,
                '3.15': `Collect observations from a large breadth of training experiences with the expectations not
                all will be achieved, with a minimum of 6 observations of achievement.`,
                '3.16': `Collect observations from a large breadth of training experiences with the expectations no
                all will be achieved, with a minimum of 6 observations of achievement.`,
                '3.17': `Collect observations from a large breadth of training experiences with the expectations not
                all will be achieved, with a minimum of 8 observations of achievement
                - At least two patients with increased intracranial pressure.`,
                '3.18': `Collect observations from a large breadth of training experiences with the expectations not
                all will be achieved, with a minimum of 8 observations of achievement
                - At least one lung resection
                - At least one anterior mediastinal mass (can be completed by simulation or case
                discussion).`,
                '3.19': `Collect observations from a large breadth of training experiences and issues, including
                complications of pain management, with the expectations not all will be achieved, with a
                minimum of 6 observations of achievement.`,
                '3.20': `Collect observations from a large breadth of training experiences with the expectations not
                all will be achieved, with a minimum of 4 observations of achievement.`,
                '3.21': `Part A: Collect observations from a large breadth of training experience with the expectations not
                all will be achieved, with a minimum of 7 observations of achievement including 3 different
                primary diagnoses.
                
                Part B: Multiple observers provide feedback individually, which is then collated to one report.`,
                '3.22': `Collect observations from a large breadth of training experiences with the expectations not
                all will be achieved, with a minimum of 7 observations of achievement.
                - At least 3 different type of conditions
                - At least 1 on ward or in ER. `,
                '3.23': `Collect 3 observations of achievement
                - At least one from perioperative setting.`,
                '3.24': `One direct observation or chart review and debrief by supervisor `,
                '3.25': `Review by supervisor of resident submission of a brief critique (max 2 pages) that identifies
                the clinical issue, the relevant ethical concepts, any relevant legal, professional or
                institutional statements and the outcome.`
            },
            clinicalPresentation: {
                '3.1': ["cardiac surgery", "general surgery", "gynecology", "neurosurgery", "ophthalmology", "orthopedic surgery", "otolaryngology", "plastic surgery", "thoracic surgery", "urology", "vascular surgery"],
                '3.2': ["circulatory", "respiratory", "renal", "other life support"],
                '3.3': ["coronary disease", "mitral stenosis", "mitral regurgitation", "aortic stenosis", "aortic regurgitation", "cardiomyopathy", "left ventricular dysfunction", "right ventricular dysfunction"],
                '3.4': ["anticipated difficult BMV", "unanticipated difficult BMV", "anticipated difficult intubation", "unanticipated difficult intubation", "airway foreign body", "other airway issue"],
                '3.5': ['OR', 'PACU'],
                '3.7': ['yes', 'no'],
                '3.11': ["upper limb", "lower limb", "trunk", "other location"],
                '3.15': ["aortic surgery", "carotid surgery", "peripheral vascular surgery"],
                '3.16': ["lumbar surgery", "thoracic surgery", "cervical surgery", "scoliosis surgery", "unstable cervical spine surgery", "other surgery"],
                '3.17': ["tumour", "pituitary tumour", "vascular intracranial surgery", "functional neurosurgery", "neuroradiology", "other procedure"],
                '3.18': ["thoracotomy", "thoracoscopy", "other surgery"],
                '3.19': ['initial assessment', 'followup care'],
                '3.21': ["cardiac disease", "neurologic disease", "respiratory disease", "sepsis", "trauma", "shock", "postoperative", "other diagnosis"],
                '3.22': ["cardiac event", "neurologic event", "respiratory failure", "sepsis", "shock", "other condition"]

            },
            patientDemographic: {
                '3.1': ["cancer: cardiovascular disease", "connective tissue disease", "diabetes mellitus", "end organ disease", "endocrine disorders", "frailty", "significant hematological disorders", "infectious diseases", "morbid obesity", "neurological diseases", "neuromuscular and musculoskeletal disease", "obstructive sleep apnea (OSA)", "organ transplantation", "advanced significant respiratory disease"],
                '3.3': ['cardiac', 'other surgery'],
                '3.4': ["fiberoptic", "direct laryngoscopy", "video laryngoscopy", "adjunct airway use", "other management technique"],
                '3.5': ["cardiac arrest", "unstable arrhythmia", "polytrauma", "massive hemorrhage", "severe burn", "sepsis, shock", "other condition"],
                '3.7': ["spinal", "epidural", "combined spinal/epidural", "general", "other anesthesia"],
                '3.11': ["interscalenic", "supra-clavicular", "infra-clavicular", "axillary", "peripheral block", "transversus abdominis plane block", "sciatic nerve", "femoral nerve", "popliteal sciatic", "ankle block", "other block"],
                '3.15': ["arterial line", "central line", "spinal cord protection", "cerebral monitoring, lung isolation"],
                '3.16': ['elective', 'emergency'],
                '3.17': ['yes', 'no'],
                '3.18': ["lung resection", "pneumonectomy", "esophagectomy", "mediastinoscopy", "surgery for anterior mediastinal mass", "other procedure"],
                '3.19': ['yes', 'no'],
                '3.21': ['initial assessment', 'daily care'],
                '3.22': ['ICU', 'ER', 'ward']

            },
            filterTitles: {
                '3.1': ['Procedure Type', 'Co-morbidity Type'],
                '3.2': ['Critical Life Support Type'],
                '3.3': ['Cardiac Diesease Type', 'Surgery Type'],
                '3.4': ['Airway Issue', 'Airway Management Technique'],
                '3.5': ['Setting', 'Condition Type'],
                '3.7': ['Urgent', 'Anesthesia Type'],
                '3.11': ['Location of block', 'Type of block'],
                '3.15': ['Procedure Type', 'Type of monitors'],
                '3.16': ['Surgery Type', 'Timing'],
                '3.17': ['Type of neurosurgical procedure', 'Increased intracranial pressure'],
                '3.18': ['Surgery Type', 'Procedure Type'],
                '3.19': ['Issue Type', 'Complication of Pain Management'],
                '3.21': ['Primary diagnosis', 'Setting'],
                '3.22': ['Type of condition', 'Location']
            },
            filterValuesDict: {
                '3.1': {
                    'Procedure Type': ["cardiac surgery", "general surgery", "gynecology", "neurosurgery", "ophthalmology", "orthopedic surgery", "otolaryngology", "plastic surgery", "thoracic surgery", "urology", "vascular surgery"],
                    'Co-morbidity Type': ["cancer: cardiovascular disease", "connective tissue disease", "diabetes mellitus", "end organ disease", "endocrine disorders", "frailty", "significant hematological disorders", "infectious diseases", "morbid obesity", "neurological diseases", "neuromuscular and musculoskeletal disease", "obstructive sleep apnea (OSA)", "organ transplantation", "advanced significant respiratory disease"]
                },
                '3.2': {
                    'Critical Life Support Type': ["circulatory", "respiratory", "renal", "other life support"]
                },
                '3.3': {
                    'Cardiac Diesease Type': ["coronary disease", "mitral stenosis", "mitral regurgitation", "aortic stenosis", "aortic regurgitation", "cardiomyopathy", "left ventricular dysfunction", "right ventricular dysfunction"],
                    'Surgery Type': ['cardiac', 'other surgery']
                },
                '3.4': {
                    'Airway Issue': ["anticipated difficult BMV", "unanticipated difficult BMV", "anticipated difficult intubation", "unanticipated difficult intubation", "airway foreign body", "other airway issue"],
                    'Airway Management Technique': ["fiberoptic", "direct laryngoscopy", "video laryngoscopy", "adjunct airway use", "other management technique"]
                },
                '3.5': {
                    'Setting': ['OR', 'PACU'],
                    'Condition Type': ["cardiac arrest", "unstable arrhythmia", "polytrauma", "massive hemorrhage", "severe burn", "sepsis, shock", "other condition"]
                },
                '3.6': {},
                '3.7': {
                    'Urgent': ['yes', 'no'],
                    'Anesthesia Type': ["spinal", "epidural", "combined spinal/epidural", "general", "other anesthesia"]
                },
                '3.8': {},
                '3.9': {},
                '3.10': {},
                '3.11': {
                    'Location of block': ["upper limb", "lower limb", "trunk", "other location"],
                    'Type of block': ["interscalenic", "supra-clavicular", "infra-clavicular", "axillary", "peripheral block", "transversus abdominis plane block", "sciatic nerve", "femoral nerve", "popliteal sciatic", "ankle block", "other block"]
                },
                '3.12': {},
                '3.13': {},
                '3.14': {},
                '3.15': {
                    'Procedure Type': ["aortic surgery", "carotid surgery", "peripheral vascular surgery"],
                    'Type of monitors': ["arterial line", "central line", "spinal cord protection", "cerebral monitoring, lung isolation"]
                },
                '3.16': {
                    'Surgery Type': ["lumbar surgery", "thoracic surgery", "cervical surgery", "scoliosis surgery", "unstable cervical spine surgery", "other surgery"],
                    'Timing': ['elective', 'emergency']
                },
                '3.17': {
                    'Type of neurosurgical procedure': ["tumour", "pituitary tumour", "vascular intracranial surgery", "functional neurosurgery", "neuroradiology", "other procedure"],
                    'Increased intracranial pressure': ['yes', 'no']
                },
                '3.18': {
                    'Surgery Type': ["thoracotomy", "thoracoscopy", "other surgery"],
                    'Procedure Type': ["lung resection", "pneumonectomy", "esophagectomy", "mediastinoscopy", "surgery for anterior mediastinal mass", "other procedure"]
                },
                '3.19': {
                    'Issue Type': ['initial assessment', 'followup care'],
                    'Complication of Pain Management': ['yes', 'no']
                },
                '3.20': {},
                '3.21': {
                    'Primary diagnosis': ["cardiac disease", "neurologic disease", "respiratory disease", "sepsis", "trauma", "shock", "postoperative", "other diagnosis"],
                    'Setting': ['initial assessment', 'daily care']
                },
                '3.22': {
                    'Type of condition': ["cardiac event", "neurologic event", "respiratory failure", "sepsis", "shock", "other condition"],
                    'Location': ['ICU', 'ER', 'ward']
                },
                '3.23': {},
                '3.24': {},
                '3.25': {}
            }
        },
        4: {
            'ID': 'TP',
            'topic': 'Transition to Practice (P)',
            subRoot: {
                '4.1': "Managing all aspects of care for patients presenting to a preoperative clinic",
                '4.2': "Managing all aspects of anesthesia care for a scheduled day list",
                '4.3': "Providing anesthesia services for an on-call period",
                '4.4': "Managing all aspects of care for obstetrical anesthesia services",
                '4.5': "(SA) Developing an academic portfolio",
            },
            maxObservation: {
                '4.1': 8,
                '4.2': 10,
                '4.3': 5,
                '4.4': 5,
                '4.5': 3
            },
            assessmentInfo: {
                '4.1': `Part A: Collect 3 observations of achievement (i.e. 3 different clinic days).
                
                Part B: Chart audit by supervisor or review of the preoperative chart by the anesthesiologist
                performing the case. Collect observations of achievement for 5 cases.`,
                '4.2': `Collect observations from a large breadth of training experience with the expectation that
                not all will be achieved, with a minimum of 10 observations of achievement
                - At least 1 pediatric list`,
                '4.3': `Collect observations from a large breadth of training experiences including during different
                types of on-call period with the expectations not all will be achieved, with a minimum of 5
                observations of achievement`,
                '4.4': `Collect observations from a large breadth of training experiences including during both day
                and night shifts with the expectations not all will be achieved, with a minimum of 5
                observations of achievement`,
                '4.5': `Part A: Teaching dossier
                Review by competence committee of resident’s submission of a teaching dossier.

                Part B: Scholarly Project
                Review by competence committee of resident’s submission of a scholarly project completed
                during training.
                
                Part C: Personal Learning
                Review by competence committee of resident’s submission of a personal learning plan `
            },
            clinicalPresentation: {
                '1.1': ["general surgery", "gynecology", "neurosurgery", "ophthalmology", "orthopedic surgery", "otolaryngology", "plastic surgery", "spinal surgery", "thoracic surgery", "urology", "vascular surgery"],
                '1.2': ["general surgery", "gynecology", "neurosurgery", "ophthalmology", "orthopedic surgery", "otolaryngology", "plastic surgery", "spinal surgery", "thoracic surgery", "urology", "vascular surgery", "out-of-OR procedures"],
                '1.3': ["week night", "weekend day", "weekend night"],
                '1.4': ["day", "night"],

            },
            patientDemographic: {
                '1.1': ['low', 'medium', 'high'],
                '1.2': ['low', 'medium', 'high'],
                '1.3': ['low', 'medium', 'high'],
                '1.4': ['low', 'medium', 'high']
            },
            filterTitles: {
                '1.1': ['Procedure Type', 'Complexity'],
                '1.2': ['Procedure Type', 'Complexity'],
                '1.3': ['Shift Type', 'Complexity'],
                '1.4': ['Time', 'Complexity']
            },
            filterValuesDict: {
                '4.1': {
                    'Procedure Type': ["general surgery", "gynecology", "neurosurgery", "ophthalmology", "orthopedic surgery", "otolaryngology", "plastic surgery", "spinal surgery", "thoracic surgery", "urology", "vascular surgery"],
                    'Complexity': ['low', 'medium', 'high']
                },
                '4.2': {
                    'Procedure Type': ["general surgery", "gynecology", "neurosurgery", "ophthalmology", "orthopedic surgery", "otolaryngology", "plastic surgery", "spinal surgery", "thoracic surgery", "urology", "vascular surgery", "out-of-OR procedures"],
                    'Complexity': ['low', 'medium', 'high']
                },
                '4.3': {
                    'Shift Type': ["week night", "weekend day", "weekend night"],
                    'Complexity': ['low', 'medium', 'high']
                },
                '4.4': {
                    'Time': ["day", "night"],
                    'Complexity': ['low', 'medium', 'high']
                },
                '4.5': {}
            }
        },
    }
};

module.exports = programInfo;