const programInfo = {
    programName: "NEUROG",
    infoCardsVisible: false,
    examScoresVisible: false,
    narrativesVisible: true,
    rotationList: ["CTU", "CCU", "NEURO", "ID", "RESP", "GIM", "ENDO", "HEME", "RHEUM", "EM", "ICU", "NSX", "PSYCH", "PHYSIATRY", "OPTHO", "NEURORAD", "NEUROPATH", "ONCOLOGY", "EMG", "EEG", "MD", "STROKE", "MS", "RESEARCH", "PALLIATIVE", "ELECTIVE", "EEG/EMG", "JR CONSULT", "PED-NEURO", "OTHER"],
    rotationRequired: {
        "CTU": 10,
        "CCU": 10,
        "NEURO": 10,
        "ID": 10,
        "RESP": 10,
        "GIM": 10,
        "ENDO": 10,
        "HEME": 10,
        "RHEUM": 10,
        "EM": 10,
        "ICU": 10,
        "NSX": 10,
        "PSYCH": 10,
        "PHYSIATRY": 10,
        "OPTHO": 10,
        "NEURORAD": 10,
        "NEUROPATH": 10,
        "ONCOLOGY": 10,
        "EMG": 10,
        "EEG": 10,
        "MD": 10,
        "STROKE": 10,
        "MS": 10,
        "RESEARCH": 10,
        "PALLIATIVE": 10,
        "ELECTIVE": 10,
        "EEG/EMG": 10,
        "JR CONSULT": 10,
        "PED-NEURO": 10,
        "OTHER": 10
    },
    epaSourceMap: {
        1: {
            'ID': 'TTD',
            'topic': 'Transition to Discipline (D)',
            subRoot: {
                "1.1": "Performing a history and physical examination for patients with common neurological, medical and/or psychiatric presentations",
                "1.2": "Recognizing the acuity of illness, initiating stabilization of patients, and obtaining help",
                "1.3": "Presenting findings of patient assessments",
                "1.4": "Documenting patient encounters",
                "1.5": "Transferring clinical information between health care providers at handover"
            },
            maxObservation: {
                "1.1": 2,
                "1.2": 1,
                "1.3": 1,
                "1.4": 2,
                "1.5": 1
            },
            clinicalPresentation: {},
            patientDemographic: {},
            filterTitles: {},
            filterValuesDict: {
                '1.1': {},
                '1.2': {},
                '1.3': {},
                '1.4': {},
                '1.5': {}
            }
        },
        2: {
            'ID': 'F',
            'topic': 'Foundations of Discipline (F)',
            subRoot: {
                "2.1": "Assessing and initiating management for patients with neurological emergencies",
                "2.2": "Assessing patients with common neurological presentations",
                "2.3": "Diagnosing and managing patients with common neurological presentations",
                "2.4": "Assessing and providing initial management for patients with non-neurological presentations",
                "2.5": "Performing lumbar punctures",
                "2.6": "Identifying and documenting goals of care"
            },
            maxObservation: {
                "2.1": 3,
                "2.2": 3,
                "2.3": 4,
                "2.4": 3,
                "2.5": 2,
                "2.6": 1
            },
            clinicalPresentation: {},
            patientDemographic: {},
            filterTitles: {},
            filterValuesDict: {
                '2.1': {},
                '2.2': {},
                '2.3': {},
                '2.4': {},
                '2.5': {},
                '2.6': {}
            }
        },
        3: {
            'ID': 'CORE',
            'topic': 'Core of Discipline (C)',
            subRoot: {
                "3.1": "Assessing and managing patients with acute neurological illness",
                "3.2": "Providing ongoing care for patients with chronic neurological diseases",
                "3.3": "Providing comprehensive management for patients with neurological emergencies",
                "3.4": "Performing specialized neurological examination techniques and procedures",
                "3.5": "Documenting clinical encounters",
                "3.6": "Managing the team caring for patients admitted with neurological problems",
                "3.7": "Planning and implementing transitions of care",
                "3.8": "Leading discussions in complicated situations"
            },
            maxObservation: {
                "3.1": 6,
                "3.2": 6,
                "3.3": 4,
                "3.4": 10,
                "3.5": 2,
                "3.6": 2,
                "3.7": 2,
                "3.8": 3
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
                '3.8': {}
            }
        },
        4: {
            'ID': 'TP',
            'topic': 'Transition to Practice (P)',
            subRoot: {
                '4.1': "Leading a neurological inpatient or consultation service",
                '4.2': "Managing an outpatient neurological practice",
                '4.3': "Providing consultation for and managing patients at outlying centers"
            },
            maxObservation: {
                '4.1': 2,
                '4.2': 2,
                '4.3': 2
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