const programInfo = {
    programName: "PSYCH",
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
            assessmentInfo: {
                '1.1': `Collect 2 observations of achievement
                - At least 2 different case types
                - At least 1 by psychiatrist `,
                '1.2': `Collect 2 observations of achievement
                - At least 1 of each presentation format, verbal and written
                - At least 1 observation must be based on an interview that was observed
                - At least 1 by a psychiatrist`
            },
            filterValuesDict: {
                '1.1': {
                    'Case Type': ["anxiety disorder", "cognitive disorder", "mood disorder", "neurodevelopmental disorder", "personality disorder", "psychotic disorder", "substance use disorder", "other"]
                },
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
            assessmentInfo: {
                '2.1': `Collect 8 observations of achievement
                - At least 2 medical emergencies
                - At least 1 substance intoxication
                - At least 1 overdose and/or withdrawal
                - At least 1 neuropsychiatric presentation
                - At least 1 endocrine or metabolic disorder
                - At least 4 different observers
                - At least 3 by a supervising staff physician `,
                '2.2': `Collect 6 observations of achievement
                - At least 1 emergency setting
                - At least 2 inpatient settings
                - At least 2 outpatient settings
                - At most 2 child and adolescent patients
                - At most 2 older adult patients
                - At least 3 different case types
                - At least 2 by psychiatrists
                - At least 3 different observers`,
                '2.3': `Collect 6 observations of achievement
                - At least 1 mood disorder
                - At least 1 psychotic disorder
                - At least 1 personality disorder
                - At least 1 substance use disorder
                - At least 1 of anxiety or trauma or OCD
                - No more than 2 child or adolescent patients
                - No more than 2 older adult patients
                - At least 3 different observers
                - At least 2 by psychiatrists`,
                '2.4': `Collect 5 observations of achievement
                - At least 1 patient with non-suicidal self-injury
                - At least 1 patient with active suicidal ideation or behavior
                - At least 1 patient with active homicidal/violent ideation or violent behaviour
                - No more than 1 child or adolescent patient
                - No more than 1 older adult patient
                - At least 3 by psychiatrists
                - At least 3 different observers`,
                '2.5': `Collect 2 observation of achievement
                - At least 2 different observers`
            },
            filterValuesDict: {
                '2.1': {
                    'Medical emergency': ["yes", "no"],
                    'Case type': ["substance intoxication", "overdose and/or withdrawal", "congestive heart failure", "chronic obstructive pulmonary disease", "endocrine or metabolic disorders", "acute myocardial infarction", "hypertension", "delirium", "neuropsychiatric presentations of medical illness …disorders, MS, Huntington’s, Parkinson’s disease)", "stroke", "traumatic brain injury", "other presentation"],
                    'Setting': ["emergency", "inpatient", "outpatient"],
                    'Demographic': ["child", "adolescent", "adult", "older adult"],
                    'Service': ["psychiatry", "neurology", "medicine (CTU, GIM, or Family Medicine)", "on-call experiences", "emergency", "other"]
                },
                '2.2': {
                    'Setting': ["emergency", "inpatient unit", "consultation liaison", "outpatient", "day hospital", "community", "assisted living", "correctional", "residential treatment centre", "simulation"],
                    'Case type': ["anxiety disorder", "cognitive disorder", "mood disorder", "personality disorder", "psychotic disorder", "substance use disorder", "other"],
                    'Demographic': ["child", "adolescent", "adult", "older adult"],
                    'Complexity': ["low", "medium", "high"]
                },
                '2.3': {
                    'Setting': ["emergency", "inpatient unit", "consultation liaison", "outpatient", "day hospital", "community", "assisted living", "correctional", "residential treatment centre", "shared/collaborative care", "simulation"],
                    'Case type': ["anxiety disorder", "mood disorder", "personality disorder", "psychotic disorder", "OCD", "substance use disorder", "trauma", "other"],
                    'Demographic': ["child", "adolescent", "adult", "older adult"]
                },
                '2.4': {
                    'Patient history': ["non-suicidal self-injury", "history of violence or forensic involvement", "active suicidal ideation or behaviour", "active homicidal/violent ideation or violent behaviour", "other issue"],
                    'Setting': ["emergency", "inpatient unit", "outpatient"],
                    'Demographic': ["child", "adolescent", "adult", "older adult"]
                },
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
            assessmentInfo: {
                '3.1': `Collect 8 observations of achievement
                - At least 2 emergency
                - At least 2 inpatient
                - At least 2 outpatient
                - At least 2 consultation liaison
                - At least 2 psychotic disorders
                - At least 1 substance use disorder
                - At least 1 anxiety disorder
                - At least 1 history of trauma
                - At least 1 major depressive disorder
                - At least 1 bipolar disorder
                - At least 1 personality disorder
                - At least 1 intellectual disability/ autism spectrum disorder comorbidity
                - At least 3 high complexity
                - At least 5 direct observations with review of documentation
                - At least 4 different observers
                - At least 3 by psychiatrists`,
                '3.2': `Collect 6 observations of achievement
                - At least 1 mood disorder, anxiety disorder, or OCD
                - At least 1 ADHD
                - At least 1 abuse, neglect, or trauma
                - At least 1 intellectual disability/autism spectrum disorder comorbidity
                - At least 2 children 4-12 years
                - At least 2 adolescents 13-18 years
                - At least 4 direct observations, including review of documentation
                - At least 3 different observers
                - At least 2 observations by a child and adolescent psychiatrist`,
                '3.3': `Collect 6 observations of achievement
                - At least 3 neurocognitive disorders, including at least 1 patient with BPSD
                - At least 1 major depressive disorder and/or bereavement
                - At least 1 anxiety disorder
                - At least 1 case with rationalization of polypharmacy
                - At least 2 different observers
                - At least 4 direct observations, including review of documentation
                - At least 2 by a geriatric psychiatrist or psychiatrist with special interest in older adult
                patients`,
                '3.4': `Collect 8 observations of achievement
                - At least 1 child
                - At least 1 adolescent
                - At least 4 adults
                - At least 2 older adults
                - No more than 2 in simulation setting
                - At least 3 cases in which the supervisor has observed the assessment of the patient,
                of which at least 1 is an adult patient
                - At least 3 high complexity
                - At least 4 by psychiatrists
                - At least 1 by a child and adolescent psychiatrist
                - At least 1 by a geriatric psychiatrist`,
                '3.5': `Collect 8 observations of achievement
                - At least 2 patients with acute agitation and aggression
                - At least 2 patients with active suicidal ideation
                - At least 1 patient with homicidal/violent ideation or risk of harm to others
                - At least 2 patients with medical emergencies related to delirium
                - At least 1 patient with acute dystonic reaction, catatonia, serotonin syndrome, or NMS
                (may be in a simulation setting)
                - At least 3 observations by psychiatrist/psychiatric subspecialist`,
                '3.6': `Part A: Performing psychotherapy
                Collect 13 observations of achievement
                - At least 3 psychodynamic psychotherapy sessions
                - At least 3 CBT sessions
                - At least 2 family or group therapy sessions
                - At least 2 sessions in one other evidence-based modality
                - At least 3 observations demonstrating integration of psychotherapeutic interventions
                in regular clinical care 
                
                Part B: Logbook
                Submit logbook of psychotherapy sessions and any other assessments (specific to the
                assessment of psychotherapy) required by program to Competence Committee`,
                '3.7': `Part A: Suitability for neurostimulation
                Collect 3 observations of achievement
                - At least 1 of each demographic
                - At least 2 observations must be for ECT
                
                Part B: Delivery of neurostimulation
                Collect 3 observations of achievement
                - At least 2 observations must be for ECT`,
                '3.8': `Collect 12 observations of achievement:
                - At least 1 each starting and monitoring
                o long-acting injectable antipsychotic
                o oral antipsychotic
                o sedative/hypnotic
                - At least 2 starting and monitoring 2 different classes of antidepressants
                - At least 1 each starting and/or monitoring
                o lithium
                o clozapine
                - At least 1 each of managing 
                o benzodiazepine
                o opioid agonist therapy
                o mood stabilizer other than lithium
                o agent to treat medication-induced side effect
                - At least 1 patient on multiple psychiatric medications
                - At least 2 patients in the CL setting
                - At least 2 child/adolescents, including starting and managing 1 stimulant
                - At least 2 older adults, including 1 with a cognitive enhancer
                - At least 1 pregnant or breastfeeding patient
                - At least 5 observers
                - At least 3 by psychiatrists`,
                '3.9': `Collect 6 observations of achievement
                - At least 2 capacity to consent to treatment in complex patients
                - At least 2 restricting or limiting rights of a patient with the included due process
                protections such as initiating involuntary treatment and/or hospitalization
                - At least 1 evaluation for restrictions/limitations relevant to disability
                - At least 1 need for mandatory or discretionary reporting
                - At least 4 by psychiatrists
                - At least 2 different psychiatrist observers`,
                '3.10': `Collect 4 observations of achievement
                - At least 2 different audiences
                - At least 2 different psychiatrist observers`
            },
            filterValuesDict: {
                '3.1': {
                    'Setting': ["emergency", "inpatient unit", "consultation liaison", "outpatient"],
                    'Complexity': ["low", "medium", "high"]
                },
                '3.2': {
                    'Case type': ["anxiety disorder", "mood disorder", "attention deficit/hyperactivity disorder", "autism spectrum disorder", "intellectual disability", "other neurodevelopmental disorder", "personality disorder", "psychotic disorder", "substance use disorder", "OCD", "trauma", "other presentation"],
                    'Demographic': ["child 4-12 years", "adolescent 13-18 years"],
                    'Complexity': ["low", "medium", "high"],
                    'Setting': ["emergency", "inpatient unit", "consultation liaison", "outpatient", "community", "residential treatment centre"]
                },
                '3.3': {
                    'Complexity': ["low", "medium", "high"],
                    'Setting': ["emergency", "inpatient unit", "consultation liaison", "outpatient", "community", "assisted living", "palliative"]
                },
                '3.4': {
                    'Demographic': ["child", "adolescent", "adult", "older adult"],
                    'Complexity': ["low", "medium", "high"],
                    'Setting': ["emergency", "inpatient", "consultation liaison", "outpatient", "community", "day hospital", "assisted living", "correctional", "residential treatment centre", "school", "simulation"]
                },
                '3.5': {
                    'Setting': ["emergency", "inpatient unit", "consultation liaison", "outpatient", 'simulation', 'community'],
                    'Case type': ["acute agitation and aggression", "other behavioural and/or emotional disturbance", "active suicidal ideation", "homicidal/violent ideation", "risk of harm to others", "medical emergency related to delirium", "acute dystonic reaction", "catatonia", "serotonin syndrome", "NMS", "other condition"]
                },
                '3.6': {
                    'Type': ["Part A: Performing psychotherapy", "Part B: Logbook"],
                    'Setting': ["emergency", "inpatient unit", "consultation liaison", "outpatient"],
                    'Demographic': ["child", "youth", "adult", "older adult"],
                    'Case type': ["anxiety disorder", "eating disorder", "mood disorder", "obsessive compulsive disorder", "personality disorder", "psychotic disorder", "substance use", "trauma", "other disorder"],
                    'Therapeutic Modality': ["DBT", "CBT", "IPT", "MI", "mindfulness", "psychodynamic (short term or long term)", "group therapy", "family therapy", "supportive therapy", "emotion focused therapy (EFT)", "other"]
                },
                '3.7': {
                    'Type': ['Part A: Suitability for neurostimulation', 'Part B: Delivery of neurostimulation'],
                    'Modality': ["ECT", "rTMS", "other evidence-based form of neurostimulation"],
                    'Demographic': ['adult', 'older adults']
                },
                '3.8': {
                    "Demographic": ["child", "adolescent", "adult", "older adult"],
                    "Complexity factors": ["pregnancy", "breast feeding", "multiple medications", "substitute decision maker", "medical comorbidity", "other"]
                },
                '3.9': {
                    'Setting': ["emergency", "inpatient unit", "consultation liaison", "outpatient", "simulation"],
                    'Issue': ["capacity to consent to treatment", "fitness to stand trial", "financial capacity", "testamentary capacity", "capacity with respect to long-term care", "MAID", "disability", "disclose information", "restriction or limitation of rights", "need for mandatory or discretionary reporting", "other issue"],
                    'Initiating involuntary treatment': ["yes", "no"],
                    'Complexity': ["low", "medium", "high"]
                },
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
                '4.1': 3,
                '4.2': 4,
                '4.3': 3
            },
            assessmentInfo: {
                '4.1': `Part A: Patient care
                Collect 1 observation of achievement 

                Part B: Working with the team
                Collect feedback at least twice and at least one month apart
                - Each observation must include feedback from at least 2 observers`,
                '4.2': `Collect 4 observations of achievement`,
                '4.3': `Part A: Developing a learning plan
                Collect 1 observation of achievement

                Part B: Implementing a training experience
                Collect 1 observation of achievement

                Part C: Reflecting on learning plan efficacy
                Collect 1 observation of achievement`
            },
            filterValuesDict: {
                '4.1': {
                    'Type': ["Part A: Patient care", "Part B: Working with the team"],
                    "Setting": ["emergency", "inpatient unit", "consultation liaison", "outpatient", "community"]
                },
                '4.2': {
                    "Setting": ["emergency", "inpatient unit", "consultation liaison", "outpatient", "community", "oncall"]
                },
                '4.3': {
                    'Type': ["Part A: Developing a learning plan", "Part B: Implementing a training experience", "Part C: Reflecting on learning plan efficacy"]
                }
            }
        },
    }
};

module.exports = programInfo;