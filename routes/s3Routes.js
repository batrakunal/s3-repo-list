import express from 'express';
import { listBuckets, listFilesInBucket } from '../controllers/s3Controller.js';

const router = express.Router();

router.get('/buckets', listBuckets);
router.get('/buckets/:bucketName/files', listFilesInBucket);

export default router;
