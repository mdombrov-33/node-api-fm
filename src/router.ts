import { Router } from "express";
import { body, check, oneOf, validationResult } from "express-validator";
import { handleInputsErrors } from "./utils/middlewares";
import { createProduct, getAllProducts } from "./handlers/product";

const router = Router();

//* PRODUCT
router.get("/product", getAllProducts);

router.get("/product/:id", () => {});

router.put(
  "/product/:id",
  body("name").isString(),
  handleInputsErrors,
  (req, res) => {}
);

router.post(
  "/product",
  body("name").isString(),
  handleInputsErrors,
  createProduct
);

router.delete("/product/:id", () => {});

//* UPDATE
router.get("/update", () => {});

router.get("/update/:id", () => {});

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
  () => {}
);

router.post(
  "/update",
  body("title").exists(),
  body("body").exists().isString(),
  () => {}
);

router.delete("/update/:id", () => {});

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
