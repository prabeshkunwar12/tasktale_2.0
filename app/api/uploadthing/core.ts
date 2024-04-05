import { currentUser } from "@/lib/current-user";
import db from "@/lib/db";
import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
const uploadUrl = 'https://uploadthing-prod.s3.us-west-2.amazonaws.com' 
export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "16MB" } })
    .middleware(async ({ req }) => {
      const user = await currentUser()
      if(!user || !user.id) throw new Error('Unauthorized')
      return { userId: user.id};
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const createdFile = await db.profileImage.create({
        data: {
          key: file.key,
          name: file.name,
          userId: metadata.userId,
          url: file.url,
          uploadStatus: "PROCESSING"
        }
      })
      console.info("UPLOADTHING: File added to database", createdFile)
    })
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;