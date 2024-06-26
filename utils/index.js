import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const verifyToken = (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    return decoded;
}

export const isValidPassword = async (inputPassword, dbPassword) => {
    const isValid = await bcrypt.compare(inputPassword, dbPassword)
    // console.log('isvalid', isValid)
    return isValid;
}

export const createToken = (userId, username) => {
    const token = jwt.sign({id: userId, username: username}, process.env.JWT_SECRET, {expiresIn: '1h'})
    return token;
}