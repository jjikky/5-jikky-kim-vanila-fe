// boadrList 생성하고 데이터 넣기
async function insertData() {
    const boards = await getBoardList();

    // 더미데이터 이용, board list layout 동적 생성
    const boardList = document.getElementsByClassName('board-list')[0];
    for (let i = 0; i < boards.length; i++) {
        const a = document.createElement('a');
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

    // 데이터 넣기
    const boardA = document.getElementsByClassName('board');
    const boardTitles = document.getElementsByClassName('board-title');
    const boardLikes = document.getElementsByClassName('count-like');
    const boardComment = document.getElementsByClassName('count-comment');
    const boardView = document.getElementsByClassName('count-view');
    const boardCreatedAt = document.getElementsByClassName('created-at');
    const boardCreator = document.getElementsByClassName('creator');

    boards.forEach((board, index) => {
        boardA[index].href = `http://localhost:3000/board/${board.board_id}`;
        if (board.title.length > TITLE_MAX_LENGTH) board.title = board.title.substring(0, TITLE_MAX_LENGTH);
        boardTitles[index].innerHTML = board.title;
        boardLikes[index].innerHTML = `좋아요 ${formatCount(board.count.like)}`;
        boardComment[index].innerHTML = `댓글 ${formatCount(board.count.comment)}`;
        boardView[index].innerHTML = `조회수 ${formatCount(board.count.view)}`;
        boardCreatedAt[index].innerHTML = board.created_at;
        boardCreator[index].innerHTML = board.creator.nickname;
    });
}
insertData();

// 게시물 작성 버튼 hover
const goUploadBtn = document.getElementById('go-upload');
goUploadBtn.addEventListener('mouseover', () => {
    goUploadBtn.style.backgroundColor = '#7F6AEE';
});
goUploadBtn.addEventListener('mouseleave', () => {
    goUploadBtn.style.backgroundColor = '#ACA0EB';
});
