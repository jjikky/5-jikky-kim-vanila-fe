// login page : 실시간 이메일 검증
const email = document.getElementById('email');
const password = document.getElementById('password');
const loginHelper = document.getElementById('login-helper');
const loginBtn = document.getElementById('login-btn');
loginBtn.addEventListener('click', clickLoginBtn);

const emailPattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
email.addEventListener('input', (event) => {
    // 유효 x
    if (validateEmail(event.target.value) && validatePassword(document.getElementById('password').value)) {
        loginHelper.innerHTML = '';
        loginBtn.style.backgroundColor = '#7F6AEE';
    } else {
        loginHelper.innerHTML = '입력하신 계정 정보가 정확하지 않습니다.';
        loginBtn.style.backgroundColor = '#ACA0EB';
    }
});
password.addEventListener('input', (event) => {
    // 유효 x
    if (validatePassword(event.target.value) && validateEmail(document.getElementById('email').value)) {
        loginHelper.innerHTML = '';
        loginBtn.style.backgroundColor = '#7F6AEE';
    } else {
        loginHelper.innerHTML = '입력하신 계정 정보가 정확하지 않습니다.';
        loginBtn.style.backgroundColor = '#ACA0EB';
    }
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
