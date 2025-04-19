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
  FORMAT1: 'DD-MM-YYYY HH:mm:ss',
  DATE: 'DD-MM-YYYY',
  DATE2: 'DD/MM/YYYY',
  DATE3: 'DD/MM',
  EMPTY_DATE: '----/--/--',
};

export const DIMENSION = {
  COMPONENT_GAP: 4,
  BORDER_RADIUS: 8,
};

// Unit = minute
export const DURATION_FETCH_NOTE = 15;

export const RANGE_DURATION_DATE_PICKER = {max: 6, min: 1};
