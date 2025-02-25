import express from "express";
import { get, create, update, deleteDoc, login } from "#controllers/admin";

const router = express.Router();

router.route("/login").post(login);
router.route("/:id?").get(get).post(create).put(update).delete(deleteDoc);

export default router;
