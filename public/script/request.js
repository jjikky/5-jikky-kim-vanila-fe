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
        return data.isExist;
    } catch (error) {
        console.log(error);
    }
}
async function isExistNickname(nickname) {
    try {
        const response = await fetch(`${SERVER_URL}/users/nickname/check?nickname=${nickname}`);
        const data = await response.json();
        return data.isExist;
    } catch (error) {
        console.log(error);
    }
}

// POST
async function getAllPost(page, limit) {
    try {
        const token = isTokenExist();
        const response = await fetch(`${SERVER_URL}/posts?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        if (data.message == 'Token Expired') {
            alert('Token Expired');
            return (location.href = 'http://localhost:3000/login');
        }
        return data;
    } catch (error) {
        console.log(error);
    }
}
async function getSinglePost(post_id) {
    try {
        const token = isTokenExist();
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
        const token = isTokenExist();
        const response = await fetch(`${SERVER_URL}/posts`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });
        for (let pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

// token 있는지 체크
function isTokenExist() {
    const token = localStorage.getItem('token');
    if (!token) return (location.href = 'http://localhost:3000/login');
    return token;
}

async function updatePost(post_id, formData) {
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
        return data;
    } catch (error) {
        console.log(error);
    }
}

async function deletePost(post_id) {
    try {
        const token = isTokenExist();
        const response = await fetch(`${SERVER_URL}/posts/${post_id}`, {
            method: 'DELETE',
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

async function crearteComment(post_id, comment) {
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
        return data;
    } catch (error) {
        console.log(error);
    }
}

async function updateComment(post_id, comment_id, comment) {
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
        return data;
    } catch (error) {
        console.log(error);
    }
}

async function deleteComment(post_id, comment_id) {
    try {
        const token = isTokenExist();
        const response = await fetch(`${SERVER_URL}/posts/${post_id}/comment/${comment_id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            method: 'DELETE',
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

async function changePassword(password) {
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

        return data;
    } catch (error) {
        console.log(error);
    }
}

async function updateUser(formData) {
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
        return data;
    } catch (error) {
        console.log(error);
    }
}

async function deleteUser() {
    try {
        const token = isTokenExist();
        const response = await fetch(`${SERVER_URL}/users`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            method: 'DELETE',
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}
