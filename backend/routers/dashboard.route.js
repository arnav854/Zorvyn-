import express from "express" 
import { handleGetCategoryWiseTotal, handleGetMonthlyTrends, handleGetRecentActivity, handleGetSummary, handleGetWeeklyTrends } from "../controllers/dashboard.controller.js"
import { protectAnalyst } from "../middlewares/protect"

const router = express.Router() 


router.get("/summary/:userId",protectAnalyst,handleGetSummary)
router.get("/category-wise-summary/:userId",protectAnalyst,handleGetCategoryWiseTotal)
router.get("/recent-activity/:userId",protectAnalyst,handleGetRecentActivity)
router.get("/monthly-trends/:userId",protectAnalyst,handleGetMonthlyTrends)
router.get("/weekly-trends/:userId",protectAnalyst,handleGetWeeklyTrends)

export default router

