// routes/userRoutes.js

import express from 'express';
import upload from '../middleware/multer.js';
import { uploadImage } from '../controllers/uploadContoller.js';

const router = express.Router();

router.post('/upload', upload.single('image'), uploadImage);

export default router;
