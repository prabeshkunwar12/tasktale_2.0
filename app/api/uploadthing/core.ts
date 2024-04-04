import { currentUser } from "@/lib/current-user";
import db from "@/lib/db";
import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
const uploadUrl = 'https://uploadthing-prod.s3.us-west-2.amazonaws.com' 
export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const user = await currentUser()
      if(!user || !user.id) throw new Error('Unauthorized')
      console.log("I am running")
      return { userId: user.id};
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("I am running")
      try {
        const createdFile = await db.profileImage.create({
          data: {
            key: file.key,
            name: file.name,
            userId: metadata.userId,
            url: `${uploadUrl}/${file.key}`,
            uploadStatus: "PROCESSING"
          }
        })
      } catch {
        throw new Error('database creation problem')
      }
    })
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;