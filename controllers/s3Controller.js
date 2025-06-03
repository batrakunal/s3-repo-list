import { getBuckets, getAllFiles } from '../services/s3Service.js';

export const listBuckets = async (req, res) => {
  try {
    const buckets = process.env.ALLOWED_BUCKETS?.split(',') || [];
    res.json(buckets.map(name => ({ name })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const listFilesInBucket = async (req, res) => {
  try {
    const { bucketName } = req.params;
    const files = await getAllFiles(bucketName);
    res.json(files);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
