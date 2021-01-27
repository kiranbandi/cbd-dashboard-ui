export default {
  oracle: {
    loaderState: false,
    filterLoaderState: false,
    activeDashboard: 'resident',
    isModalVisible: false,
    isChecklistVisible: false,
    infoCard: ['EM-TTD'],
    sessionStatus: !!sessionStorage.jwt,
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
    userDetails: {
      username: sessionStorage.username,
      accessType: sessionStorage.accessType,
      program: sessionStorage.program
    },
    programInfo: JSON.parse(sessionStorage.programInfo || null)
  }
};
