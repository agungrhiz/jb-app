import { NextFunction, Request, Response } from 'express';

interface ErrorResponse {
  status: string;
  statusCode: number;
  message: string;
}

export default class ErrorHandler {
  static handle(err: Error, _: Request, res: Response, next: NextFunction) {
    let statusCode = 500;
    let message = 'Internal Server Error';

    switch (true) {
      case err instanceof BadRequestError:
        statusCode = 400;
        message = err.message || 'Bad Request';
        break;
      case err instanceof UnauthorizedError:
        statusCode = 401;
        message = err.message || 'Unauthorized';
        break;
      case err instanceof ForbiddenError:
        statusCode = 403;
        message = err.message || 'Forbidden';
        break;
      case err instanceof NotFoundError:
        statusCode = 404;
        message = err.message || 'Not Found';
        break;
      case err instanceof ValidationError:
        statusCode = 422;
        message = err.message || 'Unprocessable Entity';
        break;
      case err instanceof AccessDeniedError:
        statusCode = 403;
        message = err.message || 'Access Denied';
        break;
      default:
        break;
    }

    const errorResponse: ErrorResponse = {
      status: 'error',
      statusCode,
      message,
    };

    res.status(statusCode).json(errorResponse);
    next();
  }
}

export class BadRequestError extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

export class UnauthorizedError extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

export class ForbiddenError extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}

export class NotFoundError extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class ValidationError extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class AccessDeniedError extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, AccessDeniedError.prototype);
  }
}
