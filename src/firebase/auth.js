import { getAuth } from "firebase/auth";
import { firebaseApp } from "./firebase";

let auth = getAuth(firebaseApp);
export { auth };
