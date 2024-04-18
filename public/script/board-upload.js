userNav = document.getElementById('user-nav');
profileBtn = document.getElementById('profile-btn');
profileBtn.addEventListener('click', () => {
    if (userNav.style.display == 'flex') {
        userNav.style.display = 'none';
    } else {
        userNav.style.display = 'flex';
    }
});
const title = document.getElementById('title');
const content = document.getElementById('content');
const uploadHelper = document.getElementById('upload-helper');

const uploadBtn = document.getElementById('upload-btn');
const uploadForm = document.getElementById('upload-form');

// 제목 내용 입력에 따른 버튼 활성화
uploadForm.title.addEventListener('input', (event) => {
    if (event.target.value.length > 0 && uploadForm.content.value.length > 0)
        return (uploadBtn.style.backgroundColor = '#7F6AEE');
    uploadBtn.style.backgroundColor = '#ACA0EB';
});
uploadForm.content.addEventListener('input', (event) => {
    if (event.target.value.length > 0 && uploadForm.title.value.length > 0)
        return (uploadBtn.style.backgroundColor = '#7F6AEE');
    uploadBtn.style.backgroundColor = '#ACA0EB';
});

uploadBtn.addEventListener('click', (event) => {
    event.preventDefault();
    if (uploadForm.title.value.length > 0 && uploadForm.content.value.length) {
        alert('작성 완료!');
        location.href = 'http://localhost:3000/board';
    } else {
        const helperText = document.getElementsByClassName('helper-text');
        helperText[0].innerHTML = '*제목, 내용을 모두 작성해주세요';
    }
});

const preview = document.getElementById('preview');
const fileInput = document.getElementById('img');

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

        // preview에 input click 연결
        document.getElementById('preview').addEventListener('click', function () {
            fileInput.click();
        });
    } else {
        document.getElementById('preview').src = '';
    }
});

title.addEventListener('input', (event) => {
    disableButton('upload-btn');
    let input = event.target.value;
    if (input === '' || content.value === '') {
        return (uploadHelper.innerHTML = '제목과 내용을 모두 입력해주세요.');
    }
    uploadHelper.innerHTML = '';
    activeButton('upload-btn');
});

content.addEventListener('input', (event) => {
    disableButton('upload-btn');
    let input = event.target.value;
    if (input === '' || title.value === '') {
        return (uploadHelper.innerHTML = '제목과 내용을 모두 입력해주세요.');
    }
    uploadHelper.innerHTML = '';
    activeButton('upload-btn');
});
