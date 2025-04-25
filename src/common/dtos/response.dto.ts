export class ResponseDto<T> {
  constructor(
    public data: T,
    public message = 'Success',
    public statusCode = 200,
  ) {}
}
