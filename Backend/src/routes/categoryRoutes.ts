import { Router } from "express";
import {
  createCategory,
  updateCategory,
  getAllCategories,
  deleteCategory,
} from "../controllers/categoryController";
import {
  createCategoryValidation,
  updateCategoryValidation,
  deleteCategoryValidation,
} from "../utils/validators/categoryValidators";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();

router.get("/all", verifyToken, getAllCategories);
router.post("/create", verifyToken, createCategoryValidation, createCategory);
router.put(
  "/:categoryId",
  verifyToken,
  updateCategoryValidation,
  updateCategory,
);
router.delete(
  "/:categoryId",
  verifyToken,
  deleteCategoryValidation,
  deleteCategory,
);

export default router;
