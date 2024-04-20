const SERVER_URL = 'http://localhost:5000';

// USER
async function register(formData) {
    try {
        const response = await fetch(`${SERVER_URL}/users/register`, {
            method: 'POST',
            body: formData,
        });
        const postData = await response.json();
        return postData;
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
        const postData = await response.json();
        console.log(postData.isExist);
        return postData.isExist;
    } catch (error) {
        console.log(error);
    }
}
async function isExistNickname(nickname) {
    try {
        const response = await fetch(`${SERVER_URL}/users/nickname/check?nickname=${nickname}`);
        const postData = await response.json();
        console.log(postData.isExist);
        return postData.isExist;
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
        const postData = await response.json();
        return postData;
    } catch (error) {
        console.log(error);
    }
}
