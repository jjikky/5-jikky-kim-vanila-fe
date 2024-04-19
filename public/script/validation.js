const emailPattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

// 이메일 유효성 검증
function validateEmail(email) {
    if (email === '') return false;
    return emailPattern.test(email);
}

// 비밀번호 유효성 검증
function validatePassword(password) {
    if (password === '') return false;
    return passwordPattern.test(password);
}

// 닉네임 유효성 검증
function validateNickname(nickname) {
    // 띄어쓰기가 없는지 확인
    if (nickname.indexOf(' ') !== -1) return 'spaceError';
    // 길이가 10글자 이하인지 확인
    if (nickname.length > 10) return 'lengthError';
    return true;
}

// 닉네임 중복 검증 : 서버에서 처리
// async function isExistNickname(nickname) {
//     const response = await fetch('http://localhost:3000/data/users.json');
//     const userData = await response.json();

//     let findUser = userData.find((user) => user.nickname === nickname);
//     if (findUser === undefined) {
//         return false;
//     }
//     return true;
// }
