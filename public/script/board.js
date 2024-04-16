// 더미 데이터 수
const DATA_SIZE = 8;

// 더미데이터 이용, board list layout 동적 생성
const boardList = document.getElementsByClassName('board-list')[0];
for (let i = 0; i < DATA_SIZE; i++) {
    const a = document.createElement('a');
    a.href = `http://localhost:3000/board/1`;
    a.className = 'board';
    boardList.appendChild(a);

    const div = document.createElement('div');
    div.className = 'board-title';
    a.appendChild(div);

    // board-mid
    const div1 = document.createElement('div');
    div1.className = 'board-mid';
    a.appendChild(div1);

    const div2 = document.createElement('div');
    div2.className = 'board-mid-l';
    div1.appendChild(div2);

    const div3 = document.createElement('div');
    div3.className = 'count-like';
    div2.appendChild(div3);

    const div4 = document.createElement('div');
    div4.className = 'count-comment';
    div2.appendChild(div4);

    const div5 = document.createElement('div');
    div5.className = 'count-view';
    div2.appendChild(div5);

    const div_created_at = document.createElement('div');
    div_created_at.className = 'created-at';
    div1.appendChild(div_created_at);

    // line
    const div6 = document.createElement('div');
    div6.className = 'line';
    a.appendChild(div6);

    // board-creator
    const div7 = document.createElement('div');
    div7.className = 'board-creator';
    a.appendChild(div7);

    const div8 = document.createElement('div');
    div8.className = 'avatar';
    div7.appendChild(div8);

    const div9 = document.createElement('div');
    div9.className = 'creator';
    div7.appendChild(div9);
}

// boadrList에 데이터 넣기
async function insertData() {
    const boards = await getBoardList();
    const boardTitles = document.getElementsByClassName('board-title');
    const boardLikes = document.getElementsByClassName('count-like');
    const boardComment = document.getElementsByClassName('count-comment');
    const boardView = document.getElementsByClassName('count-view');
    const boardCreatedAt = document.getElementsByClassName('created-at');
    const boardCreator = document.getElementsByClassName('creator');

    const titleShowMaxLength = 25;
    boards.forEach((board, index) => {
        if (board.title.length > titleShowMaxLength) board.title = board.title.substring(0, titleShowMaxLength);
        boardTitles[index].innerHTML = board.title;
        boardLikes[index].innerHTML = `좋아요 ${formatCount(board.count.like)}`;
        boardComment[index].innerHTML = `댓글 ${formatCount(board.count.comment)}`;
        boardView[index].innerHTML = `조회수 ${formatCount(board.count.view)}`;
        boardCreatedAt[index].innerHTML = board.created_at;
        boardCreator[index].innerHTML = board.creator.nickname;
    });
}
insertData();

// 더미 게시글 목록 가져오는 함수
async function getBoardList() {
    try {
        const response = await fetch('http://localhost:3000/data/boards.json');
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

// 게시물 작성 버튼 hover
const goUploadBtn = document.getElementById('go-upload');
goUploadBtn.addEventListener('mouseover', () => {
    goUploadBtn.style.backgroundColor = '#7F6AEE';
});
goUploadBtn.addEventListener('mouseleave', () => {
    goUploadBtn.style.backgroundColor = '#ACA0EB';
});
