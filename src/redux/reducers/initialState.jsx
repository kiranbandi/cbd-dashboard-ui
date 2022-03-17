export default {
  oracle: {
    loaderState: false,
    filterLoaderState: false,
    activePage: dashboard_options.dashboard_mode == 'resident' ? 'resident' : 'normative',
    userType: dashboard_options.user_type == 'medtech' ? 'medtech' : 'non-admin',
    residentData: null,
    rotationSchedule: [],
    residentFilter: {
      isAllData: true,
      startDate: null,
      endDate: null,
      hideNoDataEPAs: false
    },
    isTooltipVisible: false,
    tooltipData: null,
    isRotationTooltipVisible: false,
    rotationTooltipData: null,
    visibilityOpenStatus: {
      1: true,
      2: true,
      3: true,
      4: true
    },
    programInfo: null
  }
};
