import { AnyZodObject } from 'zod';
import catchAsync from '../utils/catchAsync';

const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req, res, next) => {
    await schema.parseAsync({
      body: req.body,
      params: req.params,
      query: req.query,
      cookies: req.cookies, //for parsing cookies
    });
    next();
  });
};

export default validateRequest;
