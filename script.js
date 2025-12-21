let panelButtonToggled = false

// adds new map
function initialiseMap(){
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 2.927507, lng: 101.641963 },
        zoom: 17,
        mapTypeId: 'satellite',
        draggable: false,
        gestureHandling: 'none',
        streetViewControl: false,
        zoomControl: true,
    });
}

const toggleSelectButton = (e) => {
    const button = e;
    button.classList.toggle("selected");
}

const toggleAllSelect = (e) => {
    const checkbox = e;
    let landmarkButtons = Array.from(document.getElementsByClassName("landmark-btns"));
    if(checkbox.checked){
        landmarkButtons.forEach((button) => {
            button.classList.add("selected");
        })
    } else {
        landmarkButtons.forEach((button) => {
            button.classList.remove("selected");
        })
    }
}

function headerDown(){
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
}