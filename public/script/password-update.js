const passwordHelper = document.getElementById('password-helper');
const passwordHelper2 = document.getElementById('password-helper2');

const password = document.getElementById('password');
const passwordCheck = document.getElementById('password-check');

const updateBtn = document.getElementById('update-password-btn');
const toastMessage = document.getElementById('toast-message');

password.addEventListener('change', (event) => {
    let input = event.target.value;
    disableButton('update-password-btn');
    // 빈 값 확인
    if (input === '') return (passwordHelper.innerHTML = '*비밀번호를 입력해주세요.');
    // 유효성 검사
    if (validatePassword(input)) {
        // 비밀번호 확인과 비교
        if (input !== passwordCheck.value) {
            passwordHelper.innerHTML = '비밀번호가 다릅니다.';
            passwordHelper2.innerHTML = '비밀번호가 다릅니다.';
            return;
        }
        activeButton('update-password-btn');
        passwordHelper.innerHTML = '';
        passwordHelper2.innerHTML = '';
        return;
    }
    passwordHelper.innerHTML =
        '*비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 <br>최소 1개 포함해야합니다.';
});

passwordCheck.addEventListener('change', (event) => {
    let input = event.target.value;
    disableButton('update-password-btn');
    if (input === '') return (passwordHelper2.innerHTML = '*비밀번호를 한번 더 입력해주세요.');
    if (validatePassword(input)) {
        // 비밀번호 확인과 비교
        if (input !== password.value) {
            passwordHelper.innerHTML = '비밀번호가 다릅니다.';
            passwordHelper2.innerHTML = '비밀번호가 다릅니다.';
            return;
        }
        activeButton('update-password-btn');
        passwordHelper.innerHTML = '';
        passwordHelper2.innerHTML = '';
        return;
    }

    passwordHelper2.innerHTML =
        '*비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 <br>최소 1개 포함해야합니다.';
});

// 토스트 메세지
updateBtn.addEventListener('click', (event) => {
    event.preventDefault();
    toastMessage.innerHTML =
        validatePassword(password.value) && validatePassword(passwordCheck.value)
            ? '수정 완료'
            : '형식에 맞춰 다시<br> 입력해주세요.';
    toastMessage.classList.add('active');
    setTimeout(function () {
        toastMessage.classList.remove('active');
    }, 1000);
});
