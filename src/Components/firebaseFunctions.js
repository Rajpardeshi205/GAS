import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "./Firebase"; 

const setAdminClaim = async (uid) => {
  const functions = getFunctions(app);
  const setAdmin = httpsCallable(functions, 'setAdminClaim');

  try {
    const result = await setAdmin({ uid });
    console.log(result.data.message); 
  } catch (error) {
    console.error("Error setting admin claim:", error);
  }
};

export { setAdminClaim };
