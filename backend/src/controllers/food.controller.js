const foodModel = require("../models/food.model");
const storageService = require("../services/storage.service");
const { v4: uuid } = require("uuid");

async function createFood(req, res) {
    try {
        if (!req.file || !req.file.buffer) {
            return res.status(400).json({ message: "Video file is required" });
        }

        const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid());
        const foodItem = await foodModel.create({
            name: req.body.name,
            description: req.body.description,
            video: fileUploadResult.url,
            foodPartner: req.foodPartner._id
        })

        res.status(201).json({
            message: "food created successfully",
            food: foodItem,
        })
    } catch (error) {
        console.error("Error creating food:", error);
        res.status(500).json({ message: "Failed to create food post" });
    }
}
async function getFoodItems(req, res) {
    try {
        const foodItems = await foodModel.find({}).populate("foodPartner");
        res.status(200).json({
            message: "food items fetched successfully",
            foodItems,
        })
    } catch (error) {
        console.error("Error fetching food items:", error);
        res.status(500).json({ message: "Failed to fetch food items" });
    }
}

async function deleteFood(req, res) {
    try {
        const { id } = req.params;

        // Find the food item
        const foodItem = await foodModel.findById(id);

        if (!foodItem) {
            return res.status(404).json({ message: "Food item not found" });
        }

        // Verify the food partner owns this item
        if (!foodItem.foodPartner || foodItem.foodPartner.toString() !== req.foodPartner._id.toString()) {
            return res.status(403).json({ message: "You are not authorized to delete this item" });
        }

        await foodModel.findByIdAndDelete(id);

        res.status(200).json({ message: "Food item deleted successfully" });
    } catch (error) {
        console.error("Error deleting food item:", error);
        res.status(500).json({ message: "Failed to delete food item: " + error.message });
    }
}


module.exports = {
    createFood,
    getFoodItems,
    deleteFood
}