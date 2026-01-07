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
    zoomControl: true,
  });

  mapMMU = map;
  infoWindow = new google.maps.InfoWindow();
}

// ================= UI FUNCTIONS =================
window.toggleSelectButton = function (e) {
  const button = e;
  const isSelected = button.classList.contains("selected");

  button.classList.toggle("selected");
  if (isSelected) {
    markers.forEach((marker) => {
      if (marker.class === e.id) {
        marker.setMap(null);
      }
    });
  } else {
    markers.forEach((marker) => {
      if (marker.class === e.id) {
        marker.setMap(mapMMU);
      }
    });
  }
};

window.toggleAllSelect = function (e) {
  const checkbox = e;
  let landmarkButtons = Array.from(
    document.getElementsByClassName("landmark-btns")
  );
  if (checkbox.checked) {
    landmarkButtons.forEach((button) => {
      button.classList.add("selected");
      markers.forEach((marker) => marker.setMap(mapMMU));
    });
  } else {
    landmarkButtons.forEach((button) => {
      button.classList.remove("selected");
      markers.forEach((marker) => marker.setMap(null));
    });
  }
};

window.headerDown = function () {
  const rightPanel = document.getElementById("right-panel");
  const restOfLeftPanel = document.getElementById("rest-of-panel");
  const leftPanel = document.getElementById("left-panel");
  const leftPanelHeader = document.getElementById("left-panel-header");

  if (!panelButtonToggled) {
    rightPanel.classList.add("expanded");
    leftPanel.classList.add("expanded");
    leftPanelHeader.classList.add("expanded");
    restOfLeftPanel.classList.add("expanded");
    panelButtonToggled = true;
  } else {
    rightPanel.classList.remove("expanded");
    leftPanel.classList.remove("expanded");
    leftPanelHeader.classList.remove("expanded");
    restOfLeftPanel.classList.remove("expanded");
    panelButtonToggled = false;
  }
};

// ================= MARKERS =================
function createMarker(latitude, longitude, icon) {
  const marker = new google.maps.Marker({
    position: { lat: latitude, lng: longitude },
    map: mapMMU,
    icon: {
      url: icon,
      scaledSize: new google.maps.Size(40, 50),
    },
  });
  return marker;
}

// ================= GET LANDMARKS =================
async function getLandmarks() {
  const snapshot = await getDocs(collection(db, "locations"));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  data.forEach((landmark) => {
    if (landmark.latitude && landmark.longitude) {
      let icon;
      let markerType;

      if (landmark.accessibility[0].slice(0, 14) === "Recycling Bins") {
        icon = "/images/recycling_pin.png";
        markerType = "recycling-bins-btn";
      } else if (
        landmark.accessibility[0] === "Green Areas/Relaxation Spots" ||
        landmark.accessibility[0] === "green areas" ||
        landmark.accessibility[0].slice(0, 10) === "greenareas"
      ) {
        icon = "/images/greenery_pin.png";
        markerType = "green-spaces-btn";
      } else if (landmark.accessibility[0].slice(0, 13) === "Water Refills") {
        icon = "/images/water_refill_pin.png";
        markerType = "water-refill-btn";
      } else if (landmark.accessibility[0].slice(0, 13) === "Bicycle Racks") {
        icon = "/images/bike_pin.png";
        markerType = "bike-racks-btn";
      } else {
        icon = "/images/oku_pin.png";
        markerType = "accessibility-btn";
      }

      const marker = createMarker(
        landmark.latitude,
        landmark.longitude,
        icon
      );
      marker.class = markerType;
      markers.push(marker);

      const popupContent = `
        <div style="max-width:220px">
          <h3>${landmark.name || landmark.accessibility[0]}</h3>
          <img src="/images/${landmark.image || "default.jpg"}"
               style="width:100%; border-radius:6px; margin-bottom:6px;">
          <p>${landmark.description || "Description"}</p>
        </div>
      `;

      marker.addListener("click", () => {
        infoWindow.setContent(popupContent);
        infoWindow.open(mapMMU, marker);
      });
    }
  });
}

// ================= ANONYMOUS COMMENTS =================
const auth = getAuth();
signInAnonymously(auth);

window.postComment = async function () {
  const textarea = document.getElementById("comment");
  if (!textarea) return;

  const text = textarea.value.trim();
  if (!text) return;

  await addDoc(collection(db, "comments"), {
    text,
    createdAt: Date.now(),
  });

  textarea.value = "";
};

onSnapshot(collection(db, "comments"), (snapshot) => {
  const list = document.getElementById("comments");
  if (!list) return;

  list.innerHTML = "";
  snapshot.forEach((doc) => {
    const li = document.createElement("li");
    li.textContent = "Anonymous: " + doc.data().text;
    list.appendChild(li);
  });
});

// ================= START APP =================
initialiseMap();
getLandmarks();
