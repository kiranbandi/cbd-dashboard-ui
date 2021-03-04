const programInfo = {
    programName: "OBGYN",
    infoCardsVisible: false,
    examScoresVisible: false,
    narrativesVisible: true,
    rotationList: ["ANESTHESIA", "C&C", "COMMUNITY", "ELECTIVE", "FAM PLANNING", "GEN SURG", "GYN", "GYN-ONC", "ICU", "GIM", "MFM", "OBS", "PATH", "REI", "RESEARCH", "SELECTIVE", "TRAUMA", "ULTRA", "URO", "URO-GYN", "OTHER"],
    rotationRequired: {
        "ANESTHESIA": 12,
        "C&C": 12,
        "COMMUNITY": 12,
        "ELECTIVE": 12,
        "FAM PLANNING": 12,
        "GEN SURG": 0,
        "GYN": 12,
        "GYN-ONC": 12,
        "ICU": 0,
        "GIM": 0,
        "MFM": 12,
        "OBS": 12,
        "PATH": 12,
        "REI": 12,
        "RESEARCH": 12,
        "SELECTIVE": 0,
        "TRAUMA": 0,
        "ULTRA": 12,
        "URO": 12,
        "URO-GYN": 12,
        "OTHER": 12
    },
    epaSourceMap: {
        1: {
            'ID': 'TTD',
            'topic': 'Transition to Discipline (D)',
            subRoot: {
                '1.1': 'Performing initial assessments for uncomplicated obstetric patients',
                '1.2': 'Performing an initial assessment of uncomplicated gynecologic patients'
            },
            maxObservation: {
                '1.1': 3,
                '1.2': 3
            },
            assessmentInfo: {
                '1.1': `Collect 3 observations of achievement 
                - At least 1 antepartum patient
                - At least 1 intrapartum patient
                - At least 2 observations by faculty
                - At least 3 different observers`,
                '1.2': `Collect 3 observations of achievement 
                - At least 3 different presentations
                - At least 2 observations by faculty
                - At least 2 different observers`
            },
            filterValuesDict: {
                '1.1': {
                    'Patient': ["intrapartum", "antepartum"],
                    'Setting': ["in-patient", "out-patient"]
                },
                '1.2': {
                    'Gynecologic presentation': ["pelvic pain", "abnormal uterine bleeding", "vulvovaginitis", "other"],
                    'Setting': ["in-patient", "out-patient"]
                }
            }
        },
        2: {
            'ID': 'F',
            'topic': 'Foundations of Discipline (F)',
            subRoot: {
                '2.1': 'Providing routine prenatal care to a low-risk, healthy population',
                '2.2': 'Performing assessments of antenatal fetal well-being',
                '2.3': 'Assessing and providing initial management for patients with common obstetric presentations',
                '2.4': 'Managing labour and childbirth',
                '2.5': 'Performing uncomplicated cesarean sections with a skilled assistant',
                '2.6': 'Providing early postpartum care',
                '2.7': 'Providing consultation and initial management for patients with urgent and emergent gynecologic presentations',
                '2.8': 'Counselling and management for patients requiring family planning',
                '2.9': 'Providing consultation for patients with gynecologic conditions',
                '2.10': 'Performing minor gynecologic operative procedures',
                '2.11': '(SA) Performing critical appraisal of health literature and initiating scholarly projects'
            },
            maxObservation: {
                '2.1': 5,
                '2.2': 10,
                '2.3': 10,
                '2.4': 5,
                '2.5': 6,
                '2.6': 10,
                '2.7': 5,
                '2.8': 7,
                '2.9': 5,
                '2.10': 11,
                '2.11': 2
            },
            assessmentInfo: {
                '2.1': `Collect 5 observations of achievement
                - At least 1 initial visit assessment
                - At least 1 second trimester patient
                - At least 1 third trimester patient
                - At least 1 discussion regarding common prenatal issues (e.g., postdate, vaginal birth
                after cesarean section [VBAC], or breech presentation)
                - At least 3 observations by faculty
                - At least 3 different observers`,
                '2.2': `Collect 10 observations of achievement
                - At least 1 non-stress test
                - At least 1 biophysical profile
                - At least 1 POCUS
                - At least 1 counselling on fetal movement counts
                - At least 2 intrapartum atypical/abnormal fetal heart rate tracing `,
                '2.3': `Collect 10 observations of achievement
                - At least 5 different presentations
                - At least 1 diagnosis of labour
                - At least 1 presentation of preterm labour
                - At least 1 presentation of preterm rupture of membranes
                - At least 1 antepartum bleeding
                - At least 1 hypertensive disorder of pregnancy
                - At least 5 observations by faculty
                - At least 3 different observers`,
                '2.4': `Collect 5 observations of achievement
                - Must include a variety of patient factors including parity, regional anesthesia,
                augmentation, and 2nd degree perineal tears `,
                '2.5': `Part A: Procedural skills
                Collect 5 observations of achievement
                    - At least 3 different OBGYN faculty
                    
                Part B: Logbook
                Submit logbook of procedures to Competence Committee`,
                '2.6': `Part A: Normal course
                Collect 5 observations of achievement,
    	        - At least 3 direct observations by faculty
                - At least 3 different observers
                
                Part B: Common Complications
                Collect 5 observations of achievement
                - At least 3 different complications
                - At least 3 direct observations by faculty
                - At least 3 different observers`,
                '2.7': `Collect 5 observations of achievement
                - At least 3 different patient presentations
                - At least 3 OBGYN faculty
                - At least 2 different observers`,
                '2.8': `Part A: Assessment and management
                Collect 5 observations of achievement
                    - At least 3 different patient issues
                    - At least 3 observers must be attending physician
                    - At least 2 different observers
                
                Part B: IUD insertion   
                Collect 2 observations of achievement `,
                '2.9': `Collect 5 observations of achievement
                - At least 3 different types of patient presentations and the related procedure
                - At least 3 observers must be attending physician
                - At least 2 different observers`,
                '2.10': `Part A: Procedural skills
                Collect 10 observations of achievement
                    - At least 1 basic laparoscopy
                    - At least 1 diagnostic hysteroscopy
                    - At least 1 global endometrial ablation
                    - At least 1 dilatation and curettage
                    - At least 1 drainage and marsupialization of Bartholin’s abscess
                
                Part B: Maintaining a logbook
                Submit logbook of procedures`,
                '2.11': `Collect 2 observations of achievement.
                - At least 1 journal club or rounds
                - At least 1 research proposal`
            },
            filterValuesDict: {
                '2.1': {
                    'visit': ["initial vist", "follow up visit"],
                    'patient': ["pre-conception", "first trimester", "second trimester", "third trimester", "term", "postdate"]
                },
                '2.2': {
                    'investigation': ["non stress test", "Point of Care Ultrasound (POCUS)", "biophysical profile", "fetal heart rate tracing", "other"],
                    'Setting': ["clinic", "obstetrics day unit", "triage", "labour & delivery"]
                },
                '2.3': {
                    'Presentation': ["diagnosis of labour", "suspected fetal compromise", "preterm labour", "preterm rupture of membranes", "antepartum bleeding", "hypertensive disorders of pregnancy", "trauma", "pain", "GI/GU complaints", "respiratory complaints", "other"],
                    'TYPE': []
                },
                '2.4': {
                    'patient': ["multiparous", "nulliparous"],
                    'Perineal Trauma': ["1st degree", "2nd degree", "not applicable"]
                },
                '2.5': {},
                '2.6': {
                    'Observation/Complication': ["direct", "indirect", "postpartum bleeding", "postpartum pain", "postpartum fever", "other"],
                    'Setting': ["in-patient", "out-patient", "in-hospital", "other"]
                },
                '2.7': {
                    'Presentation': ["first trimester complications", "pregnancy of unknown location (PUL)", "ectopic pregnancy", "first trimester loss", "hyperemesis", "acute abdominal/pelvic pain", "ovarian cyst/torsion", "vulvar abscesses/Bartholin’s"],
                    'Setting': ["emergency department", "outpatient clinic", "inpatient ward"]
                },
                '2.8': {
                    'Patient issue': ["reversible contraception", "permanent contraception", "emergency contraception", "medical pregnancy termination", "surgical pregnancy termination"],
                    'TYPE': []
                },
                '2.9': {
                    'Presentation': ["menopausal disorders including postmenopausal bleeding", "menstrual disorders", "vulvovaginal complaints", "adnexal masses", "sexually transmitted infections", "primary dysmenorrhea", "gynecologic preventative care"],
                    'Procedure': ["not applicable", "endometrial biopsy", "cervical biopsy", "vulvar biopsy", "IUD/ IUS insertion", "Pap smear"]
                },
                '2.10': {
                    'Procedure': ["basic laparoscopy (port placement, electrocautery, closing incisions)", "diagnostic hysteroscopy", "global endometrial ablation", "drainage and marsupialization of Bartholin’s abscess", "dilatation and curettage"],
                    'TYPE': []
                },
                '2.11': {}
            }
        },
        3: {
            'ID': 'CORE',
            'topic': 'Core of Discipline (C)',
            subRoot: {
                '3.1': 'Providing preconception and antenatal care to women with high risk pregnancies',
                '3.2': 'Managing patients with acute conditions presenting in the antenatal and perinatal period',
                '3.3': 'Managing complex vaginal deliveries',
                '3.4': 'Performing complex cesarean sections',
                '3.5': 'Diagnosing and managing postpartum complications',
                '3.6': 'Performing obstetric and gynecologic ultrasound',
                '3.7': 'Providing definitive management for patients with acute gynecologic emergencies',
                '3.8': 'Providing care for patients with complex gynecologic conditions and/or medical comorbidities',
                '3.9': 'Assessing and initiating management for patients with reproductive challenges',
                '3.10': 'Diagnosing and managing pediatric and adolescent patients with common gynecologic conditions',
                '3.11': 'Providing care for patients with pelvic floor dysfunction',
                '3.12': 'Assessing, diagnosing and managing patients with chronic pelvic pain and sexual health concerns',
                '3.13': 'Assessing and managing patients with gynecologic malignancies',
                '3.14': 'Performing advanced hysteroscopy',
                '3.15': 'Performing major vaginal and vulvar procedures',
                '3.16': 'Performing major laparoscopic gynecologic procedures',
                '3.17': 'Performing major open abdominal gynecologic procedures',
                '3.18': 'Managing patients with surgical complications',
                '3.19': 'Managing the birthing unit'
            },
            maxObservation: {
                '3.1': 10,
                '3.2': 10,
                '3.3': 10,
                '3.4': 10,
                '3.5': 5,
                '3.6': 5,
                '3.7': 3,
                '3.8': 10,
                '3.9': 5,
                '3.10': 2,
                '3.11': 5,
                '3.12': 2,
                '3.13': 5,
                '3.14': 5,
                '3.15': 10,
                '3.16': 5,
                '3.17': 11,
                '3.18': 5,
                '3.19': 4
            },
            assessmentInfo: {
                '3.1': `Collect 10 observations of achievement
                - At least 5 observations of preconception counselling including:
                o At least 1 genetic disorder
                o At least 1 maternal medical disorder
                o At least 1 history of previous pregnancy complication
                o At least 3 direct observations
                o At least 2 by MFM faculty
                - At least 5 observations of antenatal counselling including:
                o At least 1 maternal medical disorders
                o At least 1 fetal complications
                o At least 1 pregnancy complication
                o At least 3 direct observations
                o At least 2 MFM faculty `,
                '3.2': `Collect 10 observations of achievement
                - Must be a diversity of maternal and fetal cases
                - At least 3 different maternal complications
                - At least 3 different fetal complications
                - At least 5 faculty observations
                - At least 3 observers`,
                '3.3': `Part A: Managing complex vaginal deliveries
                Collect 10 observations of achievement
                    - At least 1 shoulder dystocia
                    - At least 1 vaginal breech (may be in simulation)
                    - At least 1 multiple delivery
                    - At least 1 postpartum hemorrhage (PPH)
                    - At least 1 repair of either a 3rd or 4th degree tear
                    - At least 4 low forceps (non-rotation) or vacuum
                    - At least 1 of each forceps and vacuum (rotational forceps may be observed in
                    simulation)
                    - At least 5 observed by faculty
                    - At least 3 different observers

                Part B: Maintaining a logbook
                Submit logbook of procedures`,
                '3.4': `Part A: Procedural skill
                Collect 10 observations of achievement
                    - At least 1 classical cesarean section
                    - At least 1 difficult 2nd stage cesarean section
                    - At least 1 morbidly obese patient
                    - At least 1 abnormal placentation
                    - At least 1 difficult repeat
                    - At least 1 STAT cesarean section
                    - At least 1 transverse lie
                    - At least 1 repair of extensive extension at the time of a cesarean section
                    - At least 5 different faculty observers
                    
                Part B: Logbook
                Submit logbook of procedures`,
                '3.5': `Collect 5 observations of achievement
                - At least 1 wound complication
                - At least 1 delayed postpartum hemorrhage
                - At least 3 observed by OBGYN faculty
                - At least 2 different observers`,
                '3.6': `Collect 5 observations of achievement
                - At least 1 normal amount of free fluid
                - At least 1 obstetrics case
                - At least 1 gynecology case
                - At least 1 direct observation of each type of case (obstetric & gynecologic)
                - No more than 2 simulations including 1 obstetric, and 1 gynecologic case`,
                '3.7': `Collect 3 observations of achievement
                - At least 1 direct observation by faculty
                - At least 2 different observers`,
                '3.8': `Collect 10 observations of achievement
                - At least 3 different medical comorbidities
                - At least 3 different complex gynecologic conditions
                - At least 5 observed by faculty
                - At least 3 different observers `,
                '3.9': `Collect 5 observations of achievement
                - At least 1 recurrent pregnancy loss
                - At least 2 cases of infertility of different etiologies
                - At least 2 different observers
                - At least 2 observed by faculty`,
                '3.10': `Collect 2 observations of achievement
                - At least 2 different patient presentations
                - At least 1 pre-pubertal presentation
                - At least one OBGYN faculty`,
                '3.11': `Collect 5 observations of achievement
                - A variety of at least 3 patient presentations
                - At least 1 POP
                - At least 1 urinary incontinence presentation with primary surgical correction of stress
                incontinence
                - At least 1 cystoscopy
                - At least 1 pessary fitting
                - At least 1 urodynamic interpretation`,
                '3.12': `Collect 2 observations of achievement
                - At least 1 chronic pelvic pain
                - At least 1 case of sexual dysfunction`,
                '3.13': `Collect 5 observations of achievement
                - At least 1 cervical cancer
                - At least 1 complex adnexal mass/ovarian cancer
                - At least 1 endometrial cancer
                - At least 1 palliation
                - At least 2 different faculty observers`,
                '3.14': `Part A: Procedural skills
                Collect 5 observations of achievement
                    - At least 1 endometrial ablation (resectoscopic or rollerball)
                    - At least 2 myomectomies
                    - At least 2 different observers

                Part B: Logbook
                Submit logbook of procedures`,
                '3.15': `Part A: Procedural skills
                Collect 10 observations of achievement
                    - At least 1 vaginal hysterectomy
                    - At least 1 anterior and posterior repair
                    - At most 1 cervical conization
                    - At least 3 different faculty
                    
                Part B: Logbook
                Submit logbook of procedures`,
                '3.16': `Part A: Procedural skill
                Collect 5 observations of achievement
                - At least 2 laparoscopic hysterectomies (LAVH or TLH)
                - At least 2 laparoscopic salpingostomy/salpingectomy
                - At least 1 laparoscopic ovarian cystectomy
                - At least 2 different observers
                
                Part B: Logbook
                Submit logbook of procedures`,
                '3.17': `Part A: Procedural skill
                Collect 10 observations of achievement
                    - At least 3 total abdominal hysterectomies
                    - At least 1 myomectomy
                    - At least 2 different observers
                
                Part B: Logbook
                Submit logbook of procedures`,
                '3.18': `Collect 5 observations of achievement
                - At least 3 different complications
                - At least 3 faculty observers
                - At least 3 different observers`,
                '3.19': `Collect 4 observations of achievement
                - At least one day of high complexity
                - At least 2 different observers`
            },
            filterValuesDict: {
                '3.1': {
                    'presentation': ["genetic disorder", "maternal medical disorder", "history of previous pregnancy complication", "fetal complication", "pregnancy complication"],
                    'Setting': ["clinic", "inpatient unit", "labour and delivery", "intensive care unit"]
                },
                '3.2': {
                    'Fetal Complication': ["not applicable", "preterm delivery (gestational age <32 weeks)", "multiples", "intrauterine fetal death", "malposition", "cord prolapse", "atypical/abnormal fetal heart rate tracing"],
                    'Maternal Complication': ["not applicable", "chorioamnionitis", "trial of labour after cesarean section", "complicated induction", "severe hypertensive disorder of pregnancy", "pre-gestational diabetes", "maternal comorbidities (e.g., cardiac, GI, renal, pulmonary)", "1st or 2nd stage dystocia", "intrapartum hemorrhage", "uterine rupture", "shock", "eclampsia", "other"]
                },
                '3.3': {
                    'Procedure': ["vacuum", "outlet forceps (non-rotation)", "low forceps (non-rotation)", "rotational forceps", "perineal laceration", "shoulder dystocia", "internal podalic version", "breech extraction"],
                    'complication': ["shoulder dystocia", "vaginal breech, multiple delivery", "postpartum hemorrhage (PPH)", "3rd or 4th degree tear", "other"],
                },
                '3.4': {
                    'Type of C Section': ["classical", "multiple pregnancy", "2nd stage", "morbidly obese patient", "extensive extension", "abnormal placentation (e.g., accreta, previa)", "difficult repeat cesarean section", "STAT cesarean section", "transverse lie", "other"],
                    'Complication management': ["repair of extensive extension", "surgical management of postpartum hemorrhage", "uterine dehiscence/rupture repair", "management of extensive intra-abdominal adhesions/ scar tissue", "not applicable"]
                },
                '3.5': {
                    'Patient presentation': ["delayed postpartum hemorrhage", "infection", "perineal complications, vaginal hematoma", "mastitis", "endometritis", "venous thromboembolism/pulmonary embolus", "septic thrombophlebitis", "psychosocial comorbidities", "postpartum psychiatric disorders (e.g., psychosis, depression)"],
                    'Setting': ["office setting", "postpartum ward", "triage/ER", "simulation"]
                },
                '3.6': {
                    'Observation': ["direct", "image review"],
                    'Setting': ["ER", "inpatient", "gynecology clinic", "diagnostic imaging", "ultrasound unit", "simulation"]
                },
                '3.7': {
                    'Patient presentation': ["acute intra-abdominal process", "severe ovarian hyperstimulation syndrome", "acute uterine bleeding", "early pregnancy complications"],
                    'setting': ["emergency department", "inpatient ward", "outpatient clinic"]
                },
                '3.8': {
                    'Gynecologic Condition': ["menstrual disorder", "complex menopausal complaint", "pre-invasive gynecologic condition", "complex gynecologic infection", "pelvic mass", "vulvar dystrophy", "other"],
                    'Procedure': ["endometrial biopsy", "cervical biopsy", "vulvar biopsy", "loop electrosurgical excision procedure (LEEP)", "not applicable"]
                },
                '3.9': {
                    'Patient presentation': ["infertility", "fertility preservation", "fertility pursuit (e.g., Solo/LGBTQ+)", "recurrent pregnancy loss", "complications following artificial reproductive technologies (ART)"],
                    'Etiology': ["endometriosis", "anovulation/amenorrhea", "congenital uterine anomaly", "social", "tubal factor", "male factor infertility", "complications from treatment", "ovarian hyperstimulation syndrome (OHSS)", "other"]
                },
                '3.10': {
                    'Patient presentation': ["labial agglutination", "vaginal discharge", "vulvovaginitis", "simple straddle injuries", "sexual health counselling", "abnormal uterine bleeding", "amenorrhea", "other menstrual irregularities", "adnexal masses", "delayed/precocious puberty", "obstructive Mullerian anomalies", "other"],
                    'setting': ["outpatient", "inpatient", "emergency room"]
                },
                '3.11': {
                    'Patient presentation': ["pelvic organ prolapse (POP)", "urinary incontinence (UI)- stress", "urinary incontinence (UI)- urge", "lower urinary tract symptoms (LUTS)", "anal incontinence and defecatory dysfunction", "fistulas"],
                    'Management': ["pessary fitting", "cystoscopy", "urodynamic interpretation", "primary surgical correction of stress incontinence", "other"]
                },
                '3.12': {
                    'Patient presentation': ["chronic pelvic pain", "sexual health concern"],
                    'Diagnosis': ["vulvodynia", "levator hypertonicity", "myofascial pain", "female sexual dysfunction", "other"]
                },
                '3.13': {
                    'Tumour Site': ["ovarian/fallopian tube/primary peritoneal", "endometrial/sarcoma", "cervix", "vulva/vagina", "gestational trophoblastic disease (GTD)", "other"],
                    'setting': ["outpatient", "inpatient", "emergency room"]
                },
                '3.14': {
                    'Procedure': ["endometrial resection", "endometrial ablation", "myomectomy", "septoplasty of partial/complete septum", "lysis of intrauterine adhesions", "other"]
                },
                '3.15': {
                    'Procedure': ["vaginal hysterectomy", "anterior and posterior repair", "simple vulvectomy", "cervical conization", "perineorrhaphy", "colpocleisis"]
                },
                '3.16': {
                    'Procedure': ["laparoscopic salpingostomy/salpingectomy", "laparoscopic ovarian cystectomy", "salpingo-oophorectomy", "laparoscopic treatment of endometriosis", "laparoscopic-assisted vaginal hysterectomy (LAVH)", "total laparoscopic hysterectomy (TLH)"]
                },
                '3.17': {
                    'Procedure': ["total abdominal hysterectomy", "subtotal abdominal hysterectomy", "salpingo-oophorectomy/oophorectomy", "ovarian cystectomy", "abdominal myomectomy", "omentectomy", "peritoneal biopsy", "conversion from planned laparoscopy", "repair of incisional dehiscence", "adhesiolysis"]
                },
                '3.18': {
                    'Complication': ["bowel obstruction", "bowel injury", "infection", "perioperative bleeding", "genitourinary complication", "thromboembolic disease", "wound complication", "nerve injury", "uterine perforation", "vascular injury", "other"]
                },
                '3.19': {
                    'Day Complexity': ["low", "medium", "high"]
                }
            }
        },
        4: {
            'ID': 'TP',
            'topic': 'Transition to Practice (P)',
            subRoot: {
                '4.1': 'Managing complex patients, including those requiring longitudinal care',
                '4.2': 'Discussing difficult news',
                '4.3': '(SA) Conducting scholarly work',
                '4.4': '(SA) Teaching and managing learners'
            },
            maxObservation: {
                '4.1': 4,
                '4.2': 3,
                '4.3': 1,
                '4.4': 6
            },
            assessmentInfo: {
                '4.1': `Collect 4 observations of achievement
                - A variety of obstetrics and gynecology cases
                - At least 2 different observers`,
                '4.2': `Collect 3 observations of achievement
                - A mix of communication scenarios
                - At least 2 different observers`,
                '4.3': `Review of submitted scholarly project by supervisor.
                Collect 1 observation of achievement.`,
                '4.4': `Part A: Teaching
                Collect 5 observations of achievement
                - At least 3 from junior learners (medical students, other health professional students,
                Transition to Discipline, Foundations, and Core trainees)
                - At least 2 from faculty
                
                Part B: Administrative responsibilities
                Collect 1 observation of achievement`
            },
            filterValuesDict: {
                '4.1': {
                    'Case': ["gynecology", "obstetrics"]
                },
                '4.2': {},
                '4.3': {},
                '4.4': {}
            }
        },
    }
};

module.exports = programInfo;