const programInfo = {
    infoCardsVisible: false,
    writtenScoresVisible: true,
    oralScoresVisible: true,
    narrativesVisible: true,
    rotationList: ["EM", "EM(REGINA)", "EM(PED)", "EM(RGNL)", "ANESTHESIA", "CARDIO", "ICU", "GIM", "GEN SURG", "NEURO", "OPTHO", "ORTHO", "PLASTICS", "SELECTIVE", "TOXICOLOGY", "TRAUMA", "OBS/GYN", "PICU", "PSYCH", "OTHER"],
    rotationRequired: {
        "EM": 13,
        "EM(REGINA)": 20,
        "EM(PED)": 12,
        "EM(RGNL)": 6,
        "ANESTHESIA": 9,
        "CARDIO": 8,
        "ICU": 6,
        "GIM": 8,
        "GEN SURG": 7,
        "NEURO": 4,
        "OPTHO": 8,
        "ORTHO": 4,
        "PLASTICS": 6,
        "SELECTIVE": 8,
        "TRAUMA": 7,
        "TOXICOLOGY": 4,
        "OBS/GYN": 4,
        "PICU": 4,
        "PSYCH": 4,
        "OTHER": 4
    },
    epaSourceMap: {
        1: {
            'ID': 'TTD',
            'topic': 'Transition to Discipline (D)',
            subRoot: {
                "1.1": "Establishing skills in microscopy",
                "1.2": "Participating in basic specimen handling",
                "1.3": "Summarizing and presenting relevant clinical information for clinicopathologic correlation",
                "1.4": "Creating a personal teaching and learning plan"
            },
            maxObservation: {
                "1.1": 13,
                "1.2": 15,
                "1.3": 2,
                "1.4": 1
            },
            clinicalPresentation: {
                '1.1': ["cardiorespiratory arrest", "unstable dysrhythmia", "shock", "respiratory distress", "altered neurological status", "other"],
                '1.2': ["chest pain", "shortness of breath", "abdominal pain", "minor trauma", "other"],
                '1.3': [],
                '1.4': []
            },
            patientDemographic: {
                '1.1': ["infant", "child", "youth", "adult", "senior"],
                '1.2': ["infant", "child", "youth", "adult", "senior"],
                '1.3': ["infant", "child", "youth", "adult", "senior"],
                '1.4': []
            },
            filterTitles: {}

        },
        2: {
            'ID': 'F',
            'topic': 'Foundations of Discipline (F)',
            subRoot: {
                "2.1": "Assessing patients and integrating clinical and laboratory information in the evaluation of disease processes",
                "2.2": "Performing basic tasks in autopsy pathology",
                "2.3": "Performing gross dissection of simple surgical specimens from accessioning to submission of blocks",
                "2.4": "Selecting specimens for ancillary testing",
                "2.5": "Generating diagnostically accurate and complete pathology reports for simple surgical pathology cases",
                "2.6": "Performing clinical diagnostic procedures"
            },
            maxObservation: {
                "2.1": 10,
                "2.2": 2,
                "2.3": 10,
                "2.4": 6,
                "2.5": 10,
                "2.6": 2
            },
            clinicalPresentation: {
                '2.1': ["cardiorespiratory arrest", "unstable dysrhythmia", "shock", "respiratory distress", "altered neurological status", "other"],
                '2.2': ["cough or wheeze", "musculoskeletal injury or pain", "eye complaint", "ENT complaint", "headache", "other"],
                '2.3': [],
                '2.4': ["simple wound repair including anesthesia", "abscess drainage", "casting or splinting", "anterior nasal packing", "arthrocentesis", "intraocular pressure measurement", "intraosseous access"],
                '2.5': []
            },
            patientDemographic: {
                '2.1': ["infant", "child", "youth", "adult", "senior"],
                '2.2': ["infant", "child", "youth", "adult", "senior"],
                '2.3': ["infant", "child", "youth", "adult", "senior"],
                '2.4': ["infant", "child", "youth", "adult", "senior"],
                '2.5': []
            },
            filterTitles: {}
        },
        3: {
            'ID': 'CORE',
            'topic': 'Core of Discipline (C)',
            subRoot: {
                "3.1": "Performing medical autopsies and generating complete and diagnostically accurate reports",
                "3.2": "Performing routine pediatric and perinatal autopsies",
                "3.3": "Performing routine forensic autopsies and generating complete and diagnostically accurate reports",
                "3.4": "Performing gross dissection of surgical specimens",
                "3.5": "Diagnosing routine surgical pathology cases",
                "3.6": "Diagnosing complex surgical pathology cases",
                "3.7": "Providing intraoperative consultations",
                "3.8": "Presenting in multidisciplinary rounds",
                "3.9": "Managing microbiological testing relevant to a community setting",
                "3.10": "Triaging, interpreting, and reporting peripheral blood smears, bone marrows, lymph nodes and other solid tissue specimens for hematologic disease",
                "3.11": "Selecting, interpreting and reporting tests for common hemoglobinopathies, enzymopathies, and membranopathies",
                "3.12": "Diagnosing and reporting common coagulopathies",
                "3.13": "Diagnosing and managing routine clinical and laboratory problems in transfusion medicine",
                "3.14": "Selecting, correlating and interpreting common genomic/molecular pathology test results",
                "3.15": "Managing, interpreting and reporting of gynecologic and non-gynecologic cytology specimens",
                "3.16": "Identifying, investigating and resolving pre-analytical, analytical and post-analytical issues in laboratory medicine",
                "3.17": "Participating in the selection and validation of new instrumentation, and evaluation of new tests",
                "3.18": "Ensuring appropriate use of lab resources and test utilization",
                "3.19": "Providing routine biochemistry clinical consultations",
                "3.20": "Interpreting, and reporting biochemistry testing",
                "3.21": "Providing formal and informal teaching",
                "3.22": "Conducting scholarly work"
            },
            maxObservation: {
                "3.1": 6,
                "3.2": 3,
                "3.3": 6,
                "3.4": 50,
                "3.5": 70,
                "3.6": 70,
                "3.7": 10,
                "3.8": 5,
                "3.9": 2,
                "3.10": 12,
                "3.11": 5,
                "3.12": 10,
                "3.13": 5,
                "3.14": 25,
                "3.15": 5,
                "3.16": 10,
                "3.17": 1,
                "3.18": 5,
                "3.19": 3,
                "3.20": 10,
                "3.21": 10,
                "3.22": 1
            },
            clinicalPresentation: {
                '3.1':  ["shock", "cardiorespiratory arrest", "respiratory failure", "severe sepsis", "other"],
                '3.2': ["blunt trauma", "penetrating trauma", "other"],
                '3.3': [],
                '3.4': [],
                '3.5': ["abdominal pain", "chest pain", "dysrhythmia", "respiratory distress", "altered mental status", "other"],
                '3.6': ["fever", "vomiting", "rash", "syncope", "weakness", "acute gynecological", "other"],
                '3.7': ["first trimester bleeding", "complications of pregnancy", "vaginal delivery", "post-partum hemorrhage", "other"],
                '3.8': ["sympathomimetic toxidrome", "opioid toxidrome", "antidepressant toxicity", "toxic bradycardia", "other"],
                '3.9': ["psychosis or mania", "major depressive disorder", "anxiety disorder", "suicidality", "personality disorder", "other"],
                '3.10': [],
                '3.11': [],
                '3.12': [],
                '3.13':  ["complex wound repair", "central venous access with ultrasound guidance", "reduction of an extremity fracture", "lumbar puncture", "reduction of large joint dislocation", "regional anesthesia (e.g. large peripheral nerve block, not a digital nerve)", "thoracostomy tube insertion"],
                '3.14': ["pericardial effusion and cardiac tamponade", "global estimation of left ventricular fraction", "pneumothorax", "hemothorax", "pleural effusion", "abdominal aortic aneurysm", "abdominal or pelvic free fluid", " first trimester intrauterine gestation"],
                '3.15': [],
                '3.16': [],
                '3.17': [],
                '3.18': [],
                '3.19': [],
                '3.20': []
            },
            patientDemographic: {
                '3.1': ["infant", "child", "youth", "adult", "senior"],
                '3.2': ["infant", "child", "youth", "adult", "senior"],
                '3.3': ["infant", "child", "youth", "adult", "senior"],
                '3.4': ["infant", "child", "youth", "adult", "senior"],
                '3.5': ["infant", "child", "youth", "adult", "senior"],
                '3.6': ["infant", "child", "youth", "adult", "senior"],
                '3.7': ["infant", "child", "youth", "adult", "senior"],
                '3.8': ["infant", "child", "youth", "adult", "senior"],
                '3.9': ["infant", "child", "youth", "adult", "senior"],
                '3.10': ["infant", "child", "youth", "adult", "senior"],
                '3.11': ["infant", "child", "youth", "adult", "senior"],
                '3.12': ["infant", "child", "youth", "adult", "senior"],
                '3.13': ["infant", "child", "youth", "adult", "senior"],
                '3.14': ["infant", "child", "youth", "adult", "senior"],
                '3.15': [],
                '3.16': [],
                '3.17': [],
                '3.18': [],
                '3.19': [],
                '3.20': []
            },
            filterTitles: {}
        },
        4: {
            'ID': 'TP',
            'topic': 'Transition to Practice (P)',
            subRoot: {
                "4.1": "Leading and managing the daily operations of the laboratory, including a full workload of cases representing the breadth of practice",
                "4.2": "Functioning independently on call",
                "4.3": "Leading, implementing and advocating for quality assurance practices",
                "4.4": "Developing and implementing a plan for continuing professional development"
            },
            maxObservation: {
                "4.1": 12,
                "4.2": 4,
                "4.3": 4,
                "4.4": 1
            },
            clinicalPresentation: {
                '4.1': ["resuscitation", "acute care", "ambulatory", "other"],
                '4.2': ["individual", "multiple"],
                '4.3': [],
                '4.4': ["consulting service", "community ED", "outpatient clinic", "family physician", "other"],
                '4.5': ["EP to EP", "EP to OP within hospital", "EP to OP at another hospital", "EP to LTC", "EP to PCP", "EP to follow-up with OP", "other"],
                '4.6': [],
                '4.7': [],
                '4.8': []
            },
            patientDemographic: {
                '4.1': [],
                '4.2': ["medical student", "off service resident", "EM resident", " other"],
                '4.3': ["patient interaction", "family interaction", "physician interaction", "other health care professional interaction"],
                '4.4': ["infant", "child", "youth", "adult", "senior"],
                '4.5': ["infant", "child", "youth", "adult", "senior"],
                '4.6': ["infant", "child", "youth", "adult", "senior"],
                '4.7': [],
                '4.8': []
            },
            filterTitles: {}
        }
    }
};

module.exports = programInfo;