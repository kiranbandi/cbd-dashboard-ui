const programInfo = {
    programName: "GENSURG",
    infoCardsVisible: false,
    examScoresVisible: false,
    narrativesVisible: true,
    rotationList: ["ACS RUH", "ACS SPH", "ELECTIVE", "ENDO", "GSX A", "GSX B", "GSX ORANGE", "GSX REGINA", "GSX YELLOW", "ICU", "PEDS SX", "PINK", "PLASTICS", "RESEARCH", "SELECTIVE", "SURG ONC", "THORACICS", "TRAUMA", "VASCULAR", "OTHER"],
    rotationRequired: {
        "ACS RUH": 10,
        "ACS SPH": 10,
        "ELECTIVE": 10,
        "ENDO": 10,
        "GSX A": 10,
        "GSX B": 10,
        "GSX ORANGE": 10,
        "GSX REGINA": 10,
        "GSX YELLOW": 10,
        "ICU": 10,
        "PEDS SX": 10,
        "PINK": 10,
        "PLASTICS": 10,
        "RESEARCH": 10,
        "SELECTIVE": 10,
        "SURG ONC": 10,
        "THORACICS": 10,
        "TRAUMA": 10,
        "VASCULAR": 10,
        "OTHER": 10
    },
    epaSourceMap: {
        1: {
            'ID': 'TTD',
            'topic': 'Transition to Discipline (D)',
            subRoot: {},
            maxObservation: {},
            clinicalPresentation: {},
            patientDemographic: {},
            filterTitles: {},
            filterValuesDict: {}
        },
        2: {
            'ID': 'F',
            'topic': 'Foundations of Discipline (F)',
            subRoot: {
                "2.1": "Assessing and providing initial management plans for patients presenting with a simple General Surgery problem",
                "2.2": "Recognizing and initiating management for patients with a surgical abdomen/acute abdomen",
                "2.3": "Performing fundamental skills in General Surgery",
                "2.4": "Performing the pre-procedural assessment and risk optimization for patients undergoing endoscopy",
                "2.5": "(SA) Developing a proposal for a scholarly project"
            },
            maxObservation: {
                "2.1": 5,
                "2.2": 3,
                "2.3": 6,
                "2.4": 6,
                "2.5": 1
            },
            assessmentInfo: {
                "2.1": `Collect 5 observations of achievement
                - At least 1 direct observation
                - At least 2 different observers
                - At least 3 observations by faculty`,
                "2.2": `Collect 3 observations of achievement
                - At least 2 observations by faculty`,
                "2.3": `Collect 6 observations of achievement
                - At least 2 laparotomy, including 1 opening and 1 closing
                - At least 2 laparoscopy
                - No more than 1 simulated scenario for each surgical task
                - At least 3 observations by faculty`,
                "2.4": `Part A: Consent
                Collect 2 observations of achievement
                - At least 1 observation by faculty
                
                Part B: Patient preparation
                Collect 4 observations of achievement
                - At least 1 upper endoscopy
                - At least 1 lower endoscopy
                - At least 1 non-elective
                - At least 2 different observers
                - At least 2 observations by faculty`,
                "2.5": `Collect 1 observation of achievement`,
            },
            filterValuesDict: {
                '2.1': {
                    "Setting": ["inpatient", "outpatient", "emergency"],
                    "Observation": ["direct", "indirect"]
                },
                '2.2': {
                    "Setting": ["inpatient", "emergency department", "ICU"],
                    "Observation": ["direct", "case review"]
                },
                '2.3': {
                    'Procedure': ["laparotomy", "laparoscopy"],
                    'Setting': ["OR", "simulation lab"]
                },
                '2.4': {
                    'Type': ["Part A: Consent", "Part B: Patient preparation"],
                    'Endoscopy': ["upper", "lower"],
                    'Urgency': ["elective", "non-elective"],
                    "Setting": ["clinic", "endoscopy suite", "inpatient", "emergency department", "ICU"]
                },
                '2.5': {}
            }
        },
        3: {
            'ID': 'CORE',
            'topic': 'Core of Discipline (C)',
            subRoot: {
                "3.1": "Providing surgical consultation",
                "3.2": "Providing initial assessment and management of patients with multiple traumatic injuries",
                "3.3": "Leading the team providing care for an inpatient surgical service",
                "3.4": "Providing follow-up care",
                "3.5": "Performing procedures on the stomach and duodenum",
                "3.6": "Performing procedures on the small bowel",
                "3.7": "Performing procedures on the appendix and colon",
                "3.8": "Performing procedures on the rectum and anus",
                "3.9": "Performing procedures on the hepatobiliary system",
                "3.10": "Performing procedures on the pancreas",
                "3.11": "Performing procedures on the spleen",
                "3.12": "Performing procedures on the lymph nodes",
                "3.13": "Performing procedures on the breast",
                "3.14": "Performing procedures on the abdominal wall and hernia",
                "3.15": "Performing procedures on the skin and soft tissue",
                "3.16": "Performing procedures for patients with traumatic injuries",
                "3.17": "Performing the skills of minimally invasive surgery (MIS)",
                "3.18": "Performing procedures for patients with disorders of the thyroid and/or parathyroid glands",
                "3.19": "Performing esophagogastroduodenoscopy",
                "3.20": "Performing colonoscopies",
                "3.21": "(SA) Completing a scholarly project",
                "3.22": "(SA) Delivering scholarly teaching to a variety of audiences, including peers, junior trainees, and/or other health professionals"
            },
            maxObservation: {
                "3.1": 10,
                "3.2": 5,
                "3.3": 8,
                "3.4": 5,
                "3.5": 12,
                "3.6": 12,
                "3.7": 18,
                "3.8": 18,
                "3.9": 13,
                "3.10": 2,
                "3.11": 2,
                "3.12": 4,
                "3.13": 10,
                "3.14": 10,
                "3.15": 8,
                "3.16": 10,
                "3.17": 4,
                "3.18": 3,
                "3.19": 10,
                "3.20": 10,
                "3.21": 1,
                "3.22": 2
            },
            assessmentInfo: {
                "3.1": `Collect 10 observations of achievement
                - At least 2 different settings
                - No more than 1 in simulation setting
                - At least 5 complex cases
                - At least 1 thyroid or parathyroid presentation
                - At least 3 different observers
                - At least 5 observations by faculty`,
                "3.2": `Collect 5 observations of achievement
                - At least 1 penetrating trauma, may be in the simulation setting
                - At least 1 unstable patient
                - At least 3 direct observations
                - At least 3 observations by faculty`,
                "3.3": `Part A: Patient care
                Collect 5 observations of achievement
                - At least 1 in a community setting
                - At least 1 in a General Surgery acute care service
                - At least 3 in a service with more than 10 patients on average
                - At least 3 different observers
                
                Part B: Interprofessional care/supervision
                Collect 3 observations of achievement`,
                "3.4": `Collect 5 observations of achievement
                - At least 2 in outpatient setting
                - At least 2 complex patients
                - A range of treatment decisions
                - At least 1 transition to palliative care
                - At least 2 different observers`,
                "3.5": `Collect 12 observations of achievement
                - At least 2 of each surgical task
                - At least 1 resection of stomach in a malignant case
                - At least 2 different observers, including at least 1 attending surgeon
                - At least 6 observations by faculty`,
                "3.6": `Collect 12 observations of achievement
                - At least 2 of each surgical task
                - At least 2 different observers
                - At least 1 general surgeon observer
                - At least 6 observations by faculty`,
                "3.7": `Collect 18 observations of achievement
                - At least 2 of each surgical task
                - At least 1 left sided colon resection
                - At least 1 emergent colon resection
                - At least 2 different observers
                - At least 9 observations by faculty`,
                "3.8": `Collect 18 observations of achievement
                - At least 1 of each surgical task
                - At least 2 different observers
                - At least 9 observations by faculty`,
                "3.9": `Collect 13 observations of achievement
                - At least of 2 each of the following surgical tasks: mobilization of liver; wedge
                resection/biopsy of liver; dissection of biliary tree; dissection of gallbladder; and
                intraoperative cholangiogram
                - At least 1 dissection of gallbladder must be complex
                - At least 1 CBD drainage (may be completed in simulation)
                - At least 1 biliary-enteric anastomosis
                - At least 1 hemorrhage control
                - At least 2 different observers
                - No more than 2 in simulation setting
                - At least 7 observations by faculty `,
                "3.10": `Collect 2 observations of achievement
                - At least 1 observation by faculty`,
                "3.11": `Collect 2 observations of achievement
                - At least 1 emergent or sim-trauma setting
                - No more than 1 in simulation setting
                - At least 1 observation by faculty `,
                "3.12": `Collect 4 observations of achievement
                - At least 1 ALND
                - At least 1 of each surgical task
                - At least 2 observations by faculty`,
                "3.13": `Collect 10 observations of achievement
                - At least 2 partial resections of breast without localization
                - At least 2 partial resections of breast with localization
                - At least 2 complete resections of breast
                - At least 1 each of the following: incision and/or drainage of abscess and sparing of
                skin and/or nipple
                - At least 2 different observers
                - At least 5 observations by faculty`,
                "3.14": `Collect 10 observations of achievement of the following tasks:
                - At least 1 emergent procedure
                - At least 2 in each region (abdominal wall, groin)
                - At least 1 temporary abdominal wall closure
                - At least 2 of each surgical task
                - At least 2 different observers
                - At least 5 observations by faculty`,
                "3.15": `Collect 8 observations of achievement
                - At least 1 soft tissue infection
                - At least 1 of each surgical task
                - At least 2 different observers
                - At least 4 observations by faculty`,
                "3.16": `Collect 10 successful observations of achievement
                - At least 1 trauma laparotomy
                - At least 3 different tasks
                - Surgical tasks may be observed in either the clinical or simulation setting EXCEPT the
                following, which must be observed in the clinical setting: trauma laparotomy; control
                and management of intraabdominal vascular bleeding; exposure of the
                retroperitoneum; chest tube in a complex patient (obese, redo, unstable); and
                tracheostomy
                - At least 5 observations by faculty`,
                "3.17": `Collect 4 observations of achievement
                - At least 1 of each surgical task
                - At least 2 different observers
                - At least 2 observations by faculty`,
                "3.18": `Collect 3 observations of achievement
                - At least 1 of each surgical task
                - At least 2 observations by faculty`,
                "3.19": `Collect 10 observations of achievement
                - At least 2 therapeutic procedures
                - At least 2 different observers
                - At least 5 observations by faculty`,
                "3.20": `Collect 10 observations of achievement
                - At least 6 colonoscopies to the level of the terminal ileum
                - At least 5 polypectomies including 2 >1cm
                - At least 2 different observers
                - At least 5 observations by faculty`,
                "3.21": `Collect 1 observation of achievement `,
                "3.22": `Collect 2 observations of achievement`,
            },
            filterValuesDict: {
                '3.1': {
                    'Setting': ["emergency", "inpatient", "outpatient", "OR", "ICU", "simulation"],
                    'Complex Case': ["yes", "no"]
                },
                '3.2': {},
                '3.3': {
                    'Setting': ["community", "tertiary", "other setting"],
                    'Average # of Inpatients per day': ["1-9", "10+"]
                },
                '3.4': {},
                '3.5': {
                    'Procedure': ["anti-reflux surgery", "partial/total gastrectomy", "paraesophageal hernia", "bariatric and metabolic surgery", "distal esophagectomy", "Whipple’s procedure", "surgical treatment of peptic ulcer disease and acute complications", "traumatic injury of stomach and duodenum"],
                    'Presentation': ["malignant", "benign", "bleeding", "other presentation"]
                },
                '3.6': {
                    'Procedure': ["lysis of adhesions", "small bowel resection with or without anastomosis", "ileostomy creation", "ileostomy closure", "feeding jejunostomy", "stricturoplasty", "repair of enterotomy", "trauma repair"],
                    'Presentation': ["malignant", "benign", "bleeding", "other presentation"]
                },
                '3.7': {
                    'Complexity': ["yes", "no"],
                    'Presentation': ["malignant", "benign", "bleeding", "other presentation"]
                },
                '3.8': {
                    'Procedure': ["proctectomy/low anterior resection, including total mesorectal excision (TME)", "abdominal perineal resection", "examination under anesthesia", "proctocolectomy", "hemorrhoidectomy (all modalities)", "sphincterotomy", "surgical management of anorectal fistula", "drainage of abscess", "rectal prolapse procedures", "rectal foreign body removal", "transanal excision of lesions", "traumatic injury to the rectum and anus", "anoscopy", "rigid sigmoidoscopy"],
                    'Presentation': ["malignant", "benign", "bleeding", "other presentation"]
                },
                '3.9': {
                    'Procedure': ["hepatic resection", "cholecystectomy", "CBD exploration", "CBD resection and biliary reconstruction", "Whipple", "organ harvest", "liver transplantation", "repair of traumatic injury to liver and common bile ducts"],
                    'Presentation': ["malignant", "benign", "bleeding", "other presentation"]
                },
                '3.10': {},
                '3.11': {},
                '3.12': {},
                '3.13': {
                    'Procedure': ["drainage of abscess", "duct excision", "lumpectomy with or without localization", "mastectomy", "modified radical mastectomy", "core needle biopsy", "other procedure"],
                    'Complexity': ["yes", "no"]
                },
                '3.14': {},
                '3.15': {},
                '3.16': {},
                '3.17': {},
                '3.18': {},
                '3.19': {
                    'Procedure': ["elective", "non-elective", "therapeutic"],
                    'Findings': ["normal", "abnormal"]
                },
                '3.20': {
                    'Setting': ["endoscopy suite", "ambulatory clinic", "operating room", "ICU"],
                    'Findings': ["normal", "abnormal"]
                },
                '3.21': {},
                '3.22': {}
            }
        },
        4: {
            'ID': 'TP',
            'topic': 'Transition to Practice (P)',
            subRoot: {
                "4.1": "Managing an outpatient clinic",
                "4.2": "Managing the day’s list of endoscopy procedures",
                "4.3": "Managing the day’s list of operative procedures",
                "4.4": "Performing therapeutic endoscopic interventions of the upper and lower gastrointestinal tract (OPTIONAL)",
                "4.5": "(SA) Performing the administrative, human resource and financial aspects of independent practice"
            },
            maxObservation: {
                "4.1": 2,
                "4.2": 2,
                "4.3": 2,
                "4.4": 15,
                "4.5": 1
            },
            assessmentInfo: {
                "4.1": `Collect 2 observations of achievement
                - At least 2 clinics of at least a half-day each
                - At least 2 different observers`,
                "4.2": `Collect at least 2 observations of achievement
                - At least 2 different observers`,
                "4.3": `Collect 2 observations of achievement
                - Mix of inpatients and outpatients
                - At least 2 different observers
                - At least 1 observation by faculty`,
                "4.4": `Collect 15 observations of achievement
                - At least 2 hemostasis in active bleeding
                - At least 2 dilations
                - At least 2 foreign body
                - At least 5 polypectomy >1 cm
                - At least 1 endoluminal stent insertion
                - At least 1 colonic decompression
                - At least 2 different observers
                - At least 8 observations by faculty`,
                "4.5": `Collect 1 observation of achievement `
            },
            filterValuesDict: {
                '4.1': {},
                '4.2': {},
                '4.3': {},
                '4.4': {
                    'Case Mix': ["hemostasis", "dilation", "polypectomy", "foreign body removal", "endoluminal stent insertion", "colonic decompression"],
                    'Actively Bleeding': ["yes", "no"],
                    "Setting": ["OR", "ER", "endoscopy", "ICU"]
                },
                '4.5': {}
            }
        },
    }
};

module.exports = programInfo;