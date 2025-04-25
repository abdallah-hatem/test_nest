// src/common/decorators/response.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const WRAP_RESPONSE_MESSAGE = 'wrap_response_message';

export const WrapResponse = (message?: string) =>
  SetMetadata(WRAP_RESPONSE_MESSAGE, message || 'Operation successful');
