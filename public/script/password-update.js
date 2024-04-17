const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
const passwordHelper = document.getElementById('password-helper');
const passwordHelper2 = document.getElementById('password-helper2');

const password = document.getElementById('password');
const passwordCheck = document.getElementById('password-check');
// const passwordUpdateBtn = document.getElementById('update-password-btn');

// 입력 완료 확인
let isComplete = {
    password: 0,
    passworCheck: 0,
};

password.addEventListener('change', (event) => {
    disableButton('update-password-btn');
    // 빈 값 확인
    if (event.target.value === '') return (passwordHelper.innerHTML = '*비밀번호를 입력해주세요.');
    // 유효성 검사
    if (validatePassword(event.target.value)) {
        // 비밀번호 확인과 비교
        if (event.target.value !== document.getElementById('password-check').value) {
            passwordHelper.innerHTML = '비밀번호가 다릅니다.';
            passwordHelper2.innerHTML = '비밀번호가 다릅니다.';
            return;
        }
        activeButton('update-password-btn');
        return (passwordHelper.innerHTML = '');
    }
    passwordHelper.innerHTML =
        '*비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 <br>최소 1개 포함해야합니다.';
});

// 비밀번호 유효성 검증
function validatePassword(password) {
    if (passwordPattern.test(password) === false) return false;
    return true;
}

passwordCheck.addEventListener('change', (event) => {
    // 빈 값 확인
    disableButton('update-password-btn');
    if (event.target.value === '') return (passwordHelper2.innerHTML = '*비밀번호를 한번 더 입력해주세요.');
    if (event.target.value !== document.getElementById('password').value) {
        passwordHelper.innerHTML = '비밀번호가 다릅니다.';
        passwordHelper2.innerHTML = '비밀번호가 다릅니다.';
        return 0;
    }
    activeButton('update-password-btn');
    passwordHelper.innerHTML = '';
    passwordHelper2.innerHTML = '';
});
