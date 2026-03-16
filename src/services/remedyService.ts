import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc, 
  doc, 
  query, 
  where, 
  updateDoc, 
  deleteDoc, 
  serverTimestamp,
  orderBy
} from 'firebase/firestore';
import { auth, db } from '../firebase';
import { Remedy } from '../types';
import { handleFirestoreError, OperationType } from './errorHandling';

const COLLECTION_NAME = 'remedies';
const ADMIN_EMAIL = 'yashrajjagtap1910@gmail.com';

export const remedyService = {
  async getAllRemedies(): Promise<Remedy[]> {
    const path = COLLECTION_NAME;
    try {
      const q = query(collection(db, path), orderBy('remedyName'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Remedy));
    } catch (error) {
      // If it's a permission error, we log it but don't necessarily crash the whole app
      // unless it's critical. For public read, this shouldn't happen.
      handleFirestoreError(error, OperationType.GET, path);
      return [];
    }
  },

  async getRemedyById(id: string): Promise<Remedy | null> {
    const path = `${COLLECTION_NAME}/${id}`;
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const snapshot = await getDoc(docRef);
      return snapshot.exists() ? ({ id: snapshot.id, ...snapshot.data() } as Remedy) : null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, path);
      return null;
    }
  },

  async searchRemedies(symptom: string): Promise<Remedy[]> {
    const term = symptom.trim().toLowerCase();
    try {
      const all = await this.getAllRemedies();
      console.log(`Searching for "${term}" in ${all.length} remedies`);
      const results = all.filter(r => 
        r.remedyName.toLowerCase().includes(term) || 
        r.symptoms.some(s => s.toLowerCase().includes(term)) ||
        r.category.toLowerCase().includes(term)
      );
      console.log(`Found ${results.length} results`);
      return results;
    } catch (error) {
      // getAllRemedies already handles error
      throw error;
    }
  },

  async getByCategory(category: string): Promise<Remedy[]> {
    const path = COLLECTION_NAME;
    try {
      const q = query(collection(db, path), where('category', '==', category));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Remedy));
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, path);
      return [];
    }
  },

  async addRemedy(remedy: Omit<Remedy, 'id' | 'createdAt'>): Promise<string> {
    const path = COLLECTION_NAME;
    try {
      const docRef = await addDoc(collection(db, path), {
        ...remedy,
        createdAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
      return '';
    }
  },

  async updateRemedy(id: string, remedy: Partial<Remedy>): Promise<void> {
    const path = `${COLLECTION_NAME}/${id}`;
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, remedy);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  },

  async deleteRemedy(id: string): Promise<void> {
    const path = `${COLLECTION_NAME}/${id}`;
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  },

  async seedData(remedies: Omit<Remedy, 'id' | 'createdAt'>[]) {
    try {
      // Only attempt to seed if we are the admin and verified
      const currentUser = auth.currentUser;
      if (!currentUser || currentUser.email !== ADMIN_EMAIL || !currentUser.emailVerified) {
        // If not admin, just check if data exists to avoid unnecessary calls
        return;
      }

      const existing = await this.getAllRemedies();
      if (existing.length > 0) return;
      
      console.log('Seeding initial remedies...');
      for (const r of remedies) {
        await this.addRemedy(r);
      }
      console.log('Seeding completed.');
    } catch (error) {
      // We catch it here to prevent the app from crashing for non-admins
      console.warn('Seeding skipped or failed:', error);
    }
  }
};
