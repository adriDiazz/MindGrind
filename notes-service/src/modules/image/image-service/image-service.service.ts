// src/aws/aws.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as AWS from 'aws-sdk';
import { Note } from 'src/modules/note/entities/note.entity';
import { Repository } from 'typeorm';
import * as puppeteer from 'puppeteer';

@Injectable()
export class AwsService {
  private s3: AWS.S3;

  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
  ) {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }

  async uploadFile(file) {
    const params = {
      Bucket: 'img-previews',
      Key: file.originalname + Date.now(),
      Body: file.buffer,
    };

    return this.s3.upload(params).promise();
  }

  async saveImageRecord(
    file: AWS.S3.ManagedUpload.SendData,
    userId: string,
    noteId: string,
  ) {
    // save image record to database
    const note = await this.noteRepository.findOne({ where: { userId } });
    const noteIndex = note.notes.findIndex((note) => note.noteId === noteId);
    note.notes[noteIndex].previewUrl = file.Location;
    await this.noteRepository.update(note._id, note);
  }

  async capture(url: string): Promise<Buffer> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const screenshotBuffer = await page.screenshot({ fullPage: true });
    await browser.close();
    return screenshotBuffer;
  }
}
