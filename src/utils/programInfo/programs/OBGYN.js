const programInfo = {
    infoCardsVisible: false,
    examScoresVisible: false,
    narrativesVisible: true,
    rotationList: ["ANESTHESIA", "C&C", "COMMUNITY", "ELECTIVE", "GEN SURG", "GYN", "GYN-ONC", "ICU", "GIM", "MFM", "OBS", "PATH", "REI", "RESEARCH", "SELECTIVE", "TRAUMA", "ULTRA", "URO", "URO-GYN", "OTHER"],
    rotationRequired: {
        "ANESTHESIA": 12,
        "C&C": 12,
        "COMMUNITY": 12,
        "ELECTIVE": 12,
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
                '1.2': 3,
            },
            clinicalPresentation: {
                '1.1': ["intrapartum", "antepartum"],
                '1.2': ["pelvic pain", "abnormal uterine bleeding", "vulvovaginitis", "other"],
            },
            patientDemographic: {
                '1.1': ["in-patient", "out-patient"],
                '1.2': ["in-patient", "out-patient"]
            },
            filterTitles: {
                '1.1': ["Patient", "Setting"],
                '1.2': ["Gynecologic presentation", "Setting"],
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
            clinicalPresentation: {
                '2.1': ["initial vist", "follow up visit"],
                '2.2': ["non stress test", "Point of Care Ultrasound (POCUS)", "biophysical profile", "fetal heart rate tracing", "other"],
                '2.3': ["diagnosis of labour", "suspected fetal compromise", "preterm labour", "preterm rupture of membranes", "antepartum bleeding", "hypertensive disorders of pregnancy", "trauma", "pain", "GI/GU complaints", "respiratory complaints", "other"],
                '2.4': ["multiparous", "nulliparous"],
                '2.5': [],
                '2.6': ["direct", "indirect", "postpartum bleeding", "postpartum pain", "postpartum fever", "other"],
                '2.7': ["first trimester complications", "pregnancy of unknown location (PUL)", "ectopic pregnancy", "first trimester loss", "hyperemesis", "acute abdominal/pelvic pain", "ovarian cyst/torsion", "vulvar abscesses/Bartholin’s"],
                '2.8': ["reversible contraception", "permanent contraception", "emergency contraception", "medical pregnancy termination", "surgical pregnancy termination"],
                '2.9': ["menopausal disorders including postmenopausal bleeding", "menstrual disorders", "vulvovaginal complaints", "adnexal masses", "sexually transmitted infections", "primary dysmenorrhea", "gynecologic preventative care"],
                '2.10': ["basic laparoscopy (port placement, electrocautery, closing incisions)", "diagnostic hysteroscopy", "global endometrial ablation", "drainage and marsupialization of Bartholin’s abscess", "dilatation and curettage"],
                '2.11': []
            },
            patientDemographic: {
                '2.1': ["pre-conception", "first trimester", "second trimester", "third trimester", "term", "postdate"],
                '2.2': ["clinic", "obstetrics day unit", "triage", "labour & delivery"],
                '2.3': [],
                '2.4': ["1st degree", "2nd degree", "not applicable"],
                '2.5': [],
                '2.6': ["in-patient", "out-patient", "in-hospital", "other"],
                '2.7': ["emergency department", "outpatient clinic", "inpatient ward"],
                '2.8': [],
                '2.9': ["not applicable", "endometrial biopsy", "cervical biopsy", "vulvar biopsy", "IUD/ IUS insertion", "Pap smear"],
                '2.10': [],
                '2.11': []
            },
            filterTitles: {
                '2.1': ["visit", "patient"],
                '2.2': ["investigation", "Setting"],
                '2.3': ["Presentation", "TYPE"],
                '2.4': ["patient", "Perineal Trauma"],
                '2.6': ["Observation/Complication", "Setting"],
                '2.7': ["Presentation", "Setting"],
                '2.8': ["Patient issue", "TYPE"],
                '2.9': ["Presentation", "Procedure"],
                '2.10': ["Procedure", "TYPE"]
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
            clinicalPresentation: {
                '3.1':  ["genetic disorder", "maternal medical disorder", "history of previous pregnancy complication", "fetal complication", "pregnancy complication"],
                '3.2': ["not applicable", "preterm delivery (gestational age <32 weeks)", "multiples", "intrauterine fetal death", "malposition", "cord prolapse", "atypical/abnormal fetal heart rate tracing"],
                '3.3':  ["vacuum", "outlet forceps (non-rotation)", "low forceps (non-rotation)", "rotational forceps", "perineal laceration", "shoulder dystocia", "internal podalic version", "breech extraction"],
                '3.4': ["classical", "multiple pregnancy", "2nd stage", "morbidly obese patient", "extensive extension", "abnormal placentation (e.g., accreta, previa)", "difficult repeat cesarean section", "STAT cesarean section", "transverse lie", "other"],
                '3.5':  ["delayed postpartum hemorrhage", "infection", "perineal complications, vaginal hematoma", "mastitis", "endometritis", "venous thromboembolism/pulmonary embolus", "septic thrombophlebitis", "psychosocial comorbidities", "postpartum psychiatric disorders (e.g., psychosis, depression)"],
                '3.6': ["direct", "image review"],
                '3.7': ["acute intra-abdominal process", "severe ovarian hyperstimulation syndrome", "acute uterine bleeding", "early pregnancy complications"],
                '3.8': ["menstrual disorder", "complex menopausal complaint", "pre-invasive gynecologic condition", "complex gynecologic infection", "pelvic mass", "vulvar dystrophy", "other"],
                '3.9': ["infertility", "fertility preservation", "fertility pursuit (e.g., Solo/LGBTQ+)", "recurrent pregnancy loss", "complications following artificial reproductive technologies (ART)"],
                '3.10': ["labial agglutination", "vaginal discharge", "vulvovaginitis", "simple straddle injuries", "sexual health counselling", "abnormal uterine bleeding", "amenorrhea", "other menstrual irregularities", "adnexal masses", "delayed/precocious puberty", "obstructive Mullerian anomalies", "other"],
                '3.11': ["pelvic organ prolapse (POP)", "urinary incontinence (UI)- stress", "urinary incontinence (UI)- urge", "lower urinary tract symptoms (LUTS)", "anal incontinence and defecatory dysfunction", "fistulas"],
                '3.12': ["chronic pelvic pain", "sexual health concern"],
                '3.13':   ["ovarian/fallopian tube/primary peritoneal", "endometrial/sarcoma", "cervix", "vulva/vagina", "gestational trophoblastic disease (GTD)", "other"],
                '3.14': ["endometrial resection", "endometrial ablation", "myomectomy", "septoplasty of partial/complete septum", "lysis of intrauterine adhesions", "other"],
                '3.15':  ["vaginal hysterectomy", "anterior and posterior repair", "simple vulvectomy", "cervical conization", "perineorrhaphy", "colpocleisis"],
                '3.16': ["laparoscopic salpingostomy/salpingectomy", "laparoscopic ovarian cystectomy", "salpingo-oophorectomy", "laparoscopic treatment of endometriosis", "laparoscopic-assisted vaginal hysterectomy (LAVH)", "total laparoscopic hysterectomy (TLH)"],
                '3.17': ["total abdominal hysterectomy", "subtotal abdominal hysterectomy", "salpingo-oophorectomy/oophorectomy", "ovarian cystectomy", "abdominal myomectomy", "omentectomy", "peritoneal biopsy", "conversion from planned laparoscopy", "repair of incisional dehiscence", "adhesiolysis"],
                '3.18': ["bowel obstruction", "bowel injury", "infection", "perioperative bleeding", "genitourinary complication", "thromboembolic disease", "wound complication", "nerve injury", "uterine perforation", "vascular injury", "other"],
                '3.19': ["low", "medium", "high"]
            },
            patientDemographic: {
                '3.1': ["clinic", "inpatient unit", "labour and delivery", "intensive care unit"],
                '3.2': ["not applicable", "chorioamnionitis", "trial of labour after cesarean section", "complicated induction", "severe hypertensive disorder of pregnancy", "pre-gestational diabetes", "maternal comorbidities (e.g., cardiac, GI, renal, pulmonary)", " 1st or 2nd stage dystocia", "intrapartum hemorrhage", "uterine rupture", "shock", "eclampsia", "other"],
                '3.3': ["shoulder dystocia", "vaginal breech, multiple delivery", "postpartum hemorrhage (PPH)", "3rd or 4th degree tear", "other"],
                '3.4':  ["repair of extensive extension", "surgical management of postpartum hemorrhage", "uterine dehiscence/rupture repair", "management of extensive intra-abdominal adhesions/ scar tissue", "not applicable"],
                '3.5': ["office setting", "postpartum ward", "triage/ER", "simulation"],
                '3.6': ["ER", "inpatient", "gynecology clinic", "diagnostic imaging", "ultrasound unit", "simulation"],
                '3.7': ["emergency department", "inpatient ward", "outpatient clinic"],
                '3.8': ["endometrial biopsy", "cervical biopsy", "vulvar biopsy", "loop electrosurgical excision procedure (LEEP)", "not applicable"],
                '3.9': ["endometriosis", "anovulation/amenorrhea", "congenital uterine anomaly", "social", "tubal factor", "male factor infertility", "complications from treatment", "ovarian hyperstimulation syndrome (OHSS)", "other"],
                '3.10': ["outpatient", "inpatient", "emergency room"],
                '3.11': ["pessary fitting", "cystoscopy", "urodynamic interpretation", "primary surgical correction of stress incontinence", "other"],
                '3.12': ["vulvodynia", "levator hypertonicity", "myofascial pain", "female sexual dysfunction", "other"],
                '3.13': ["outpatient", "inpatient", "emergency room"],
                '3.14': [],
                '3.15': [],
                '3.16': [],
                '3.17': [],
                '3.18': [],
                '3.19': []
            },
            filterTitles: {
                '3.1': ["presentation", "Setting"],
                '3.2': ["Fetal Complication", "Maternal Complication"],
                '3.3': ["Procedure", "complication"],
                '3.4': ["Type of C Section", "Complication management"],
                '3.5': ["Patient presentation", "Setting"],
                '3.6': ["Observation", "Setting"],
                '3.7': ["Patient presentation", "setting"],
                '3.8': ["Gynecologic Condition", "Procedure"],
                '3.9': ["Patient presentation", "Etiology"],
                '3.10': ["Patient presentation", "setting"],
                '3.11': ["Patient presentation", "Management"],
                '3.12': ["Patient presentation", "Diagnosis"],
                '3.13': ["Tumour Site", "setting"],
                '3.14': ["Procedure", "TYPE"],
                '3.15': ["Procedure", "TYPE"],
                '3.16': ["Procedure", "TYPE"],
                '3.17': ["Procedure", "TYPE"],
                '3.18': ["Complication", "TYPE"],
                '3.19': ["Day Complexity", "TYPE"]
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
            clinicalPresentation: {
                '4.1': ["gynecology", "obstetrics"],
                '4.2': [],
                '4.3': [],
                '4.4': []
            },
            patientDemographic: {
                '4.1': [],
                '4.2': [],
                '4.3': [],
                '4.4': []
            },
            filterTitles: {
                '4.1': ["Case", "TYPE"]
            }
        },
    }
};

module.exports = programInfo;