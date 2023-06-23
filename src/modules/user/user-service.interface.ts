import CreateUserDto from './dto/create-user.dto.js';
import { DocumentType } from '@typegoose/typegoose';
import { UserEntity } from './user.entity.js';
import UpdateUserDto from './dto/update-user.dto.js';
import { DocumentExistsInterface } from '../../types/document-exists.middleware.js';

export interface UserServiceInterface extends DocumentExistsInterface {
  create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
  findById(userId: string): Promise<DocumentType<UserEntity> | null>;
  findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  updateById(userId: string, dto: UpdateUserDto): Promise<DocumentType<UserEntity> | null>;
}
