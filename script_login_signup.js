const arrow = document.querySelector('.arrow-up');
const signin = document.querySelector('#signin');
const signup = document.querySelector('#signup');
const forgot = document.querySelector('#forgot');
const divinput = document.querySelector('.inputs');
addSignIn();
signin.addEventListener('click', () => {
    arrow.classList.add('point-signin');
    arrow.classList.remove('point-signup', 'point-forgot');
    signin.style.color = '#fff';
    signup.style.color = '#0a6155';
    forgot.style.color = '#0a6155';
    removeAllElements(divinput);
    addSignIn();
});
signup.addEventListener('click', () => {
    arrow.classList.add('point-signup');
    arrow.classList.remove('point-signin', 'point-forgot');
    signin.style.color = '#0a6155';
    signup.style.color = '#fff';
    forgot.style.color = '#0a6155';
    removeAllElements(divinput);
    addSignUp();
});
forgot.addEventListener('click', () => {
    arrow.classList.add('point-forgot');
    arrow.classList.remove('point-signin', 'point-signup');
    signin.style.color = '#0a6155';
    signup.style.color = '#0a6155';
    forgot.style.color = '#fff';
    removeAllElements(divinput);
    addForgot();
});
function removeAllElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
function addSignIn() {
    divinput.action = '';
    divinput.action = '/signin';
    const email = document.createElement('input');
    email.type = "email";
    email.placeholder = "Email";
    divinput.appendChild(email);
    const password = document.createElement('input');
    password.type = "password";
    password.placeholder = "Password";
    divinput.appendChild(password);
    const button = document.createElement('button');
    button.textContent = "Sign In";
    divinput.appendChild(button);
}
function addSignUp() {
    divinput.action = '';
    divinput.action = '/signup';
    const name = document.createElement('input');
    name.type = "text";
    name.placeholder = "Full Name";
    divinput.appendChild(name);
    const number = document.createElement('input');
    number.type = "text";
    number.placeholder = "Mobile Number";
    divinput.appendChild(number);
    const email = document.createElement('input');
    email.type = "email";
    email.placeholder = "Email";
    divinput.appendChild(email);
    const password = document.createElement('input');
    password.type = "password";
    password.placeholder = "Password";
    divinput.appendChild(password);
    const rpassword = document.createElement('input');
    rpassword.type = "password";
    rpassword.placeholder = "Repeat Password";
    divinput.appendChild(rpassword);
    const button = document.createElement('button');
    button.textContent = "Sign Up";
    divinput.appendChild(button);
}
function addForgot() {
    divinput.action = '';
    divinput.action = '/forgot';
    const email = document.createElement('input');
    email.type = "email";
    email.placeholder = "Email";
    divinput.appendChild(email);
    const button = document.createElement('button');
    button.textContent = "Reset Password";
    divinput.appendChild(button);
}