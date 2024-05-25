import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Expose } from 'class-transformer';

@Schema({ timestamps: true })
export class FileInfoVm {

    @ApiProperty()
    @Expose()
    length: number;

    @ApiProperty()
    @Expose()
    chunkSize: number;

    @ApiProperty()
    @Expose()
    filename: string;    

    @ApiProperty()
    @Expose()
    contentType: string;

    @ApiProperty()
    @Expose()
    md5: string;
}
