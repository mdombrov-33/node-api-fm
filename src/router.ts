import { Router } from "express";
import { body, check, oneOf, validationResult } from "express-validator";
import { handleInputsErrors } from "./utils/middlewares";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getOneProduct,
} from "./handlers/product";
import {
  createUpdate,
  deleteUpdate,
  getAllUpdates,
  getOneUpdate,
  updateUpdate,
} from "./handlers/update";

const router = Router();

//* PRODUCT

//* Get all products
router.get("/product", getAllProducts);

//* Get one product
router.get("/product/:id", getOneProduct);

router.put(
  "/product/:id",
  body("name").isString(),
  handleInputsErrors,
  (req, res) => {}
);

//* Create a product
router.post(
  "/product",
  body("name").isString(),
  handleInputsErrors,
  createProduct
);

//* Delete a product
router.delete("/product/:id", deleteProduct);

//* UPDATE
router.get("/update", getAllUpdates);

router.get("/update/:id", getOneUpdate);

router.put(
  "/update/:id",
  body("title").optional(),
  body("body").optional(),

  //   check("status").isIn(Object.values(UPDATE_STATUS))
  oneOf(
    [
      check("status").equals("IN_PROGRESS"),
      check("status").equals("SHIPPED"),
      check("status").equals("DEPRECATED"),
    ],
    { message: "Invalid status. Must be IN_PROGRESS, SHIPPED, or DEPRECATED." }
  ),

  body("version").optional(),
  body("asset").optional(),
  updateUpdate
);

router.post(
  "/update",
  body("title").exists(),
  body("body").exists().isString(),
  body("productId").exists().isString(),
  createUpdate
);

router.delete("/update/:id", deleteUpdate);

//* UPDATE POINTS
router.get("/updatepoint", () => {});

router.get("/updatepoint/:id", () => {});

router.put(
  "/updatepoint/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  () => {}
);

router.post(
  "/updatepoint",
  body("name").isString(),
  body("description").isString(),
  body("updateId").exists().isString(),
  () => {}
);

router.delete("/updatepoint/:id", () => {});

export default router;
