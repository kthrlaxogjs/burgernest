const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes'); // 이 경로가 올바른지 확인하세요
const cors = require('cors');

dotenv.config();
const app = express();

// 미들웨어 설정
app.use(express.json());
app.use(cors());

// 라우트 설정
app.use('/api/auth', authRoutes);
console.log('Routes mounted at /api/auth');

app.get('/', (req, res) => {
  res.send('백엔드 서버가 실행 중입니다.');
});

// 서버 실행
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// MongoDB 연결
connectDB();
