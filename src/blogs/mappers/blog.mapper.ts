import { Blog } from '../entities/blog.entity';
import { GetBlogDto } from '../dto/get-blog.dto';
import { UserMapper } from '../../users/mappers/user.mapper';

export class BlogMapper {
  static toDto(blog: Blog): GetBlogDto {
    return new GetBlogDto({
      id: blog.id,
      title: blog.title,
      content: blog.content,
      isPublished: blog.isPublished,
      author: blog.author ? UserMapper.toDto(blog.author) : undefined,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
    });
  }
} 