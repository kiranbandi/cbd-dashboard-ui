const programInfo = {
    infoCardsVisible: false,
    examScoresVisible: false,
    narrativesVisible: true,
    rotationList: ["Acute Psych", "CAP", "CL Psych", "CL/Forensic", "CTU", "Collab Care", "EM", "ER Psych", "Elective", "Family", "Geri Psych", "Geriatrics", "IM Selective", "Inpatient", "Neurology", "Outpatient", "Palliative", "Psych Selective", "SPMI"],
    rotationRequired: {
        "Acute Psych": 5,
        "CAP": 5,
        "CL Psych": 5,
        "CL/Forensic": 5,
        "CTU": 5,
        "Collab Care": 5,
        "EM": 5,
        "ER Psych": 5,
        "Elective": 5,
        "Family": 5,
        "Geri Psych": 5,
        "Geriatrics": 5,
        "IM Selective": 5,
        "Inpatient": 5,
        "Neurology": 5,
        "Outpatient": 5,
        "Palliative": 5,
        "Psych Selective": 5,
        "SPMI": 5
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
            filterTitles: {},
            filterValuesDict: {
                '1.1': {},
                '1.2': {}
            }
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
            filterTitles: {},
            filterValuesDict: {
                '2.1': {},
                '2.2': {},
                '2.3': {},
                '2.4': {},
                '2.5': {}
            }
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
            filterTitles: {},
            filterValuesDict: {
                '3.1': {},
                '3.2': {},
                '3.3': {},
                '3.4': {},
                '3.5': {},
                '3.6': {},
                '3.7': {},
                '3.8': {},
                '3.9': {},
                '3.10': {}
            }
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
            filterTitles: {},
            filterValuesDict: {
                '4.1': {},
                '4.2': {},
                '4.3': {}
            }
        },
    }
};

module.exports = programInfo;