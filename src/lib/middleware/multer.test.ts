import { generateFileName } from "./multer"

describe("test generateFileName", () => {
    test.each([
        ["image/png", "png"],
        ["image/jpeg", "jpeg"],
    ])("generates filenames with correct extensions '%s'", (mimeType, expectedFileExtension) => {
        const fullFilename = generateFileName(mimeType)
        const [, fileExtension] = fullFilename.split(".")

        expect(fileExtension).toEqual(expectedFileExtension)
    })
})
