const isProduction = (): boolean => process.env.NODE_ENV === 'development';

export default isProduction;
