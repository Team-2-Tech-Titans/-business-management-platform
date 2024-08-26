import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Initialize Firebase services
const auth = getAuth();
const db = getFirestore();

// Login user
export const loginUser = async ({ email, password }) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Logout user
export const logoutUser = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        throw new Error('Failed to log out: ' + error.message);
    }
};

// Register new user
export const registerUser = async ({ email, password, name }) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Set display name for the user
        await updateProfile(user, { displayName: name });

        // Save user profile to Firestore
        await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            name: name,
            email: user.email,
        });

        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Fetch user profile from Firestore
export const fetchUserProfile = async () => {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error('No user is currently logged in.');

        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
            return userDoc.data();
        } else {
            throw new Error('User profile not found.');
        }
    } catch (error) {
        throw new Error('Failed to fetch user profile: ' + error.message);
    }
};

// Update user profile
export const updateUserProfile = async (updatedData) => {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error('No user is currently logged in.');

        // Update the user's display name if it's included in the updatedData
        if (updatedData.name) {
            await updateProfile(user, { displayName: updatedData.name });
        }

        // Update user profile in Firestore
        await setDoc(doc(db, 'users', user.uid), updatedData, { merge: true });

        return { ...updatedData, uid: user.uid };
    } catch (error) {
        throw new Error('Failed to update user profile: ' + error.message);
    }
};
