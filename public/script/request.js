const SERVER_URL = 'http://localhost:5000';
const CLIENT_URL = 'http://localhost:3000';

//  #############  AUTH  ###############
const authHandler = (status) => {
    if (status === 401) {
        alert('Session Expired. Please Login Again');
        location.href = `${CLIENT_URL}/login`;
    }
};

const autoLogin = async () => {
    try {
        const response = await fetch(`${SERVER_URL}/users/login/auto`, {
            credentials: 'include',
        });
        console.log(response);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};

//  ############# USER  ###############
const register = async (formData) => {
    try {
        const response = await fetch(`${SERVER_URL}/users/register`, {
            method: 'POST',
            body: formData,
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

const login = async (email, password) => {
    try {
        const response = await fetch(`${SERVER_URL}/users/login`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({ email, password }),
            credentials: 'include',
        });
        console.log(response);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};

const logout = async () => {
    try {
        const response = await fetch(`${SERVER_URL}/users/logout`, { credentials: 'include' });
        const data = await response.json();
        if (data.message == 'logout success') window.location.href = `${CLIENT_URL}/login`;
    } catch (error) {
        console.log(error);
    }
};

const isExistEmail = async (email) => {
    try {
        const response = await fetch(`${SERVER_URL}/users/email/check?email=${email}`);
        const data = await response.json();
        return data.isExist;
    } catch (error) {
        console.log(error);
    }
};

const isExistNickname = async (nickname) => {
    try {
        const response = await fetch(`${SERVER_URL}/users/nickname/check?nickname=${nickname}`);
        const data = await response.json();
        return data.isExist;
    } catch (error) {
        console.log(error);
    }
};

//  ############# POST  ###############
const getAllPost = async (page, limit) => {
    try {
        const response = await fetch(`${SERVER_URL}/posts?page=${page}&limit=${limit}`, {
            method: 'GET',
            credentials: 'include',
        });
        authHandler(response.status);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
};

const getSinglePost = async (post_id) => {
    try {
        const response = await fetch(`${SERVER_URL}/posts/${post_id}`, {
            method: 'GET',
            credentials: 'include',
        });
        authHandler(response.status);
        const data = await response.json();
        if (data.message == 'page not found') {
            alert('잘못된 접근입니다. 해당 페이지는 존재 하지 않습니다.');
            return (location.href = `${CLIENT_URL}/post`);
        }
        return data;
    } catch (error) {
        console.log(error);
    }
};

const getSingleUser = async () => {
    try {
        const response = await fetch(`${SERVER_URL}/users/change`, { credentials: 'include' });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

const createPost = async (formData) => {
    try {
        const response = await fetch(`${SERVER_URL}/posts`, {
            method: 'POST',
            credentials: 'include',
            body: formData,
        });
        authHandler(response.status);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

const updatePost = async (post_id, formData) => {
    try {
        const response = await fetch(`${SERVER_URL}/posts/${post_id}`, {
            method: 'PATCH',
            credentials: 'include',
            body: formData,
        });
        authHandler(response.status);
        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);
    }
};

const deletePost = async (post_id) => {
    try {
        const response = await fetch(`${SERVER_URL}/posts/${post_id}`, {
            method: 'DELETE',
            credentials: 'include',
        });
        authHandler(response.status);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

const createComment = async (post_id, comment) => {
    try {
        const response = await fetch(`${SERVER_URL}/posts/${post_id}/comment`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({ comment }),
            credentials: 'include',
        });
        authHandler(response.status);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

const updateComment = async (post_id, comment_id, comment) => {
    try {
        const response = await fetch(`${SERVER_URL}/posts/${post_id}/comment/${comment_id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'PATCH',
            credentials: 'include',
            body: JSON.stringify({ comment }),
        });
        authHandler(response.status);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

const deleteComment = async (post_id, comment_id) => {
    try {
        const response = await fetch(`${SERVER_URL}/posts/${post_id}/comment/${comment_id}`, {
            credentials: 'include',
            method: 'DELETE',
        });
        authHandler(response.status);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

const changePassword = async (password) => {
    try {
        const response = await fetch(`${SERVER_URL}/users/password/change`, {
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            method: 'PATCH',
            body: JSON.stringify({ password }),
        });
        authHandler(response.status);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

const updateUser = async (formData) => {
    try {
        const response = await fetch(`${SERVER_URL}/users`, {
            credentials: 'include',
            method: 'PATCH',
            body: formData,
        });
        authHandler(response.status);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

const deleteUser = async () => {
    try {
        const response = await fetch(`${SERVER_URL}/users`, {
            credentials: 'include',
            method: 'DELETE',
        });
        authHandler(response.status);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};
