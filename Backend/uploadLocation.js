const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// ✅ Always read JSON from the same folder as this file
const locationData = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'locations.json'), 'utf8')
);

async function uploadData() {
  try {
    for (const item of locationData) {
      // Clean building name
      const building = item.building.trim();

      // Create a stable unique document ID
      const docId = `${building}_${item.latitude}_${item.longitude}`;

      await db.collection('locations')
        .doc(docId)
        .set(
          { ...item, building },
          { merge: true }
        );
    }

    console.log("✅ Upload complete (no duplicates).");
  } catch (error) {
    console.error("❌ Error uploading data:", error);
  }
}

uploadData();
