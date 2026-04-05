import { Router } from "express";
import { validateCreateFinancialRecord } from "../utils/validate.js";
import { validate } from "../middlewares/validate.js";
import { protectAdmin, protectRoute } from "../middlewares/protect.js";
import { handleCreateFinancialRecord, handleDeleteFinancialRecord, handleEditFinancialRecord, handleGetUserAllFinancialRecords, handleGetUserFinancialRecord } from "../controllers/financialRecords.controller.js";
const router = Router();

router.post("/create",validateCreateFinancialRecord,validate,protectRoute,protectAdmin, handleCreateFinancialRecord);
router.delete("/delete/:id",protectRoute,protectAdmin,handleDeleteFinancialRecord);
router.patch("edit/:id",validateCreateFinancialRecord,validate,protectRoute,protectAdmin, handleEditFinancialRecord);
router.get("/get/:id/:userId",protectRoute, handleGetUserFinancialRecord);
router.get("/get/allrecords/:userId",protectRoute, handleGetUserAllFinancialRecords);
export default router;