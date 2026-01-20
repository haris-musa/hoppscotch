import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

/**
 ** Decorator to fetch refresh_token from cookie
 */
export const RTCookie = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    const refreshToken = req.cookies?.['refresh_token'];
    if (refreshToken) return refreshToken;

    const authorization = req.headers?.['authorization'];
    if (typeof authorization === 'string') {
      const [scheme, token] = authorization.split(' ');
      if (scheme === 'Bearer' && token) return token;
    }

    return undefined;
  },
);
