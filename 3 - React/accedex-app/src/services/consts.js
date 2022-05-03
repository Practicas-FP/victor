const urlBase = 'https://pokeapi.co/api/v2';

const loadingComponent = (
  <div className="container my-5">
    <div className="progress mt-5">
      <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: '75%' }}></div>
    </div>
  </div>
);

const messageErrorComponent = (message, setErr) => (
  <div className="alert alert-danger w-100" role="alert">
    {`${message}   `}
    {setErr && (
      <button onClick={() => setErr(false)} type="button" className="btn btn-outline-danger" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">×</span>
      </button>
    )}
  </div>
);

const firebaseConfig = {
  apiKey: "AIzaSyBGeBCGwQIhCv1J-qjY329NbEE8Tl5B-2Q",
  authDomain: "accedex-decb9.firebaseapp.com",
  databaseURL: "https://accedex-decb9-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "accedex-decb9",
  storageBucket: "accedex-decb9.appspot.com",
  messagingSenderId: "552211236830",
  appId: "1:552211236830:web:b74b0bfd26a22e58603f4f",
  measurementId: "G-BL67HK4KF4"
};

export {
  urlBase,
  loadingComponent,
  messageErrorComponent,
  firebaseConfig
};