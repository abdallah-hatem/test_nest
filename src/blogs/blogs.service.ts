import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Blog } from './entities/blog.entity';
import { CreateBlogDto } from './dto/create-blog.dto';
import { GetBlogDto } from './dto/get-blog.dto';
import { BlogRepository } from './repositories/blog.repository';
import { BlogMapper } from './mappers/blog.mapper';
import { BLOG_REPOSITORY_TOKEN } from './repositories/blog.repository.token';

@Injectable()
export class BlogsService {
  constructor(
    @Inject(BLOG_REPOSITORY_TOKEN)
    private readonly blogRepository: BlogRepository,
  ) {}

  async create(createBlogDto: CreateBlogDto, authorId: string): Promise<GetBlogDto> {
    const blog = await this.blogRepository.create({
      ...createBlogDto,
      authorId,
    });
    return BlogMapper.toDto(blog);
  }

  async findAll(page?: number, perPage?: number): Promise<any> {
    const paginatedResult = await this.blogRepository.findAll(page, perPage);
    
    return {
      ...paginatedResult,
      data: paginatedResult.data.map(blog => BlogMapper.toDto(blog))
    };
  }

  async findOne(id: string): Promise<GetBlogDto> {
    const blog = await this.blogRepository.findById(id);
    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    return BlogMapper.toDto(blog);
  }

  async update(id: string, updateBlogDto: Partial<Blog>): Promise<GetBlogDto> {
    const blog = await this.blogRepository.update(id, updateBlogDto);
    return BlogMapper.toDto(blog);
  }

  async remove(id: string): Promise<void> {
    await this.blogRepository.delete(id);
  }

  async findByAuthorId(authorId: string, page?: number, perPage?: number): Promise<any> {
    const paginatedResult = await this.blogRepository.findByAuthorId(authorId, page, perPage);
    
    return {
      ...paginatedResult,
      data: paginatedResult.data.map(blog => BlogMapper.toDto(blog))
    };
  }
} 