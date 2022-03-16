export default {
  oracle: {
    residentData: null,
    narrativeData: [],
    dataDumpPresent: false,
    expiredResidentData: [],
    residentFilter: { isAllData: true },
    isTooltipVisible: false,
    tooltipData: null,
    visibilityOpenStatus: {
      1: true,
      2: true,
      3: true,
      4: true
    },
    programInfo: JSON.parse(sessionStorage.programInfo || null)
  }
};
