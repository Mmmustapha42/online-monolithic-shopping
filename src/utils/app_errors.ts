enum STATUS_CODES  {
    OK = 200,
    BAD_REQUEST = 400,
    UN_AUTHORISED = 403,
    NOT_FOUND = 404,
    INTERNAL_ERROR = 500,
  };

  class AppError extends Error {
    constructor(
      public name: string,
      public statusCode: number,
      public description: string,
      public isOperational: boolean,
      public errorStack: string,
      public logingErrorResponse: string
    ) {
      super(description);
    //   Object.setPrototypeOf(this, new.target.prototype);
      this.name = name;
      this.statusCode = statusCode;
      this.isOperational = isOperational;
      this.errorStack = errorStack;
      this.logingErrorResponse = logingErrorResponse;
      Error.captureStackTrace(this);
    }
  }

  //api Specific Errors
class APIError extends AppError {
    constructor(
        public name: string,
      public statusCode = STATUS_CODES.INTERNAL_ERROR,
      public description = "Internal Server Error",
      public isOperational = true,
      public errorStack: string,
      public logingErrorResponse: string
    ) {
       super(name, statusCode, description, isOperational, errorStack, logingErrorResponse);
    }
  }

  //400
class BadRequestError extends AppError {
    constructor(description = "Bad request", logingErrorResponse: string) {
      super(
        "NOT FOUND",
        STATUS_CODES.BAD_REQUEST,
        description,
        true,
        "",
        logingErrorResponse
      );
    }
  }

  class ValidationError extends AppError {
    constructor(description = "Validation Error", errorStack: string) {
      super(
        "BAD REQUEST",
        STATUS_CODES.BAD_REQUEST,
        description,
        true,
        errorStack,
        "",
        
      );
    }
  }

  export {
    STATUS_CODES,
    ValidationError,
    APIError,
    BadRequestError,
    AppError
  }
  
  