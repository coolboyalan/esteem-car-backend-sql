import { session } from "#middlewares/session";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** NOTE: This function will be used only by mongoose model.
 * 	  This has to be defined as a pre hook in mongoose models where you want to handle image upload automatically
 * 	  If you want to upload manually then there is no need to call this one
 * @example
 * someMongooseSchema.pre("save",uploadFile)
 */

export async function saveFile(next) {
  try {
    const files = session.get("files");
    if (!files || !files.length) return next();

    const modelName = this.name;
    const documentId = this.id.toString();
    const uploadsDir = path.join(
      __dirname,
      "../uploads",
      modelName.toLowerCase(),
      documentId.toLowerCase(),
    );

    await fs.mkdir(uploadsDir, { recursive: true });

    const paths = {};
    const modelKeys = this.constructor.schema.tree;

    for (const file of files) {
      const fieldName = file.fieldname;

      if (modelKeys[fieldName]?.file) {
        const ext = path.extname(file.originalname).toLowerCase();
        const newFileName = `${fieldName}${ext}`;
        const filePath = path.join(uploadsDir, newFileName);

        await sharp(file.buffer)
          .resize(800)
          .jpeg({ quality: 70 })
          .toFile(filePath);

        paths[fieldName] =
          filePath.split("/src")[1] ?? filePath.split("\src")[1];
      }
    }

    Object.assign(this, paths);
    next();
  } catch (error) {
    next({
      status: false,
      message: "Failed to save files",
      httpStatus: 500,
      error: error.message,
    });
  }
}
