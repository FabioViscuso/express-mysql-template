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

const validTypes = ["image/png", "image/jpeg"]
const validateFileType: multer.Options["fileFilter"] = (req, file, callback) => {
    if (validTypes.includes(file.mimetype)) {
        callback(null, true)
    } else {
        callback(new Error('invalid file type'))
    }
}

export const multerOptions = {
    validateFileType,
    limits: {
        fileSize: 6 * 1024 * 1024
    }
}

export const initMulterMiddleware = () => {
    return multer({ storage, ...multerOptions })
}
