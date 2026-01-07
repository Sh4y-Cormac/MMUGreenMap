import { db } from "./Backend/firebase-config.js";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  addDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

import {
  getAuth,
  signInAnonymously
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

// ================= MAP VARIABLES =================
let infoWindow;
let panelButtonToggled = false;

let mapMMU;
let markers = [];

// ================= INITIALISE MAP =================
function initialiseMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 2.927507, lng: 101.641963 },
    zoom: 17,
    mapTypeId: "satellite",
    draggable: false,
    gestureHandling: "none",
    streetViewControl: false,
    zoom
