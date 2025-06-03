# S3 Browser API with Signed URLs

A Node.js backend to browse files in multiple AWS S3 buckets and list metadata such as file name, last modified date, and signed download URL.

## 🚀 Features

- List all S3 buckets
- List all files in a selected bucket (recursive)
- Show file key, last modified date, size, and a signed download URL (valid for 1 hour)
- CORS support for frontend applications

## 🔧 Setup

### Standard Setup

1. Clone this repo
2. Create a `.env` file:

```
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
PORT=3000
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

3. Install dependencies:

```bash
npm install
```

4. Start the server:

```bash
npm start
```

### Docker Setup

You can also run the application using Docker:

```bash
# Build the Docker image
docker build -t s3-browser-api .

# Run the container
docker run -p 3000:3000 --env-file .env s3-browser-api
```

## 🔌 API Endpoints

### List Buckets

```http
GET /api/s3/buckets
```

### List Files in Bucket (with download links)

```http
GET /api/s3/buckets/:bucketName/files
```

## 🔒 CORS Configuration

The API includes CORS support to allow requests from specified origins. Configure allowed origins using the `ALLOWED_ORIGINS` environment variable as a comma-separated list:

```
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173,https://yourdomain.com
```

If not specified, the default allowed origin is `http://localhost:3000`.

## 🐳 Docker and CI/CD

### Docker

The application includes a Dockerfile for containerization. Build and run using the commands in the Docker Setup section.

### GitHub Actions

A GitHub Actions workflow is included to automatically build and push the Docker image to Docker Hub when changes are pushed to the main branch.

To set up the GitHub Actions workflow:

1. Add the following secrets to your GitHub repository:
   - `DOCKERHUB_USERNAME`: Your Docker Hub username
   - `DOCKERHUB_TOKEN`: Your Docker Hub access token

2. Push changes to the main branch to trigger the workflow.

---

## 🛠 Example Response

```json
[
  {
    "Key": "folder/file1.pdf",
    "LastModified": "2023-11-10T13:10:02.000Z",
    "Size": 12345,
    "DownloadUrl": "https://bucket.s3.amazonaws.com/folder/file1.pdf?..."
  }
]
```
