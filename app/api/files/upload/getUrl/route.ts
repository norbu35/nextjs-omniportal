/* eslint-disable import/no-extraneous-dependencies */
import { logger } from '@/utils/logging/logger';
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
    logger.error({ message: err, level: 'error' });
  }

  return NextResponse.json({ urls });
}

export { handler as POST };
