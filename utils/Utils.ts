const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const appSecret = "2fs7ej7fjafekawfhef92h2389fh239hf"

const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

const comparePassword = async (password: string, hashedPassword: string) => {
    return await bcrypt.compare(password, hashedPassword);
}

const generateToken = (data: any, expireDay: number) => {
    return jwt.sign(data, appSecret, {
        expiresIn: `${expireDay}d`,
        algorithm: 'HS256'
    })
}

const verifyToken = (token: string) => {
    try {
        jwt.verify(token, appSecret)
        return true;
    } catch (error) {
        return false;
    }
}

const decodeToken = (token: string) => {
    return jwt.decode(token, appSecret)
}

const maxAge = (day: number) => {
    return Date.now() + day * 24 * 60 * 60 * 1000
}

export {
    hashPassword,
    comparePassword,
    generateToken,
    verifyToken,
    decodeToken,
    maxAge
}