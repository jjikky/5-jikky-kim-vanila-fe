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
nickname.addEventListener('change', (event) => {
    disableButton('update-btn');
    let input = event.target.value;
    console.log(input);
    if (input !== '') activeButton('update-btn');
});

// 프로필 사진 변경
const fileInput = document.getElementById('profile');
fileInput.addEventListener('change', function (event) {
    if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.onload = function (event) {
            document.getElementById('preview').src = event.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);
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
const toastMessage = document.getElementById('toast-message');
updateBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    let input = nickname.value;
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
    toastMessage.classList.add('active');
    setTimeout(function () {
        toastMessage.classList.remove('active');
    }, 1000);
    return (nicknameHelper.innerHTML = '');
});

finishBtn = document.getElementById('finish-btn');
finishBtn.addEventListener('click', (event) => {
    event.preventDefault();
    location.href = 'http://localhost:3000/board';
});
