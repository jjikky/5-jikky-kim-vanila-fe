// ['','board','1']
const board_id = window.location.pathname.split('/')[2];

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

// 데이터 삽입
async function insertData() {
    const boards = await getBoardList();
    const board = boards.find((board) => board.board_id == board_id);

    // 게시글 본문
    const boardTitle = document.getElementById('board-title');
    const boardComment = document.getElementById('count-comment');
    const boardView = document.getElementById('count-view');
    const boardCreatedAt = document.getElementById('board-created-at');
    const boardCreator = document.getElementById('creator');
    const boardContent = document.getElementById('board-content');
    // 게시글 댓글
    const commentCreator = document.getElementsByClassName('comment-creator');
    const commentCreatedAt = document.getElementsByClassName('comment-created-at');
    const commentContent = document.getElementsByClassName('comment-content');

    //  25글자 까지만 보이게
    if (board.title.length > TITLE_MAX_LENGTH) board.title = board.title.substring(0, TITLE_MAX_LENGTH);
    boardTitle.innerHTML = board.title;
    boardComment.innerHTML = formatCount(board.count.comment);
    boardView.innerHTML = formatCount(board.count.view);
    boardCreatedAt.innerHTML = board.created_at;
    boardCreator.innerHTML = board.creator.nickname;
    boardContent.innerHTML = board.content;

    board.comments.forEach((comment, index) => {
        commentCreator[index].innerHTML = comment.creator.nickname;
        commentCreatedAt[index].innerHTML = comment.created_at;
        commentContent[index].innerHTML = comment.content;
    });
}
insertData();

const comment_textarea = document.getElementById('comment');
const comment_btn = document.getElementById('comment-btn');
comment_textarea.addEventListener('input', (event) => {
    let input_comment = event.target.value;
    if (input_comment === '') {
        return (comment_btn.style.backgroundColor = '#ACA0EB');
    }
    comment_btn.style.backgroundColor = '#7F6AEE';
});
