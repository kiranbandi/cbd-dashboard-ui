const programInfo = {
    infoCardsVisible: false,
    examScoresVisible: false,
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
                '1.1': "Obtaining a psychiatric history to inform the preliminary diagnostic impression for patients presenting with mental disorders",
                '1.2': "Communicating clinical encounters in oral and written/electronic form"
            },
            maxObservation: {
                '1.1': 2,
                '1.2': 2,
            },
            clinicalPresentation: {},
            patientDemographic: {},
            filterTitles: {}

        },
        2: {
            'ID': 'F',
            'topic': 'Foundations of Discipline (F)',
            subRoot: {
                '2.1': "Assessing, diagnosing and participating in the management of patients with medical presentations relevant to psychiatry",
                '2.2': "Performing psychiatric assessments referencing a biopsychosocial approach, and developing basic differential diagnoses for patients with mental disorders",
                '2.3': "Developing and implementing management plans for patients with psychiatric presentations of low to medium complexity",
                '2.4': "Performing risk assessments that inform the development of an acute safety plan for patients posing risk for harm to self or others",
                '2.5': "Performing critical appraisal and presenting psychiatric literature"
            },
            maxObservation: {
                '2.1': 8,
                '2.2': 6,
                '2.3': 6,
                '2.4': 5,
                '2.5': 2
            },

            clinicalPresentation: {},
            patientDemographic: {},
            filterTitles: {}
        },
        3: {
            'ID': 'CORE',
            'topic': 'Core of Discipline (C)',
            subRoot: {
                '3.1': "Developing comprehensive treatment/management plans for adult patients",
                '3.2': "Performing psychiatric assessments and providing differential diagnoses and management plans for children and youth",
                '3.3': "Performing psychiatric assessments, and providing differential diagnoses and management plans for older adults",
                '3.4': "Developing comprehensive biopsychosocial formulations for patients across the lifespan",
                '3.5': "Identifying, assessing, and managing emergent situations in psychiatric care across the lifespan",
                '3.6': "Integrating the principles and skills of psychotherapy into patient care",
                '3.7': "Integrating the principles and skills of neurostimulation into patient care",
                '3.8': "Integrating the principles and skills of psychopharmacology into patient care",
                '3.9': "Applying relevant legislation and legal principles to patient care and clinical practice",
                '3.10': "Providing teaching for students, residents, the public and other health care professionals"
            },
            maxObservation: {
                '3.1': 8,
                '3.2': 6,
                '3.3': 6,
                '3.4': 8,
                '3.5': 8,
                '3.6': 13,
                '3.7': 6,
                '3.8': 12,
                '3.9': 6,
                '3.10': 4
            },
            clinicalPresentation: {},
            patientDemographic: {},
            filterTitles: {}
        },
        4: {
            'ID': 'TP',
            'topic': 'Transition to Practice (P)',
            subRoot: {
                '4.1': "Managing the clinical and administrative aspects of a psychiatric practice",
                '4.2': "Supervising junior trainees",
                '4.3': "Developing and implementing personalized training experiences geared to career plans or future practice"
            },
            maxObservation: {
                '4.1': 1,
                '4.2': 4,
                '4.3': 1
            },
            clinicalPresentation: {},
            patientDemographic: {},
            filterTitles: {}
        },
    }
};

module.exports = programInfo;