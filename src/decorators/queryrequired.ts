import {
  createParamDecorator,
  ExecutionContext,
  BadRequestException,
} from "@nestjs/common";

export const QueryRequired = createParamDecorator(
  (key: string, context: ExecutionContext) => {
    const httpRequest = context.switchToHttp().getRequest();

    const queryValue = httpRequest.query[key];

    if (queryValue === undefined) {
      throw new BadRequestException(`Missing required query parameter: ${key}`);
    }

    return queryValue;
  },
);
