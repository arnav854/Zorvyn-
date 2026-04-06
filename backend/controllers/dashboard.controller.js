import FinancialRecord from "../models/financialRecord.model.js";



export const handleGetSummary = async (req, res) => {
    try {
        const { userId } = req.params;
        if (userId !== req.user.id || (req.user.role !== "admin" && req.user.role !== "analyst")) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const summary = await FinancialRecord.aggregate([
            {
                $match: { userId: userId }
            },
            {
                $group: {
                    _id: null,
                    totalIncome: {
                        $sum: {
                            $cond: [
                                { $eq: ["$type", "income"] },
                                "$amount",
                                0
                            ]
                        }
                    },
                    totalExpense: {
                        $sum: {
                            $cond: [
                                { $eq: ["$type", "expense"] },
                                "$amount",
                                0
                            ]
                        }
                    }
                }
            }   
        ]);
        if (!summary) {
            return res.status(404).json({ message: "Summary not found" });
        }
        return res.status(200).json({
            totalIncome: summary[0].totalIncome,
            totalExpense: summary[0].totalExpense,
            totalBalance: summary[0].totalIncome - summary[0].totalExpense
        });
    } catch (error) {
        console.log("error in getSummary", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


import mongoose from "mongoose";

export const handleGetCategoryWiseTotal = async (req, res) => {
    try {
        const { userId } = req.params;

        if (userId !== req.user.id || (req.user.role !== "admin" && req.user.role !== "analyst")) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const summary = await FinancialRecord.aggregate([
            {
                $match: { userId: new mongoose.Types.ObjectId(userId) }
            },
            {
                $group: {
                    _id: "$category",
                    totalIncome: {
                        $sum: {
                            $cond: [
                                { $eq: ["$type", "income"] },
                                "$amount",
                                0
                            ]
                        }
                    },
                    totalExpense: {
                        $sum: {
                            $cond: [
                                { $eq: ["$type", "expense"] },
                                "$amount",
                                0
                            ]
                        }
                    }
                }
            },
            {
                $project: {
                    category: "$_id",
                    totalIncome: 1,
                    totalExpense: 1,
                    netBalance: { $subtract: ["$totalIncome", "$totalExpense"] },
                    _id: 0
                }
            }
        ]);

        if (!summary.length) {
            return res.status(404).json({ message: "No records found" });
        }

        return res.status(200).json({ summary });

    } catch (error) {
        console.log("error in getCategoryWiseSummary", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const handleGetRecentActivity = async (req, res) => {
    try {
        const { userId } = req.params;
        if (userId !== req.user.id || (req.user.role !== "admin" && req.user.role !== "analyst")) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const recentActivity = await FinancialRecord.find({ userId: userId }).sort({ date: -1 }).limit(10);
        if (!recentActivity) {
            return res.status(404).json({ message: "Recent activity not found" });
        }
        const records = recentActivity.map((record) => {
            return {
                id : record._id,
                amount : record.amount,
                type : record.type,
                category : record.category,
                date : record.date,
            }
        });
        return res.status(200).json(records);
    } catch (error) {
        console.log("error in getRecentActivity", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const handleGetMonthlyTrends = async (req, res) => {
    try {
        const { userId } = req.params;
        if (userId !== req.user.id || (req.user.role !== "admin" && req.user.role !== "analyst")) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const monthlyTrends = await FinancialRecord.aggregate([
            {
                $match: { userId: userId }
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$date" },
                        month: { $month: "$date" }
                    },
                    totalIncome: {
                        $sum: {
                            $cond: [
                                { $eq: ["$type", "income"] },
                                "$amount",
                                0
                            ]
                        }
                    },
                    totalExpense: {
                        $sum: {
                            $cond: [
                                { $eq: ["$type", "expense"] },
                                "$amount",
                                0
                            ]
                        }
                    }
                }
            },
            {
                $project: {
                    year: "$_id.year",
                    month: "$_id.month",
                    totalIncome: 1,
                    totalExpense: 1,
                    netBalance: { $subtract: ["$totalIncome", "$totalExpense"] },
                    _id: 0
                }
            }
        ]);
        if (!monthlyTrends.length) {
            return res.status(404).json({ message: "No records found" });
        }
        return res.status(200).json(monthlyTrends);
    } catch (error) {
        console.log("error in getMonthlyTrends", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const handleGetWeeklyTrends = async (req, res) => {
    try {
        const { userId } = req.params;
        if (userId !== req.user.id || req.user.role !== "admin") {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const weeklyTrends = await FinancialRecord.aggregate([
            {
                $match: { userId: userId }
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$date" },
                        week: { $week: "$date" }
                    },
                    totalIncome: {
                        $sum: {
                            $cond: [
                                { $eq: ["$type", "income"] },
                                "$amount",
                                0
                            ]
                        }
                    },
                    totalExpense: {
                        $sum: {
                            $cond: [
                                { $eq: ["$type", "expense"] },
                                "$amount",
                                0
                            ]
                        }
                    }
                }
            },
            {
                $project: {
                    year: "$_id.year",
                    week: "$_id.week",
                    totalIncome: 1,
                    totalExpense: 1,
                    netBalance: { $subtract: ["$totalIncome", "$totalExpense"] },
                    _id: 0
                }
            }
        ]);
        if (!weeklyTrends.length) {
            return res.status(404).json({ message: "No records found" });
        }
        return res.status(200).json(weeklyTrends);
    } catch (error) {
        console.log("error in getWeeklyTrends", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};