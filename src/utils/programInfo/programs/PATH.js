const programInfo = {
    infoCardsVisible: false,
    writtenScoresVisible: true,
    oralScoresVisible: true,
    narrativesVisible: true,
    rotationList: ["AP", "AP BREAST", "AP CYTO", "AP FOUNDATIONS", "AP GEN REGINA", "AP INTRO", "AP NEURO", "BIO CHEM", "BOOT CAMP", "FORENSICS", "GEN PATH", "HEMATO PATH", "GASTRO", "HEMATO", "INFECT", "MED ONC", "MICRO BIO", "MOLECULAR PATH", "PED ONC", "RESEARCH", "SURG GEN", "SURG ONC", "TRANSF COA", "UROLOGY"],
    rotationRequired: {
        "AP": 5,
        "AP BREAST": 5,
        "AP CYTO": 5,
        "AP FOUNDATIONS": 5,
        "AP GEN REGINA": 5,
        "AP INTRO": 5,
        "AP NEURO": 5,
        "BIO CHEM": 5,
        "BOOT CAMP": 5,
        "FORENSICS": 5,
        "GEN PATH": 5,
        "HEMATO PATH": 5,
        "GASTRO": 5,
        "HEMATO": 5,
        "INFECT": 5,
        "MED ONC": 5,
        "MICRO BIO": 5,
        "MOLECULAR PATH": 5,
        "PED ONC": 5,
        "RESEARCH": 5,
        "SURG GEN": 5,
        "SURG ONC": 5,
        "TRANSF COA": 5,
        "UROLOGY": 5
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
                "1.1": [],
                "1.2": [],
                "1.3": [],
                "1.4": []
            },
            patientDemographic: {
                "1.1": [],
                "1.2": [],
                "1.3": [],
                "1.4": []
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
                '2.1': [],
                '2.2': [],
                '2.3': [],
                '2.4': [],
                '2.5': [],
                '2.6': []
            },
            patientDemographic: {
                '2.1': [],
                '2.2': [],
                '2.3': [],
                '2.4': [],
                '2.5': [],
                '2.6': []
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
                '3.1':  [],
                '3.2': [],
                '3.3': [],
                '3.4': [],
                '3.5': [],
                '3.6': [],
                '3.7': [],
                '3.8': [],
                '3.9': [],
                '3.10': [],
                '3.11': [],
                '3.12': [],
                '3.13':  [],
                '3.14': [],
                '3.15': [],
                '3.16': [],
                '3.17': [],
                '3.18': [],
                '3.19': [],
                '3.20': [],
                '3.21': [],
                '3.22': []
            },
            patientDemographic: {
                '3.1':  [],
                '3.2': [],
                '3.3': [],
                '3.4': [],
                '3.5': [],
                '3.6': [],
                '3.7': [],
                '3.8': [],
                '3.9': [],
                '3.10': [],
                '3.11': [],
                '3.12': [],
                '3.13':  [],
                '3.14': [],
                '3.15': [],
                '3.16': [],
                '3.17': [],
                '3.18': [],
                '3.19': [],
                '3.20': [],
                '3.21': [],
                '3.22': []
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
                '4.1': [],
                '4.2': [],
                '4.3': [],
                '4.4': []
            },
            patientDemographic: {
                '4.1': [],
                '4.2': [],
                '4.3': [],
                '4.4': []
            },
            filterTitles: {}
        }
    }
};

module.exports = programInfo;