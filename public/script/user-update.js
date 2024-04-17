// user menu
userNav = document.getElementById('user-nav');
profileBtn = document.getElementById('profile-btn');
profileBtn.addEventListener('click', () => {
    if (userNav.style.display == 'flex') {
        userNav.style.display = 'none';
    } else {
        userNav.style.display = 'flex';
    }
});

// 뒤로 가기
const backIcon = document.getElementById('back-icon');
backIconClick(backIcon);

// 회원탈퇴 modal
const wdModalBtn = document.querySelector('#user-wd-btn');
wdModalBtn.style.cursor = 'pointer';
wdModalBtn.addEventListener('click', () => openModal('#wd-modal', '#overlay'));

const wdModalXBtn = document.querySelector('#wd-x');
wdModalXBtn.addEventListener('click', () => closeModal('#wd-modal', '#overlay'));
const wdModalOBtn = document.querySelector('#wd-o');
wdModalOBtn.addEventListener('click', () => {
    // TODO : api 서버 구현 후 탈퇴 요청
    closeModal('#wd-modal', '#overlay');
});

const nickname = document.getElementById('nickname');
const nicknameHelper = document.getElementById('nickname-helper');
nickname.addEventListener('change', async (e) => {
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

// 프로필 사진 변경
const fileInput = document.getElementById('profile');
fileInput.addEventListener('change', function (e) {
    if (e.target.files && e.target.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('preview').src = e.target.result;
        };
        reader.readAsDataURL(e.target.files[0]);
        document.getElementById('image-input').style.display = 'none';
        document.getElementById('preview').style.display = 'block';

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

const updateBtn = document.getElementById('update-btn');
const toastMessage = document.getElementById('toast_message');
updateBtn.addEventListener('click', (e) => {
    console.log(1);
    e.preventDefault();
    toastMessage.classList.add('active');
    setTimeout(function () {
        toastMessage.classList.remove('active');
    }, 1000);
});

finishBtn = document.getElementById('finish-btn');
finishBtn.addEventListener('click', (event) => {
    event.preventDefault();
    location.href = 'http://localhost:3000/board';
});
