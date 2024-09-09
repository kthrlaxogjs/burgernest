const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
    console.log('Received request'); // 요청 수신 확인용 로그
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        console.error('Server error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

const registerUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // 사용자 존재 확인
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // 비밀번호 해싱
        const hashedPassword = await bcrypt.hash(password, 12);

        // 새 사용자 생성
        const newUser = new User({
            username,
            password: hashedPassword,
        });

        // 사용자 저장
        await newUser.save();

        // 성공 메시지 및 JWT 토큰 반환
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token });
    } catch (err) {
        console.error('Server error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { loginUser, registerUser };  // registerUser도 추가
