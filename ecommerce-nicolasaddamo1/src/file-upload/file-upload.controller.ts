import { AuthGuard } from 'src/auth/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file-upload.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, Post,Param, UploadedFile, UseInterceptors, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, UseGuards } from '@nestjs/common';

@ApiTags('Upload-File: ')
@Controller('files')
export class FileUploadController {
constructor(private readonly fileUploadService: FileUploadService) {}
    @ApiBearerAuth()
    @Post('uploadimage/:id')
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(
        @Param('id')productId: string,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 200000, message: 'File is too large' }),
                    new FileTypeValidator({ fileType: /(jpg|jpeg|png|gif|webp)$/,}),
                ]
            })
        ) file: Express.Multer.File
    ) {
        return await this.fileUploadService.uploadFile(file,productId)
    }
}
