export const getScreenMode = (windowSize = {}) => {
  if (Object.keys(windowSize).length <= 0) {
    return null;
  }

  //   return {
  //     extraMobileMode: windowSize && windowSize.width === 320,
  //     mobileMode: windowSize && windowSize.width < 600,
  //     smallIpadMode:
  //       windowSize && windowSize.width >= 600 && windowSize.width < 768,
  //     ipadMode: windowSize && windowSize.width >= 768 && windowSize.width <= 1024,
  //     ipadModeVertical:
  //       windowSize && windowSize.width >= 768 && windowSize.width < 1024,
  //     desktopMode:
  //       windowSize && windowSize.width > 1024 && windowSize.width < 1200,
  //     extraDesktopMode:
  //       windowSize && windowSize.width >= 1200 && windowSize.width <= 1600,
  //     extraPlusDesktopMode:
  //       windowSize && windowSize.width > 1600 && windowSize.width < 1920,
  //     superDesktopMode: windowSize && windowSize.width >= 1920,
  //   };

  return {
    extraMobileMode:
      windowSize && windowSize.width >= 320 && windowSize.width < 480,
    mobileMode: windowSize && windowSize.width >= 480 && windowSize.width < 768,
    ipadSmallMode:
      windowSize && windowSize.width >= 768 && windowSize.width < 992,
    ipadMode: windowSize && windowSize.width >= 992 && windowSize.width < 1280,
    desktopMode:
      windowSize && windowSize.width >= 1280 && windowSize.width < 1536,
  };
};
