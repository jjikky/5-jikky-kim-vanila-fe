const SERVER_URL = 'http://localhost:5000';

// USER
async function register(formData) {
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
}

async function login(email, password) {
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
}

async function isExistEmail(email) {
    try {
        const response = await fetch(`${SERVER_URL}/users/email/check?email=${email}`);
        const data = await response.json();
        console.log(data.isExist);
        return data.isExist;
    } catch (error) {
        console.log(error);
    }
}
async function isExistNickname(nickname) {
    try {
        const response = await fetch(`${SERVER_URL}/users/nickname/check?nickname=${nickname}`);
        const data = await response.json();
        console.log(data.isExist);
        return data.isExist;
    } catch (error) {
        console.log(error);
    }
}

// POST
async function getAllPost(page, limit) {
    try {
        const token = localStorage.getItem('token');
        if (!token) return (location.href = 'http://localhost:3000/login');
        const response = await fetch(`${SERVER_URL}/posts?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}
async function getSinglePost(post_id) {
    try {
        const token = localStorage.getItem('token');
        if (!token) return (location.href = 'http://localhost:3000/login');
        const response = await fetch(`${SERVER_URL}/posts/${post_id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

async function getSingleUser() {
    try {
        const user_id = localStorage.getItem('user_id');
        const response = await fetch(`${SERVER_URL}/users/${user_id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

async function createPost(formData) {
    try {
        const token = localStorage.getItem('token');
        if (!token) return (location.href = 'http://localhost:3000/login');
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
}
