import { useradd, userlogin, todoadd, todoget, tododelete, todoupdate } from "../Controller/Usercontroller.js";
import authMiddleware from "../connection/middleware.js";
import { Router } from "express";

const route = Router();

// Public routes for authentication
route.post("/register", useradd);
route.post("/login", userlogin);

// Protected routes for To-Do functionality
route.post("/todos", authMiddleware, todoadd);
route.get("/todos", authMiddleware, todoget);
route.put("/todos/:id", authMiddleware, todoupdate);
route.delete("/todos/:id", authMiddleware, tododelete);

export default route;