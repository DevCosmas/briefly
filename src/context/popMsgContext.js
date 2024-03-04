// import { createContext, useContext, useState } from 'react';

// const MsgContext = createContext();

// function MsgProvider({ children }) {
//   const [msg, setMsg] = useState('');
//   const [msgStatus, setMsgStatus] = useState('');
//   return (
//     <MsgContext.Provider value={{ msg, setMsg, setMsgStatus, msgStatus }}>
//       {children}
//     </MsgContext.Provider>
//   );
// }

// function useMsg() {
//   return useContext(MsgContext);
// }

// export { MsgProvider, useMsg };
