export default function MyLoading() {
    return (
        <div className="container my-5">
            <div className="progress mt-5">
                <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: '75%' }}></div>
            </div>
        </div>
    )
}