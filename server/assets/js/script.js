var firebaseConfig = {
    apiKey: "AIzaSyDgVH3XRWJRSX9f157tlAGPi6ucVsy77Eo",
    authDomain: "hamst3rwars.firebaseapp.com",
    databaseURL: "https://hamst3rwars.firebaseio.com",
    projectId: "hamst3rwars",
    storageBucket: "hamst3rwars.appspot.com",
    messagingSenderId: "165542409662",
    appId: "1:165542409662:web:1a71e2b46224f41f1575ef",
    measurementId: "G-RLVFZZDNGB"
  };
    // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


//Uppladdning av bilder till firebase storage.
document.querySelector("button").addEventListener("click", (e) => {
    e.preventDefault(); //Förhindrar att sidan laddas om vid knapptryck.
  
    let file = document.querySelector("#file").files[0];
    let storageRef = firebase.storage().ref("hamsters/" + file.name);
    storageRef.put(file);
})