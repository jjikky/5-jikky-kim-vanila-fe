// ['','post','1']
const post_id = window.location.pathname.split('/')[2];

// 데이터 삽입
async function insertData() {
    const posts = await getPostList();
    const post = posts.find((post) => post.post_id == post_id);

    // 게시글 본문
    const postTitle = document.getElementById('post-title');
    const postImage = document.getElementById('post-image');
    const postComment = document.getElementById('count-comment');
    const postView = document.getElementById('count-view');
    const postCreatedAt = document.getElementById('post-created-at');
    const postCreator = document.getElementById('creator');
    const postCreatorImg = document.getElementById('avatar');
    const postContent = document.getElementById('post-content');

    //  25글자 까지만 보이게
    if (post.title.length > TITLE_MAX_LENGTH) post.title = post.title.substring(0, TITLE_MAX_LENGTH);
    postTitle.innerHTML = post.title;
    postImage.setAttribute('src', post.post_image);
    postComment.innerHTML = formatCount(post.count.comment);
    postView.innerHTML = formatCount(post.count.view);
    postCreatedAt.innerHTML = post.created_at;
    postCreator.innerHTML = post.creator.nickname;
    postCreatorImg.setAttribute('src', post.creator.avatar);
    postContent.innerHTML = post.content;

    // 댓글 생성
    let commentsWrap = document.getElementById('comment-wrap');
    post.comments.forEach((comment) => {
        let comments = document.createElement('div');
        comments.classList.add('comments');

        let commentBoxDiv = document.createElement('div');
        commentBoxDiv.classList.add('comment-box');

        let commentItemDiv = document.createElement('div');
        commentItemDiv.classList.add('comment-item');

        let commentAvatarDiv = document.createElement('img');
        commentAvatarDiv.setAttribute('src', comment.creator.avatar);
        commentAvatarDiv.classList.add('avatar');

        let commentCreatorDiv = document.createElement('div');
        commentCreatorDiv.classList.add('creator', 'comment-creator');
        commentCreatorDiv.textContent = comment.creator.nickname;

        let commentCreatedAtDiv = document.createElement('div');
        commentCreatedAtDiv.classList.add('date', 'comment-created-at');
        commentCreatedAtDiv.textContent = comment.created_at;

        let commentContentDiv = document.createElement('div');
        commentContentDiv.classList.add('comment-content');
        commentContentDiv.textContent = comment.content;

        // TODO : 댓글 수정, 삭제 - 댓글 creator id가 login user id와 같을 때만 보이게
        // TODO : api 서버 구현 후 update, delete 요청
        let buttonDiv = document.createElement('div');
        buttonDiv.classList.add('comment-item');

        let editButton = document.createElement('button');
        editButton.textContent = '수정';

        let deleteButton = document.createElement('button');
        deleteButton.textContent = '삭제';
        deleteButton.classList.add = 'del-comment-modal-btn';
        deleteButton.addEventListener('click', () => openModal('#del-comment-modal', '#overlay2'));
        let delCommentModalXBtn = document.querySelector('#del-comment-x');
        let delCommentModalOBtn = document.querySelector('#del-comment-o');
        delCommentModalXBtn.addEventListener('click', () => closeModal('#del-comment-modal', '#overlay2'));
        delCommentModalOBtn.addEventListener('click', () => {
            // TODO : api 서버 구현 후 delete 요청
            closeModal('#del-comment-modal', '#overlay2');
        });

        // 요소 관계 설정
        commentsWrap.appendChild(comments);

        comments.appendChild(commentBoxDiv);
        commentBoxDiv.appendChild(commentItemDiv);
        commentItemDiv.appendChild(commentAvatarDiv);
        commentItemDiv.appendChild(commentCreatorDiv);
        commentItemDiv.appendChild(commentCreatedAtDiv);
        commentItemDiv.appendChild(commentContentDiv);
        commentBoxDiv.appendChild(commentContentDiv);

        comments.appendChild(buttonDiv);
        buttonDiv.appendChild(editButton);
        buttonDiv.appendChild(deleteButton);
    });
}
insertData();

// 댓글 등록 버튼 활성화 제어
const comment_textarea = document.getElementById('comment');
const comment_btn = document.getElementById('comment-btn');
comment_textarea.addEventListener('input', (event) => {
    let input_comment = event.target.value;
    if (input_comment === '') {
        return (comment_btn.style.backgroundColor = '#ACA0EB');
    }
    comment_btn.style.backgroundColor = '#7F6AEE';
});

const updateBtn = document.getElementById('update-event-btn');

updateBtn.addEventListener('click', () => {
    window.location.href = `http://localhost:3000/post/${post_id}/update`;
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
