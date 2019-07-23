const programInfo = {
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
        "TOXICOLOGY": 0,
        "OBS/GYN": 0,
        "PICU": 0,
        "PSYCH": 0,
        "OTHER": 0
    },
    phasesList: ['transition-to-discipline', 'foundations-of-discipline', 'core-of-discipline', 'transition-to-practice']
};

module.exports = programInfo;