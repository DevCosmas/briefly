// import FormPage from '../lib/form';
// import { useState } from 'react';
// import Button from './button';
// import { useAuth } from '../context/authContext';
// import axios from 'axios';

// function Setting({ settingActive, handleCancel }) {
//   const {
//     user,
//     token,
//     alertMessage,
//     alertType,
//     setAlertMessage,
//     setAlertType,
//   } = useAuth();
//   const [email, setEmail] = useState(user.email);
//   const [password, setPassword] = useState(user.password);
//   const [username, setUsername] = useState(user.username);
//   const [loader, setLoader] = useState(user.username);

//   const handleUserUpdate = async (email, username, password) => {
//     try {
//       const response = await axios.patch(
//         `http://localhost:8000/Update_me/${user._id}`,
//         {
//           email,
//           username,
//           password,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setLoader(true);
//       if (response.data.status === 'success') {
//         const { newDoc } = response.data;
//         setAlertMessage('Changed link name');
//         setAlertType('success');
//         setLoader(true);

//         console.log(response.data);
//         console.log(response);
//         console.log(newDoc);
//         console.log(response);
//       } else {
//         throw new Error('something went wrong try Again later!');
//       }
//     } catch (error) {
//       if (error.response.status === 429) {
//         setAlertMessage(error.response.data);
//         setAlertType('fail');
//       } else {
//         setAlertMessage(error.response.data.message);
//         setAlertType('fail');
//         setLoader(false);
//       }
//     } finally {
//       setLoader(false);
//     }
//   };

//   useEffect(
//     function () {
//       const timer = setTimeout(() => {
//         setAlertMessage('');
//       }, 1000);

//       return () => clearTimeout(timer);
//     },
//     [alertMessage, setAlertMessage]
//   );
//   async function handleSubmit(event) {
//     event.preventDefault();
//     // await signUp(email, password, username);
//   }
//   return (
//     <div
//       className={`setting-wrapper ${
//         settingActive ? 'setting-wrapper-active' : ''
//       }`}>
//       <form
//         className="login-form setting-form"
//         onSubmit={(e) => handleSubmit(e)}>
//         <span
//           className="setting-cancel-btn"
//           onClick={handleCancel}>
//           x
//         </span>
//         <label className="setting-heading">Account Setting</label>
//         <input
//           type="email"
//           placeholder={`${user.email}`}
//           className="form-input setting-input"
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder={`${user.username}`}
//           className="form-input setting-input"
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="*******"
//           className="form-input setting-input"
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <Button className={'form-btn'}>
//           Save Changes
//           {/* {loader ? 'Processing...' : 'Sign up'} */}
//         </Button>
//       </form>
//     </div>
//   );
// }
// export default Setting;
