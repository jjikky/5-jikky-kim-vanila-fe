const SERVER_URL = 'http://localhost:5000';

// USER
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
        });
        return await response.json();
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

// POST
const getAllPost = async (page, limit) => {
    try {
        const token = isTokenExist();
        const response = await fetch(`${SERVER_URL}/posts?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        if (isTokenExpired(data.message)) return (location.href = 'http://localhost:3000/login');
        return data;
    } catch (error) {
        console.log(error);
    }
};

const getSinglePost = async (post_id) => {
    try {
        const token = isTokenExist();
        const response = await fetch(`${SERVER_URL}/posts/${post_id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        if (isTokenExpired(data.message)) return (location.href = 'http://localhost:3000/login');
        return data;
    } catch (error) {
        console.log(error);
    }
};

const getSingleUser = async () => {
    try {
        const user_id = localStorage.getItem('user_id');
        const response = await fetch(`${SERVER_URL}/users/${user_id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

const createPost = async (formData) => {
    try {
        const token = isTokenExist();
        const response = await fetch(`${SERVER_URL}/posts`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

// token 있는지 체크
const isTokenExist = () => {
    const token = localStorage.getItem('token');
    if (!token) return (location.href = 'http://localhost:3000/login');
    return token;
};

// Token 만료 체크
const isTokenExpired = (message) => {
    if (message == 'Token Expired') {
        alert(`${message} : Please Login Again.`);
        return true;
    }
    return false;
};

const updatePost = async (post_id, formData) => {
    try {
        const token = isTokenExist();
        const response = await fetch(`${SERVER_URL}/posts/${post_id}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });
        const data = await response.json();
        // NOTE : reload 떄문에 token expire 처리, 해당 페이지에서
        return data;
    } catch (error) {
        console.log(error);
    }
};

const deletePost = async (post_id) => {
    try {
        const token = isTokenExist();
        const response = await fetch(`${SERVER_URL}/posts/${post_id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        // NOTE : reload 떄문에 token expire 처리, 해당 페이지에서
        return data;
    } catch (error) {
        console.log(error);
    }
};

const createComment = async (post_id, comment) => {
    try {
        const token = isTokenExist();
        const response = await fetch(`${SERVER_URL}/posts/${post_id}/comment`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({ comment }),
        });
        const data = await response.json();
        // NOTE : reload 떄문에 token expire 처리, 해당 페이지에서
        return data;
    } catch (error) {
        console.log(error);
    }
};

const updateComment = async (post_id, comment_id, comment) => {
    try {
        const token = isTokenExist();
        const response = await fetch(`${SERVER_URL}/posts/${post_id}/comment/${comment_id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            method: 'PATCH',
            body: JSON.stringify({ comment }),
        });
        const data = await response.json();
        // NOTE : reload 떄문에 token expire 처리, 해당 페이지에서
        return data;
    } catch (error) {
        console.log(error);
    }
};

const deleteComment = async (post_id, comment_id) => {
    try {
        const token = isTokenExist();
        const response = await fetch(`${SERVER_URL}/posts/${post_id}/comment/${comment_id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            method: 'DELETE',
        });
        const data = await response.json();
        // NOTE : reload 떄문에 token expire 처리, 해당 페이지에서
        return data;
    } catch (error) {
        console.log(error);
    }
};

const changePassword = async (password) => {
    try {
        const token = isTokenExist();
        const response = await fetch(`${SERVER_URL}/users/password/change`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            method: 'PATCH',
            body: JSON.stringify({ password }),
        });
        const data = await response.json();
        if (isTokenExpired(data.message)) return (location.href = 'http://localhost:3000/login');

        return data;
    } catch (error) {
        console.log(error);
    }
};

const updateUser = async (formData) => {
    try {
        const token = isTokenExist();
        const response = await fetch(`${SERVER_URL}/users`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            method: 'PATCH',
            body: formData,
        });
        const data = await response.json();
        if (isTokenExpired(data.message)) return (location.href = 'http://localhost:3000/login');
        return data;
    } catch (error) {
        console.log(error);
    }
};

const deleteUser = async () => {
    try {
        const token = isTokenExist();
        const response = await fetch(`${SERVER_URL}/users`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            method: 'DELETE',
        });
        const data = await response.json();
        // NOTE : reload 떄문에 token expire 처리, 해당 페이지에서
        return data;
    } catch (error) {
        console.log(error);
    }
};
