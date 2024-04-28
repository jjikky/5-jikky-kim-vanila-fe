// 제목 길이 제한
const TITLE_MAX_LENGTH = 26;

// home navigation
const home = document.getElementById('header-text');
home.addEventListener('click', () => (location.href = `${CLIENT_URL}/post`));

// 뒤로가기
const backIconClick = (el) => {
    el.addEventListener('click', () => history.back());
    el.style.cursor = 'pointer';
};

// 조회수,댓글,좋아요 수 등 형식 변환
const formatCount = (count) => {
    if (count >= 1000000) {
        return (count / 1000000).toFixed(1) + 'm';
    } else if (count >= 1000) {
        return (count / 1000).toFixed(0) + 'k';
    } else {
        return count.toString();
    }
};

// 모달
const openModal = (modalName, overlayName) => {
    const modal = document.querySelector(modalName);
    modal.style.display = 'flex';
    document.querySelector(overlayName).style.display = 'flex';
    document.querySelector('body').style.overflow = 'hidden';
};

const closeModal = (modalName, overlayName) => {
    const modal = document.querySelector(modalName);
    modal.style.display = 'none';
    document.querySelector(overlayName).style.display = 'none';
    document.querySelector('body').style.overflow = 'auto';
};

// 버튼 활성화, 비활성화
const activeButton = (id) => {
    let button = document.getElementById(id);
    button.classList.add('active');
};
const disableButton = (className) => {
    let button = document.getElementById(className);
    button.classList.remove('active');
};

// 입력 필드가 모두 채워졌는지 확인하는 함수
const checkInputs = (inputs, buttonId) => {
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
};

const insertHeaderAvatar = (user_avatar) => {
    const profileBtn = document.getElementById('profile-btn');
    profileBtn.setAttribute('src', user_avatar);
};

const insertFormAvatar = (user_avatar) => {
    const avatarImg = document.getElementById('avatar');
    avatarImg.setAttribute('src', user_avatar);
};

const debounce = (func, delay) => {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
};
