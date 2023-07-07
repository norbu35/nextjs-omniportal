/* eslint-disable import/no-extraneous-dependencies */
import https from 'https';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import {
  getSignedUrl,
} from '@aws-sdk/s3-request-presigner';
import { NextRequest, NextResponse } from 'next/server';

async function createPresignedUrlWithClient({ region, bucket, key }: { region: string, bucket: string, key: string }) {
  const client = new S3Client({ region });
  const command = new PutObjectCommand({ Bucket: bucket, Key: key });
  return getSignedUrl(client, command, { expiresIn: 3600 });
}

function put(url: string, data: File) {
  return new Promise((resolve, reject) => {
    const req = https.request(
      url,
      { method: 'PUT', headers: { 'Content-Length': new Blob([data]).size } },
      (res) => {
        let responseBody = '';
        res.on('data', (chunk) => {
          responseBody += chunk;
        });
        res.on('end', () => {
          resolve(responseBody);
        });
      },
    );
    req.on('error', (err) => {
      reject(err);
    });
    req.write(data);
    req.end();
  });
}

async function handler(req: NextRequest) {
  const REGION = 'ap-northeast-2';
  const BUCKET = 'omniportal-user-upload';

  const { keys } = await req.json().then((body) => body);
  const urls = [];

  try {
    for (const key of keys) {
      const clientUrl = await createPresignedUrlWithClient({
        region: REGION,
        bucket: BUCKET,
        key: key,
      });
      urls.push({ key, url: clientUrl });
    }
  } catch (err) {
    console.error(err);
  }

  return NextResponse.json({ urls });
}

export { handler as POST };
