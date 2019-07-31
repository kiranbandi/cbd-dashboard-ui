const programInfo = {
    cardsList: ["EM", "ANESTHESIA", "CARDIO", "ICU", "GEN SURG", "GIM", "NEURO", "OPTHO", "ORTHO", "PLASTICS", "TOXICOLOGY", "TRAUMA", "OBS-GYN", "PICU", "PSYCH", "FAMILY-MEDICINE", "TRANSPORT-MEDICINE"],
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
    phasesList: ['transition-to-discipline', 'foundations-of-discipline', 'core-of-discipline', 'transition-to-practice']
};

module.exports = programInfo;