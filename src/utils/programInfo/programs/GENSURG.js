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
                "2.5": 1,
            },
            clinicalPresentation: {
                '2.3': ["laparotomy", "laparoscopy"],
                '2.4': ["upper", "lower"]
            },
            patientDemographic: {
                '2.3': ["OR", "simulation lab"],
                '2.4': ["elective", "non-elective"]
            },
            filterTitles: {
                '2.3': ["Procedure", "Setting"],
                '2.4': ["Endoscopy", "Urgency"]
            },
            filterValuesDict: {
                '2.1': {},
                '2.2': {},
                '2.3': {
                    'Procedure': ["laparotomy", "laparoscopy"],
                    'Setting': ["OR", "simulation lab"]
                },
                '2.4': {
                    'Endoscopy': ["upper", "lower"],
                    'Urgency': ["elective", "non-elective"]
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
            clinicalPresentation: {
                "3.1": ["emergency", "inpatient", "outpatient", "OR", "ICU", "simulation"],
                "3.3": ["community", "tertiary", "other setting"],
                "3.5": ["anti-reflux surgery", "partial/total gastrectomy", "paraesophageal hernia", "bariatric and metabolic surgery", "distal esophagectomy", "Whipple’s procedure", "surgical treatment of peptic ulcer disease and acute complications", "traumatic injury of stomach and duodenum"],
                "3.6": ["lysis of adhesions", "small bowel resection with or without anastomosis", "ileostomy creation", "ileostomy closure", "feeding jejunostomy", "stricturoplasty", "repair of enterotomy", "trauma repair"],
                "3.7": ["yes", "no"],
                "3.8": ["proctectomy/low anterior resection, including total mesorectal excision (TME)", "abdominal perineal resection", "examination under anesthesia", "proctocolectomy", "hemorrhoidectomy (all modalities)", "sphincterotomy", "surgical management of anorectal fistula", "drainage of abscess", "rectal prolapse procedures", "rectal foreign body removal", "transanal excision of lesions", "traumatic injury to the rectum and anus", "anoscopy", "rigid sigmoidoscopy"],
                "3.9": ["hepatic resection", "cholecystectomy", "CBD exploration", "CBD resection and biliary reconstruction", "Whipple", "organ harvest", "liver transplantation", "repair of traumatic injury to liver and common bile ducts"],
                "3.13": ["drainage of abscess", "duct excision", "lumpectomy with or without localization", "mastectomy", "modified radical mastectomy", "core needle biopsy", "other procedure"],
                '3.19': ["elective", "non-elective", "therapeutic"],
                '3.20': ["endoscopy suite", "ambulatory clinic", "operating room", "ICU"]
            },
            patientDemographic: {
                "3.1": ["yes", "no"],
                "3.3": ["1-9", "10+"],
                "3.5": ["malignant", "benign", "bleeding", "other presentation"],
                "3.6": ["malignant", "benign", "bleeding", "other presentation"],
                "3.7": ["malignant", "benign", "bleeding", "other presentation"],
                '3.8': ["malignant", "benign", "bleeding", "other presentation"],
                '3.9': ["malignant", "benign", "bleeding", "other presentation"],
                '3.13': ["yes", "no"],
                '3.19': ["normal", "abnormal"],
                '3.20': ["normal", "abnormal"]
            },
            filterTitles: {
                "3.1": ["Setting", "Complex Case"],
                "3.3": ["Setting", "Average # of Inpatients per day"],
                "3.5": ["Procedure", "Presentation"],
                "3.6": ["Procedure", "Presentation"],
                "3.7": ["Complexity", "Presentation"],
                "3.8": ["Procedure", "Presentation"],
                "3.9": ["Procedure", "Presentation"],
                "3.13": ["Procedure", "Complexity"],
                '3.19': ["Procedure", "Findings"],
                '3.20': ["Setting", "Findings"]
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
            clinicalPresentation: {
                '4.4': ["hemostasis", "dilation", "polypectomy", "foreign body removal", "endoluminal stent insertion", "colonic decompression"]
            },
            patientDemographic: {
                '4.4': ["yes", "no"]
            },
            filterTitles: {
                '4.4': ["Case Mix", "Actively Bleeding"]
            },
            filterValuesDict: {
                '4.1': {},
                '4.2': {},
                '4.3': {},
                '4.4': {
                    'Case Mix': ["hemostasis", "dilation", "polypectomy", "foreign body removal", "endoluminal stent insertion", "colonic decompression"],
                    'Actively Bleeding': ["yes", "no"]
                },
                '4.5': {}
            }
        },
    }
};

module.exports = programInfo;