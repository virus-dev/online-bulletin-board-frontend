const isProduction = (): boolean => process.env.NODE_ENV === 'production' || window.location.hostname === 'online-bulletin-board-frontend.herokuapp.com';

export default isProduction;
