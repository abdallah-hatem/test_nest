import { ApiProperty } from '@nestjs/swagger';
import { GetUserDto } from '../../users/dto/get-user.dto';

export class GetBlogDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ example: 'My First Blog Post' })
  title: string;

  @ApiProperty({ example: 'This is the content of my first blog post...' })
  content: string;

  @ApiProperty({ example: true })
  isPublished: boolean;

  @ApiProperty({ type: () => GetUserDto })
  author: GetUserDto;

  @ApiProperty({ example: '2024-02-20T12:00:00Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-02-20T12:00:00Z' })
  updatedAt: Date;

  constructor(partial: Partial<GetBlogDto>) {
    Object.assign(this, partial);
  }
} 