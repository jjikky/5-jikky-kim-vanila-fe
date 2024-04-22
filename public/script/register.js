// helper text
const profileHelper = document.getElementById('profile-helper');
const emailHelper = document.getElementById('email-helper');
const passwordHelper = document.getElementById('password-helper');
const passwordHelper2 = document.getElementById('password-helper2');
const nicknameHelper = document.getElementById('nickname-helper');

// input field
const registerForm = document.getElementById('register-form');
const fileInput = document.getElementById('profile');
const email = document.getElementById('email');
const password = document.getElementById('password');
const passwordCheck = document.getElementById('password-check');
const nickname = document.getElementById('nickname');

const registerButton = document.getElementById('register-button');

// 입력 완료 확인
let isComplete = {
    profile: 0,
    email: 0,
    password: 0,
    passwordCheck: 0,
    nickname: 0,
};

// 이미지 선택하면 profile layout에 보여주기
fileInput.addEventListener('change', function (event) {
    if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.onload = function (event) {
            document.getElementById('preview').src = event.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);
        document.getElementById('image-input').style.display = 'none';
        document.getElementById('preview').style.display = 'block';
        // helper text 삭제
        profileHelper.innerHTML = '';
        isComplete.profile = 1;
        isButtonActive();

        // preview에 input click 연결
        document.getElementById('preview').addEventListener('click', function () {
            fileInput.click();
        });
    } else {
        document.getElementById('preview').src = '';
        isComplete.profile = 0;
        isButtonActive();
    }
});

email.addEventListener('change', async (event) => {
    let input = event.target.value;
    isComplete.email = 0;
    isButtonActive();
    if (validateEmail(input)) {
        if (await isExistEmail(input)) {
            return (emailHelper.innerHTML = '*중복된 이메일 입니다.');
        }
        isComplete.email = 1;
        isButtonActive();
        return (emailHelper.innerHTML = '');
    }
    emailHelper.innerHTML = '*올바른 이메일 주소 형식을 입력해주세요. (예:example@example.com)';
});
email.addEventListener('input', () => {
    emailHelper.innerHTML = '*이메일을 입력해주세요.';
});

password.addEventListener('change', (event) => {
    let input = event.target.value;
    isComplete.password = 0;
    isButtonActive();
    // 빈 값 확인
    if (input === '') return (passwordHelper.innerHTML = '*비밀번호을 입력해주세요.');
    // 유효성 검사
    if (validatePassword(input)) {
        // 비밀번호 확인과 비교
        if (input !== passwordCheck.value) {
            passwordHelper.innerHTML = '비밀번호가 다릅니다.';
            passwordHelper2.innerHTML = '비밀번호가 다릅니다.';
            return;
        }
        isComplete.password = 1;
        isComplete.passwordCheck = 1;
        isButtonActive();
        return (passwordHelper.innerHTML = '');
    }
    passwordHelper.innerHTML =
        '*비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 <br>최소 1개 포함해야합니다.';
});

passwordCheck.addEventListener('change', (event) => {
    isComplete.passwordCheck = 0;
    isButtonActive();
    // 빈 값 확인
    if (event.target.value === '') return (passwordHelper2.innerHTML = '*비밀번호을 한번 더 입력해주세요.');
    if (event.target.value !== password.value) {
        passwordHelper.innerHTML = '비밀번호가 다릅니다.';
        passwordHelper2.innerHTML = '비밀번호가 다릅니다.';
        return 0;
    }
    isComplete.password = 1;
    isComplete.passwordCheck = 1;
    passwordHelper.innerHTML = '';
    passwordHelper2.innerHTML = '';
    isButtonActive();
});

nickname.addEventListener('change', async (event) => {
    let input = event.target.value;
    isComplete.nickname = 0;
    isButtonActive();
    // 빈 값 확인
    if (input === '') return (nicknameHelper.innerHTML = '*닉네임을 입력해주세요.');
    // 유효성 검사 - 띄워쓰기
    if (validateNickname(input) == 'spaceError') {
        return (nicknameHelper.innerHTML = '*띄워쓰기를 없애주세요.');
        // 유효성 검사 - 글자수
    } else if (validateNickname(input) == 'lengthError') {
        return (nicknameHelper.innerHTML = '*닉네임은 최대 10자까지 작성 가능합니다.');
    }
    //  닉네임 중복 검사
    if (await isExistNickname(input)) {
        return (nicknameHelper.innerHTML = '*중복된 닉네임 입니다.');
    }
    isComplete.nickname = 1;
    isButtonActive();
    return (nicknameHelper.innerHTML = '');
});

// 서식 완성되면 버튼 활성화
function isButtonActive() {
    // TODO : api 구현 후 회원가입 요청으로 변경
    let sumIsComplete = Object.values(isComplete).reduce((a, b) => a + b);
    if (sumIsComplete == 5) {
        activeButton('register-button');
        registerButton.addEventListener('click', async () => {
            const formData = new FormData(registerForm);
            const response = await register(formData);
            console.log(response);
            location.href = 'http://localhost:3000/login';
        });
        return;
    }
    disableButton('register-button');
}
