const arrow = document.querySelector('.arrow-up');
const signin = document.querySelector('#signin');
const signup = document.querySelector('#signup');
const forgot = document.querySelector('#forgot');
const divinput = document.querySelector('.inputs');
addSignIn();
signin.addEventListener('click', () => {
    arrow.classList.add('point-signin');
    arrow.classList.remove('point-signup', 'point-forgot');
    signin.style.color = '#d2e603';
    signup.style.color = '#3e978b';
    forgot.style.color = '#3e978b';
    removeAllElements(divinput);
    addSignIn();
});
signup.addEventListener('click', () => {
    arrow.classList.add('point-signup');
    arrow.classList.remove('point-signin', 'point-forgot');
    signin.style.color = '#3e978b';
    signup.style.color = '#d2e603';
    forgot.style.color = '#3e978b';
    removeAllElements(divinput);
    addSignUp();
});
forgot.addEventListener('click', () => {
    arrow.classList.add('point-forgot');
    arrow.classList.remove('point-signin', 'point-signup');
    signin.style.color = '#3e978b';
    signup.style.color = '#3e978b';
    forgot.style.color = '#d2e603';
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
    rpassword.placeholder = "Repeat password";
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