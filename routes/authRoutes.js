const express = require("express");
const router = express.Router();

// Giả lập người dùng
const users = [{ username: "admin", password: "123456" }];

// Hiển thị trang đăng nhập
router.get("/login", (req, res) => {
    res.render("login");
});

// Xử lý đăng nhập
router.post("/login", (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        req.session.user = user;
        return res.redirect("/");
    } else {
        return res.render("login", { error: "Sai tài khoản hoặc mật khẩu!" });
    }
});

// Đăng xuất
// routes/authRoutes.js
router.get("/logout", (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                console.log("Lỗi khi đăng xuất:", err);
                return res.redirect("/");
            }
            res.clearCookie("connect.sid"); // Xóa cookie session
            res.redirect("/login");
        });
    } else {
        res.redirect("/login");
    }
});

module.exports = router;
