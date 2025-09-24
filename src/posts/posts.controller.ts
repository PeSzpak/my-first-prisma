import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiForbiddenResponse, ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({ summary: 'Create a new post' })
  @ApiForbiddenResponse({ description: 'Acesso negado.' })
  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @ApiOperation({ summary: 'Get all posts' })
  @ApiForbiddenResponse({ description: 'Acesso negado.' })
  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @ApiOperation({ summary: 'Get post by ID' })
  @ApiForbiddenResponse({ description: 'Acesso negado.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update post' })
  @ApiForbiddenResponse({ description: 'Acesso negado.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @ApiOperation({ summary: 'Delete post' })
  @ApiForbiddenResponse({ description: 'Acesso negado.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
