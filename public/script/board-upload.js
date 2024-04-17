userNav = document.getElementById('user-nav');
profileBtn = document.getElementById('profile-btn');
profileBtn.addEventListener('click', () => {
    if (userNav.style.display == 'flex') {
        userNav.style.display = 'none';
    } else {
        userNav.style.display = 'flex';
    }
});

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
