
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
var messagesRef = firebase.database().ref('Nagad Payments');

// Listen for form submit
document.getElementById('paymentForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e){
  e.preventDefault();

  // Get values
  var owner_name = getInputVal('owner_name');
  var nagad_number = getInputVal('nagad_number');
  var transection_id = getInputVal('transection_id');
  var transection_date = getInputVal('transection_date');
  var amount = getInputVal('amount');

  // Save message
  saveMessage(owner_name, nagad_number, transection_id,transection_date,amount );

  

  // Clear form
  document.getElementById('paymentForm').reset();
}

// Function to get get form values
function getInputVal(id){
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(owner_name, nagad_number, transection_id,transection_date,amount){
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    owner_name: owner_name,
    nagad_number:nagad_number,
    transection_id:transection_id,
	transection_date:transection_date,
	amount:amount
  });
}