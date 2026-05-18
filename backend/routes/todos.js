import express from "express";
import Todo from "../models/Todo.js";
import protect from "../middleware/auth.js";

const router = express.Router();
router.use(protect);

router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(todos);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", async (req, res) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ message: "Title is required" });
  try {
    const todo = await Todo.create({ user: req.user.id, title, description });
    res.status(201).json(todo);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    if (todo.user.toString() !== req.user.id)
      return res.status(401).json({ message: "Not authorized" });
    res.json(
      await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true }),
    );
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    if (todo.user.toString() !== req.user.id)
      return res.status(401).json({ message: "Not authorized" });
    await todo.deleteOne();
    res.json({ message: "Todo deleted" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
