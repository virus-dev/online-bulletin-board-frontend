const isProduction = (): boolean => (
  process.env.NODE_ENV === 'production'
  //                               // Hard code
  || window.location.hostname === 'online-bulletin-board-frontend.herokuapp.com'
);

export default isProduction;
