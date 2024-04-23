// login page : 실시간 이메일 검증
const email = document.getElementById('email');
const password = document.getElementById('password');
const emailHelper = document.getElementById('email-helper');
const passwordHelper = document.getElementById('password-helper');
const loginBtn = document.getElementById('login-btn');

const inputPassword = (event) => {
    let input = event.target.value;
    disableButton('login-btn');
    if (validatePassword(input)) {
        passwordHelper.innerHTML = '';
        if (validateEmail(email.value)) {
            return activeButton('login-btn');
        }
        return;
    }
    passwordHelper.innerHTML =
        '*비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 <br>최소 1개 포함해야합니다.';
};

const inputEmail = (event) => {
    disableButton('login-btn');
    let input = event.target.value;
    if (validateEmail(input)) {
        emailHelper.innerHTML = '';
        if (validatePassword(password.value)) {
            return activeButton('login-btn');
        }
        return;
    }
    emailHelper.innerHTML = '*올바른 이메일 주소 형식을 입력해주세요. (예:example@example.com)';
};

const clickLoginBtn = async (event) => {
    event.preventDefault();
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    const response = await login(email, password);
    if (response.message === 'login success') {
        const token = response.token;
        const user_id = response.user_id;
        localStorage.setItem('token', token);
        localStorage.setItem('user_id', user_id);
        return (location.href = 'http://localhost:3000/post');
    }
    // 로그인 실패
    alert('아이디 또는 비밀번호가 잘못되었습니다.');
    location.href = 'http://localhost:3000/login';
};

loginBtn.addEventListener('click', clickLoginBtn);
email.addEventListener('input', inputEmail);
password.addEventListener('input', inputPassword);
