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
        const divMid = document.createElement('div');
        divMid.className = 'board-mid';
        a.appendChild(divMid);

        const divMidL = document.createElement('div');
        divMidL.className = 'board-mid-l';
        divMid.appendChild(divMidL);

        const divLike = document.createElement('div');
        divLike.className = 'count-like';
        divMidL.appendChild(divLike);

        const divComment = document.createElement('div');
        divComment.className = 'count-comment';
        divMidL.appendChild(divComment);

        const divView = document.createElement('div');
        divView.className = 'count-view';
        divMidL.appendChild(divView);

        const div_created_at = document.createElement('div');
        div_created_at.className = 'created-at';
        divMid.appendChild(div_created_at);

        // line
        const divLine = document.createElement('div');
        divLine.className = 'line';
        a.appendChild(divLine);

        // board-creator
        const divCreatorBox = document.createElement('div');
        divCreatorBox.className = 'board-creator';
        a.appendChild(divCreatorBox);

        const divAvatar = document.createElement('div');
        divAvatar.className = 'avatar';
        divCreatorBox.appendChild(divAvatar);

        const divCreator = document.createElement('div');
        divCreator.className = 'creator';
        divCreatorBox.appendChild(divCreator);

        const divCreatorImg = document.createElement('img');
        divCreatorImg.className = 'creator-img';
        divAvatar.appendChild(divCreatorImg);
    }

    // 데이터 넣기
    const boardA = document.getElementsByClassName('board');
    const boardTitles = document.getElementsByClassName('board-title');
    const boardLikes = document.getElementsByClassName('count-like');
    const boardComment = document.getElementsByClassName('count-comment');
    const boardView = document.getElementsByClassName('count-view');
    const boardCreatedAt = document.getElementsByClassName('created-at');
    const boardCreator = document.getElementsByClassName('creator');
    const boardCreatorImg = document.getElementsByClassName('creator-img');

    boards.forEach((board, index) => {
        boardA[index].href = `http://localhost:3000/board/${board.board_id}`;
        if (board.title.length > TITLE_MAX_LENGTH) board.title = board.title.substring(0, TITLE_MAX_LENGTH);
        boardTitles[index].innerHTML = board.title;
        boardLikes[index].innerHTML = `좋아요 ${formatCount(board.count.like)}`;
        boardComment[index].innerHTML = `댓글 ${formatCount(board.count.comment)}`;
        boardView[index].innerHTML = `조회수 ${formatCount(board.count.view)}`;
        boardCreatedAt[index].innerHTML = board.created_at;
        boardCreator[index].innerHTML = board.creator.nickname;
        boardCreatorImg[index].setAttribute('src', board.creator.avatar);
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
