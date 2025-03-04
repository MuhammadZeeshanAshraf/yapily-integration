import { PaginationDto } from 'src/common/dtos/request/pagination.dto';
import { PagedList } from 'src/common/types/paged-list';
import {
  FindManyOptions,
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsSelect,
  FindOptionsWhere,
} from 'typeorm';
import { FindOptions } from '../../builder-pattern/find-options.builder';

export interface IRead<T> {
  find(
    whereOptions?: FindOptionsWhere<T>,
    selectOption?: FindOptionsSelect<T>,
    orderOptions?: FindOptionsOrder<T>,
    relationOption?: FindOptionsRelations<T>,
    take?: number,
  ): Promise<T[]>;
  findWithPagination(
    paginationDto: PaginationDto,
    options?: FindOptions<T>,
  ): Promise<PagedList<T>>;
  findOne(
    whereOption: FindOptionsWhere<T>,
    selectOption?: FindOptionsSelect<T>,
    relationOption?: FindOptionsRelations<T>,
  ): Promise<T>;
  whereIn(whereOption: FindManyOptions<T>): Promise<T[]>;
  findOneWithBuilderOption(options?: FindOptions<T>): Promise<T>;
  findManyWithBuilderOption(options?: FindOptions<T>): Promise<T[]>;
  exist(whereOption: FindOptionsWhere<T>): Promise<T>;
  count(whereOption: FindOptionsWhere<T>): Promise<number>;
}
