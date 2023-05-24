import { RoleService } from "@/services/role.service";
import { Router } from "express";

const router: Router = Router();
const service = new RoleService();

router.get("/", service.getAll);
router.get("/:id", service.getById);
router.post("/", service.create);
router.put("/:id", service.update);
router.delete("/:id", service.delete);

export const roleRouter: Router = router;