
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyC4RSdSuBDDnZ24r2cJRtezY7rxu0TTATE",
    authDomain: "web-database-abc50.firebaseapp.com",
    projectId: "web-database-abc50",
    storageBucket: "web-database-abc50.appspot.com",
    messagingSenderId: "853761462369",
    appId: "1:853761462369:web:88716e64c284bd09325a20"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

// Reference messages collection
var messagesRef = firebase.database().ref('register');

// Listen for form submit
document.getElementById('registerForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e){
  e.preventDefault();

  // Get values
  
  var Email = getInputVal('Email');
  var Password = getInputVal('Password');

  // Save message
  saveMessage( Email, Password);

  

  // Clear form
  document.getElementById('registerForm').reset();
}

// Function to get get form values
function getInputVal(id){
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(Email,Password){
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    
    Email:Email,
    Password:Password
  });
}