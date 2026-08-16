import { Router } from "express";
import multer from "multer";
import { courseContentModel, courseModel } from "../db.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getViewUrl, s3 } from "../S3/S3.js";
import { creatorMiddleware } from "../middleware/creator.js";
import { userMiddleware } from "../middleware/User.js";

export const s3Router = Router();

const upload = multer({ storage: multer.memoryStorage() });

s3Router.post("/upload", creatorMiddleware, upload.single("file"), async (req, res) => {
  try {
    const { courseId, chapterNumber, type } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "file is required" });
    }

    const fileKey = `courses/${courseId}/${Date.now()}-${file.originalname}`.replace(
      /\s+/g,
      "_"
    );

    await s3.send(
      new PutObjectCommand({
        Bucket: "tuttyProject",
        Key: fileKey,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
    );

    const content = await courseContentModel.create({
      courseId,
      chapterNumber: Number(chapterNumber),
      type: type,
      content: fileKey,
    });
    await courseModel.updateOne(
      {
        _id: courseId,
        "chapters.number": Number(chapterNumber),
      },
      {
        $set: { "chapters.$.content": [content._id] },
      }
    );

    res.json({ fileKey });
  } catch (error) {
    console.error("Upload failed:", error);
    res.status(500).json({ message: "Upload failed" });
  }
});

s3Router.post("/get-url", userMiddleware, async (req, res) => {
  const { fileKey } = req.body;
  if (!fileKey) return res.status(400).json({ message: "fileKey is required" });
  const url = await getViewUrl(fileKey);
  res.status(200).json({
    url,
  });
});

s3Router.post("/creator/get-url", creatorMiddleware, async (req, res) => {
  const { fileKey } = req.body;
  if (!fileKey) return res.status(400).json({ message: "fileKey is required" });
  const url = await getViewUrl(fileKey);
  res.status(200).json({
    url,
  });
});
