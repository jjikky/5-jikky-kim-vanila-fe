const post_id = window.location.pathname.split('/')[2];
const updateBtn = document.getElementById('update-btn');

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

async function fetchUser() {
    const response = await getSingleUser();
    user = response.user;
    insertHeaderAvatar(user.avatar);
}
fetchUser();

// 뒤로 가기
const backIcon = document.getElementById('back-icon');
backIconClick(backIcon);

const title = document.getElementById('title');
const content = document.getElementById('content');
const updateHelper = document.getElementById('update-helper');

// 이미지 미리보기
const preview = document.getElementById('preview');
const existImage = document.getElementById('exist-image');

async function insertData() {
    const response = await getSinglePost(post_id);
    const post = response.post;
    title.value = post.title;
    content.innerHTML = post.content;
    // 기존 파일 이미지 삽입
    preview.setAttribute('src', post.post_image);
    // 기존 파일명 삽입
    let splitSrc = post.post_image.split('/');
    existImage.innerHTML = splitSrc[splitSrc.length - 1];
}
insertData();

const fileInput = document.getElementById('img');

// 이미지 선택하면 profile layout에 보여주기
fileInput.addEventListener('change', function (event) {
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
});

title.addEventListener('input', (event) => {
    disableButton('update-btn');
    let input = event.target.value;
    if (input === '' || content.value === '') {
        return (updateHelper.innerHTML = '제목과 내용을 모두 입력해주세요.');
    }
    updateHelper.innerHTML = '';
    activeButton('update-btn');
});

content.addEventListener('input', (event) => {
    disableButton('update-btn');
    let input = event.target.value;
    if (input === '' || title.value === '') {
        return (updateHelper.innerHTML = '제목과 내용을 모두 입력해주세요.');
    }
    updateHelper.innerHTML = '';
    activeButton('update-btn');
});

updateBtn.addEventListener('click', (event) => {
    event.preventDefault();
    location.href = `http://localhost:3000/post/${post_id}`;
});

// TODO : api 구현 후 update 요청
