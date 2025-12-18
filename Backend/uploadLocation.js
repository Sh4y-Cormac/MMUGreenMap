const admin = require('firebase-admin');
const fs = require('fs');

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore(); // Firestore

// Read JSON file
const locationData = JSON.parse(fs.readFileSync('locations.json', 'utf8'));

// Reference to the 'locations' collection
const collectionRef = db.collection('locations');

async function uploadData() {
  try {
    for (const item of locationData) {
      // Automatically generate a unique document ID
      await collectionRef.add(item);
    }
    console.log("Data uploaded successfully to Firestore!");
  } catch (error) {
    console.error("Error uploading data:", error);
  }
}

uploadData();