const programInfo = {
    programName: "NEURO",
    infoCardsVisible: false,
    examScoresVisible: false,
    narrativesVisible: false,
    rotationList: ["CEREBRO", "CLINIC", "GIM", "GSX", "ICU", "NEURO", "NEURO-PATH", "NEURO-RAD", "NSX", "ORTHO-SPINE", "PLASTICS", "REGINA-NSX", "RESEARCH", "TRAUMA", "VASCULAR", "OTHER"],
    rotationRequired: {
        "CEREBRO": 8,
        "CLINIC": 8,
        "GIM": 8,
        "GSX": 8,
        "ICU": 8,
        "NEURO": 8,
        "NEURO-PATH": 8,
        "NEURO-RAD": 8,
        "NSX": 8,
        "ORTHO-SPINE": 8,
        "PLASTICS": 8,
        "REGINA-NSX": 8,
        "RESEARCH": 8,
        "TRAUMA": 8,
        "VASCULAR": 8,
        "OTHER": 8
    },
    epaSourceMap: {
        1: {
            'ID': 'TTD',
            'topic': 'Transition to Discipline (D)',
            subRoot: {
                1.1: "Performing and reporting the history and physical exam for patients with a neurosurgical presentation"
            },
            maxObservation: {
                '1.1': 2
            },
            clinicalPresentation: {},
            patientDemographic: {},
            filterTitles: {},
            filterValuesDict: {
                '1.1': {}
            }
        },
        2: {
            'ID': 'F',
            'topic': 'Foundations of Discipline (F)',
            subRoot: {
                '2.1': "Assessing patients with a neurosurgical presentation",
                '2.2': "Providing initial management for patients with a cranial emergency",
                '2.3': "Providing initial management for patients with a spinal emergency",
                '2.4': "Managing complications of neurosurgical conditions for hospitalized patients, including post-operative complications",
                '2.5': "Assessing patients with common neurologic conditions",
                '2.6': "Providing initial management for patients with an acute stroke",
                '2.7': "Inserting CSF drains and ICP monitors",
                '2.8': "Applying external spinal fixation and/or traction",
                '2.9': "Performing burr hole drainage of a chronic subdural hematoma",
                '2.10': "Performing the technical skills of a supratentorial craniotomy",
                '2.11': "Performing midline posterior subaxial spinal column exposure and closure",
            },
            maxObservation: {
                '2.1': 5,
                '2.2': 5,
                '2.3': 3,
                '2.4': 5,
                '2.5': 3,
                '2.6': 2,
                '2.7': 5,
                '2.8': 1,
                '2.9': 2,
                '2.10': 3,
                '2.11': 3,
            },
            clinicalPresentation: {
                '2.1': ["central", "spine", "peripheral"],
                '2.2': ["subarachnoid hemorrhage", "severe traumatic brain injury", "spontaneous intracranial hemorrhage", "acute hydrocephalus", "mass lesion with acute deterioration"],
                '2.3': ["cervical", "thoracic and/or lumbar"],
                '2.4': ["CSF leak", "seizure", "CNS related endocrine and metabolic disturbances", "CNS infection", "vasospasm", "new postoperative neurologic deficit", "trouble shooting drains"],
                '2.5': ["central", "spinal", "peripheral"],
                '2.7': ["lumbar drain", "intracranial pressure monitor", "external ventricular drain"],
                '2.11': ["cervical", "thoracic", "lumbar"]
            },
            patientDemographic: {
                '2.1': ["trauma", "tumour", "hemorrhage", "other"],
                '2.2': ["yes", "no"]
            },
            filterTitles: {
                '2.1': ["Location", "Etiology"],
                '2.2': ["Case Mix", "Herination Syndrome"],
                '2.3': ['Level'],
                '2.4': ['Issue Type'],
                '2.5': ["Location"],
                '2.7': ['Type of Drain'],
                '2.11': ['Location']
            },
            filterValuesDict: {
                '2.1': {
                    'Location': ["central", "spine", "peripheral"],
                    'Etiology': ["trauma", "tumour", "hemorrhage", "other"]
                },
                '2.2': {
                    'Case Mix': ["subarachnoid hemorrhage", "severe traumatic brain injury", "spontaneous intracranial hemorrhage", "acute hydrocephalus", "mass lesion with acute deterioration"],
                    'Herination Syndrome': ["yes", "no"]
                },
                '2.3': {
                    'Level': ["cervical", "thoracic and/or lumbar"]
                },
                '2.4': {
                    'Issue Type': ["CSF leak", "seizure", "CNS related endocrine and metabolic disturbances", "CNS infection", "vasospasm", "new postoperative neurologic deficit", "trouble shooting drains"]
                },
                '2.5': {
                    'Location': ["central", "spinal", "peripheral"]
                },
                '2.6': {},
                '2.7': {
                    'Type of Drain': ["lumbar drain", "intracranial pressure monitor", "external ventricular drain"]
                },
                '2.8': {},
                '2.9': {},
                '2.10': {},
                '2.11': {
                    'Location': ["cervical", "thoracic", "lumbar"]
                }
            }
        },
        3: {
            'ID': 'CORE',
            'topic': 'Core of Discipline (C)',
            subRoot: {
                '3.1': "Managing the neurosurgical inpatient service",
                '3.2': "Providing definitive management for patients with a cranial emergency",
                '3.3': "Providing definitive management for patients with complications of neurosurgical conditions",
                '3.4': "Leading discussions with patients and/or their families in emotionally charged situations",
                '3.5': "Providing neurosurgical consultation for patients with a CNS infection",
                '3.6': "Providing neurosurgical consultation for patients with a CSF related disorder",
                '3.7': "Discussing and documenting informed consent for neurosurgical procedures",
                '3.8': "Performing common craniotomies (JC)",
                '3.9': "Providing surgical management for patients with a head injury",
                '3.10': "Providing surgical management for patients with a CSF-related disorder",
                '3.11': "Documenting operative procedures (JC)",
                '3.12': "Developing and executing scholarly projects",
                '3.13': "Contributing to quality improvement and educational initiatives",
                '3.14': "Assessing patients’ candidacy for advanced functional procedures",
                '3.15': "Providing neurosurgical consultation for patients with trigeminal neuralgia and other neurovascular compression syndromes",
                '3.16': "Performing stereotactic procedures",
                '3.17': "Providing surgical management of trigeminal neuralgia and other neurovascular compression syndromes",
                '3.18': "Providing neurosurgical consultation for patients with disorders of the peripheral nervous system",
                '3.19': "Performing peripheral nerve decompression procedures (JC)",
                '3.20': "Performing sural nerve and/or muscle biopsy (JC)",
                '3.21': "Performing resection of common peripheral nerve tumors (SC)",
                '3.22': "Providing neurosurgical consultation for patients with non-urgent spinal conditions",
                '3.23': "Providing definitive management for patients with spinal emergencies",
                '3.24': "Performing lumbar laminectomy (JC)",
                '3.25': "Exposing the anterior cervical spine (JC)",
                '3.26': "Performing lumbar microdiscectomy (SC)",
                '3.27': "Performing posterior cervical or thoracic decompression (SC)",
                '3.28': "Performing anterior cervical decompression (SC)",
                '3.29': "Performing procedures utilizing spinal instrumentation including posterior subaxial, posterior thoraco-lumbar, occipito-cervical and anterior cervical (SC)",
                '3.30': "Providing surgical management of spinal intra-dural lesions (SC)",
                '3.31': "Providing neurosurgical consultation for patients with non-urgent cranial and spinal vascular conditions",
                '3.32': "Providing neurosurgical consultation for patients with urgent cranial and spinal vascular conditions",
                '3.33': "Performing carotid endarterectomy",
                '3.34': "Performing surgery for patients with an intracranial aneurysm",
                '3.35': "Performing surgery for patients with spontaneous intracerebral hemorrhage with or without an underlying vascular malformation",
                '3.36': "Providing neurosurgical consultation for patients with simple brain tumours (JC)",
                '3.37': "Providing neurosurgical consultation for patients with complex brain tumours (SC)",
                '3.38': "Performing surgery for patients with simple intra-axial brain tumours (JC)",
                '3.39': "Performing surgery for patients with complex brain tumours (SC)",
                '3.40': "Performing transnasal surgery for patients with pituitary tumours (SC)",
                '3.41': "Assessing and providing initial management for pediatric patients with a neurosurgical emergency",
                '3.42': "Assessing pediatric patients being considered for neurosurgical intervention",
                '3.43': "Managing the care of hospitalized pediatric patients",
                '3.44': "Performing CSF shunt procedures for pediatric patients",
                '3.45': "Performing craniotomy in an infant/toddler",
                '3.46': "Performing spine procedures for pediatric patients"
            },
            maxObservation: {
                '3.1': 2,
                '3.2': 5,
                '3.3': 5,
                '3.4': 2,
                '3.5': 2,
                '3.6': 5,
                '3.7': 2,
                '3.8': 4,
                '3.9': 3,
                '3.10': 5,
                '3.11': 3,
                '3.12': 1,
                '3.13': 1,
                '3.14': 4,
                '3.15': 2,
                '3.16': 2,
                '3.17': 3,
                '3.18': 4,
                '3.19': 2,
                '3.20': 1,
                '3.21': 1,
                '3.22': 5,
                '3.23': 5,
                '3.24': 2,
                '3.25': 2,
                '3.26': 2,
                '3.27': 2,
                '3.28': 2,
                '3.29': 8,
                '3.30': 2,
                '3.31': 3,
                '3.32': 3,
                '3.33': 2,
                '3.34': 2,
                '3.35': 2,
                '3.36': 4,
                '3.37': 5,
                '3.38': 4,
                '3.39': 4,
                '3.40': 2,
                '3.41': 2,
                '3.42': 3,
                '3.43': 2,
                '3.44': 2,
                '3.45': 1,
                '3.46': 1,
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
                '3.10': {},
                '3.11': {},
                '3.12': {},
                '3.13': {},
                '3.14': {},
                '3.15': {},
                '3.16': {},
                '3.17': {},
                '3.18': {},
                '3.19': {},
                '3.20': {},
                '3.21': {},
                '3.22': {},
                '3.23': {},
                '3.24': {},
                '3.25': {},
                '3.26': {},
                '3.27': {},
                '3.28': {},
                '3.29': {},
                '3.30': {},
                '3.31': {},
                '3.32': {},
                '3.33': {},
                '3.34': {},
                '3.35': {},
                '3.36': {},
                '3.37': {},
                '3.38': {},
                '3.39': {},
                '3.40': {},
                '3.41': {},
                '3.42': {},
                '3.43': {},
                '3.44': {},
                '3.45': {},
                '3.46': {}
            }
        },
        4: {
            'ID': 'TP',
            'topic': 'Transition to Practice (P)',
            subRoot: {
                '4.1': "Managing an out-patient clinic",
                '4.2': "Coordinating, organizing and executing the surgical day of Core procedures",
                '4.3': "Contributing surgical expertise to interprofessional neurosurgery teams"
            },
            maxObservation: {
                '4.1': 2,
                '4.2': 3,
                '4.3': 1
            },
            clinicalPresentation: {
                '4.2': ["general", "functional", "peripheral", "spinal", "vascular", "oncology", "pediatric", "other"]
            },
            patientDemographic: {},
            filterTitles: {
                '4.2': ['Procedure']
            },
            filterValuesDict: {
                '4.1': {},
                '4.2': {
                    'Procedure': ["general", "functional", "peripheral", "spinal", "vascular", "oncology", "pediatric", "other"]
                },
                '4.3': {}
            }
        },
    }
};

module.exports = programInfo;