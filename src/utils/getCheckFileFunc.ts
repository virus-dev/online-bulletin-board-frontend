import MbToBytes from './bytes';

const getCheckFileFunc = (types: string[], maxSize: number) => (file: File) => (
  types.includes(file.type) && file.size < maxSize
);

export const checkFileForImgBB = getCheckFileFunc(['image/jpeg', 'image/png'], MbToBytes(32));

export default getCheckFileFunc;
