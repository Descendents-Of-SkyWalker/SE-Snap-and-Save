const bubble = document.querySelector('.bubble');
const bar = document.querySelector('.bar');
const list = document.querySelectorAll('.icons');
let coords = list[0].getBoundingClientRect();
setBounds(coords);
const container = document.querySelector('.container');
addAnalytics();
for (let i of list) {
    i.addEventListener('click', () => {
        let coords = i.getBoundingClientRect();
        setBounds(coords);
        if (i.id === "analytics") {
            removeAllElements(container);
            addAnalytics();
        }
        else if (i.id === "photo") {
            removeAllElements(container);
            addPhoto();
            upload_capturePhoto();
        }
        else {
            removeAllElements(container);
            addProfile();
        }

    });
}
function setBounds(coords) {
    bubble.style.left = `${coords.x}px`;
    bubble.style.top = `${coords.y}px`;
    bubble.style.width = `${coords.width}px`;
    bubble.style.height = `${coords.height}px`;
    bar.style.left = `${coords.x - 40}px`;
    bar.style.top = `${coords.y}px`;
    bar.style.width = `3px`;
    bar.style.height = `${coords.height}px`;
}
function removeAllElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
function addAnalytics() {
    const graph = document.createElement('div');
    graph.classList.add('graph');
    container.appendChild(graph);
    addGraph(screen.width / 2.85, screen.width / 2.85);
    const stats = document.createElement('div');
    stats.classList.add('stats');
    addStats();
    stats.innerHTML = "Statistics";
    container.appendChild(stats);
}
function addPhoto() {
    const upload = document.createElement('div');
    upload.classList.add('photo');
    const formUpload = document.createElement('form');
    formUpload.id = "form-upload";
    formUpload.action = "/upload";
    const uploadlb = document.createElement('label');
    uploadlb.innerHTML = "Click here to upload an existing photo";
    upload.appendChild(uploadlb);
    const uploadbtn = document.createElement('input');
    uploadbtn.type = "file";
    uploadbtn.accept = "image/*";
    uploadbtn.name = "myfile";
    uploadbtn.id = "uploadbtn";
    formUpload.appendChild(uploadbtn);
    const uploadsubmit = document.createElement('input');
    uploadsubmit.classList.add('photoBtn');
    uploadsubmit.type = "submit";
    uploadsubmit.name = "submit";
    uploadsubmit.id = "uploadsubmit";
    uploadsubmit.value = "Upload";
    formUpload.appendChild(uploadsubmit);
    upload.appendChild(formUpload);
    container.appendChild(upload);

    const capture = document.createElement('div');
    capture.classList.add('photo');
    const formCapture = document.createElement('form');
    formCapture.id = "form-capture";
    formCapture.action = "/upload";
    const capturelb = document.createElement('label');
    capturelb.innerHTML = "Click here to capture<br>a new photo";
    capture.appendChild(capturelb);
    const capturebtn = document.createElement('input');
    capturebtn.type = "file";
    capturebtn.accept = "image/*";
    capturebtn.capture = "environment";
    capturebtn.name = "myimg";
    capturebtn.id = "capturebtn";
    formCapture.appendChild(capturebtn);
    const capturesubmit = document.createElement('input');
    capturesubmit.classList.add('photoBtn');
    capturesubmit.type = "submit";
    capturesubmit.name = "submit";
    capturesubmit.id = "capturesubmit";
    capturesubmit.value = "Capture";
    formCapture.appendChild(capturesubmit);
    capture.appendChild(formCapture);
    container.appendChild(capture);

}
function addProfile() {
    let fname = "Full Name", mnumber = "Mobile Number", eid = "Email";
    if (document.cookie.length != 0) {
        var obj = JSON.parse(document.cookie);
        fname = obj.fname;
        mnumber = obj.number;
        eid = obj.email;
    }
    const profile = document.createElement('div');
    profile.classList.add('profile');
    const img = document.createElement('img');
    img.src = "resources/profile_w.png";
    img.id = "profile";
    img.classList.add("icons");
    img.alt = "Profile";
    profile.appendChild(img);
    const name = document.createElement('div');
    name.classList.add('details');
    name.innerHTML = fname;
    profile.appendChild(name);
    const number = document.createElement('div');
    number.classList.add('details');
    number.innerHTML = mnumber;
    profile.appendChild(number);
    const email = document.createElement('div');
    email.classList.add('details');
    email.innerHTML = eid;
    profile.appendChild(email);
    container.appendChild(profile);
}
function getCookie() {

}
function upload_capturePhoto() {
    const formUpload = document.querySelector('#form-upload');
    const formCapture = document.querySelector('#form-capture');
    formUpload.addEventListener('submit', (e) => {
        e.preventDefault();
        const img = document.querySelector('#uploadbtn').files[0];
        const data = new FormData();
        data.append("image", img);
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", "http://localhost/upload", true);
        xhttp.send(data);
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                // Response
                var response = this.responseText;
                alert("Photo Uploaded Successfully!");
            }
        }
    });
    formCapture.addEventListener('submit', (e) => {
        e.preventDefault();
        const img = document.querySelector('#capturebtn').files[0];
        const data = new FormData();
        console.log
        data.append("image", img);
        console.log(formCapture.action);
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", "http://localhost:80/upload", true);

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                // Response
                var response = this.responseText;
                // document.write(response);
                alert("Photo Uploaded Successfully!");
            }

        }
        xhttp.send(data);
    });
}