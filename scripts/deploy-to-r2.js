// Deploy dashboard to R2 gcloud bucket
import { S3Client, PutObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { readdir, readFile, stat } from 'fs/promises';
import { join, relative } from 'path';
import { createReadStream } from 'fs';

const R2_ACCOUNT_ID = 'ede6590ac0d2fb7daf155b35653457b2';
const R2_BUCKET = 'gcloud';
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;

if (!R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) {
  console.error('❌ R2_ACCESS_KEY_ID and R2_SECRET_ACCESS_KEY must be set');
  process.exit(1);
}

const s3Client = new S3Client({
  region: 'auto',
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

async function uploadFile(filePath, key) {
  try {
    const fileContent = await readFile(filePath);
    const command = new PutObjectCommand({
      Bucket: R2_BUCKET,
      Key: key,
      Body: fileContent,
      ContentType: getContentType(filePath),
    });

    await s3Client.send(command);
    console.log(`✅ Uploaded: ${key}`);
    return true;
  } catch (error) {
    console.error(`❌ Error uploading ${key}:`, error.message);
    return false;
  }
}

function getContentType(filePath) {
  const ext = filePath.split('.').pop().toLowerCase();
  const types = {
    'html': 'text/html',
    'css': 'text/css',
    'js': 'application/javascript',
    'json': 'application/json',
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'svg': 'image/svg+xml',
    'ico': 'image/x-icon',
  };
  return types[ext] || 'application/octet-stream';
}

async function uploadDirectory(dirPath, baseKey = 'dashboard') {
  const files = await readdir(dirPath, { withFileTypes: true });
  let uploaded = 0;
  let failed = 0;

  for (const file of files) {
    const fullPath = join(dirPath, file.name);
    const key = `${baseKey}/${file.name}`;

    if (file.isDirectory()) {
      const result = await uploadDirectory(fullPath, key);
      uploaded += result.uploaded;
      failed += result.failed;
    } else {
      const success = await uploadFile(fullPath, key);
      if (success) uploaded++;
      else failed++;
    }
  }

  return { uploaded, failed };
}

async function deploy() {
  console.log('🚀 Deploying dashboard to R2...\n');

  const outDir = join(process.cwd(), 'out');

  try {
    const stats = await stat(outDir);
    if (!stats.isDirectory()) {
      console.error('❌ out/ directory not found. Run npm run build first.');
      process.exit(1);
    }
  } catch {
    console.error('❌ out/ directory not found. Run npm run build first.');
    process.exit(1);
  }

  const result = await uploadDirectory(outDir, 'dashboard');

  console.log(`\n✅ Deployment complete!`);
  console.log(`   Uploaded: ${result.uploaded} files`);
  if (result.failed > 0) {
    console.log(`   Failed: ${result.failed} files`);
  }
  console.log(`\n📡 Dashboard available at:`);
  console.log(`   https://pub-2a171cf5917c4c7d8dead29f57b462c2.r2.dev/dashboard/`);
}

deploy().catch(console.error);
