const mnemonics = [
  {
    mnemonic: 'technic',
    ru: 'Техника',
  },
  {
    mnemonic: 'сlothes',
    ru: 'Одежда',
  },
];

const i18 = (mnemonic: string | undefined): string => {
  const lang = 'ru';

  if (!mnemonic) {
    return '';
  }

  const currentMnemonic = mnemonics.find((el) => el.mnemonic === mnemonic);

  if (!currentMnemonic) {
    return mnemonic;
  }

  return currentMnemonic[lang];
};

export default i18;
