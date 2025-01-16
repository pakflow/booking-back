import { s3 } from './s3-config';

export class S3Service {
  private bucketName = process.env.AWS_BUCKET; // Укажите ваш бакет

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const params = {
      Bucket: this.bucketName,
      Key: `images/${Date.now()}-${file.originalname}`, // Уникальное имя файла
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read', // Делает файл доступным для чтения
    };

    const result = await s3.upload(params).promise();
    return result.Location; // Возвращаем URL файла
  }
}
