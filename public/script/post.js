const toastMessage = document.getElementById('toast-message');

// 무한스크롤 변수
let page = 1;
let limit = 5;
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
            loading.end();
        }, 500);
    }
});

async function fetchUserData() {
    const response = await getSingleUser();
    user = response.user;
    insertHeaderAvatar(user.avatar);
}
fetchUserData();

// boadrList 생성하고 데이터 넣기
async function insertData() {
    isFetching = true;

    const response = await getAllPost(page, limit);
    const posts = response.posts;

    isFetching = false;

    // 더이상 가져올 데이터 없음
    if (posts.length === 0) {
        hasMore = false;
        // toast로 안내
        toastMessage.innerHTML = '더 이상 불러올 게시물이 없습니다.';
        toastMessage.classList.add('active');
        setTimeout(function () {
            toastMessage.classList.remove('active');
        }, 1000);
        return;
    }

    // 더미데이터 이용, post list layout 동적 생성
    const postList = document.getElementsByClassName('post-list')[0];
    for (let i = 0; i < posts.length; i++) {
        const a = document.createElement('a');
        a.className = 'post';
        postList.appendChild(a);

        const div = document.createElement('div');
        div.className = 'post-title';
        a.appendChild(div);

        // post-mid
        const divMid = document.createElement('div');
        divMid.className = 'post-mid';
        a.appendChild(divMid);

        const divMidL = document.createElement('div');
        divMidL.className = 'post-mid-l';
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

        // post-creator
        const divCreatorBox = document.createElement('div');
        divCreatorBox.className = 'post-creator';
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
    const postA = document.getElementsByClassName('post');
    const postTitles = document.getElementsByClassName('post-title');
    const postLikes = document.getElementsByClassName('count-like');
    const postComment = document.getElementsByClassName('count-comment');
    const postView = document.getElementsByClassName('count-view');
    const postCreatedAt = document.getElementsByClassName('created-at');
    const postCreator = document.getElementsByClassName('creator');
    const postCreatorImg = document.getElementsByClassName('creator-img');

    posts.forEach((post, index) => {
        let nowIndex = limit * (page - 1) + index;
        postA[nowIndex].href = `http://localhost:3000/post/${post.post_id}`;
        if (post.title.length > TITLE_MAX_LENGTH) post.title = post.title.substring(0, TITLE_MAX_LENGTH);
        postTitles[nowIndex].innerHTML = post.title;
        postLikes[nowIndex].innerHTML = `좋아요 ${formatCount(post.count.like)}`;
        postComment[nowIndex].innerHTML = `댓글 ${formatCount(post.count.comment)}`;
        postView[nowIndex].innerHTML = `조회수 ${formatCount(post.count.view)}`;
        postCreatedAt[nowIndex].innerHTML = post.created_at;
        postCreator[nowIndex].innerHTML = post.creator.nickname;
        postCreatorImg[nowIndex].setAttribute('src', post.creator.avatar);
    });

    page++;
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

const logoutBtn = document.getElementById('logout-btn');
logoutBtn.addEventListener('click', () => {
    logout();
});
