import { getDatabase, ref, child, set, get, remove } from "firebase/database";

function getPhoto(uid, setImage) {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${uid}/data/photo/`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                setImage(snapshot.val().photo);
            }
        }).catch((error) => console.error(error));
}

function savePhoto(uid, photo, setImage) {
    const db = getDatabase();
    set(ref(db, `users/${uid}/data/photo/`), { photo: photo })
        .then(() => setImage(photo))
        .catch(error => console.error(error));
}

function deletePhoto(uid, setImage) {
    const db = getDatabase();
    remove(ref(db, `users/${uid}/data/photo/`))
        .then(() => setImage(null))
        .catch(error => console.error(error));
}

export {
    getPhoto,
    savePhoto,
    deletePhoto
}