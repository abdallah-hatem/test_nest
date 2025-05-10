import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from '../entities/blog.entity';
import { BaseRepository } from '../../common/repositories/base.repository';

@Injectable()
export class BlogRepository extends BaseRepository<Blog> {
  constructor(
    @InjectRepository(Blog)
    repository: Repository<Blog>,
  ) {
    super(repository);
  }

  async findByAuthorId(authorId: string, page?: number, perPage?: number) {
    const query = this.repository
      .createQueryBuilder('blog')
      .leftJoinAndSelect('blog.author', 'author')
      .where('blog.authorId = :authorId', { authorId });

    if (page && perPage) {
      query.skip((page - 1) * perPage).take(perPage);
    }

    const [data, total] = await query.getManyAndCount();

    return {
      data,
      pagination: {
        total,
        page,
        perPage,
        totalPages: perPage ? Math.ceil(total / perPage) : undefined,
      },
    };
  }
} 