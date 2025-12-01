import { expenseModel } from "../models/expenseModel.js";
import mongoose from "mongoose";
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export const getAnalytics = async (req, res) => {
    try {
        const userId = req.user.id; // whatever you set in verifyToken

        // ----------- BASIC MATCH (NO DATE FILTERS FOR NOW) -----------
        const matchQuery = { userId: new mongoose.Types.ObjectId(userId) };

        // ----------- CATEGORY BREAKDOWN -----------
        const categoryBreakdown = await expenseModel.aggregate([
            { $match: matchQuery },
            { $group: { _id: "$category", total: { $sum: "$amount" } } },
            { $sort: { total: -1 } }
        ]);

        // ----------- MONTHLY TREND -----------
        const rawTrend = await expenseModel.aggregate([
            { $match: matchQuery },
            {
                $group: {
                    _id: {
                        month: { $month: "$date" },
                        year: { $year: "$date" }
                    },
                    total: { $sum: "$amount" }
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } }
        ]);

        const trend = rawTrend.map(item => ({
            month: `${MONTHS[item._id.month - 1]} ${item._id.year}`,
            total: item.total
        }));

        // ----------- TOTAL SPENT -----------
        const totalSpent = trend.reduce((sum, item) => sum + item.total, 0);

        // ----------- MONTHLY CHANGE & INSIGHT -----------
        let monthlyChange = null;
        let insight = "Tracking started — trends will appear once enough data is collected.";

        if (trend.length >= 2) {
            const last = trend[trend.length - 1].total;
            const prev = trend[trend.length - 2].total;

            monthlyChange = (((last - prev) / prev) * 100).toFixed(2);

            if (monthlyChange > 0) {
                insight = `🔺 You spent ${monthlyChange}% more than last month.`;
            } else if (monthlyChange < 0) {
                insight = `🟢 Great job! You spent ${Math.abs(monthlyChange)}% less than last month.`;
            } else {
                insight = "📊 Your spending is unchanged from last month.";
            }
        }

        // ----------- TOP CATEGORIES -----------
        const topCategories = categoryBreakdown.slice(0, 5);

        return res.status(200).json({
            summary: {
                totalSpent,
                monthlyChange,
                insight
            },
            charts: {
                trend,
                categoryBreakdown
            },
            topCategories
        });

    } catch (error) {
        console.error("Analytics Error:", error.message, error.stack);
        return res.status(500).json({
            msg: "Error generating analytics",
            error: error.message
        });
    }
};
