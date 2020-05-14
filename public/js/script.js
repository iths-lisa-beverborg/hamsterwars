//Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBhYnLgOrtUWEY2K13ScIwp8znc9e4LHs8",
    authDomain: "crazy-hamsterwars.firebaseapp.com",
    databaseURL: "https://crazy-hamsterwars.firebaseio.com",
    projectId: "crazy-hamsterwars",
    storageBucket: "crazy-hamsterwars.appspot.com",
    messagingSenderId: "559188810603",
    appId: "1:559188810603:web:bbf9d299d13fc136bd0a2e",
    measurementId: "G-5XYRC42MHW"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

// Login 
document.querySelector('#login').addEventListener('click', () => {
    
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;
    
    // Login
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => console.log(user))
    .catch(err => console.error(err))
})

// Logout
document.querySelector('#logout').addEventListener('click', () => {
    
    firebase
    .auth()
    .signOut()
    .catch(err => console.error(err))
    
})



firebase.auth().onAuthStateChanged((user) => {
    
    let stateNotice = document.querySelector('footer p');
    
    if(user){
        
        console.log('You are logged in!')
        stateNotice.innerHTML = 'You are logged in!'
        
    } else {
        console.log('You are NOT logged in!')
        stateNotice.innerHTML = 'You are NOT logged in!'
    }
})