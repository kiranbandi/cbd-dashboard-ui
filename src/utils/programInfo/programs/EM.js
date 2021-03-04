const programInfo = {
    programName: "EM",
    infoCardsVisible: true,
    examScoresVisible: true,
    narrativesVisible: true,
    rotationList: ["EM", "EM(REGINA)", "EM(PED)", "EM(RGNL)", "ACE", "ANESTHESIA", "CARDIO", "ICU", "GIM", "GEN SURG", "NEURO", "OBS/GYN", "OPTHO", "ORTHO", "OTHER", "PICU", "PLASTICS", "PSYCH", "SELECTIVE", "TOXICOLOGY", "TRAUMA", "TRANSPORT"],
    rotationRequired: {
        "ACE": 6,
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
        "TRANSPORT": 6,
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
                '1.1': 'Recognizing the unstable/critically ill patient, mobilizing the healthcare team and supervisor, and initiating basic life support',
                '1.2': 'Performing and documenting focused histories and physical exams, and providing preliminary management of cardinal emergency department presentations',
                '1.3': 'Facilitating communication of information between a patient in the emergency department, caregivers and members of the healthcare team to organize care and disposition of the patient',
                '1.4': '(SA) Using clinical informatics to facilitate efficient, safe, patient care'
            },
            maxObservation: {
                '1.1': 10,
                '1.2': 20,
                '1.3': 10,
                '1.4': 2

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
            filterTitles: {},
            filterValuesDict: {
                '1.1': {
                    'Clinical Presentation': ["cardiorespiratory arrest", "unstable dysrhythmia", "shock", "respiratory distress", "altered neurological status", "other"],
                    'Demographic': ["infant", "child", "youth", "adult", "senior"]
                },
                '1.2': {
                    'Clinical Presentation': ["chest pain", "shortness of breath", "abdominal pain", "minor trauma", "other"],
                    'Demographic': ["infant", "child", "youth", "adult", "senior"]
                },
                '1.3': {
                    'Demographic': ["infant", "child", "youth", "adult", "senior"]
                },
                '1.4': {}
            },
            assessmentInfo: {
                '1.1': `Collect 10 observations of achievement
                - At least 1 of each clinical presentation
                - May be simulated
                - At least 3 different observers`,
                '1.2': `Collect 20 observations of achievement
                - At least 5 observations of each of the 4 clinical presentations listed
                - At least 2 direct observations of each of the 4 clinical presentations listed
                - At least 3 different observers`,
                '1.3': `Collect 10 observations of achievement
                - Observation must be informed by at least 3 sources of information, such as nursing,
                other healthcare professionals, attending physicians or resident in Core or TTP from
                consulting services, emergency department administrative and support staff,
                patients and their families
                - At least 3 different observers`,
                '1.4': `Direct observation over a series of two or more emergency department clinical shifts by
                supervising physician or transition to practice emergency medicine resident`
            }
        },
        2: {
            'ID': 'F',
            'topic': 'Foundations of Discipline (F)',
            subRoot: {
                '2.1': 'Initiating and assisting in resuscitation of critically ill patients',
                '2.2': 'Assessing and managing uncomplicated urgent and non-urgent emergency department presentations',
                '2.3': 'Contributing to the shared work of the emergency department health care team to achieve high quality, efficient and safe patient care',
                '2.4': 'Performing basic procedures',
                '2.5': '(SA) Appraising and integrating new evidence into clinical practice'
            },
            maxObservation: {
                '2.1': 15,
                '2.2': 30,
                '2.3': 10,
                '2.4': 25,
                '2.5': 1
            },
            clinicalPresentation: {
                '2.1': ["cardiorespiratory arrest", "unstable dysrhythmia", "shock", "respiratory distress", "altered neurological status", "other"],
                '2.2': ["cough or wheeze", "musculoskeletal injury or pain", "eye complaint", "ENT complaint", "headache", "other"],
                '2.3': [],
                '2.4': ["simple wound repair including anesthesia", "abscess drainage", "casting or splinting", "anterior nasal packing", "arthrocentesis", "intraocular pressure measurement", "intraosseous acces"],
                '2.5': []
            },
            patientDemographic: {
                '2.1': ["infant", "child", "youth", "adult", "senior"],
                '2.2': ["infant", "child", "youth", "adult", "senior"],
                '2.3': ["infant", "child", "youth", "adult", "senior"],
                '2.4': ["infant", "child", "youth", "adult", "senior"],
                '2.5': []
            },
            filterTitles: {},
            filterValuesDict: {
                '2.1': {
                    'Clinical Presentation': ["cardiorespiratory arrest", "unstable dysrhythmia", "shock", "respiratory distress", "altered neurological status", "other"],
                    'Demographic': ["infant", "child", "youth", "adult", "senior"]
                },
                '2.2': {
                    'Clinical Presentation': ["cough or wheeze", "musculoskeletal injury or pain", "eye complaint", "ENT complaint", "headache", "other"],
                    'Demographic': ["infant", "child", "youth", "adult", "senior"]
                },
                '2.3': {
                    'Demographic': ["infant", "child", "youth", "adult", "senior"]
                },
                '2.4': {
                    'Clinical Presentation': ["simple wound repair including anesthesia", "abscess drainage", "casting or splinting", "anterior nasal packing", "arthrocentesis", "intraocular pressure measurement", "intraosseous acces"],
                    'Demographic': ["infant", "child", "youth", "adult", "senior"]
                },
                '2.5': {}
            },
            assessmentInfo: {
                '2.1': `Collect 15 observations of achievement
                - At least 3 presentations in a clinical (not simulated) environment
                - At least 2 pediatric presentations
                - Pediatric presentations may be simulated`,
                '2.2': `Collect 30 observations of achievement
                - At least 2 observations of each example clinical presentation listed above
                - At least 5 pediatric presentations`,
                '2.3': `Collect 10 observations of achievement
                - At least 5 informed by direct input from a non-physician member of the healthcare
                team with a knowledge of emergency department function (input from the nonphysician member must be documented in the narrative section)`,
                '2.4': `Collect 25 observations of achievement
                - At least 2 observations of each procedure for adult patients
                - At least 3 observations of simple wound repair for pediatric presentations
                - At least 3 observations of casting or splinting for pediatric presentations
                - At least 2 different observers for each procedure type
                - Intraosseous access may be simulated`,
                '2.5': `Collect 1 submission of satisfactory achievement. `
            }
        },
        3: {
            'ID': 'CORE',
            'topic': 'Core of Discipline (C)',
            subRoot: {
                '3.1': 'Resuscitating and coordinating care for critically ill patients',
                '3.2': 'Resuscitating and coordinating care for critically injured trauma patients',
                '3.3': 'Providing airway management and ventilation',
                '3.4': 'Providing emergency sedation and systemic analgesia for diagnostic and therapeutic procedures',
                '3.5': 'Identifying and managing patients with emergent medical or surgical conditions',
                '3.6': 'Diagnosing and managing complicated urgent and non-urgent patient presentations',
                '3.7': 'Managing the urgent and emergent presentations for pregnant and post-partum patients',
                '3.8': 'Managing patients with acute toxic ingestion or exposure',
                '3.9': 'Managing a patient with an emergency mental health condition or behavioural emergency',
                '3.10': 'Managing and supporting patients in situational crisis to access health care and community resources',
                '3.11': 'Recognizing and managing patients who are at risk of exposure to, or who have experienced violence and/or neglect',
                '3.12': 'Liaising with prehospital emergency medical services ',
                '3.13': 'Performing advanced procedures',
                '3.14': 'Performing and interpreting point-of-care ultrasound to guide patient management',
                '3.15': 'Providing end-of-life care for a patient',
                '3.16': '(SA) Describing the indications and performance of rare critical procedures',
                '3.17': '(SA) Clinical teaching in the emergency department',
                '3.18': '(SA) Teaching an interactive large group session',
                '3.19': '(SA) Participating in a disaster medicine exercise',
                '3.20': '(SA) Advancing emergency medicine through a scholarly project'
            },
            maxObservation: {
                '3.1': 40,
                '3.2': 25,
                '3.3': 20,
                '3.4': 20,
                '3.5': 40,
                '3.6': 40,
                '3.7': 15,
                '3.8': 15,
                '3.9': 15,
                '3.10': 5,
                '3.11': 5,
                '3.12': 5,
                '3.13': 25,
                '3.14': 50,
                '3.15': 5,
                '3.16': 1,
                '3.17': 2,
                '3.18': 1,
                '3.19': 1,
                '3.20': 1
            },
            clinicalPresentation: {
                '3.1': ["shock", "cardiorespiratory arrest", "respiratory failure", "severe sepsis", "other"],
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
                '3.13': ["complex wound repair", "central venous access with ultrasound guidance", "reduction of an extremity fracture", "lumbar puncture", "reduction of large joint dislocation", "regional anesthesia (e.g. large peripheral nerve block, not a digital nerve)", "thoracostomy tube insertion"],
                '3.14': ["pericardial effusion and cardiac tamponade", "global estimation of left ventricular fraction", "pneumothorax", "hemothorax", "pleural effusion", "abdominal aortic aneurysm", "abdominal or pelvic free fluid", "first trimester intrauterine gestation"],
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
            filterTitles: {},
            filterValuesDict: {
                '3.1': {
                    'Clinical Presentation': ["shock", "cardiorespiratory arrest", "respiratory failure", "severe sepsis", "other"],
                    'Demographic': ["infant", "child", "youth", "adult", "senior"]
                },
                '3.2': {
                    'Clinical Presentation': ["blunt trauma", "penetrating trauma", "other"],
                    'Demographic': ["infant", "child", "youth", "adult", "senior"]
                },
                '3.3': {
                    'Demographic': ["infant", "child", "youth", "adult", "senior"]
                },
                '3.4': {
                    'Demographic': ["infant", "child", "youth", "adult", "senior"]
                },
                '3.5': {
                    'Clinical Presentation': ["abdominal pain", "chest pain", "dysrhythmia", "respiratory distress", "altered mental status", "other"],
                    'Demographic': ["infant", "child", "youth", "adult", "senior"]
                },
                '3.6': {
                    'Clinical Presentation': ["fever", "vomiting", "rash", "syncope", "weakness", "acute gynecological", "other"],
                    'Demographic': ["infant", "child", "youth", "adult", "senior"]
                },
                '3.7': {
                    'Clinical Presentation': ["first trimester bleeding", "complications of pregnancy", "vaginal delivery", "post-partum hemorrhage", "other"],
                    'Demographic': ["infant", "child", "youth", "adult", "senior"]
                },
                '3.8': {
                    'Clinical Presentation': ["sympathomimetic toxidrome", "opioid toxidrome", "antidepressant toxicity", "toxic bradycardia", "other"],
                    'Demographic': ["infant", "child", "youth", "adult", "senior"]
                },
                '3.9': {
                    'Clinical Presentation': ["psychosis or mania", "major depressive disorder", "anxiety disorder", "suicidality", "personality disorder", "other"],
                    'Demographic': ["infant", "child", "youth", "adult", "senior"]
                },
                '3.10': {
                    'Demographic': ["infant", "child", "youth", "adult", "senior"]
                },
                '3.11': {
                    'Demographic': ["infant", "child", "youth", "adult", "senior"]
                },
                '3.12': {
                    'Demographic': ["infant", "child", "youth", "adult", "senior"]
                },
                '3.13': {
                    'Clinical Presentation': ["complex wound repair", "central venous access with ultrasound guidance", "reduction of an extremity fracture", "lumbar puncture", "reduction of large joint dislocation", "regional anesthesia (e.g. large peripheral nerve block, not a digital nerve)", "thoracostomy tube insertion"],
                    'Demographic': ["infant", "child", "youth", "adult", "senior"]
                },
                '3.14': {
                    'Clinical Presentation': ["pericardial effusion and cardiac tamponade", "global estimation of left ventricular fraction", "pneumothorax", "hemothorax", "pleural effusion", "abdominal aortic aneurysm", "abdominal or pelvic free fluid", "first trimester intrauterine gestation"],
                    'Demographic': ["infant", "child", "youth", "adult", "senior"]
                },
                '3.15': {},
                '3.16': {},
                '3.17': {},
                '3.18': {},
                '3.19': {},
                '3.20': {}
            },
            assessmentInfo: {
                '3.1': `Collect 40 observations of achievement
                - At least 5 pediatric presentations, of which three may be simulated
                - At least 20 observations in a clinical environment `,
                '3.2': `Collect 25 observations of achievement:
                - At least 5 adults with penetrating trauma
                - At least 10 adults in a clinical (not simulation) setting
                - At least 5 pediatric presentations
                - At least 3 different observers for adult observations
                - At least 2 different observers for pediatric presentations`,
                '3.3': `Collect 20 observations of achievement
                - At least 5 observations of predicted difficult airways based on patient anatomy or
                physiology
                - At least 5 observations within the emergency department
                - At least 10 pediatric presentations
                - At least 5 pediatric presentations in the clinical (not simulated) environment
                - At least 3 different observers`,
                '3.4': `Collect 20 observations of achievement
                - At least 5 adults in the emergency department
                - At least 5 pediatric presentations
                - At least 3 different observers`,
                '3.5': `Collect 40 observations of achievement
                - At least 10 pediatric presentations
                - At least 2 observations of each clinical presentation
                - At least 2 different observers for each presentation`,
                '3.6': `Collect 40 observations of achievement
                - At least 2 observations of each clinical presentation
                - At least 10 pediatric presentations
                - At least 3 different observers`,
                '3.7': `Collect 15 observations of achievement
                - At least 2 observations of each clinical presentation
                - At least 5 observations must be in the clinical environment
                - At least 5 vaginal deliveries in the clinical environment`,
                '3.8': `Collect 15 observations of achievement
                - At least 1 observation of each clinical presentation
                - At least 5 clinical (not simulated) observations
                - At least 3 different observers`,
                '3.9': `Collect 15 observations of achievement
                - At least 1 of each clinical presentation
                - At least 2 pediatric presentations
                - At least 3 different observers`,
                '3.11': `Collect 5 observations of achievement
                - May include simulation
                - At least one pediatric presentation`,
                '3.12': `Collect 5 observations of achievement
                - At least 2 different observers
                - Simulation is acceptable for all observations`,
                '3.13': `Collect 25 observations of achievement
                - At least 2 observations of each procedure in the clinical (not simulated) environment
                - At least 2 different observers for each procedure`,
                '3.14': `Collect 50 observations of achievement
                - At least 5 of each of the following potential conditions to determine the presence of:
                pericardial effusion; global estimation of left ventricular fraction; pneumothorax;
                hemothorax; pleural effusion; abdominal aortic aneurysm; abdominal or pelvic free
                fluid; first trimester intrauterine gestation
                - At least 2 of each category must be directly observed
                - At least 3 different observers`,
                '3.15': `Collect 5 observations of achievement
                - At least 2 different observers
                - At least 2 emergency department presentations`,
                '3.16': `Resident’s descriptions of the indication and performance of the procedure, without
                assistance or resources, reviewed by PD or Competence Committee. Collect 1 submission of satisfactory achievement. `,
                '3.17': `Direct observation over a series of two or more emergency department clinical shifts by
                supervising physician or transition to practice emergency medicine resident
                Collect two observations of satisfactory achievement from two different observers. `,
                '3.18': `Direct observation of a session by supervisor with access to participant evaluations of the
                session
                Collect 1 submission of satisfactory achievement`,
                '3.19': `Direct or indirect observation of resident completion of a disaster medicine exercise, as
                approved by the residency training program, by PD
                Collect 1 submission of satisfactory achievement. `,
                '3.20': `Resident’s submission of a report on a clinical research, quality improvement/patient safety,
                or education project, relevant to Emergency Medicine, reviewed by PD or Competence
                Committee
                Collect one submission of satisfactory achievement`
            }
        },
        4: {
            'ID': 'TP',
            'topic': 'Transition to Practice (P)',
            subRoot: {
                '4.1': 'Managing the emergency department to optimize patient care and department flow',
                '4.2': 'Teaching and supervising the learning of trainees and other health professionals',
                '4.3': 'Managing complex interpersonal interactions that arise during the course of patient care',
                '4.4': 'Providing expert EM consultation to physicians or other healthcare providers',
                '4.5': 'Coordinating and collaborating with healthcare professional colleagues to safely transition the care of a patient including handover, consultations, and facilitating inter-institution transport',
                '4.6': 'Dealing with uncertainty when managing patients with ambiguous presentations',
                '4.7': '(SA) Developing personal learning plans',
                '4.8': '(SA) Participating in quality improvement intitiatives to enhance patient care'
            },
            maxObservation: {
                '4.1': 25,
                '4.2': 15,
                '4.3': 5,
                '4.4': 5,
                '4.5': 10,
                '4.6': 5,
                '4.7': 1,
                '4.8': 1
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
                '4.2': ["medical student", "off service resident", "EM resident", "other"],
                '4.3': ["patient interaction", "family interaction", "physician interaction", "other health care professional interaction"],
                '4.4': ["infant", "child", "youth", "adult", "senior"],
                '4.5': ["infant", "child", "youth", "adult", "senior"],
                '4.6': ["infant", "child", "youth", "adult", "senior"],
                '4.7': [],
                '4.8': []
            },
            filterTitles: {},
            filterValuesDict: {
                '4.1': {
                    'Clinical Presentation': ["resuscitation", "acute care", "ambulatory", "other"]
                },
                '4.2': {
                    'Clinical Presentation': ["individual", "multiple"],
                    'Demographic': ["medical student", "off service resident", "EM resident", "other"]
                },
                '4.3': {
                    'Demographic': ["patient interaction", "family interaction", "physician interaction", "other health care professional interaction"]
                },
                '4.4': {
                    'Clinical Presentation': ["consulting service", "community ED", "outpatient clinic", "family physician", "other"],
                    'Demographic': ["infant", "child", "youth", "adult", "senior"]
                },
                '4.5': {
                    'Clinical Presentation': ["EP to EP", "EP to OP within hospital", "EP to OP at another hospital", "EP to LTC", "EP to PCP", "EP to follow-up with OP", "other"],
                    'Demographic': ["infant", "child", "youth", "adult", "senior"]
                },
                '4.6': {
                    'Demographic': ["infant", "child", "youth", "adult", "senior"]
                },
                '4.7': {},
                '4.8': {}
            },
            assessmentInfo: {
                '4.1': `Collect 25 observations of achievement.`,
                '4.2': `Collect 15 observations of achievement
                - At least 2 different observers
                - At least 3 observations each of teaching a medical student, off service resident and
                EM resident`,
                '4.3': `Collect 5 observations of achievement
                - At least 2 different observers
                - At least 3 clinical (not simulated) observations `,
                '4.4': `Collect 5 observations of achievement
                - At least 2 different observers `,
                '4.5': `Collect 10 observations of achievement:
                - At least 5 EP to EP handovers
                - At least 2 different observers`,
                '4.6': `Collect 5 observations of achievement
                - At least 2 different observers`,
                '4.7': `Resident submission of a personal learning plan around a specific, completed learning need
                reviewed by PD or Competence Committee
                Collect 1 submission of satisfactory achievement. `,
                '4.8': `Direct observation of a presentation (e.g. rounds) or indirect review of resident’s submission
                of a report by supervisor
                Collect 1 submission of satisfactory achievement`
            }
        },
    }
};

module.exports = programInfo;