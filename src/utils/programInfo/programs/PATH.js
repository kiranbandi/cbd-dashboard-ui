const programInfo = {
    infoCardsVisible: false,
    writtenScoresVisible: true,
    oralScoresVisible: true,
    narrativesVisible: true,
    rotationList: ["ANAT PATH", "AP BREAST", "AP CYTO", "AP FOUND", "AP GEN (REGINA)", "AP INTRO", "AP NEURO", "BIOCHEMISTRY", "BOOT CAMP", "ELECTIVE", "FORENSICS", "GEN PATH", "HEMATO", "MICRO", "MOLECULAR", "OTHER", "OFF SERVICE", "RESEARCH", "TRANS / COAG"],
    rotationRequired: {
        "ANAT PATH": 5,
        "AP BREAST": 5,
        "AP CYTO": 5,
        "AP FOUND": 5,
        "AP GEN (REGINA)": 5,
        "AP INTRO": 5,
        "AP NEURO": 5,
        "BIOCHEMISTRY": 5,
        "BOOT CAMP": 5,
        "ELECTIVE": 5,
        "FORENSICS": 5,
        "GEN PATH": 5,
        "HEMATO": 5,
        "MICRO": 5,
        "MOLECULAR": 5,
        "OTHER": 5,
        "OFF SERVICE": 5,
        "RESEARCH": 5,
        "TRANS / COAG": 5
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
                "1.2": 16,
                "1.3": 2,
                "1.4": 1
            },
            clinicalPresentation: {
                "1.1": ["breast", "bone & soft tissue", "gynecology", "gastrointestinal", "genitourinary", "head & neck", "endocrine", "skin", "cardiovascular", "thoracic", "neuropathology", "blood, bone marrow, lymph nodes & spleen", "placenta"],
                "1.2": ["tissue", "blood", "microbiological", "appendix", "gallbladder", "simple hysterectomy for fibroids or prolapse", "colon for diverticulosis", "ischemic small bowel", "other"],
                "1.3": ["surgical pathology", "cytopathology", "autopsy pathology", "hematopathology"],
                "1.4": []
            },
            patientDemographic: {
                "1.1": ["direct", "indirect"],
                "1.2": ["fresh", "formalin", "alcohol"],
                "1.3": [],
                "1.4": []
            },
            filterTitles: {
                "1.1": ["ORGAN SYSTEM or TISSUE", "ASSESSMENT TYPE"],
                "1.2": ["Specimen type", "Fixative"],
                "1.3": ["Lab Discipline", ""],
                "1.4": []
            }

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
                "2.2": 16,
                "2.3": 10,
                "2.4": 6,
                "2.5": 10,
                "2.6": 2
            },
            clinicalPresentation: {
                '2.1': ["direct observation of history", "direct observation of communication with patients", "case discussion or chart review - Setting: medicine", "surgery", "oncology", "pediatrics", "other"],
                '2.2': ["open the pulmonary vasculature", "open the aorta, identify and dissect the main arterial branches of the aorta", "open the bowel", "dissect the pelvic block", "obtain quality photographs as directed", "complete required forms for ancillary tests", "other"],
                '2.3': ["direct", "indirect"],
                '2.4': ["tissue", "blood", "microbiological sample", "other"],
                '2.5': ["breast", "bone & soft tissue", "gynecology", "gastrointestinal", "genitourinary", "head & neck", "endocrine", "skin", "lymph nodes", "placenta"],
                '2.6': ["bone marrow", "Fine Needle Aspirate (FNA)"]
            },
            patientDemographic: {
                '2.1': ["medicine", "surgery", "oncology", "pediatrics"],
                '2.2': [],
                '2.3': [],
                '2.4': ["immunohistochemistry", "cytogenetics", "molecular", "in situ hybridization", "immunofluorescence", "flow cytometry", "electron microscopy"],
                '2.5': [],
                '2.6':  ["surgical", "cytology", "hematopathology", "microbiology", "general"]
            },
            filterTitles: {
                '2.1': ["Observation Type", "Setting"],
                '2.2': ["Task", ""],
                '2.3': ["Observation Type", ""],
                '2.4': ["Specimen Type", "Ancillary tests"],
                '2.5': ["Organ System or Tissue", ""],
                '2.6': ["Procedure", "Specimen Type"]
            }
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
                "3.1": 13,
                "3.2": 6,
                "3.3": 12,
                "3.4": 150,
                "3.5": 70,
                "3.6": 70,
                "3.7": 10,
                "3.8": 5,
                "3.9": 14,
                "3.10": 34,
                "3.11": 5,
                "3.12": 10,
                "3.13": 15,
                "3.14": 25,
                "3.15": 45,
                "3.16": 10,
                "3.17": 1,
                "3.18": 5,
                "3.19": 3,
                "3.20": 10,
                "3.21": 4,
                "3.22": 1
            },
            clinicalPresentation: {
                '3.1':  ["complex", "routine"],
                '3.2': ["fetal", "neonatal", "pediatric"],
                '3.3': ["natural", "accidental", "suicide", "undetermined"],
                '3.4': ["breast", "bone & soft tissue", "placenta", "cardiovascular", "endocrine", "neuropathology", "gynecology", "gastrointestinal", "genitourinary", "head & neck", "lymph nodes or spleen", "respiratory", "skin"],
                '3.5': ["breast", "bone & soft tissue", "cardiovascular", "endocrine", "gastrointestinal", "genitourinary", "gynecology", "head & neck", "lymph nodes/spleen", "neuropathology", "placenta", "skin", "thoracic"],
                '3.6': ["breast", "bone & soft tissue", "cardiovascular", "endocrine", "gastrointestinal", "genitourinary", "gynecology", "head & neck", "lymph nodes/spleen", "neuropathology", "placenta", "skin", "thoracic"],
                '3.7': [],
                '3.8': [],
                '3.9':  ["bacteriology", "virology", "parasitology", "mycology", "serology"],
                '3.10': ["non-neoplastic", "myeloproliferative", "myelodysplastic", "lymphoproliferative", "reactive/infectious", "Hodgkin lymphoma", "Non-Hodgkin lymphoma", "other"],
                '3.11': ["normal", "hemoglobinopathy", "enzymopathy", "membranopathy"],
                '3.12': ["bleeding", "thrombosis", "drug monitoring", "asymptomatic", "abnormal lab value"],
                '3.13':  ["blood component", "blood product"],
                '3.14': ["formalin fixed paraffin embedded (FFPE) tissue", "fresh/frozen tissue", "blood/bone marrow", "other"],
                '3.15': ["gynecological", "FNA", "fluid (pleural, peritoneal, urine, CSF etc.)", "endoscopic ultrasound (EUS)", "endobronchial ultrasound (EBUS)"],
                '3.16': ["anatomical pathology", "hematopathology", "medical microbiology", "medical biochemistry"],
                '3.17': ["clinical utility", "analytical (total allowable error/precision/reference range, etc)", "financial", "setting up QC", "investigating proficiency testing options", "other"],
                '3.18': ["clinical consult", "simulation", "laboratory initiated"],
                '3.19': [],
                '3.20': ["serum protein electrophoresis", "urine protein electrophoresis", "joint crystal", "urine crystal", "therapeutic drug monitoring", "clinical toxicology", "other"],
                '3.21': [],
                '3.22': []
            },
            patientDemographic: {
                '3.1':  ["full", "limited or focused autopsy"],
                '3.2': [],
                '3.3': [],
                '3.4': [],
                '3.5': [],
                '3.6': [],
                '3.7': [],
                '3.8': [],
                '3.9': ["blood", "CSF", "urine", "other body fluids", "stool", "genital", "respiratory", "wound/skin swab", "surgical/tissue specimen"],
                '3.10': [],
                '3.11': [],
                '3.12': ["platelet disorder", "factor disorder", "vascular disorder", "multifactorial"],
                '3.13':  ["clinical", "laboratory", "collection", "storage", "modification", "distribution", "utilization/stewardship", "surgical indication", "medical indication", "trauma", "platelet disorder", "factor disorder", "immunomodulation", "other"],
                '3.14': ["Polymerase Chain Reaction(PCR)", "next generation sequencing (NGS)", "karyotype", "fluorescence in situ hybridization (FISH) /chromogenic in situ hybridization (CISH)", "ploidy"],
                '3.15': ["direct", "indirect"],
                '3.16': ["routine monitoring", "error", "complaint", "other"],
                '3.17': [],
                '3.18': ["anatomical pathology", "hematopathology", "medical microbiology", "medical biochemistry"],
                '3.19': [],
                '3.20': [],
                '3.21': [],
                '3.22': []
            },
            filterTitles: {
                '3.1':  ["Case complexity", "case details"],
                '3.2': ["Type", ""],
                '3.3': ["Manner of death", ""],
                '3.4': ["Organ system or tissue", ""],
                '3.5': ["Organ system or tissue", ""],
                '3.6': ["Organ system or tissue", ""],
                '3.9': ["Microorganism", "Specimen type"],
                '3.10': ["Category", ""],
                '3.11': ["Category", ""],
                '3.12': ["Presentation", "Category"],
                '3.13':  ["Inventory", "Category"],
                '3.14': ["Specimen type", "Test type"],
                '3.15': ["Specimen type", "Observation Type"],
                '3.16': ["Lab discipline", "Trigger for review"],
                '3.17': ["Modality", ""],
                '3.18': ["Category", "Lab discipline"],
                '3.20': ["Specimen type", ""]
            }
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
                '4.1':  ["surgical pathology", "cytopathology", "autopsy pathology", "biochemistry", "microbiology", "hematopathology", "transfusion medicine", "hemostasis and coagulation", "molecular pathology"],
                '4.2':  ["anatomical pathology", "biochemistry", "microbiology", "hematopathology"],
                '4.3':  ["anatomical pathology", "biochemistry", "microbiology", "hematopathology"],
                '4.4': []
            },
            patientDemographic: {
                '4.1': [],
                '4.2': [],
                '4.3': [],
                '4.4': []
            },
            filterTitles: {
                '4.1': ["Lab Discipline", ""],
                '4.2': ["Lab Discipline", ""],
                '4.3': ["Lab Discipline", ""],
                '4.4': ["", ""]
            }
        }
    }
};

module.exports = programInfo;