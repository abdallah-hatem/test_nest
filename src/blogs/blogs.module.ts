import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { Blog } from './entities/blog.entity';
import { BlogRepository } from './repositories/blog.repository';
import { BLOG_REPOSITORY_TOKEN } from './repositories/blog.repository.token';

@Module({
  imports: [TypeOrmModule.forFeature([Blog])],
  providers: [
    BlogsService,
    {
      provide: BLOG_REPOSITORY_TOKEN,
      useClass: BlogRepository,
    },
  ],
  controllers: [BlogsController],
})
export class BlogsModule {} 