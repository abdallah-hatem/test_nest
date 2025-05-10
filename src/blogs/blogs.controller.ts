import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { Blog } from './entities/blog.entity';
import { GetBlogDto } from './dto/get-blog.dto';
import { CreateBlogDto } from './dto/create-blog.dto';
import { ResponseUtil } from 'src/utils/response.utils';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createBlogDto: CreateBlogDto,
    @CurrentUser() user: any,
  ): Promise<any> {
    const blog = await this.blogsService.create(createBlogDto, user.id);
    return ResponseUtil.created(blog, 'Blog created successfully');
  }

  @Get()
  async findAll(@Query('page') page, @Query('per_page') perPage): Promise<any> {
    const blogs = await this.blogsService.findAll(page, perPage);

    return ResponseUtil.handle({
      isPaginated: page && perPage,
      data: blogs,
      message: 'Fetched blogs successfully',
      perPage,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-blogs')
  async findMyBlogs(
    @CurrentUser() user: any,
    @Query('page') page,
    @Query('per_page') perPage,
  ): Promise<any> {
    const blogs = await this.blogsService.findByAuthorId(user.id, page, perPage);

    return ResponseUtil.handle({
      isPaginated: page && perPage,
      data: blogs,
      message: 'Fetched your blogs successfully',
      perPage,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<GetBlogDto> {
    return this.blogsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBlogDto: Partial<Blog>,
  ): Promise<GetBlogDto> {
    return this.blogsService.update(id, updateBlogDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.blogsService.remove(id);
  }
} 