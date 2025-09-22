import { PrismaService } from 'src/prisma/prisma.service';
import { PostEntity } from '../entities/post.entity';
import { CreatePostDto } from '../dto/create-post.dto';
import { Injectable } from '@nestjs/common';
import { UpdatePostDto } from '../dto/update-post.dto';

@Injectable()
export class PostsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto): Promise<PostEntity> {
    return await this.prisma.post.create({
      data: createPostDto,
    });
  }

  async findAll(): Promise<PostEntity[]> {
    return await this.prisma.post.findMany();
  }

  async findOne(id: number): Promise<PostEntity | null> {
    return this.prisma.post.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<PostEntity> {
    return this.prisma.post.update({
      where: {
        id,
      },
      data: updatePostDto,
    });
  }

  async remove(id: number) {
    return this.prisma.post.delete({
      where: {
        id,
      },
    });
  }
}
