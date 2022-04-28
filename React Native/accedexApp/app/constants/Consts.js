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

export {
    urlBase,
    loadingComponent,
    messageErrorComponent
}