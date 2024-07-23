import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, `${uniqueSuffix}-${file.originalname}`)
    }
});

const upload = multer({ storage: storage });

export const HandleFile = (req, res, next) => {
      
    upload.single('resume')(req, res, (err) => {
        // if (err instanceof multer.MulterError) {
        //   return res.status(400).json({ message: "Multer error: " + err.message });
        // } else if (err) {
        //   return res.status(500).json({ message: "Unknown error: " + err.message });
        // }
        
        if (!req.file) {
          return res.status(400).json({ message: 'No file uploaded.' });
        }
        
        req.uploadedFile = {
          message: 'File uploaded successfully',
          filename: req.file.filename
        };
        console.log("File details:", {
            filename: req.file.filename,
            originalname: req.file.originalname,
            mimetype: req.file.mimetype,
            size: req.file.size,
            path: req.file.path
          });
        next();
      });
};