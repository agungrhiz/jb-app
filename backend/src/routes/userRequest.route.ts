import { UserRequestController } from "@/controller/userRequest.controller";
import { rbacMiddleware } from "@/middleware/rbac.middleware";
import { UserRequestService } from "@/services/userRequest.service";
import { Router } from "express";

const router: Router = Router();
const service = new UserRequestService();
const controller = new UserRequestController();

// public route
router.post("/", service.create);

router.use(rbacMiddleware(['ADMINISTRATOR']));
router.get("/",  service.getAll);
router.get("/:id", service.getById);
router.put("/:id", service.update);
router.delete("/:id", service.delete);
router.put("/:id/approval", controller.updateRequestStatus);








export const userRequestRouter: Router = router;
