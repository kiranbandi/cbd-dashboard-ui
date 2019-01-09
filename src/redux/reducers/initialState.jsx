export default {
  oracle: {
    loaderState: false,
    filterLoaderState: false,
    sessionStatus: !!sessionStorage.jwt,
    residentData: null,
    residentFilter: { isAllData: true },
    isTooltipVisible: false,
    tooltipData: null,
    userDetails: {
      username: sessionStorage.username,
      accessType: sessionStorage.accessType
    }
  }
};
