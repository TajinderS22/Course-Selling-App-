import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const s3 = new S3Client({
  endpoint: "https://s3.tebi.io",
  region: "global",
  credentials: {
    accessKeyId: process.env.TEBI_ACCESS_KEY,
    secretAccessKey: process.env.TEBI_SECRET_KEY,
  },
});



export const getViewUrl = async (fileKey) => {
  const command = new GetObjectCommand({
    Bucket: "tutty",
    Key: fileKey,
  });

  return await getSignedUrl(s3, command, {
    expiresIn: 1440
  });
};