// ['','post','1']
const post_id = window.location.pathname.split('/')[2];
const user_id = localStorage.getItem('user_id') * 1;

async function fetchUser() {
    const response = await getSingleUser();
    user = response.user;
    insertHeaderAvatar(user.avatar);
    insertFormAvatar(user.avatar);
}
fetchUser();

// 데이터 삽입
async function insertData() {
    const response = await getSinglePost(post_id);
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

    // 게시글 수정 삭제 버튼 검증 후 동적 생성
    if (post.creator.user_id === user_id) {
        const postHeader = document.getElementById('post-header');
        const postHeaderItem = document.createElement('div');
        postHeaderItem.classList.add('post-header-item');

        const updateButton = document.createElement('button');
        updateButton.id = 'update-event-btn';
        updateButton.textContent = '수정';

        const deleteButton = document.createElement('button');
        deleteButton.id = 'del-modal-btn';
        deleteButton.textContent = '삭제';

        postHeaderItem.appendChild(updateButton);
        postHeaderItem.appendChild(deleteButton);

        postHeader.appendChild(postHeaderItem);

        // 게시글 수정 삭제 event
        updateButton.addEventListener('click', () => {
            window.location.href = `http://localhost:3000/post/${post_id}/update`;
        });

        // 게시글 삭제 모달
        deleteButton.addEventListener('click', () => openModal('#del-modal', '#overlay1'));

        const delModalXBtn = document.querySelector('#del-x');
        delModalXBtn.addEventListener('click', () => closeModal('#del-modal', '#overlay1'));
        const delModalOBtn = document.querySelector('#del-o');
        delModalOBtn.addEventListener('click', async () => {
            await deletePost(post_id);
            closeModal('#del-modal', '#overlay1');
            return (location.href = 'http://localhost:3000/post');
        });
    }

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

        // 요소 관계 설정
        commentsWrap.appendChild(comments);

        comments.appendChild(commentBoxDiv);
        commentBoxDiv.appendChild(commentItemDiv);
        commentItemDiv.appendChild(commentAvatarDiv);
        commentItemDiv.appendChild(commentCreatorDiv);
        commentItemDiv.appendChild(commentCreatedAtDiv);
        commentItemDiv.appendChild(commentContentDiv);
        commentBoxDiv.appendChild(commentContentDiv);

        // TODO : api 서버 구현 후 update, delete 요청

        if (comment.creator.user_id === user_id) {
            let buttonDiv = document.createElement('div');
            buttonDiv.classList.add('comment-item');
            let editButton = document.createElement('button');
            editButton.textContent = '수정';
            // 댓글 수정 클릭시
            // 텍스트 입력 창에 기존 텍스트 내용이 보여지고, 댓글 등록 버튼이 댓글 수정 버튼으로 바뀜
            // 댓글 수정 할 시, 수정 버튼 누른 댓글 내용 변경 되고, 댓글 등록창 원상 복구
            // editButton.addEventListener('click', async() => {
            //     // 수정할 값도
            //     const response = await updateComment(comment.comment_id);
            //     console.log(response);
            //     closeModal('#del-comment-modal', '#overlay2');
            //     location.reload();
            // });

            let deleteButton = document.createElement('button');
            deleteButton.textContent = '삭제';
            deleteButton.classList.add = 'del-comment-modal-btn';
            deleteButton.addEventListener('click', () => {
                let delCommentModalXBtn = document.querySelector('#del-comment-x');
                let delCommentModalOBtn = document.querySelector('#del-comment-o');
                delCommentModalXBtn.addEventListener('click', () => closeModal('#del-comment-modal', '#overlay2'));
                openModal('#del-comment-modal', '#overlay2');
                delCommentModalOBtn.addEventListener('click', async () => {
                    const response = await deleteComment(post_id, comment.comment_id);
                    console.log(response);
                    closeModal('#del-comment-modal', '#overlay2');
                    location.reload();
                });
            });

            comments.appendChild(buttonDiv);
            buttonDiv.appendChild(editButton);
            buttonDiv.appendChild(deleteButton);
        }
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

comment_btn.addEventListener('click', async (event) => {
    event.preventDefault();
    let comment = comment_textarea.value;
    const response = await crearteComment(post_id, comment);
    console.log(response);
    location.reload();
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
