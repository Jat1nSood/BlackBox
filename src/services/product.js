import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const ProductDataRef = collection(db, 'product');
class ProductDataService{
    addProduct = (newProduct) =>{
        return addDoc(ProductDataRef, newProduct)
    }

    updateProduct =(id, updatedProduct) => {
        const productDoc = doc(db,'product', id);
        return updateDoc(productDoc, updatedProduct);

    }

    deleteProduct = (id) =>{
        console.log("controll reached delelte")
        const productDoc = doc(db, 'product', id);
        return deleteDoc(productDoc);

    }

    getAllProducts = () =>{
        return getDocs(ProductDataRef);
    }

    getProduct = async(id) =>{
        const Product = doc(db, 'product', id);
        const productSnapshot = await getDoc(Product);
        const productData = productSnapshot.data();
        console.log(productData)

        return productData
    }
}

export default new ProductDataService;