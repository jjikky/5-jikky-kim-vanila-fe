const userNav = document.getElementById('user-nav');
const profileBtn = document.getElementById('profile-btn');

const nickname = document.getElementById('nickname');
const nicknameHelper = document.getElementById('nickname-helper');

const fileInput = document.getElementById('profile');

const backIcon = document.getElementById('back-icon');

const updateForm = document.getElementById('update-form');
const email = document.getElementById('email');
const updateBtn = document.getElementById('update-btn');
const toastMessage = document.getElementById('toast-message');

async function fetchUserData() {
    const response = await getSingleUser();
    user = response.user;
    insertHeaderAvatar(user.avatar);
    insertFormAvatar(user.avatar);
    insertUserData(user);
}

function insertUserData(user) {
    email.innerHTML = user.email;
    nickname.value = user.nickname;
}

fetchUserData();

// user menu
profileBtn.addEventListener('click', () => {
    if (userNav.style.display == 'flex') {
        userNav.style.display = 'none';
    } else {
        userNav.style.display = 'flex';
    }
});

// 뒤로 가기
backIconClick(backIcon);

activeButton('update-btn');

// 회원탈퇴 modal
const wdModalBtn = document.querySelector('#user-wd-btn');
wdModalBtn.style.cursor = 'pointer';
wdModalBtn.addEventListener('click', () => openModal('#wd-modal', '#overlay'));

const wdModalXBtn = document.querySelector('#wd-x');
wdModalXBtn.addEventListener('click', () => closeModal('#wd-modal', '#overlay'));
const wdModalOBtn = document.querySelector('#wd-o');
wdModalOBtn.addEventListener('click', async () => {
    const response = await deleteUser();
    console.log(response);
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    location.href = 'http://localhost:3000/login';
    closeModal('#wd-modal', '#overlay');
});

nickname.addEventListener('input', (event) => {
    disableButton('update-btn');
    let input = event.target.value;
    if (input !== '') activeButton('update-btn');
});

// 프로필 사진 변경
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

    if (updateForm.nickname.value.length) {
        const formData = new FormData(updateForm);
        // email추가
        formData.append('email', email.innerHTML);
        const response = await updateUser(formData);
        console.log(response);
    }
    nicknameHelper.innerHTML = '';
    toastMessage.classList.add('active');
    setTimeout(function () {
        toastMessage.classList.remove('active');
    }, 1000);
});
