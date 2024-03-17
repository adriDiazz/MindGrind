// src/aws/aws.service.ts
import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class AwsService {
  private s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }

  async uploadFile(file) {
    const params = {
      Bucket: 'img-previews',
      Key: file.originalname,
      Body: file.buffer,
    };

    return this.s3.upload(params).promise();
  }

  async saveImageRecord(file: string) {}
}
