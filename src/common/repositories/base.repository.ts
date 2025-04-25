import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, ObjectLiteral, DeepPartial } from 'typeorm';
import { IBaseRepository } from '../interfaces/base.repository.interface';

@Injectable()
export abstract class BaseRepository<T extends ObjectLiteral>
  implements IBaseRepository<T>
{
  constructor(protected readonly repository: Repository<T>) {}

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  async findAll(
    page?: number,
    perPage?: number,
  ): Promise<{
    data: T[];
    pagination?: {
      total?: number;
      page?: number;
      perPage?: number;
      totalPages?: number;
    };
  }> {
    if (!page || !perPage) {
      // If page or perPage is not provided, return all data
      const [data, total] = await this.repository.findAndCount();
      return { data, pagination: { total } };
    }

    // Pagination logic if page and perPage are provided
    const [data, total] = await this.repository.findAndCount({
      take: perPage, // Limit the number of records to 'perPage'
      skip: (page - 1) * perPage, // Skip records based on the page
    });

    return {
      data,
      pagination: {
        total,
        page,
        perPage,
        totalPages: Math.ceil(total / perPage),
      },
    };
  }

  async findById(id: string): Promise<T | null> {
    return this.repository.findOne({ where: { id } as any });
  }

  async update(id: string, data: DeepPartial<T>): Promise<T> {
    await this.repository.update(id, data as any);
    const updated = await this.findById(id);
    if (!updated) {
      throw new NotFoundException(`Entity with ID ${id} not found`);
    }
    return updated;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
