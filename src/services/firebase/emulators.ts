import { connectAuthEmulator } from "firebase/auth";
import { connectFirestoreEmulator } from "firebase/firestore";
import { connectFunctionsEmulator } from "firebase/functions";
import { auth } from "./auth";
import { db } from "./firestore";
import { functions } from "./functions";

let connected = false;

export function maybeConnectEmulators() {
  const useEmulators = import.meta.env.VITE_USE_FIREBASE_EMULATORS === "true";
  if (!useEmulators || connected) return;

  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, "localhost", 8080);
  connectFunctionsEmulator(functions, "localhost", 5001);

  connected = true;
}
