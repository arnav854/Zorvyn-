import FinancialRecord from "../models/financialRecord.model.js";


export const handleCreateFinancialRecord = async (req, res) => {
    try {
        const { amount, type, category , userId  } = req.body;
        const now = new Date();
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const financialRecord = new FinancialRecord({
            userId ,
            amount,
            type,
            category,
            date : now,

        });
        if (description) {
            financialRecord.description = description;
        }
        await financialRecord.save();
        return res.status(201).json({ message: "Financial record created successfully" });
    } catch (error) {
        console.log(" error in createFinancialRecord ", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getFinancialRecords = async (req, res) => {
    try {
        const financialRecords = await FinancialRecord.find({ userId: req.user.id }).sort({ date: -1 });
        return res.status(200).json(financialRecords);
    } catch (error) {
        console.log(" error in getFinancialRecords ", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
export const handleDeleteFinancialRecord = async (req, res) => {
    try {
        const { id } = req.params;

        const financialRecord = await FinancialRecord.findByIdAndDelete(id);

        if (!financialRecord) {
            return res.status(404).json({ message: "Financial record not found" });
        }

        return res.status(200).json({ message: "Financial record deleted successfully" });

    } catch (error) {
        console.log("error in deleteFinancialRecord", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const handleEditFinancialRecord = async (req, res) => {
    try {
        const { id } = req.params;
        const { amount, type, category, description } = req.body;
        const financialRecord = await FinancialRecord.findByIdAndUpdate(id, { amount, type, category, description }, { new: true });
        if (!financialRecord) {
            return res.status(404).json({ message: "Financial record not found" });
        }
        return res.status(200).json({ message: "Financial record updated successfully" });
    } catch (error) {
        console.log("error in editFinancialRecord", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const handleGetUserFinancialRecord = async (req, res) => {
    try {
        const { id , userId } = req.params;
        const financialRecord = await FinancialRecord.findById(id);
        if (!financialRecord) {
            return res.status(404).json({ message: "Financial record not found" });
        }
        if (financialRecord.userId !== userId || req.user.role !== "admin") {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const record = {
            id : financialRecord._id,
            amount : financialRecord.amount,
            type : financialRecord.type,
            category : financialRecord.category,
            description : financialRecord.description,
            date : financialRecord.date,
            userId : financialRecord.userId,
        }
        return res.status(200).json(record);
    } catch (error) {
        console.log("error in getFinancialRecord", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const handleGetUserAllFinancialRecords = async (req, res) => {
    try {
        const { userId } = req.params;
        if (userId !== req.user.id || req.user.role !== "admin") {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const financialRecords = await FinancialRecord.find({ userId: userId }).sort({ date: -1 });
        if (!financialRecords) {
            return res.status(404).json({ message: "Financial records not found" });
        }
        const records = financialRecords.map((record) => {
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
        console.log("error in getUserAllFinancialRecords", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
