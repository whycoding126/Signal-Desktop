export type MIMEType = string & { _mimeTypeBrand: any };

export const isJPEG = (value: MIMEType): boolean =>
  value === 'image/jpeg';
