export const ROUTE_NAME = {
  HOME: 'Home',
  USER_PROFILE: 'UserProfile',
  CREATE_NOTE: 'CreateNote',
  CAMERA_VIEW: 'CameraView',
  LOADING: 'Loading',
  RANGE_DATE_PICKER: 'RangeDatePicker',
} as const;

export const INITIAL_ROUTE_NAME = ROUTE_NAME.HOME;

export const DATE_TIME_FORMAT = {
  FORMAT1: 'YYYY-MM-DD HH:mm:ss',
  DATE: 'YYYY-MM-DD',
  DATE2: 'YYYY/MM/DD',
  EMPTY_DATE: '----/--/--',
};

export const DIMENSION = {
  COMPONENT_GAP: 4,
  BORDER_RADIUS: 8,
};

// Unit = minute
export const DURATION_FETCH_NOTE = 15;
