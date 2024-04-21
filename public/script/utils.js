// 제목 길이 제한
const TITLE_MAX_LENGTH = 26;

// home navigation
const home = document.getElementById('header-text');
home.addEventListener('click', () => {
    window.location.href = 'http://localhost:3000/post';
});

// 뒤로가기
function backIconClick(el) {
    el.addEventListener('click', () => {
        history.back();
    });
    el.style.cursor = 'pointer';
}

// 조회수,댓글,좋아요 수 등 형식 변환
function formatCount(count) {
    if (count >= 1000000) {
        return (count / 1000000).toFixed(1) + 'm';
    } else if (count >= 1000) {
        return (count / 1000).toFixed(0) + 'k';
    } else {
        return count.toString();
    }
}

// 모달
function openModal(modalName, overlayName) {
    const modal = document.querySelector(modalName);
    modal.style.display = 'flex';
    document.querySelector(overlayName).style.display = 'flex';
    document.querySelector('body').style.overflow = 'hidden';
}

function closeModal(modalName, overlayName) {
    const modal = document.querySelector(modalName);
    modal.style.display = 'none';
    document.querySelector(overlayName).style.display = 'none';
    document.querySelector('body').style.overflow = 'auto';
}

// 버튼 활성화, 비활성화
function activeButton(id) {
    let button = document.getElementById(id);
    button.classList.add('active');
}
function disableButton(className) {
    let button = document.getElementById(className);
    button.classList.remove('active');
}

// 입력 필드가 모두 채워졌는지 확인하는 함수
function checkInputs(inputs, buttonId) {
    let isValid = true;

    inputs.forEach((v) => {
        if (!v.value) {
            isValid = false;
            return;
        }
    });
    // 모든 입력 필드가 채워져 있으면 submit 버튼 활성화
    if (isValid) {
        activeButton(buttonId);
    } else {
        disableButton(buttonId);
    }
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    window.location.href = 'http://localhost:3000/login';
}

async function insertHeaderAvatar(user_avatar) {
    const profileBtn = document.getElementById('profile-btn');
    profileBtn.setAttribute('src', user_avatar);
}

async function insertFormAvatar(user_avatar) {
    const avatarImg = document.getElementById('avatar');
    avatarImg.setAttribute('src', user_avatar);
}
