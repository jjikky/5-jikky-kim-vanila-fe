// helper text
const profileHelper = document.getElementById('profile-helper');
const emailHelper = document.getElementById('email-helper');
const passwordHelper = document.getElementById('password-helper');
const passwordHelper2 = document.getElementById('password-helper2');
const nicknameHelper = document.getElementById('nickname-helper');

// input field
const fileInput = document.getElementById('profile');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const nickname = document.getElementById('nickname');

const loginButton = document.getElementById('register-button');

const emailPattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

// 입력 완료 확인
let isComplete = {
    profile: 0,
    email: 0,
    password: 0,
    password2: 0,
    nickname: 0,
};

// 이미지 선택하면 profile layout에 보여주기
fileInput.addEventListener('change', function (e) {
    if (e.target.files && e.target.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('preview').src = e.target.result;
        };
        reader.readAsDataURL(e.target.files[0]);
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

email.addEventListener('change', async (e) => {
    isComplete.email = 0;
    isButtonActive();
    if (validateEmail(e.target.value)) {
        if (await isExistEmail(e.target.value)) {
            return (emailHelper.innerHTML = '*중복된 이메일 입니다.');
        }
        isComplete.email = 1;
        isButtonActive();
        return (emailHelper.innerHTML = '');
    }
    emailHelper.innerHTML = '*올바른 이메일 주소 형식을 입력해주세요. (예:example@example.com)';
});
email.addEventListener('input', (e) => {
    emailHelper.innerHTML = '*이메일을 입력해주세요.';
});

// 이메일 유효성 검증
function validateEmail(email) {
    // 빈 값 검사
    if (email === '') return false;
    // 이메일 형식 검사
    if (emailPattern.test(email) === false || email.length < 5) return false;
    return true;
}

async function isExistEmail(email) {
    const response = await fetch('http://localhost:3000/data/users.json');
    const userData = await response.json();

    let findUser = userData.find((user) => user.email === email);
    if (findUser === undefined) {
        return false;
    }
    return true;
}
password.addEventListener('change', (e) => {
    isComplete.password = 0;
    isButtonActive();
    // 빈 값 확인
    if (e.target.value === '') return (passwordHelper.innerHTML = '*비밀번호을 입력해주세요.');
    // 유효성 검사
    if (validatePassword(e.target.value)) {
        // 비밀번호 확인과 비교
        if (e.target.value !== document.getElementById('password2').value) {
            passwordHelper.innerHTML = '비밀번호가 다릅니다.';
            passwordHelper2.innerHTML = '비밀번호가 다릅니다.';
            return;
        }
        isComplete.password = 1;
        isComplete.password2 = 1;
        isButtonActive();
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

password2.addEventListener('change', (e) => {
    isComplete.password2 = 0;
    isButtonActive();
    // 빈 값 확인
    if (e.target.value === '') return (passwordHelper2.innerHTML = '*비밀번호을 한번 더 입력해주세요.');
    if (e.target.value !== document.getElementById('password').value) {
        passwordHelper.innerHTML = '비밀번호가 다릅니다.';
        passwordHelper2.innerHTML = '비밀번호가 다릅니다.';
        return 0;
    }
    isComplete.password = 1;
    isComplete.password2 = 1;
    passwordHelper.innerHTML = '';
    passwordHelper2.innerHTML = '';
    isButtonActive();
});

nickname.addEventListener('change', async (e) => {
    isComplete.nickname = 0;
    isButtonActive();
    // 빈 값 확인
    if (e.target.value === '') return (nicknameHelper.innerHTML = '*닉네임을 입력해주세요.');
    // 유효성 검사 - 띄워쓰기
    if (validateNickname(e.target.value) == 'spaceError') {
        return (nicknameHelper.innerHTML = '*띄워쓰기를 없애주세요.');
        // 유효성 검사 - 글자수
    } else if (validateNickname(e.target.value) == 'lengthError') {
        return (nicknameHelper.innerHTML = '*닉네임은 최대 10자까지 작성 가능합니다.');
    }
    //  닉네임 중복 검사
    if (await isExistNickname(e.target.value)) {
        return (nicknameHelper.innerHTML = '*중복된 닉네임 입니다.');
    }
    isComplete.nickname = 1;
    isButtonActive();
    return (nicknameHelper.innerHTML = '');
});
async function isExistNickname(nickname) {
    const response = await fetch('http://localhost:3000/data/users.json');
    const userData = await response.json();

    let findUser = userData.find((user) => user.nickname === nickname);
    if (findUser === undefined) {
        return false;
    }
    return true;
}

function validateNickname(nickname) {
    // 띄어쓰기가 없는지 확인
    if (nickname.indexOf(' ') !== -1) return 'spaceError';
    // 길이가 10글자 이하인지 확인
    if (nickname.length > 10) return 'lengthError';
    return true;
}

// 서식 완성되면 버튼 활성화
function isButtonActive() {
    // TODO : api 구현 후 회원가입 요청으로 변경
    let sumIsComplete = Object.values(isComplete).reduce((a, b) => a + b);
    if (sumIsComplete == 5) {
        loginButton.style.backgroundColor = '#7F6AEE';
        loginButton.addEventListener('click', () => (location.href = 'http://localhost:3000/board'));
    }
    loginButton.style.backgroundColor = '#ACA0EB';
    loginButton.addEventListener('click');
}
