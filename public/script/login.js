// login page : 실시간 이메일 검증
const email = document.getElementById('email');
const password = document.getElementById('password');
const emailHelper = document.getElementById('email-helper');
const passwordHelper = document.getElementById('password-helper');
const loginBtn = document.getElementById('login-btn');
loginBtn.addEventListener('click', clickLoginBtn);

const emailPattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

let isComplete = {
    email: 0,
    password: 0,
};

email.addEventListener('input', (event) => {
    disableButton('login-btn');
    if (validateEmail(event.target.value)) {
        emailHelper.innerHTML = '';
        if (validatePassword(document.getElementById('password').value)) {
            return activeButton('login-btn');
        }
        return;
    }
    emailHelper.innerHTML = '*올바른 이메일 주소 형식을 입력해주세요. (예:example@example.com)';
});
password.addEventListener('input', (event) => {
    disableButton('login-btn');
    if (validatePassword(event.target.value)) {
        // activeButton('login-btn');
        passwordHelper.innerHTML = '';
        if (validateEmail(document.getElementById('email').value)) {
            return activeButton('login-btn');
        }
        return;
    }
    passwordHelper.innerHTML =
        '*비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 <br>최소 1개 포함해야합니다.';
});

// 이메일 유효성 검증
function validateEmail(email) {
    // 빈 값 검사
    if (email === '') return false;
    // 이메일 형식 검사
    if (emailPattern.test(email) === false || email.length < 5) return false;
    return true;
}

// 비밀번호 유효성 검증
function validatePassword(password) {
    if (password === '') return false;
    if (passwordPattern.test(password) === false) return false;
    return true;
}

async function clickLoginBtn(event) {
    event.preventDefault();
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    const user = await getUserList();
    let findUser = user.find((user) => user.email === email && user.password === password);
    if (findUser === undefined) {
        return alert('아이디 또는 비밀번호가 잘못되었습니다.');
    }
    return (window.location.href = 'http://localhost:3000/board');
    // TODO : api 구현 후 서버로 비밀번호 검증 요청
}
