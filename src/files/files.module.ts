import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { MulterModule } from '@nestjs/platform-express';
import { GridFsMulterConfigService } from './config/multer-config.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FilesService } from './files.service';
const url = process.env.MONGO_URL

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/fs'),
        MulterModule.registerAsync({
            useClass: GridFsMulterConfigService,
        },
    )],
    controllers: [FilesController],
    providers: [GridFsMulterConfigService, FilesService],
})
export class FilesModule {}