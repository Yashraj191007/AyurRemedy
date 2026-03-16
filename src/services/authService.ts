import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { UserProfile } from '../types';

export const authService = {
  async signInWithGoogle(): Promise<UserProfile | null> {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user profile exists
      const docRef = doc(db, 'users', user.uid);
      let snapshot;
      try {
        snapshot = await getDoc(docRef);
      } catch (e) {
        console.error("Error fetching user profile:", e);
        throw e;
      }

      if (!snapshot.exists()) {
        const profile: UserProfile = {
          uid: user.uid,
          email: user.email || '',
          displayName: user.displayName || '',
          photoURL: user.photoURL || '',
          role: user.email === 'yashrajjagtap1910@gmail.com' ? 'admin' : 'user'
        };
        try {
          await setDoc(docRef, profile);
        } catch (e) {
          console.error("Error creating user profile:", e);
          throw e;
        }
        return profile;
      } else {
        // Update photoURL if it changed
        const existing = snapshot.data() as UserProfile;
        if (existing.photoURL !== user.photoURL) {
          try {
            await setDoc(docRef, { photoURL: user.photoURL || '' }, { merge: true });
            existing.photoURL = user.photoURL || '';
          } catch (e) {
            console.warn("Error updating user photoURL (non-fatal):", e);
          }
        }
        return existing;
      }
    } catch (error) {
      console.error("Detailed Login Error:", error);
      throw error;
    }
  },

  async logout(): Promise<void> {
    await signOut(auth);
  },

  onAuthChange(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
  },

  async getUserProfile(uid: string): Promise<UserProfile | null> {
    const docRef = doc(db, 'users', uid);
    const snapshot = await getDoc(docRef);
    return snapshot.exists() ? (snapshot.data() as UserProfile) : null;
  }
};
