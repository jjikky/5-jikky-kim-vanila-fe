const toastMessage = document.getElementById('toast-message');

// 무한스크롤 변수
let currentPage = 1;
let numOfData = 5;
let isFetching = false;
let hasMore = true;
let timer = 0;
window.addEventListener('scroll', () => {
    if (isFetching || !hasMore) return;

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight + 10) {
        // 디바운싱
        clearTimeout(timer);

        loading.start();
        // NOTE : 애니매이션 보여주려고 1초 지연 결어 놓음. 필요시 삭제
        timer = setTimeout(() => {
            insertData();
            console.log('insert');
            loading.end();
        }, 500);
    }
});

// boadrList 생성하고 데이터 넣기
async function insertData() {
    isFetching = true;

    const response = await getBoardList();
    const boards = response.slice(numOfData * (currentPage - 1), numOfData * currentPage);

    isFetching = false;

    // 더이상 가져올 데이터 없음
    if (boards.length === 0) {
        hasMore = false;
        // toast로 안내
        toastMessage.innerHTML = '더 이상 불러올 게시물이 없습니다.';
        toastMessage.classList.add('active');
        setTimeout(function () {
            toastMessage.classList.remove('active');
        }, 1000);
        return;
    }

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
        let nowIndex = numOfData * (currentPage - 1) + index;
        boardA[nowIndex].href = `http://localhost:3000/board/${board.board_id}`;
        if (board.title.length > TITLE_MAX_LENGTH) board.title = board.title.substring(0, TITLE_MAX_LENGTH);
        boardTitles[nowIndex].innerHTML = board.title;
        boardLikes[nowIndex].innerHTML = `좋아요 ${formatCount(board.count.like)}`;
        boardComment[nowIndex].innerHTML = `댓글 ${formatCount(board.count.comment)}`;
        boardView[nowIndex].innerHTML = `조회수 ${formatCount(board.count.view)}`;
        boardCreatedAt[nowIndex].innerHTML = board.created_at;
        boardCreator[nowIndex].innerHTML = board.creator.nickname;
        boardCreatorImg[nowIndex].setAttribute('src', board.creator.avatar);
    });

    currentPage++;
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

const loading = {
    start: () => {
        // @로딩 시작
        const loading = document.querySelector('#loading');
        loading.style.display = 'block';
    },
    end: () => {
        // @로딩 종료
        const loading = document.querySelector('#loading');
        loading.style.display = 'none';
    },
};
