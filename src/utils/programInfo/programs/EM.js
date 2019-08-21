const programInfo = {
    infoCardsVisible: true,
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
            filterTitles: {}

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
                '4.2': ["medical student", "off service resident", "EM resident", " other"],
                '4.3': ["patient interaction", "family interaction", "physician interaction", "other health care professional interaction"],
                '4.4': ["infant", "child", "youth", "adult", "senior"],
                '4.5': ["infant", "child", "youth", "adult", "senior"],
                '4.6': ["infant", "child", "youth", "adult", "senior"],
                '4.7': [],
                '4.8': []
            },
            filterTitles: {}
        },
    }
};

module.exports = programInfo;