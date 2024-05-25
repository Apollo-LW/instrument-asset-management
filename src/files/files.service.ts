import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { MongoGridFS } from 'mongo-gridfs'
import { GridFSBucket, GridFSBucketReadStream, ObjectId } from 'mongodb'
import { Connection } from 'mongoose'
import { FileInfoVm } from './model/file-info-vm.model';
import { InjectConnection } from '@nestjs/mongoose';

@Injectable()
export class FilesService {
  private fileModel: MongoGridFS;
  private readonly bucket: GridFSBucket;

  constructor(@InjectConnection() private readonly connection: Connection) {
    this.fileModel = new MongoGridFS(this.connection.db, 'fs');
    this.bucket = new GridFSBucket(this.connection.db, { bucketName: 'fs' });
  }

  async readStream(id: string): Promise<GridFSBucketReadStream> {
    return await this.fileModel.readFileStream(id);
  }

  async findInfo(id: string): Promise<FileInfoVm> {
    const result = await this.fileModel
      .findById(id).catch( err => {
        console.log(err);
        throw new HttpException('File not found', HttpStatus.NOT_FOUND)
    } )
      .then(result => result)
    return{
      filename: result.filename,
      length: result.length,
      md5: result.md5,
      chunkSize: result.chunkSize,
      contentType: result.contentType,
    }
  }
  
  async delete(id: string) {
    await this.bucket.delete(new ObjectId(id));
  }
}