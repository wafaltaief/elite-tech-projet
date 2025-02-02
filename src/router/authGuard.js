import {  getAuth,   onAuthStateChanged } from "firebase/auth";
export function requireAuth(to, from, next) {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    console.log("User in requireAuth: ", user);
    if (user) {
        // if(user.role==="admin"){
        //     next("/admin");
        // }if(user.role==="teacher"){
        //     next("/teacher-space");
        // }
        // if(user.role==="student"){
        //     next("/student-space");
        // }
      next(); 
    } else {
      next("/login");
    }
  });
}
