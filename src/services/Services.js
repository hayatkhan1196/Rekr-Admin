import { addDoc, collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "../config/firebase/firebase";


export const getService = async (path) => {

    return     await getDocs(collection(db, path));
 
   };
 
 
   export const deleteService = async (path,id) => {
 
   return      await deleteDoc(doc(db, path, id));
 
   };
 
 
    export const updateService = async (path,id,data) => {
 
         const washingtonRef = doc(db, path, id);
       
         return    await updateDoc(washingtonRef, data)
    
        };      
        
 
    export const postService = async (path,data) => {
       
 
         return  await addDoc(collection(db, path), data);
 
    
        };  
 
       export const deleteAsset = (assetUrl) => {
         
           const deleteRef = ref(storage, assetUrl);
           deleteObject(deleteRef)
             .then(() => {
            console.log('your asset is removed')
             })
             .catch((error) => {
               alert(error.message)
               console.log(error.message);
             });
         };


        

         export const postServiceById = async (id,path,data) => {
       try {
        return  await setDoc(doc(db, path, id), data);
       } catch( error){
         alert('error')
       }
        
  
     
         };  