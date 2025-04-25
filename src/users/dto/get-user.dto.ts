import { ApiProperty } from '@nestjs/swagger';

export class GetUserDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ example: 'johndoe' })
  username: string;

  @ApiProperty({ example: 'john@example.com' })
  email: string;

  @ApiProperty({ example: 'John', required: false })
  firstName: string;

  @ApiProperty({ example: 'Doe', required: false })
  lastName: string;

  @ApiProperty({ example: true })
  isActive: boolean;

  @ApiProperty({ example: '2024-02-20T12:00:00Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-02-20T12:00:00Z' })
  updatedAt: Date;

  constructor(partial: Partial<GetUserDto>) {
    Object.assign(this, partial);
  }
} 