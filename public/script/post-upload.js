let userNav = document.getElementById('user-nav');
let profileBtn = document.getElementById('profile-btn');

// TODO : 변수 중복 제거, inputs 구조분해할당해서 사용
const title = document.getElementById('title');
const content = document.getElementById('content');

const uploadHelper = document.getElementById('upload-helper');

const uploadBtn = document.getElementById('upload-btn');
const uploadForm = document.getElementById('upload-form');

// 제목 내용 입력에 따른 버튼 활성화
const inputs = uploadForm.querySelectorAll('input[name="title"], textarea[name="content"], input[name="post_image"]');

const preview = document.getElementById('preview');
const fileInput = document.getElementById('img');
const fileName = document.getElementById('file-name');

const fetchUser = async () => {
    const response = await getSingleUser();
    user = response.user;
    insertHeaderAvatar(user.avatar);
};
// 이미지 선택하면 profile layout에 보여주기
const fileInputHandler = (event) => {
    if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.onload = function (event) {
            document.getElementById('preview').src = event.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);
        fileName.innerHTML = event.target.files[0].name;
        document.getElementById('preview').style.display = 'block';

        // preview에 input click 연결
        document.getElementById('preview').addEventListener('click', function () {
            fileInput.click();
        });
    } else {
        document.getElementById('preview').src = '';
        fileName.innerHTML = '파일을 선택해주세요.';
    }

    uploadInputHandler();
};

const uploadInputHandler = () => {
    if (uploadForm.title.value.length && uploadForm.content.value.length && uploadForm.post_image.value.length) {
        return (uploadHelper.innerHTML = '');
    }
    uploadHelper.innerHTML = '*제목, 내용, 이미지을 모두 작성해주세요';
};

const uploadBtnClickHandler = async (event) => {
    event.preventDefault();
    if (uploadForm.title.value.length && uploadForm.content.value.length && uploadForm.post_image.value.length) {
        const formData = new FormData(uploadForm);

        const response = await createPost(formData);
        console.log(response);
        return (location.href = `http://localhost:3000${isTokenExpired(response.message) ? '/login' : '/post'}`);
    }
    const helperText = document.getElementsByClassName('helper-text');
    helperText[0].innerHTML = '*제목, 내용, 이미지을 모두 작성해주세요';
};

inputs.forEach((input) => {
    input.addEventListener('input', () => checkInputs(inputs, 'upload-btn'));
});

fileInput.addEventListener('change', fileInputHandler);
title.addEventListener('input', uploadInputHandler);
content.addEventListener('input', uploadInputHandler);
uploadBtn.addEventListener('click', uploadBtnClickHandler);

fetchUser();
