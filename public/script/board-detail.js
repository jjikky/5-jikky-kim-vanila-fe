const updateBtn = document.getElementById('update-event-btn');

updateBtn.addEventListener('click', () => {
    window.location.href = 'http://localhost:3000/board/update';
});

// floating menu
userNav = document.getElementById('user-nav');
profileBtn = document.getElementById('profile-btn');
profileBtn.addEventListener('click', () => {
    if (userNav.style.display == 'flex') {
        userNav.style.display = 'none';
    } else {
        userNav.style.display = 'flex';
    }
});

// 게시글 삭제 모달
const delModalBtn = document.querySelector('#del-modal-btn');
delModalBtn.addEventListener('click', () => openModal('#del-modal', '#overlay1'));

const delModalXBtn = document.querySelector('#del-x');
delModalXBtn.addEventListener('click', () => closeModal('#del-modal', '#overlay1'));
const delModalOBtn = document.querySelector('#del-o');
delModalOBtn.addEventListener('click', () => {
    // TODO : api 서버 구현 후 delete 요청
    closeModal('#del-modal', '#overlay1');
});

// 댓글 삭제 모달
const delCommentModalBtn = document.querySelector('#del-comment-modal-btn');
delCommentModalBtn.addEventListener('click', () => openModal('#del-comment-modal', '#overlay2'));

const delCommentModalXBtn = document.querySelector('#del-comment-x');
delCommentModalXBtn.addEventListener('click', () => closeModal('#del-comment-modal', '#overlay2'));
const delCommentModalOBtn = document.querySelector('#del-comment-o');
delCommentModalOBtn.addEventListener('click', () => {
    // TODO : api 서버 구현 후 delete 요청
    closeModal('#del-comment-modal', '#overlay2');
});

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
