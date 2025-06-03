import { S3Client, ListBucketsCommand, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3 = new S3Client({ region: process.env.AWS_REGION });

export const getBuckets = async () => {
  const res = await s3.send(new ListBucketsCommand({}));
  return res.Buckets.map(bucket => ({ name: bucket.Name, creationDate: bucket.CreationDate }));
};

export const getAllFiles = async (bucketName) => {
  let contents = [];
  let ContinuationToken = undefined;

  do {
    const res = await s3.send(new ListObjectsV2Command({
      Bucket: bucketName,
      ContinuationToken
    }));
    contents = contents.concat(res.Contents || []);
    ContinuationToken = res.IsTruncated ? res.NextContinuationToken : undefined;
  } while (ContinuationToken);

  const files = await Promise.all(contents.map(async obj => {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: obj.Key
    });

    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

    return {
      Key: obj.Key,
      LastModified: obj.LastModified,
      Size: obj.Size,
      DownloadUrl: signedUrl
    };
  }));

  return files;
};
