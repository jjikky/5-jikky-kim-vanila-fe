const toastMessage = document.getElementById('toast-message');

const goUploadBtn = document.getElementById('go-upload');

// 무한스크롤 데이터 로딩
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

// 무한스크롤 변수
let page = 1;
let limit = 5;
let isFetching = false;
let hasMore = true;
let timer = 0;

const windowScrollHandler = () => {
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
};

const fetchUserData = async () => {
    const response = await getSingleUser();
    user = response.user;
    insertHeaderAvatar(user.avatar);
};

// boadrList 생성하고 데이터 넣기
const insertData = async () => {
    isFetching = true;

    const response = await getAllPost(page, limit);
    console.log(response);
    const posts = response.posts;
    const postList = document.getElementsByClassName('post-list')[0];

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
    for (let i = 0; i < posts.length; i++) {
        const a = document.createElement('a');
        const div = document.createElement('div');
        const divMid = document.createElement('div');
        const divMidL = document.createElement('div');
        const divLike = document.createElement('div');
        const divComment = document.createElement('div');
        const divView = document.createElement('div');
        const div_created_at = document.createElement('div');
        const divLine = document.createElement('div');
        const divCreatorBox = document.createElement('div');
        const divAvatar = document.createElement('div');
        const divCreator = document.createElement('div');
        const divCreatorImg = document.createElement('img');

        a.className = 'post';
        div.className = 'post-title';
        divMid.className = 'post-mid';
        divMidL.className = 'post-mid-l';
        divLike.className = 'count-like';
        divComment.className = 'count-comment';
        divView.className = 'count-view';
        div_created_at.className = 'created-at';
        divCreatorBox.className = 'post-creator';
        divLine.className = 'line';
        divAvatar.className = 'avatar';
        divCreator.className = 'creator';
        divCreatorImg.className = 'creator-img';

        postList.appendChild(a);
        a.appendChild(div);
        a.appendChild(divMid);
        divMid.appendChild(divMidL);
        divMidL.appendChild(divLike);
        divMidL.appendChild(divComment);
        divMidL.appendChild(divView);
        divMid.appendChild(div_created_at);
        a.appendChild(divLine);
        a.appendChild(divCreatorBox);
        divCreatorBox.appendChild(divAvatar);
        divCreatorBox.appendChild(divCreator);
        divAvatar.appendChild(divCreatorImg);
    }

    const postA = document.getElementsByClassName('post');
    const postTitles = document.getElementsByClassName('post-title');
    const postLikes = document.getElementsByClassName('count-like');
    const postComment = document.getElementsByClassName('count-comment');
    const postView = document.getElementsByClassName('count-view');
    const postCreatedAt = document.getElementsByClassName('created-at');
    const postCreator = document.getElementsByClassName('creator');
    const postCreatorImg = document.getElementsByClassName('creator-img');

    // 데이터 넣기
    posts.forEach((post, index) => {
        let nowIndex = limit * (page - 1) + index;
        postA[nowIndex].href = `${CLIENT_URL}/post/${post.post_id}`;
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
};

window.addEventListener('scroll', windowScrollHandler);
goUploadBtn.addEventListener('mouseover', () => (goUploadBtn.style.backgroundColor = '#7F6AEE'));
goUploadBtn.addEventListener('mouseleave', () => (goUploadBtn.style.backgroundColor = '#ACA0EB'));
logoutBtn.addEventListener('click', () => logout());

fetchUserData();
insertData();
