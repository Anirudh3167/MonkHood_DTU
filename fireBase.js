// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
 // Your local config
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Write action
document.getElementById("fireBaseTrigger").addEventListener("click", async () => {
    if (window.firebaseCommand === "create") {  // create
        try {
            const docRef = await addDoc(collection(db, "users"), window.userData);
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    } else if (window.firebaseCommand === "update") {   // update
        try {
            const userRef = await updateDoc(doc(db, "users", window.userId),window.firebaseUser);
        } catch (err) {
            console.log("error in firebase:");
            console.log(err);
        }
    } else if (window.firebaseCommand === "delete") {   // delete
        try {
            const userRef = await deleteDoc(doc(db, "users", window.userId));
        } catch (err) {
            console.log("error in firebase:");
            console.log(err);
        }
    }
    window.firebaseCommand = null;
})

// Read action
addEventListener("load", async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    var myData = [];
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} =>`);
        console.log(doc.data())
        myData.push({doc.id : doc.data()});
    });
    window.myData = myData;
});
