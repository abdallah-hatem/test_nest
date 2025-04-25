import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'The unique identifier of the user' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'johndoe', description: 'The username of the user' })
  @Column()
  username: string;

  @ApiProperty({ example: 'john@example.com', description: 'The email of the user' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: 'password123', description: 'The password of the user' })
  @Column()
  password: string;

  @ApiProperty({ example: 'John', description: 'The first name of the user', required: false })
  @Column({ nullable: true })
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'The last name of the user', required: false })
  @Column({ nullable: true })
  lastName: string;

  @ApiProperty({ example: true, description: 'Whether the user is active' })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({ example: '2024-02-20T12:00:00Z', description: 'When the user was created' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: '2024-02-20T12:00:00Z', description: 'When the user was last updated' })
  @UpdateDateColumn()
  updatedAt: Date;
} 