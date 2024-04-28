// ['','post','1']
const post_id = window.location.pathname.split('/')[2];

// 댓글 등록
const comment_textarea = document.getElementById('comment');
const comment_btn = document.getElementById('comment-btn');

// floating menu
userNav = document.getElementById('user-nav');
profileBtn = document.getElementById('profile-btn');

const fetchUser = async () => {
    const response = await getSingleUser();
    user = response.user;
    insertHeaderAvatar(user.avatar);
    insertFormAvatar(user.avatar);
};

// 데이터 삽입
const insertData = async () => {
    const response = await getSinglePost(post_id);
    const user_id = response.user_id;
    const post = response.post;

    // 게시글 본문
    const postTitle = document.getElementById('post-title');
    const postImage = document.getElementById('post-image');
    const postComment = document.getElementById('count-comment');
    const postView = document.getElementById('count-view');
    const postCreatedAt = document.getElementById('post-created-at');
    const postCreator = document.getElementById('creator');
    const postCreatorImg = document.getElementById('avatar');
    const postContent = document.getElementById('post-content');

    // 게시글 댓글
    const commentsWrap = document.getElementById('comment-wrap');

    // user가 게시글 주인인지 검증 후 게시글 수정 삭제 버튼 * 모달 동적 생성
    if (post.creator.user_id === user_id) {
        const postHeader = document.getElementById('post-header');
        const delModalXBtn = document.querySelector('#del-x');
        const delModalOBtn = document.querySelector('#del-o');

        const postHeaderItem = document.createElement('div');
        const updateButton = document.createElement('button');
        const deleteButton = document.createElement('button');

        const clickUpdateBtn = () => (location.href = `${CLIENT_URL}/post/${post_id}/update`);
        const deletePostHandler = async () => {
            await deletePost(post_id);
            closeModal('#del-modal', '#overlay1');
            location.href = `${CLIENT_URL}/post`;
        };

        postHeaderItem.classList.add('post-header-item');

        updateButton.id = 'update-event-btn';
        deleteButton.id = 'del-modal-btn';

        updateButton.textContent = '수정';
        deleteButton.textContent = '삭제';

        postHeaderItem.appendChild(updateButton);
        postHeaderItem.appendChild(deleteButton);
        postHeader.appendChild(postHeaderItem);

        updateButton.addEventListener('click', clickUpdateBtn);
        deleteButton.addEventListener('click', () => openModal('#del-modal', '#overlay1'));
        delModalXBtn.addEventListener('click', () => closeModal('#del-modal', '#overlay1'));
        delModalOBtn.addEventListener('click', deletePostHandler);
    }

    //  25글자 까지만 보이게
    if (post.title.length > TITLE_MAX_LENGTH) post.title = post.title.substring(0, TITLE_MAX_LENGTH);

    postImage.setAttribute('src', post.post_image);
    postCreatorImg.setAttribute('src', post.creator.avatar);

    postTitle.innerHTML = post.title;
    postComment.innerHTML = formatCount(post.count.comment);
    postView.innerHTML = formatCount(post.count.view);
    postCreatedAt.innerHTML = post.created_at;
    postCreator.innerHTML = post.creator.nickname;
    postContent.innerHTML = post.content;

    // 댓글 삽입
    post.comments.forEach((comment) => {
        let comments = document.createElement('div');
        let commentBoxDiv = document.createElement('div');
        let commentItemDiv = document.createElement('div');
        let commentAvatarDiv = document.createElement('img');
        let commentCreatorDiv = document.createElement('div');
        let commentCreatedAtDiv = document.createElement('div');
        let commentContentDiv = document.createElement('div');

        comments.classList.add('comments');
        commentBoxDiv.classList.add('comment-box');
        commentItemDiv.classList.add('comment-item');
        commentAvatarDiv.classList.add('avatar');
        commentCreatorDiv.classList.add('creator', 'comment-creator');
        commentCreatedAtDiv.classList.add('date', 'comment-created-at');
        commentContentDiv.classList.add('comment-content');

        commentAvatarDiv.setAttribute('src', comment.creator.avatar);

        commentCreatorDiv.textContent = comment.creator.nickname;
        commentCreatedAtDiv.textContent = comment.created_at;
        commentContentDiv.textContent = comment.content;

        // 요소 관계 설정
        commentsWrap.appendChild(comments);
        comments.appendChild(commentBoxDiv);
        commentBoxDiv.appendChild(commentItemDiv);
        commentItemDiv.appendChild(commentAvatarDiv);
        commentItemDiv.appendChild(commentCreatorDiv);
        commentItemDiv.appendChild(commentCreatedAtDiv);
        commentItemDiv.appendChild(commentContentDiv);
        commentBoxDiv.appendChild(commentContentDiv);

        if (comment.creator.user_id === user_id) {
            let buttonDiv = document.createElement('div');
            let editButton = document.createElement('button');
            let deleteButton = document.createElement('button');

            buttonDiv.classList.add('comment-item');

            editButton.textContent = '수정';

            editButton.addEventListener('click', () => editCommentButtonClickHandler(comment));

            deleteButton.textContent = '삭제';
            deleteButton.classList.add = 'del-comment-modal-btn';
            deleteButton.addEventListener('click', () => deleteCommentButtonClickHandler(comment));

            comments.appendChild(buttonDiv);
            buttonDiv.appendChild(editButton);
            buttonDiv.appendChild(deleteButton);
        }
    });
};

// 댓글 등록 버튼 활성화 제어
const commentInputHandler = (event) => {
    let input_comment = event.target.value;
    if (input_comment !== '') {
        return activeButton('comment-btn');
    }
    disableButton('comment-btn');
};

// 댓글 등록 요청
const commentButtonClickHandler = async (event) => {
    event.preventDefault();
    let comment = comment_textarea.value;
    const response = await createComment(post_id, comment);
    console.log(response);
    location.href = CLIENT_URL + window.location.pathname;
};

// 댓글 삭제 확인 버튼 클릭 : 댓글 삭제
const deleteCommentHandler = async (comment) => {
    console.log(comment.comment_id);
    const response = await deleteComment(post_id, comment.comment_id);

    console.log(response);
    closeModal('#del-comment-modal', '#overlay2');
    location.href = CLIENT_URL + window.location.pathname;
};

// 댓글 삭제 버튼 클릭 : modal 출력
const deleteCommentButtonClickHandler = async (comment) => {
    let delCommentModalXBtn = document.querySelector('#del-comment-x');
    let delCommentModalOBtn = document.querySelector('#del-comment-o');
    delCommentModalXBtn.addEventListener('click', () => closeModal('#del-comment-modal', '#overlay2'));
    delCommentModalOBtn.addEventListener('click', () => deleteCommentHandler(comment));
    openModal('#del-comment-modal', '#overlay2');
};

const editCommentHandler = async (comment, event) => {
    event.preventDefault();
    let content = comment_textarea.value;
    const response = await updateComment(post_id, comment.comment_id, content);
    console.log(response);
    closeModal('#del-comment-modal', '#overlay2');
    location.href = CLIENT_URL + window.location.pathname;
};

// 댓글 수정 버튼 클릭
const editCommentButtonClickHandler = async (comment) => {
    comment_textarea.value = comment.content;
    comment_btn.innerHTML = '댓글 수정';

    activeButton('comment-btn');
    comment_btn.removeEventListener('click', commentButtonClickHandler);
    comment_btn.addEventListener('click', (event) => editCommentHandler(comment, event));
};

comment_textarea.addEventListener('input', commentInputHandler);
comment_btn.addEventListener('click', commentButtonClickHandler);
fetchUser();
insertData();
