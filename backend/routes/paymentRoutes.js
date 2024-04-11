import express from "express";
const app = express();
import {
  checkout,
  paymentVerification,
} from "../Controllers/paymentController.js";
const router = express.Router();

router.route("/checkout").post(checkout);

router.route("/paymentverification").post(paymentVerification);

export default router;
