const userNav = document.getElementById('user-nav');
const profileBtn = document.getElementById('profile-btn');
const backIcon = document.getElementById('back-icon');
const toastMessage = document.getElementById('toast-message');

const nickname = document.getElementById('nickname');
const nicknameHelper = document.getElementById('nickname-helper');

const updateForm = document.getElementById('update-form');
const fileInput = document.getElementById('profile');
const email = document.getElementById('email');
const updateBtn = document.getElementById('update-btn');

// 회원탈퇴 modal
const wdModalBtn = document.querySelector('#user-wd-btn');
const wdModalXBtn = document.querySelector('#wd-x');
const wdModalOBtn = document.querySelector('#wd-o');
wdModalBtn.style.cursor = 'pointer';

const fetchUserData = async () => {
    const response = await getSingleUser();
    user = response.user;
    insertHeaderAvatar(user.avatar);
    insertFormAvatar(user.avatar);
    insertUserData(user);
};

const insertUserData = (user) => {
    email.innerHTML = user.email;
    nickname.value = user.nickname;
};

const deleteUserHandler = async () => {
    const response = await deleteUser();
    console.log(response);
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    closeModal('#wd-modal', '#overlay');
    if (isTokenExpired(response.message)) return (location.href = 'http://localhost:3000/login');
    location.href = 'http://localhost:3000/login';
};

const nicknameInputHandler = (event) => {
    nicknameHelper.innerHTML = '';
    disableButton('update-btn');
    let input = event.target.value;
    if (input !== '') activeButton('update-btn');
};

// 프로필 사진 변경
const fileInputHandler = (event) => {
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
};

const updateClickHandler = async (event) => {
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
        // 헤더 아바타 재설정
        await fetchUserData();
    }
    nicknameHelper.innerHTML = '';
    toastMessage.classList.add('active');
    setTimeout(function () {
        toastMessage.classList.remove('active');
    }, 1000);
};

wdModalBtn.addEventListener('click', () => openModal('#wd-modal', '#overlay'));
wdModalXBtn.addEventListener('click', () => closeModal('#wd-modal', '#overlay'));
wdModalOBtn.addEventListener('click', deleteUserHandler);
nickname.addEventListener('input', nicknameInputHandler);
fileInput.addEventListener('change', fileInputHandler);
updateBtn.addEventListener('click', updateClickHandler);

backIconClick(backIcon);
fetchUserData();
activeButton('update-btn');
