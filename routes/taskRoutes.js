const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// Lấy danh sách công việc
router.get("/", async (req, res) => {
    const tasks = await Task.find();
    res.render("index", { tasks });
});

// Hiển thị form thêm công việc
router.get("/new", (req, res) => {
    res.render("create");
});

// Thêm công việc mới
router.post("/tasks", async (req, res) => {
    await Task.create({
        title: req.body.title,
        description: req.body.description
    });
    res.redirect("/");
});

// Cập nhật trạng thái công việc
// routes/taskRoutes.js
// Thêm route hiển thị form chỉnh sửa
router.get("/tasks/:id", async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        res.render("edit", { task });
    } catch (error) {
        res.redirect("/");
    }
});

// Cập nhật route PUT để xử lý dữ liệu
router.put("/tasks/:id", async (req, res) => {
    try {
        await Task.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            description: req.body.description,
            completed: req.body.completed === "on"
        });
        res.redirect("/");
    } catch (error) {
        res.redirect("/");
    }
});
// Xóa công việc
router.delete("/tasks/:id", async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.redirect("/");
});
// Middleware kiểm tra đăng nhập
function requireLogin(req, res, next) {
    if (!req.session.user) {
        return res.redirect("/login");
    }
    next();
}

// Lấy danh sách công việc (chỉ khi đã đăng nhập)
router.get("/", requireLogin, async (req, res) => {
    const tasks = await Task.find();
    res.render("index", { tasks });
});


module.exports = router;
