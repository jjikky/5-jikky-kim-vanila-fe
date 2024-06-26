const emailPattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

// 이메일 유효성 검증
const validateEmail = (email) => {
    if (email === '') return false;
    return emailPattern.test(email);
};

// 비밀번호 유효성 검증
const validatePassword = (password) => {
    if (password === '') return false;
    return passwordPattern.test(password);
};

// 닉네임 유효성 검증
const validateNickname = (nickname) => {
    // 띄어쓰기가 없는지 확인
    if (nickname.indexOf(' ') !== -1) return 'spaceError';
    // 길이가 10글자 이하인지 확인
    if (nickname.length > 10) return 'lengthError';
    return true;
};
