
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
var messagesRef = firebase.database().ref('contacts');

// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e){
  e.preventDefault();

  // Get values
  var name = getInputVal('name');
  var email = getInputVal('email');
  var message = getInputVal('message');

  // Save message
  saveMessage(name, email, message);

  

  // Clear form
  document.getElementById('contactForm').reset();
}

// Function to get get form values
function getInputVal(id){
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, email,message){
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    name: name,
    email:email,
    message:message
  });
}