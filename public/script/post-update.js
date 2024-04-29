const post_id = window.location.pathname.split('/')[2];

const userNav = document.getElementById('user-nav');
const profileBtn = document.getElementById('profile-btn');

// 뒤로 가기
const backIcon = document.getElementById('back-icon');

const logoutBtn = document.getElementById('logout-btn');

const updateForm = document.getElementById('update-form');
const updateBtn = document.getElementById('update-btn');
const title = document.getElementById('title');
const content = document.getElementById('content');
const updateHelper = document.getElementById('update-helper');

// 이미지 미리보기
const preview = document.getElementById('preview');
const existImage = document.getElementById('exist-image');

// NOTE : 업데이트에서 img input은 있는 경우에만 받을 거라 제외
const inputs = updateForm.querySelectorAll('input[name="title"], textarea[name="content"]');
const fileInput = document.getElementById('img');

const fetchUser = async () => {
    const response = await getSingleUser();
    user = response.user;
    insertHeaderAvatar(user.avatar);
};

const insertData = async () => {
    const response = await getSinglePost(post_id);
    const post = response.post;
    title.value = post.title;
    content.innerHTML = post.content;
    // 기존 파일 이미지 삽입
    preview.setAttribute('src', post.post_image);
    // 기존 파일명 삽입
    let splitSrc = post.post_image.split('/');
    existImage.innerHTML = splitSrc[splitSrc.length - 1];
};

// 이미지 선택하면 profile layout에 보여주기
const filleInputHandler = (event) => {
    if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.onload = function (event) {
            document.getElementById('preview').src = event.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);
        document.getElementById('preview').style.display = 'block';

        existImage.innerHTML = event.target.files[0].name;

        // preview에 input click 연결
        document.getElementById('preview').addEventListener('click', function () {
            fileInput.click();
        });
    } else {
        document.getElementById('preview').src = '';
    }
};

const titleInputHandler = (event) => {
    let input = event.target.value;
    if (input === '' || content.value === '') {
        return (updateHelper.innerHTML = '제목과 내용을 모두 입력해주세요.');
    }
    updateHelper.innerHTML = '';
};

const contentInputHandler = (event) => {
    let input = event.target.value;
    if (input === '' || title.value === '') {
        return (updateHelper.innerHTML = '제목과 내용을 모두 입력해주세요.');
    }
    updateHelper.innerHTML = '';
};

const updateBtnClickHandler = async (event) => {
    event.preventDefault();
    if (updateForm.title.value.length && updateForm.content.value.length) {
        const formData = new FormData(updateForm);
        const response = await updatePost(post_id, formData);
        console.log(response);
        location.href = `${CLIENT_URL}/post/${post_id}`;
    }
    const helperText = document.getElementsByClassName('helper-text');
    helperText[0].innerHTML = '*제목, 내용을 모두 작성해주세요';
};

inputs.forEach((input, i) => {
    input.addEventListener('input', () => checkInputs(inputs, 'update-btn'));
});

logoutBtn.addEventListener('click', () => debounce(logout()), 1000);
fileInput.addEventListener('change', filleInputHandler);
title.addEventListener('input', titleInputHandler);
content.addEventListener('input', contentInputHandler);
updateBtn.addEventListener('click', updateBtnClickHandler);

backIconClick(backIcon);
fetchUser();
insertData();
