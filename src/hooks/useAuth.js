import { useState, useEffect, useContext, createContext } from 'react';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

// Create a context to hold the user data and authentication methods
const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const auth = getAuth();

    // Sign up a new user
    const signup = async (email, password, name) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Set display name for the user
            await updateProfile(user, { displayName: name });
            setCurrentUser(user);
        } catch (error) {
            throw new Error('Failed to create an account: ' + error.message);
        }
    };

    // Log in an existing user
    const login = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setCurrentUser(userCredential.user);
        } catch (error) {
            throw new Error('Failed to log in: ' + error.message);
        }
    };

    // Log out the current user
    const logout = async () => {
        try {
            await signOut(auth);
            setCurrentUser(null);
        } catch (error) {
            throw new Error('Failed to log out: ' + error.message);
        }
    };

    // Listen for changes in the authentication state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        // Cleanup the listener on unmount
        return unsubscribe;
    }, [auth]);

    const value = {
        currentUser,
        signup,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
