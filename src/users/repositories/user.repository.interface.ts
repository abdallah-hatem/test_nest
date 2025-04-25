import { User } from '../entities/user.entity';
import { IBaseRepository } from '../../common/interfaces/base.repository.interface';

export interface IUserRepository extends IBaseRepository<User> {
  findByEmail(email: string): Promise<User | null>;
}
