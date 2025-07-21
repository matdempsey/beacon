import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodObject, ZodRawShape, ZodError } from "zod";

type RequestDataSource = "body" | "query";

const generateCustomZodValidationError = (error: ZodError) => {
  const zodErrors = error.issues.map((issue) => {
    if (issue.code === "unrecognized_keys") {
      return { message: issue.message };
    }

    return {
      // issue.path array can include Symbols, so need to explicitly convert to string.
      // Example output: "Invalid input: expected string, received number for key name".
      message: `${issue.message} for key "${String(issue.path[0])}"`,
    };
  });

  const validationError = {
    message: "Validation failed",
    errors: zodErrors,
  };

  return validationError;
};

export const validateRequest =
  <T extends ZodRawShape>(
    schema: ZodObject<T>,
    requestDataSource: RequestDataSource
  ) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req[requestDataSource]);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = generateCustomZodValidationError(error);

        res.status(StatusCodes.BAD_REQUEST).json(validationError);
      } else {
        console.error(`Failed to validate request ${error}`);

        res.status(StatusCodes.INTERNAL_SERVER_ERROR);
      }
    }
  };
