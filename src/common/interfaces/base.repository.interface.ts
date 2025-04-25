import { DeepPartial, ObjectLiteral, Repository } from 'typeorm';

export interface IBaseRepository<T extends ObjectLiteral> {
  create(data: DeepPartial<T>): Promise<T>; // Create a new entity
  findAll(
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
  }>; // Paginated result with additional pagination data
  findById(id: string): Promise<T | null>; // Find an entity by ID
  update(id: string, data: DeepPartial<T>): Promise<T>; // Update an entity by ID
  delete(id: string): Promise<void>; // Delete an entity by ID
}
