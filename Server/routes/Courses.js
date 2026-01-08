import { Router } from "express";
import { userMiddleware } from "../middleware/User.js";
import { courseModel, purchaseModel } from "../db.js";
import cloudinary from "cloudinary";
import { creatorMiddleware } from "../middleware/creator.js";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

import {
  StandardCheckoutClient,
  Env,
  CreateSdkOrderRequest,
} from "pg-sdk-node";
import Razorpay from "razorpay";

const clientId = process.env.PHONEPE_CLIENT_ID;
const clientSecret = process.env.PHONEPE_CLIENT_SECRET;
const clientVersion = parseInt(process.env.PHONEPE_CLIENT_VERSION, 10);

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

if (!clientId || !clientSecret || !clientVersion) {
  throw new Error(
    "PhonePe credentials are not set in the environment variables. Please check your .env file."
  );
}

const env = Env.SANDBOX;

const client = StandardCheckoutClient.getInstance(
  clientId,
  clientSecret,
  clientVersion,
  env
);

export const courseRouter = Router();

const Cloudinary = cloudinary.v2;

Cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

courseRouter.post("/purchase/status", userMiddleware, async (req, res) => {
  const userId = req.userId;
  const courseId = req.body.courseId;

  try {
    const isPurchased = await purchaseModel.exists({
      courseId,
      userId,
    });
    if (isPurchased) {
      return res.json({
        message: "course already purchased",
      });
    }
    const course = await courseModel.findOne({
      _id: courseId,
    });

    if (!course) {
      return res.status(404).json({
        message: "course not found",
      });
    }

    const merchantOrderId = userId + "_" + courseId;
    const orderStatus = await client.getOrderStatus(merchantOrderId);
    if (orderStatus.state === "COMPLETED") {
      await purchaseModel.create({
        userId,
        courseId,
      });
    }
    res.status(200).json({
      orderStatus,
    });
  } catch (error) {
    console.error(error);
  }
});

courseRouter.post("/create-order", userMiddleware, async (req, res) => {
  const userId = req.userId;
  const courseId = req.body.courseId;
  try {
    const isPurchased = await purchaseModel.exists({
      courseId,
      userId,
    });
    if (isPurchased) {
      return res.json({
        message: "course already purchased",
      });
    }

    const course = await courseModel.findOne({
      _id: courseId,
    });

    if (!course) {
      return res.status(404).json({
        message: "course not found",
      });
    }
    if (course.price == null || typeof course.price !== "number") {
      console.error(
        "Error in /purchase route: Course price is missing or not a number for courseId:",
        courseId
      );
      return res
        .status(500)
        .json({ message: "Course price is not set correctly." });
    }

    const options = {
      amount: course.price * 100,
      currency: "INR",
      // receipt:`order_${userId}_${courseId}`
    };
    const order = await instance.orders.create(options);
    res.status(200).json({
      order,
    });
  } catch (error) {
    console.error(error);
  }
});

courseRouter.post("/verify-payment", userMiddleware, async (req, res) => {
  const userId = req.userId;
  const courseId = req.body.courseId;
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body.response;
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      await purchaseModel.create({
        userId,
        courseId,
        razorpay_order_id,
        razorpay_payment_id,
      });
      return res.status(200).json({
        success: true,
        message: "Payment verified successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

//

courseRouter.get("/preview", async (req, res) => {
  const allCourses = await courseModel.find({});

  res.json({
    message: "all the courses",
    courses: allCourses,
  });
});

courseRouter.post("/info/:courseId", async (req, res) => {
  const courseId = req.params.courseId;

  const info = await courseModel.findOne({
    _id: courseId,
  });

  res.status(200).json({
    info,
  });
});

courseRouter.post("/image/upload", creatorMiddleware, async (req, res) => {
  const image = req.body?.image;
  try {
    Cloudinary.uploader.upload(
      image,
      {
        upload_preset: "TuttyCourseHub",
        allowed_formats: ["png", "jpg", "jpeg", "svg", "ioc", "webp"],
      },
      function (error, result) {
        if (error) {
          return console.error(error);
        }

        res.status(200).json(result.secure_url);
      }
    );
  } catch (error) {
    console.error(error);
  }
});

// courseRouter.post("/purchase", userMiddleware, async (req, res) => {
//   const userId = req.userId;
//   const courseId = req.body.courseId;

//   try {
//     const isPurchased = await purchaseModel.exists({
//       courseId,
//       userId,
//     });
//     if (isPurchased) {
//       return res.json({
//         message: "course already purchased",
//       });
//     }

//     const course = await courseModel.findOne({
//       _id: courseId,
//     });

//     if (!course) {
//       return res.status(404).json({
//         message: "course not found",
//       });
//     }
//     if (course.price == null || typeof course.price !== "number") {
//       console.error(
//         "Error in /purchase route: Course price is missing or not a number for courseId:",
//         courseId
//       );
//       return res
//         .status(500)
//         .json({ message: "Course price is not set correctly." });
//     }

//     const merchantOrderId = userId + "_" + courseId;
//     const amount = course.price * 100;
//     const redirectUrl = `http://localhost:5173/course/${courseId}`;

//     const request = CreateSdkOrderRequest.StandardCheckoutBuilder()
//         .merchantOrderId(merchantOrderId)
//         .amount(amount)
//         .redirectUrl(redirectUrl)
//         .build();

//     const response = await client.pay(request);
//     const checkoutPageUrl = response.redirectUrl;

//     res.status(200).json({
//         message: "Payment initiated",
//         checkoutUrl: checkoutPageUrl
//     });
//   } catch (error) {
//     console.error("Error in /purchase route:", error);
//     if (error.type === 'UnauthorizedAccess') {
//       return res.status(401).json({ message: "Unauthorized: Invalid PhonePe credentials." });
//     }
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });
