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
    graph.innerHTML = "Graph will be displayed here";
    container.appendChild(graph);
    const stats = document.createElement('div');
    stats.classList.add('stats');
    stats.innerHTML = "Statistics will be shown here";
    container.appendChild(stats);
}
function addPhoto() {
    const upload = document.createElement('div');
    upload.classList.add('photo');
    const uploadlb = document.createElement('label');
    uploadlb.innerHTML = "Click here to upload an existing photo";
    upload.appendChild(uploadlb);
    const uploadbtn = document.createElement('button');
    uploadbtn.classList.add('photoBtn');
    uploadbtn.innerHTML = "Upload";
    upload.appendChild(uploadbtn);
    container.appendChild(upload);

    const capture = document.createElement('div');
    capture.classList.add('photo');
    const capturelb = document.createElement('label');
    capturelb.innerHTML = "Click here to capture<br>a new photo";
    capture.appendChild(capturelb);
    const capturebtn = document.createElement('button');
    capturebtn.classList.add('photoBtn');
    capturebtn.innerHTML = "Capture";
    capture.appendChild(capturebtn);
    container.appendChild(capture);

}
function addProfile() {
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
    name.innerHTML = "Full Name";
    profile.appendChild(name);
    const number = document.createElement('div');
    number.classList.add('details');
    number.innerHTML = "Mobile Number";
    profile.appendChild(number);
    const email = document.createElement('div');
    email.classList.add('details');
    email.innerHTML = "Email";
    profile.appendChild(email);
    container.appendChild(profile);
}