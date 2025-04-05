// 簡易版 Node.js + Express 後端
// 儲存於記憶體中（重啟會清空）

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

let posts = []; // 用來儲存發文資料

app.use(cors());
app.use(bodyParser.json());

// 取得所有貼文
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

// 發佈一篇貼文
app.post('/api/posts', (req, res) => {
  const { content } = req.body;
  if (!content || typeof content !== 'string') {
    return res.status(400).json({ error: '內容無效' });
  }
  const newPost = {
    id: Date.now(),
    content: content.trim()
  };
  posts.push(newPost);
  res.status(201).json(newPost);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
