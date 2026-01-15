import { Router } from "express";
import { courseContentModel, courseModel } from "../db.js";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getViewUrl, s3 } from "../S3/S3.js";
import { creatorMiddleware } from "../middleware/creator.js";
import {userMiddleware} from "../middleware/User.js"

export const s3Router = Router();

s3Router.post("/upload-url",creatorMiddleware, async (req, res) => {
  const { fileName, fileType, courseId, chapterNumber, type } = req.body;

  const fileKey = `courses/${courseId}/${Date.now()}-${fileName}`;
  
  const safeName = fileKey.replace(/\s+/g, "_");


  const command = new PutObjectCommand({
    Bucket: "tutty",
    Key: safeName,
    ContentType: fileType,
  });

  const uploadUrl = await getSignedUrl(s3, command, {
    expiresIn: 60,
  });

  const content = await courseContentModel.create({
    courseId,
    chapterNumber: chapterNumber,
    type: type,
    content: safeName,
  });
  await courseModel.updateOne(
    {
      _id: courseId,
      "chapters.number": chapterNumber,
    },
    {
      $set: { "chapters.$.content": [content._id] },
    }
  );

  res.json({ uploadUrl, fileKey });
});



s3Router.post("/get-url",userMiddleware,async(req,res)=>{
  const {fileKey}=req.body;
  const url = await getViewUrl(fileKey);
  res.status(200).json({
    url
  })
})


s3Router.post("/creator/get-url", creatorMiddleware, async (req, res) => {
  const { fileKey } = req.body;
  const url = await getViewUrl(fileKey);
  res.status(200).json({
    url,
  });
});





