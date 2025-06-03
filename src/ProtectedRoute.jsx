// import React from "react";

// const ProtectedRoute = ({ children }) => {
//   return (
//     <div style={{ backgroundColor: "lightblue", border: "1px solid red" }}>
//       {children}
//     </div>
//   );
// };

// export default ProtectedRoute;

import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return <Navigate to="/auth" />;

  return <div>{children}</div>;
};

export default ProtectedRoute;
