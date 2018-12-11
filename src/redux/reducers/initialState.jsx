export default {
  oracle: {
    loaderState: false,
    filterLoaderState: false,
    sessionStatus: !!localStorage.jwt,
    residentData: null,
    residentFilter: { isAllData: true },
    isTooltipVisible: false,
    tooltipData: null
  }
};
