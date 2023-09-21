import { db } from "../firebase-config";
import {
  collection,
  getDocs,  addDoc,

  doc,
} from "firebase/firestore";

const usersCollectionRef = collection(db, "user");

class UserDataService {


    async getUserByEmail(email) {
        try {
          const querySnapshot = await getDocs(collection(db, 'user'));
          let userData = null;
      
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.email === email) {
              userData = data;
              return;
            }
          });
      
          return userData;
        } catch (error) {
          console.error('Error fetching user by email:', error);
          return null;
        }
      }
      


  async addUser(userData) {
    try {
      const newUserRef = await addDoc(usersCollectionRef, userData);
      return newUserRef.id;
    } catch (error) {
      throw error;
    }
  }




}

export default new UserDataService();
