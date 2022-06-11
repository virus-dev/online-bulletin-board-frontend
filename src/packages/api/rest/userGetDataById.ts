import makeRequest from '../makeRequest';

export default (id: number) => makeRequest({
  url: 'user/getDataById',
  params: { id },
});
