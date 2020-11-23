const programInfo = {
    infoCardsVisible: false,
    examScoresVisible: false,
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
                "1.4": "(SA) Creating a personal teaching and learning plan"
            },
            maxObservation: {
                "1.1": 13,
                "1.2": 16,
                "1.3": 2,
                "1.4": 1
            },
            assessmentInfo: {
                "1.1": `Collect 13 observations of achievement
                - At least 1 of each organ system or tissue.`,
                "1.2": `Part A: Collect 15 observations of achievement
                - At least 3 different tissue specimens
                - At least 3 blood specimens
                - At least 3 microbiology specimens
                - At least 1 of each other specimen type.
                
                Part B: Evidence of satisfactory completion of a structured oral or written quiz administered by the
                supervising pathologist. Collect 1 observation of achievement.`,
                "1.3": `Collect 2 observations of achievement.`,
                "1.4": `Resident’s submission of teaching and learning plan (portfolio), and logbook reviewed by
                pathologist, TTP trainee, academic advisor, or mentor. Collect 1 observation of achievement.`
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
            },
            filterValuesDict: {
                '1.1': {
                    'ORGAN SYSTEM or TISSUE': ["breast", "bone & soft tissue", "gynecology", "gastrointestinal", "genitourinary", "head & neck", "endocrine", "skin", "cardiovascular", "thoracic", "neuropathology", "blood, bone marrow, lymph nodes & spleen", "placenta"],
                    'ASSESSMENT TYPE': ["direct", "indirect"]
                },
                '1.2': {
                    'Specimen type': ["tissue", "blood", "microbiological", "appendix", "gallbladder", "simple hysterectomy for fibroids or prolapse", "colon for diverticulosis", "ischemic small bowel", "other"],
                    'Fixative': ["fresh", "formalin", "alcohol"]
                },
                '1.3': {
                    'Lab Discipline': ["surgical pathology", "cytopathology", "autopsy pathology", "hematopathology"]
                },
                '1.4': {}
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
                "2.6": "(SA) Performing clinical diagnostic procedures"
            },
            maxObservation: {
                "2.1": 10,
                "2.2": 16,
                "2.3": 10,
                "2.4": 6,
                "2.5": 10,
                "2.6": 2
            },
            assessmentInfo: {
                "2.1": `Collect at least 10 observations of achievement
                - At least 2 of each type of observation
                - At least 2 each for medicine, surgery, oncology, and pediatrics
                - At least 1 assessment from a staff supervisor in each setting.`,
                "2.2": `Part A: Collect 2 observations of achievement.
                
                Part B: Collect 14 observations of achievement
                - At least 2 of each task.`,
                "2.3": `Collect 10 observations of achievement
                - A variety of cases
                - At least 5 direct observations
                - At least 3 different observers.`,
                "2.4": `Collect 6 observations of achievement
                - At least 2 other clinical laboratory specimens
                - At least 2 flow cytometry
                - At least 2 lymphoma protocol
                - At least 1 observation by pathologist.`,
                "2.5": `Collect 10 observations of achievement
                - At least 4 organ systems
                - At least 3 observers.`,
                "2.6": `Collect 2 observations of achievement
                - At least one of each procedure.`
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
                '2.6': ["surgical", "cytology", "hematopathology", "microbiology", "general"]
            },
            filterTitles: {
                '2.1': ["Observation Type", "Setting"],
                '2.2': ["Task", ""],
                '2.3': ["Observation Type", ""],
                '2.4': ["Specimen Type", "Ancillary tests"],
                '2.5': ["Organ System or Tissue", ""],
                '2.6': ["Procedure", "Specimen Type"]
            },
            filterValuesDict: {
                '2.1': {
                    'Observation Type': ["direct observation of history", "direct observation of communication with patients", "case discussion or chart review - Setting: medicine", "surgery", "oncology", "pediatrics", "other"],
                    'Setting': ["medicine", "surgery", "oncology", "pediatrics"]
                },
                '2.2': {
                    'Task': ["open the pulmonary vasculature", "open the aorta, identify and dissect the main arterial branches of the aorta", "open the bowel", "dissect the pelvic block", "obtain quality photographs as directed", "complete required forms for ancillary tests", "other"]
                },
                '2.3': {
                    'Observation Type': ["direct", "indirect"]
                },
                '2.4': {
                    'Specimen Type': ["tissue", "blood", "microbiological sample", "other"],
                    'Ancillary tests': ["immunohistochemistry", "cytogenetics", "molecular", "in situ hybridization", "immunofluorescence", "flow cytometry", "electron microscopy"]
                },
                '2.5': {
                    'Organ System or Tissue': ["breast", "bone & soft tissue", "gynecology", "gastrointestinal", "genitourinary", "head & neck", "endocrine", "skin", "lymph nodes", "placenta"]
                },
                '2.6': {
                    'Procedure': ["bone marrow", "Fine Needle Aspirate (FNA)"],
                    'Specimen Type': ["surgical", "cytology", "hematopathology", "microbiology", "general"]
                }
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
                "3.17": "(SA) Participating in the selection and validation of new instrumentation, and evaluation of new tests",
                "3.18": "Ensuring appropriate use of lab resources and test utilization",
                "3.19": "Providing routine biochemistry clinical consultations",
                "3.20": "Interpreting, and reporting biochemistry testing",
                "3.21": "Providing formal and informal teaching",
                "3.22": "(SA) Conducting scholarly work"
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
            assessmentInfo: {
                "3.1": `Part A: Collect 6 observations of achievement
                - At least 3 routine full autopsies
                - At least 3 complex full autopsies
                - At least 2 different pathologist observers.
                
                Part B: Collect 1 observation of achievement.
                
                Part C: Collect 6 observations of achievement
                - At least 3 routine full autopsies
                - At least 3 complex full autopsies
                - At least 2 different pathologist observers.`,
                "3.2": `Part A: Collect 3 observations of achievement
                - At least 1 case with age >20 weeks gestational age.
                
                Part B: Collect 3 observations of achievement.`,
                "3.3": `Part A: Collect 6 observations of achievement
                - At least 1 of each manner of death: natural, accidental, and suicide
                - At least 2 different observers.
                
                Part B: Collect 6 observations of achievement
                - At least 1 of each natural, accident, and suicide
                - At least 2 different observers.`,
                "3.4": `Part A: Collect 50 observations of achievement
                - A variety of organ systems
                - A variety of specimens
                - At least 8 each of breast, gynecology, gastrointestinal, and genitourinary
                - At least 10 different observers.

                Part B: Collect 100 observations of achievement
                - A variety of systems
                - A variety of specimens
                - At least 15 gastrointestinal (including hepatobiliary/pancreas)
                - At least 10 each of gynecology, genitourinary, breast, and placenta
                - At least 5 each head and neck, and respiratory
                - At least 5 pediatric oncology
                - At least 10 different observers.`,
                "3.5": `Collect 70 observations of achievement encompassing a wide breadth of presentations
                - At least 7 from each of breast, gynecology, gastrointestinal, genitourinary, and skin
                - At least 3 from each of the other organ systems
                - At least 50 observed by pathologists
                - At least 10 different observers.`,
                "3.6": `Collect 70 observations of achievement encompassing a wide breadth of presentations
                - At least 7 from each gynecology, gastrointestinal, genitourinary, breast, and skin
                - At least 3 from each of the other organ systems
                - A variety of specimens and diagnosis, including malignant and non-malignant,
                biopsies, and surgical resection
                - At least 10 observers.`,
                "3.7": `Collect 10 observations of achievement
                - Variety of tissue types and indications
                - At least 3 different observers.`,
                "3.8": `Collect 5 observations of achievement
                - Multidisciplinary rounds of at least 3 different specialties
                - At least 2 different observers
                - At least 1 pathologist.`,
                "3.9": `Part A: Collect 12 observations of achievement
                - At least 12 unique microorganisms
                - At least 5 bacteriology, with interpretation of antimicrobial sensitivity tests results
                - At least 3 interpretations of positive viral serology specimens
                - At least 1 viral hepatitis
                - At least 2 each of parasitology and mycology
                - A variety of specimen types
                - At least 5 performances of gram stains with test interpretations
                - At least 3 observers.
                
                Part B: Collect 2 observations of achievement
                - At least 2 different reasons for consultation
                - At least 2 different observers.`,
                "3.10": `Part A: Collect 12 observations of achievement
                - A variety of diagnoses including critical values
                - At least 2 observers, one of which must be a pathologist or clinician practicing
                hematopathology.
                
                Part B: Collect 10 observations of achievement
                - At least 2 from each category including a mix of diagnoses (max 1 normal)
                - At least 2 observers, one of which must be a pathologist.
                
                Part C: Collect 12 observations of achievement
                - At least 2 each from category including a mix of diagnoses
                - At least 2 observers, one of which must be a pathologist.`,
                "3.11": `Collect 5 observations of achievement
                - Variety of cases, including a maximum of one normal sample.`,
                "3.12": `Collect 10 observations of achievement
                - A variety of bleeding and thrombotic disorders
                - At least 2 different observers
                - At least 5 observations by pathologist or hematologist.`,
                "3.13": `Part A: Collect 5 observations of achievement
                - A mix of clinical and laboratory scenarios
                - At least 2 observers
                - At least 1 pathologist/hematologist.
                
                Part B: Collect 5 observations of achievement
                - A mix of clinical and laboratory scenarios incorporating both blood components and
                products
                - At least 2 observers
                - At least 3 by a pathologist or hematologist.
                
                Part C: Collect 5 observations of achievement.`,
                "3.14": `Collect 25 observations of achievement
                - At least 10 cases of test selection, including
                --- At least 2 each of FFPE tissue, fresh/frozen tissue and blood/bone marrow
                tissue
                - At least 10 result interpretations, including
                --- At least one of PCR, karyotype, FISH/CISH
                --- At least 3 of each hematology, microbiology, and biochemistry cases.`,
                "3.15": `Part A: Collect 5 observations of achievement
                - At least 3 different specimen types
                - At least 2 different observers.
                
                Part B: Collect 40 observations of achievement
                - At least 20 gynecological
                - At least 10 FNA (a mix of specimen type including EUS or EBUS)
                - At least 10 fluids
                - At least 3 different observers.`,
                "3.16": `Collect 10 observations of achievement
                - At least 2 from each lab discipline.`,
                "3.17": `Collect 1 observations of achievement
                - At least 3 modalities.`,
                "3.18": `Collect 5 observations of achievement
                - At least 1 from each category
                - At least 2 observers, one of which must be a pathologist or laboratory physician.`,
                "3.19": `Collect 3 observations of achievement
                - A variety of indications for consultation.`,
                "3.20": `Collect 10 observations of achievement
                - At least 5 electrophoresis, including at least 3 monoclonal gammopathies
                - At least 2 joint aspirates for crystals, including at least 1 positive for uric acid/gout
                - At least 1 case discussion about reflective/reflexive testing
                - At least 1 case discussion about TDM or clinical toxicology
                - At least 6 must be observed by pathologist`,
                "3.21": `Part A: Collect at least 2 observations of achievement.
                
                Part B: Collect at least 2 observations of achievement.`
            },
            clinicalPresentation: {
                '3.1': ["complex", "routine"],
                '3.2': ["fetal", "neonatal", "pediatric"],
                '3.3': ["natural", "accidental", "suicide", "undetermined"],
                '3.4': ["breast", "bone & soft tissue", "placenta", "cardiovascular", "endocrine", "neuropathology", "gynecology", "gastrointestinal", "genitourinary", "head & neck", "lymph nodes or spleen", "respiratory", "skin"],
                '3.5': ["breast", "bone & soft tissue", "cardiovascular", "endocrine", "gastrointestinal", "genitourinary", "gynecology", "head & neck", "lymph nodes/spleen", "neuropathology", "placenta", "skin", "thoracic"],
                '3.6': ["breast", "bone & soft tissue", "cardiovascular", "endocrine", "gastrointestinal", "genitourinary", "gynecology", "head & neck", "lymph nodes/spleen", "neuropathology", "placenta", "skin", "thoracic"],
                '3.7': [],
                '3.8': [],
                '3.9': ["bacteriology", "virology", "parasitology", "mycology", "serology"],
                '3.10': ["non-neoplastic", "myeloproliferative", "myelodysplastic", "lymphoproliferative", "reactive/infectious", "Hodgkin lymphoma", "Non-Hodgkin lymphoma", "other"],
                '3.11': ["normal", "hemoglobinopathy", "enzymopathy", "membranopathy"],
                '3.12': ["bleeding", "thrombosis", "drug monitoring", "asymptomatic", "abnormal lab value"],
                '3.13': ["blood component", "blood product"],
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
                '3.1': ["full", "limited or focused autopsy"],
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
                '3.13': ["clinical", "laboratory", "collection", "storage", "modification", "distribution", "utilization/stewardship", "surgical indication", "medical indication", "trauma", "platelet disorder", "factor disorder", "immunomodulation", "other"],
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
                '3.1': ["Case complexity", "case details"],
                '3.2': ["Type", ""],
                '3.3': ["Manner of death", ""],
                '3.4': ["Organ system or tissue", ""],
                '3.5': ["Organ system or tissue", ""],
                '3.6': ["Organ system or tissue", ""],
                '3.9': ["Microorganism", "Specimen type"],
                '3.10': ["Category", ""],
                '3.11': ["Category", ""],
                '3.12': ["Presentation", "Category"],
                '3.13': ["Inventory", "Category"],
                '3.14': ["Specimen type", "Test type"],
                '3.15': ["Specimen type", "Observation Type"],
                '3.16': ["Lab discipline", "Trigger for review"],
                '3.17': ["Modality", ""],
                '3.18': ["Category", "Lab discipline"],
                '3.20': ["Specimen type", ""]
            },
            filterValuesDict: {
                '3.1': {
                    'Case complexity': ["complex", "routine"],
                    'case details': ["full", "limited or focused autopsy"]
                },
                '3.2': {
                    'Type': ["fetal", "neonatal", "pediatric"]
                },
                '3.3': {
                    'Manner of death': ["natural", "accidental", "suicide", "undetermined"]
                },
                '3.4': {
                    'Organ system or tissue': ["breast", "bone & soft tissue", "placenta", "cardiovascular", "endocrine", "neuropathology", "gynecology", "gastrointestinal", "genitourinary", "head & neck", "lymph nodes or spleen", "respiratory", "skin"]
                },
                '3.5': {
                    'Organ system or tissue': ["breast", "bone & soft tissue", "cardiovascular", "endocrine", "gastrointestinal", "genitourinary", "gynecology", "head & neck", "lymph nodes/spleen", "neuropathology", "placenta", "skin", "thoracic"]
                },
                '3.6': {
                    'Organ system or tissue': ["breast", "bone & soft tissue", "cardiovascular", "endocrine", "gastrointestinal", "genitourinary", "gynecology", "head & neck", "lymph nodes/spleen", "neuropathology", "placenta", "skin", "thoracic"]
                },
                '3.7': {},
                '3.8': {},
                '3.9': {
                    'Microorganism': ["bacteriology", "virology", "parasitology", "mycology", "serology"],
                    'Specimen type': ["blood", "CSF", "urine", "other body fluids", "stool", "genital", "respiratory", "wound/skin swab", "surgical/tissue specimen"]
                },
                '3.10': {
                    'Category': ["non-neoplastic", "myeloproliferative", "myelodysplastic", "lymphoproliferative", "reactive/infectious", "Hodgkin lymphoma", "Non-Hodgkin lymphoma", "other"]
                },
                '3.11': {
                    'Category': ["normal", "hemoglobinopathy", "enzymopathy", "membranopathy"]
                },
                '3.12': {
                    'Presentation': ["bleeding", "thrombosis", "drug monitoring", "asymptomatic", "abnormal lab value"],
                    'Category': ["platelet disorder", "factor disorder", "vascular disorder", "multifactorial"]
                },
                '3.13': {
                    'Inventory': ["blood component", "blood product"],
                    'Category': ["clinical", "laboratory", "collection", "storage", "modification", "distribution", "utilization/stewardship", "surgical indication", "medical indication", "trauma", "platelet disorder", "factor disorder", "immunomodulation", "other"]
                },
                '3.14': {
                    'Specimen type': ["formalin fixed paraffin embedded (FFPE) tissue", "fresh/frozen tissue", "blood/bone marrow", "other"],
                    'Test type': ["Polymerase Chain Reaction(PCR)", "next generation sequencing (NGS)", "karyotype", "fluorescence in situ hybridization (FISH) /chromogenic in situ hybridization (CISH)", "ploidy"]
                },
                '3.15': {
                    'Specimen type': ["gynecological", "FNA", "fluid (pleural, peritoneal, urine, CSF etc.)", "endoscopic ultrasound (EUS)", "endobronchial ultrasound (EBUS)"],
                    'Observation Type': ["direct", "indirect"]
                },
                '3.16': {
                    'Lab discipline': ["anatomical pathology", "hematopathology", "medical microbiology", "medical biochemistry"],
                    'Trigger for review': ["routine monitoring", "error", "complaint", "other"]
                },
                '3.17': {
                    'Modality': ["clinical utility", "analytical (total allowable error/precision/reference range, etc)", "financial", "setting up QC", "investigating proficiency testing options", "other"]
                },
                '3.18': {
                    'Category': ["clinical consult", "simulation", "laboratory initiated"],
                    'Lab discipline': ["anatomical pathology", "hematopathology", "medical microbiology", "medical biochemistry"]
                },
                '3.19': {},
                '3.20': {
                    'Specimen type': ["serum protein electrophoresis", "urine protein electrophoresis", "joint crystal", "urine crystal", "therapeutic drug monitoring", "clinical toxicology", "other"]
                },
                '3.21': {},
                '3.22': {}
            }
        },
        4: {
            'ID': 'TP',
            'topic': 'Transition to Practice (P)',
            subRoot: {
                "4.1": "Leading and managing the daily operations of the laboratory, including a full workload of cases representing the breadth of practice",
                "4.2": "Functioning independently on call",
                "4.3": "Leading, implementing and advocating for quality assurance practices",
                "4.4": "(SA) Developing and implementing a plan for continuing professional development"
            },
            maxObservation: {
                "4.1": 12,
                "4.2": 4,
                "4.3": 4,
                "4.4": 1
            },
            assessmentInfo: {
                "4.1": `Part A: Collect 12 observations of achievement
                - At least 2 each of surgical pathology, hematopathology, biochemistry, and
                microbiology
                - At least 2 observers from each laboratory domain (i.e. surgical pathology,
                hematopathology, biochemistry, and microbiology)
                
                Part B: Collect feedback on at least 6 occasions
                - At least two each of surgical pathology and hematopathology
                - At least one each of biochemistry and microbiology
                - At least two observers on each occasion.`,
                "4.2": `Part A: Collect 4 observations of achievement
                - At least 1 from each discipline.
                
                Part B: Collect at least 1 observation with feedback from at least 4 observers over the TTP stage.
                
                Part C: Collect 1 narrative statement for each 1 month of call during TTP stage.`,
                "4.3": `Collect 4 observations of achievement
                - At least 1 from each discipline.`,
                "4.4": `Supervisor review of resident’s submission of a personal learning plan.
                Collect 1 observation of achievement.`
            },
            clinicalPresentation: {
                '4.1': ["surgical pathology", "cytopathology", "autopsy pathology", "biochemistry", "microbiology", "hematopathology", "transfusion medicine", "hemostasis and coagulation", "molecular pathology"],
                '4.2': ["anatomical pathology", "biochemistry", "microbiology", "hematopathology"],
                '4.3': ["anatomical pathology", "biochemistry", "microbiology", "hematopathology"],
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
            },
            filterValuesDict: {
                '4.1': {
                    'Lab Discipline': ["surgical pathology", "cytopathology", "autopsy pathology", "biochemistry", "microbiology", "hematopathology", "transfusion medicine", "hemostasis and coagulation", "molecular pathology"]
                },
                '4.2': {
                    'Lab Discipline': ["anatomical pathology", "biochemistry", "microbiology", "hematopathology"]
                },
                '4.3': {
                    'Lab Discipline': ["anatomical pathology", "biochemistry", "microbiology", "hematopathology"]
                },
                '4.4': {}
            }
        }
    }
};

module.exports = programInfo;