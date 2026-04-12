import { Router } from "express";
import { getUsers, Adduser, editUser, delUser } from "#/controllers/controllers";

const router = Router();

router.get("/users", getUsers);
router.post("/users", Adduser);
router.put("/users/:id", editUser);
router.delete("/users/:id", delUser);

export default router;