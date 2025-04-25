// utils/response.util.ts

import { IResponse } from 'src/common/interfaces/response.interface';

export class ResponseUtil {
  static success<T>(data: T, message = 'Success'): IResponse<T> {
    return {
      statusCode: 200,
      message,
      data,
    };
  }

  static error(message: string, statusCode = 400): IResponse<null> {
    return {
      statusCode,
      message,
      data: null,
    };
  }

  static created<T>(
    data: T,
    message = 'Resource created successfully',
  ): IResponse<T> {
    return {
      statusCode: 201,
      message,
      data,
    };
  }

  static paginated<T>({
    data,
    page,
    perPage,
    totalRecords,
    message = 'Success',
  }: {
    data: T[];
    page: number;
    perPage: number;
    totalRecords: number;
    message?: string;
  }): IResponse<{
    data: T[];
    page: number;
    perPage: number;
    totalRecords: number;
    totalPages: number;
    hasNext: boolean;
  }> {
    const totalPages = Math.ceil(totalRecords / perPage);

    return {
      statusCode: 200,
      message,
      data: {
        data,
        page,
        perPage,
        totalRecords,
        totalPages,
        hasNext: page < totalPages,
      },
    };
  }

  static handle({
    isPaginated,
    data,
    message,
    perPage,
  }: {
    isPaginated: boolean;
    data?: any;
    message?: string;
    perPage?: number;
  }) {
    if (
      isPaginated &&
      data.pagination.page &&
      data.pagination.total &&
      data.pagination.totalPages &&
      perPage
    ) {
      return ResponseUtil.paginated({
        data: data.data,
        totalRecords: data.pagination.total,
        page: data.pagination.page,
        message,
        perPage,
      });
    }

    return ResponseUtil.success(data.data, message);
  }
}
