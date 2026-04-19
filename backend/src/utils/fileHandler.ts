import { PutObjectCommand } from "@aws-sdk/client-s3";
import { r2Client } from "../config/r2";
import dotenv from 'dotenv';

dotenv.config();

/**
 * Upload a file to Cloudflare R2
 * @param fileBuffer The buffer of the file
 * @param fileName The desired filename in the bucket
 * @param contentType The MIME type of the file
 */
export const uploadToR2 = async (fileBuffer: Buffer, fileName: string, contentType: string) => {
  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: fileName,
    Body: fileBuffer,
    ContentType: contentType,
  });

  try {
    await r2Client.send(command);
    return `${process.env.R2_PUBLIC_URL}/${fileName}`;
  } catch (error) {
    console.error("Error uploading to R2:", error);
    throw error;
  }
};
