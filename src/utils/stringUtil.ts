export const getStringValue = (input: string | number | undefined): string => {
  return input !== undefined ? String(input) : '';
};
