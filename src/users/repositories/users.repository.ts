import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import { isPrismaError } from 'src/common/filters/http-exception/errors/utils/is-prisma-error.util';
import { handleDatabaseErrors } from 'src/common/filters/http-exception/errors/utils/handle-database-errors.utils';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      return await this.prisma.user.create({
        data: createUserDto,
        include: {
          posts: {
            select: {
              title: true,
              createdAt: true,
            },
          },
        },
      });
    } catch (error) {
      if (isPrismaError(error)) {
        throw handleDatabaseErrors(error);
      }
      throw error;
    }
  }

  async findAll(): Promise<UserEntity[]> {
    return this.prisma.user.findMany({
      include: {
        posts: {
          select: {
            title: true,
            createdAt: true,
          },
        },
      },
    });
  }

  async findOne(id: number): Promise<UserEntity | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        posts: {
          select: {
            title: true,
            createdAt: true,
          },
        },
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
        include: {
          posts: {
            select: {
              title: true,
              createdAt: true,
            },
          },
        },
      });
    } catch (error) {
      if (isPrismaError(error)) {
        throw handleDatabaseErrors(error);
      }
      throw error;
    }
  }

  async remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
