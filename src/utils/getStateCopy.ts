// TODO: добавить тип
const getStateCopy = (state: unknown) => JSON.parse(JSON.stringify(state));

export default getStateCopy;
