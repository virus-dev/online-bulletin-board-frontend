/* eslint-disable */
// @ts-nocheck
export {};

// import { useEffect, useState } from 'react';
// import { User } from 'Models/User';
// import userGetDataById from '../packages/api/rest/userGetDataById';

// export default (id: number) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [userData, setUserData] = useState<User>({
//     email: null,
//     firstName: null,
//     id: null,
//     image: null,
//     phone: null,
//     role: null,
//     secondName: null,
//   });

//   useEffect(() => {
//     (async () => {
//       setIsLoading(true);
//       const response = await userGetDataById(id);
//       setIsLoading(false);

//       if (response.status === 200) {
//         setUserData(response.data);
//       }
//     })();
//   }, [id]);

//   return {
//     userData,
//     isLoading,
//   };
// };
