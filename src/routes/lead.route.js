import express from "express";
import authorization from "#middlewares/auth";
import { get, create, update, deleteDoc } from "#controllers/lead";

const router = express.Router();

router.route("/:id?").get(get).post(create).put(update).delete(deleteDoc);

export default router;
