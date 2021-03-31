const bubble = document.querySelector('.bubble');
const bar = document.querySelector('.bar');
const list = document.querySelectorAll('#icons');
let coords = list[0].getBoundingClientRect();
setBounds(coords);
for (let i of list) {
    i.addEventListener('click', () => {
        let coords = i.getBoundingClientRect();
        setBounds(coords);
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