import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const createUserWithMail = (
  email,
  password,
  navigate,
  setErr,
  setUserInfo
) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // eslint-disable-next-line
      const user = userCredential.user;
      navigate("/login");
      setUserInfo({
        name: "",
        surname: "",
        email: "",
        password: "",
      });
    })
    .catch((error) => {
      // eslint-disable-next-line
      const errorCode = error.code;
      const errorMessage = error.message;
      setErr(errorMessage.split("/")[1].split("-").join(" ").replace(").", ""));
    });
};

export const LoginWithMail = (
  email,
  password,
  dispatch,
  setUser,
  navigate,
  setErr,
  toastSuccessNotify,
  toastErrorNotify
) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      toastSuccessNotify("Login is succesfull...");
      dispatch(setUser({ email }));
      navigate(-1);
    })
    .catch((error) => {
      const errorMessage = error.message;
      setErr(errorMessage.split("/")[1].split("-").join(" ").replace(").", ""));
      toastErrorNotify(
        errorMessage.split("/")[1].split("-").join(" ").replace(").", "")
      );
    });
};

export const IsLogin = (setUser, setRefresh) => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // eslint-disable-next-line
      const uid = user.uid;
      console.log(user.email);
      setUser({ email: user.email });
      setRefresh(true);
    } else {
    }
  });
};

export const LoginWithGoogle = (
  dispatch,
  setUser,
  navigate,
  register,
  login
) => {
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      // eslint-disable-next-line
      const token = credential.accessToken;
      // The signed-in user info.
      // eslint-disable-next-line
      const user = result.user;
      dispatch(setUser({ payload: auth.currentUser.email }));

      if (login) {
        navigate(-1);
      } else if (register) {
        navigate("/");
      }
    })
    .catch((error) => {
      // Handle Errors here.
      // eslint-disable-next-line
      const errorCode = error.code;
      // eslint-disable-next-line
      const errorMessage = error.message;

      // eslint-disable-next-line
      const email = error.customData.email;
      // The AuthCredential type that was used.
      // eslint-disable-next-line
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};

export const singOut = (dispatch, clearUser, clearFavoriteList) => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      dispatch(clearUser());
      dispatch(clearFavoriteList());
    })
    .catch((error) => {
      // An error happened.
    });
};
