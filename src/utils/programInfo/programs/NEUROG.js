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
            assessmentInfo: {
                "1.1": `Collect 2 observations of achievement:
                - At least 1 direct observation of history taking (including indirect or direct
                observations of collecting corroborating information, as applicable)
                - At least 1 direct observation of physical exam
                - At least 1 patient with a neurological presentation
                - At least 2 observers
                - At least 1 faculty/attending observer`,
                "1.2": `Collect 1 observation of achievement. `,
                "1.3": `Collect 1 observation of achievement. `,
                "1.4": `Collect 2 observations of achievement.
                - At least 1 consult or admission note
                - At least 1 progress note
                - At least 1 faculty observer`,
                "1.5": `Collect 1 observation of achievement. `
            },
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
            assessmentInfo: {
                "2.1": `Collect 3 observations of achievement.
                - At least 1 acute stroke
                - At least 2 different presentations
                - At least 2 faculty observers`,
                "2.2": `Collect 3 observations of achievement.
                - At least 1 history
                - At least 2 physical
                - At least 2 different presentations
                - At least 2 attending staff`,
                "2.3": `Collect 4 observations of achievement.
                - At least 2 observation by staff neurologist
                - At least 4 different presentations `,
                "2.4": `Collect 3 observations of achievement.
                - At least 3 different domains
                - At least 1 psychiatric presentation
                - At least 2 attending staff with appropriate area of expertise`,
                "2.5": `Collect 2 observations of achievement
                - At least 1 complex
                - At least 1 staff physician observer`,
                "2.6": `Collect 1 observation of achievement. `
            },
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
            assessmentInfo: {
                "3.1": `Collect 6 observations of achievement
                - At least 1 acute stroke
                - At least 1 seizure
                - At least 1 acute neuromuscular weakness
                - At least 2 other presentations
                - At least 1 pediatric presentation
                - At least 3 observations by attending physician `,
                "3.2": `Collect 6 observations of achievement.
                - At least 6 different examples of the case mix
                - At least 3 complex
                - At least 5 observations from staff physicians
                - At least 3 different assessors`,
                "3.3": `Complete 4 observations of achievement.
                - At least 1 code stroke
                - At least 1 complex stroke
                - At least 1 refractory status epilepticus
                - At least 2 different observers
                - At least 1 staff observer`,
                "3.4": `Collect 10 observations of achievement
                - At least 1 of each specified exam technique
                - At least 1 cognitive testing`,
                "3.5": `Collect 2 observations of achievement.
                - At least 1 new letter to referring physician
                - At least 1 complex
                - At least 2 different assessors `,
                "3.6": `Collect 2 observations of achievement.
                - At least 2 different attending staff
                - Includes feedback from at least 3 other health professionals`,
                "3.7": `Collect 2 observations of achievement
                - At least 1 complex case
                - At least 2 different observers
                - At least 1 staff observer`,
                "3.8": `Collect 3 observations of achievement.
                - At least 1 goals of care discussion
                - At least 1 breaking bad news
                - At least 1 conversation in the setting of acute neurological emergency`
            },
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
            assessmentInfo: {
                '4.1': `Part A: Patient care
                Collect 2 observations of achievement
                - At least 1 case load of high complexity
                - 2 different supervisors
                
                Part B: Interprofessional care/supervision
                Collect feedback from at least 3 observers on one occasion during Transition to Practice`,
                '4.2': `Collect 2 observations of achievement.`,
                '4.3': `Collect 2 observations of achievement.
                - At least 2 different observers`
            },
            filterValuesDict: {
                '4.1': {},
                '4.2': {},
                '4.3': {}
            }
        },
    }
};

module.exports = programInfo;