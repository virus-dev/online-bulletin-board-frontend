import { isMobile } from 'react-device-detect';

//                                                // TODO: Хардкод, нужна переменная
const useIsMobileVersion = () => window.innerWidth < 1264 || isMobile;

export default useIsMobileVersion;
