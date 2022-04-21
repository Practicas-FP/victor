import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

function Profile() {
    const [user, loading, error] = useAuthState(auth);

    console.log(user);

    return (
        <>
            <h1>Profile page</h1>
        </>
    );
}

export default Profile;