import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, `sec_v1_${Date.now()}${path.extname(file.originalname)}`);
  }
});

// Security: Reject dangerous executable files
const fileFilter = (req, file, cb) => {
  const dangerousExts = ['.exe', '.bat', '.cmd', '.sh', '.msi', '.vbs', '.js', '.php'];
  const ext = path.extname(file.originalname).toLowerCase();

  if (dangerousExts.includes(ext)) {
    return cb(new Error("Security Error: Executable or script files are strictly prohibited!"), false);
  }

  // Accept file
  cb(null, true);
};

// Security: Enforce strict file size bounds (50 MB limit)
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB
  }
});

export default upload;