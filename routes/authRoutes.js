const express = require('express');
const router = express.Router();
const { loginUser, registerUser } = require('../controllers/authController');

router.post('/login', loginUser);
router.post('/register', registerUser);  // registerUser 엔드포인트 추가

module.exports = router;
