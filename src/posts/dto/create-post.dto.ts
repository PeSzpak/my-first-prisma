import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ description: 'titulo do post' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'conteudo do post' })
  @IsString()
  @IsOptional()
  content: string | null;

  @ApiProperty({ description: 'Email do criador do post' })
  @IsEmail()
  authorEmail?: string;
}
