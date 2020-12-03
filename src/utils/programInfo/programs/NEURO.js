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
            filterValuesDict: {},
            assessmentInfo: {
                '1.1': "Collect 2 observations of achievement."
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
            assessmentInfo: {
                '2.1': `Collect 5 observations of achievement
                - At least 2 outpatient clinic
                - At least 2 emergency room or inpatient
                - At least 1 each of trauma, tumor, hemorrhage, spine, peripheral
                - At least 2 different assessors`,
                '2.2': `Collect 5 observations
                ‐ At least 1 of each case mix
                ‐ At least 1 herniation syndrome
                ‐ At least 2 different assessors.`,
                '2.3': `Collect 3 observations of achievement
                - At least 1 cervical
                - At least 1 thoracic and/or lumbar
                - At least 1 patient with a neurologic deficit
                - At least 1 patient with a mechanically unstable spine
                - At least 2 different assessors `,
                '2.4': `Collect 5 observations of achievement
                - At least 4 different issues
                - At least 2 assessors`,
                '2.5': `Collect 3 observations of achievement
                - At least 1 of each type of location
                - At least 1 direct observation`,
                '2.6': `Collect 2 observations of achievement
                - At least 1 patient who had active intervention `,
                '2.7': `Part A:Procedural skills 
                Collect 5 observations of achievement
                - At least 1 lumbar drain
                - At least 1 ICP monitor
                - At least 2 EVDs.
                
                Part B:Logbook
                Resident submits logbook of general neurosurgical procedures`,
                '2.8': `Part A: Procedural skills 
                Collect 1 observation of achievement.

                Part B:Logbook
                Submit logbook of general neurosurgical procedures`,
                '2.9': `Part A: Procedural skills 
                Collect 2 observations of achievement
                    - At least one with staff as supervisor

                Part B:Logbook
                Resident submits logbook of general neurosurgical procedures`,
                '2.10': `Part A: Procedural skills 
                Collect 3 observations
                    - At least 2 assessors 

                Part B:Logbook
                Submit logbook of general neurosurgical procedures`,
                '2.11': `Part A: Procedural skills 
                Collect 3 observations of achievement
                - At least one of each location (cervical, thoracic, lumbar)
                - At least two assessors 

                Part B:Logbook
                Submit logbook of general neurosurgical procedures`
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
            assessmentInfo: {
                '3.1': `Collect feedback on 2 occasions, one each at junior core and senior core.
                Each occasion should include
                - At least 4 observers
                - At least 1 attending staff
                - At least 2 other observer roles `,
                '3.2': `Collect 5 observations of achievement
                - At least 1 of each case mix
                - At least 2 different assessors `,
                '3.3': `Collect 5 observations of achievement
                - At least 1 of each type of issue
                - At least 2 assessors`,
                '3.4': `Collect 2 observations of achievement `,
                '3.5': `Collect 2 observations of achievement
                - At least one intracranial
                - At least one spinal `,
                '3.6': `Collect 5 observations of achievement
                - At least 2 hydrocephalus of any type with at least 1 normal pressure hydrocephalus
                - At least 1 Chiari
                - At least 1 arachnoid cyst `,
                '3.7': `Collect 2 observations of achievement
                - At least 2 different procedures `,
                '3.8': `Part A: Surgical competence 
                Collect 4 observations of achievement
                    - At least 1 infratentorial
                    - At least 1 pterional
                    - No more than 2 observations by senior/chief resident 
                
                Part B: Logbook
                Submit logbook of general neurosurgical procedures  `,
                '3.9': `Part A: Surgical competence 
                Collect 3 observations of achievement
                    - At least 1 craniotomy
                    - At least 1 repair of a skull fracture 
                
                Part B: Logbook
                Submit logbook of general neurosurgical procedures  `,
                '3.10': `Part A: Surgical competence 
                Collect 5 observations of achievement
                    - At least 3 CSF shunt procedures
                    - At least 1 CSF shunt revision procedure
                    - At least 2 endoscopic third ventriculostomy procedures
                    - At least 2 different assessors
                
                Part B: Logbook
                Submit logbook of general neurosurgical procedures  `,
                '3.11': `Collect 3 observations of achievement
                - At least 2 different operations
                - At least 2 observations by a neurosurgeon `,
                '3.12': `Supervisor does assessment based on review of resident’s submission of the research
                project.
                Collect 1 observation of achievement.`,
                '3.13': `Part A: Quality Improvement
                Collect 1 observation of achievement

                Part B: Teaching
                Collect evaluations from 2 teaching encounters
                - At least two evaluations from each teaching presentation `,
                '3.14': `Collect 4 observations of achievement
                - At least one each of epilepsy, movement disorder and pain and/or spasticity`,
                '3.15': `Collect 2 observations of achievement
                - At least one trigeminal neuralgia `,
                '3.16': `Part A: Surgical competence
                Collect 2 observations of achievement
                - At least one biopsy
                - At least one application of stereotactic frame

                Part B: Logbook
                Submit logbook of functional neurosurgical procedures`,
                '3.17': `Part A: Surgical competence
                Collect 3 observations of achievement
                ‐ At least one percutaneous rhizotomy
                ‐ At least one microvascular decompression

                Part B: Logbook
                Submit logbook of functional neurosurgical procedures`,
                '3.18': `Collect 4 observations of achievement
                - At least 1 carpal
                - At least 1 ulnar
                - At least 1 brachial plexus
                - At least 1 other `,
                '3.19': `Part A: Surgical competence
                Collect 2 observations of achievement

                Part B: Logbook
                Submit logbook of peripheral nerve neurosurgical procedures`,
                '3.20': `Part A: Surgical competence
                Collect 1 observation of achievement

                Part B: Logbook
                Submit logbook of peripheral nerve neurosurgical procedures`,
                '3.21': `Part A: Surgical competence
                Collect 1 observation of achievement

                Part B: Logbook
                Submit logbook of peripheral nerve neurosurgical procedures`,
                '3.22': `Collect 5 observations of achievement
                - At least 2 degenerative spinal conditions
                - At least 1 neoplastic spinal condition
                - At least 1 deformity condition
                - At least 1 with neurological deficit
                - At least 1 with mechanical instability
                - At least 2 assessors `,
                '3.23': `Collect 5 observations of achievement
                - At least 2 cervical
                - At least 2 thoracic and/or lumbar
                - At least 1 patient with a neurologic deficit
                - At least 1 patient with a mechanically unstable spine
                - At least 2 trauma
                - At least 1 urgent spinal oncology case
                - At least 2 different assessors`,
                '3.24': `Part A: Surgical competence
                Collect 2 observations of achievement

                Part B: Logbook
                Submit logbook of spinal neurosurgical procedures`,
                '3.25': `Part A: Surgical competence
                Collect 2 observations of achievement
                    - At least one trauma case

                Part B: Logbook
                Submit logbook of spinal neurosurgical procedures`,
                '3.26': `Part A: Surgical competence
                Collect 2 observations of achievement
                    - At least one revision procedure 

                Part B: Logbook
                Submit logbook of spinal neurosurgical procedures`,
                '3.27': `Part A: Surgical competence
                Collect 2 observations of achievement

                Part B: Logbook
                Submit logbook of spinal neurosurgical procedures`,
                '3.28': `Part A: Surgical competence
                Collect 2 observations of achievement

                Part B: Logbook
                Submit logbook of spinal neurosurgical procedures`,
                '3.29': `Part A: Surgical competence
                Collect 8 observations of achievement
                    - At least one occipito-cervical
                    - At least 2 anterior cervical
                    - At least 2 posterior cervical
                    - At least 1 posterior thoracic
                    - At least 2 posterior lumbar
                    - At least one lumbar interbody instrumentation
                    - At least two different assessors 

                Part B: Logbook
                Submit logbook of spinal neurosurgical procedures`,
                '3.30': `Part A: Surgical competence
                Collect 2 observations of achievement
                    ‐ At least one extramedullary at spinal cord level
                    ‐ At least one intramedullary

                Part B: Logbook
                Submit logbook of spinal neurosurgical procedures`,
                '3.31': `Collect 3 observations of achievement
                - At least one cranial aneurysm
                - At least one vascular malformation
                - At least one carotid stenosis `,
                '3.32': `Collect 3 observations of achievement
                - At least one cranial aneurysm
                - At least one vascular malformation
                - At least one carotid stenosis `,
                '3.33': `Part A: Surgical competence
                Collect 2 observations of achievement

                Part B: Logbook
                Submit logbook of vascular neurosurgical procedures`,
                '3.34': `Part A: Surgical competence
                Collect 2 observations of achievement

                Part B: Logbook
                Submit logbook of vascular neurosurgical procedures`,
                '3.35': `Part A: Surgical competence
                Collect 2 observations of achievement

                Part B: Logbook
                Submit logbook of vascular neurosurgical procedures`,
                '3.36': `Collect 4 observations of achievement
                - At least one extra-axial
                - At least one pituitary adenoma
                - At least one metastatic tumour
                - At least one primary intra-axial tumour
                - At least two different assessors `,
                '3.37': `Collect 5 observations of achievement
                ‐ At least three different types of case mix
                ‐ At least two different assessors `,
                '3.38': `Part A: Surgical competence
                Collect 4 observations of achievement
                - At least one extra-axial
                - At least one metastatic intra-axial
                - At least one primary intra-axial
                - At least one posterior fossa tumour 

                Part B: Logbook
                Submit logbook of oncologic neurosurgical procedures`,
                '3.39': `Part A: Surgical competence
                Collect 4 observations of achievement
                    - At least one posterior fosa tumour
                    - At least one complex meningioma
                    - At least one eloquent intraaxial brain tumour 

                Part B: Logbook
                Submit logbook of oncologic neurosurgical procedures`,
                '3.40': `Part A: Surgical competence
                Collect 2 observations of achievement

                Part B: Logbook
                Submit logbook of oncologic neurosurgical procedures`,
                '3.41': `Collect 2 observations of achievement
                - At least one child less than 5 years of age `,
                '3.42': `Collect 3 observations of achievement
                - At least one posterior fossa brain tumour
                - At least two other diagnoses
                - At least one child less than 5 years of age `,
                '3.43': `Collect 2 observations of achievement `,
                '3.44': `Part A: Surgical competence
                Collect 2 observations of achievement
                - At least one infant or toddler 

                Part B: Logbook
                Submit logbook of pediatric neurosurgical procedures`,
                '3.45': `Part A: Surgical competence
                Collect 1 observation of achievement

                Part B: Logbook
                Submit logbook of pediatric neurosurgical procedures`,
                '3.46': `Part A: Surgical competence
                Collect 1 observation of achievement

                Part B: Logbook
                Submit logbook of pediatric neurosurgical procedures`
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
            assessmentInfo: {
                '4.1': `Collect 2 observations during Transition to Practice`,
                '4.2': `Part A: Surgical competence 
                Collect 3 observations of achievement
                - At least two different types of procedures
                - Two different assessors
                
                Part B: Interprofessional teamwork
                Collect feedback from at least 4 observers on one occasion
                - At least one anesthetist
                - At least two nurses`,
                '4.3': `Collect 1 observation of achievement
                - At least 1 neurosurgeon
                - At least 1 other physician or health care professional `
            },
            filterValuesDict: {}
        },
    }
};

module.exports = programInfo;