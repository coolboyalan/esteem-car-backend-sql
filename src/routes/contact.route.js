import express from "express";
import { get, create, update, deleteDoc } from "#controllers/contact";

const router = express.Router();

router.route("/:id?").get(get).post(create).put(update).delete(deleteDoc);

export default router;
