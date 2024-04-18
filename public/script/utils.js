// 제목 길이 제한
const TITLE_MAX_LENGTH = 26;

// 더미 게시글 목록 가져오는 함수
async function getBoardList() {
    try {
        const response = await fetch('http://localhost:3000/data/boards.json');
        const boardData = await response.json();
        return boardData;
    } catch (error) {
        console.log(error);
    }
}

// 더미 유저 목록 반환
async function getUserList() {
    try {
        const response = await fetch('http://localhost:3000/data/users.json');
        const userData = await response.json();
        return userData;
    } catch (error) {
        console.log(error);
    }
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

// 뒤로가기
function backIconClick(el) {
    el.addEventListener('click', () => {
        history.back();
    });
    el.style.cursor = 'pointer';
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
