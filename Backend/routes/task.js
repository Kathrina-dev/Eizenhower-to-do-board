import express from "express";
import prisma from "../prisma/prisma.js";

const router = express.Router();

router.route("/task")
  .get(async (req, res) => {
    try {
      const userID = parseInt(req.query.id);
      const allTasks = await prisma.task.findMany({
        where: { id: userID },
      });
      return res.json({
        msg: "Tasks found:",
        tasks: allTasks,
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  })

  .post(async (req, res) => {
    try {
      const userID = parseInt(req.query.id);
      const { task, isImportant, isUrgent } = req.body;

      if (isNaN(userID)) {
        return res.status(400).json({ error: "Missing or invalid user ID" });
        }

      const newTask = await prisma.task.create({
        data: {
          task,
          isImportant,
          isUrgent,
          user: {
            connect: { id: userID }, // ✅ Connects by relation
            },
        },
      });

      return res.status(201).json({
        msg: "New task created",
        taskID: newTask.taskID,
        task: newTask,
      });
    } catch (err) {
      console.error("Error creating task:", err);
      return res.status(500).json({ error: err.message });
    }
  })


    .delete(async (req, res) => {
        try {
            const taskID = parseInt(req.body.taskID);
            const deleteTask = await prisma.task.delete({
                where: {
                    taskID: taskID,
                }
            });
            return res.status(200).json({
                msg: "Task deleted successfully",
                task: deleteTask,
            });
        } catch (err) {
            return res.status(500).json({ error: err });
        }
    });

export const taskRoutes = router;
