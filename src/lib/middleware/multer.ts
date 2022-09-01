import multer from "multer";
import mime from "mime";
import { randomUUID } from "crypto";

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, callback) => {
        return callback(null, generateFileName(file.mimetype))
    }
})

export const generateFileName = (mimeType: string) => {
    const randomFileName = `${randomUUID()}-${Date.now()}`
    const fileExtension = mime.getExtension(mimeType)
    const fileName = `${randomFileName}.${fileExtension}`
    return fileName
}

export const multerOptions = {

}

export const initMulterMiddleware = () => {
    return multer({ storage, ...multerOptions })
}
