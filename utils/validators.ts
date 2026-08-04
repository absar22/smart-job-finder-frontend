import Joi from 'joi';

export const formatJoiErrors = (error: Joi.ValidationError) => {
  const errors: Record<string, string> = {};
  if (error && error.details) {
    error.details.forEach((detail) => {
      errors[detail.context?.key || detail.path.join('.')] = detail.message;
    });
  }
  return errors;
};

export const signupSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Name is required'
  }),
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    'string.email': 'Invalid email format',
    'string.empty': 'Email is required'
  }),
  password: Joi.string().min(8).required().messages({
    'string.min': 'Password must be at least 8 characters long',
    'string.empty': 'Password is required'
  }),
  role: Joi.string().valid('user', 'admin').optional()
});

export const loginSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    'string.email': 'Invalid email format',
    'string.empty': 'Email is required'
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required'
  })
});

export const forgotPasswordSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    'string.email': 'Invalid email format',
    'string.empty': 'Email is required'
  })
});

export const resetPasswordSchema = Joi.object({
  password: Joi.string().min(8).required().messages({
    'string.min': 'Password must be at least 8 characters long',
    'string.empty': 'Password is required'
  }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Passwords do not match',
    'string.empty': 'Confirm Password is required'
  })
});

export const createJobSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.empty': 'Job title is required'
  }),
  company: Joi.string().required().messages({
    'string.empty': 'Company name is required'
  }),
  location: Joi.string().required().messages({
    'string.empty': 'Location is required'
  }),
  description: Joi.string().required().messages({
    'string.empty': 'Description is required'
  }),
  salary: Joi.string().required().messages({
    'string.empty': 'Salary is required'
  }),
  jobType: Joi.string().valid('Full-time', 'Part-time', 'Contract', 'Internship', 'Remote').required().messages({
    'any.only': 'Invalid job type',
    'string.empty': 'Job type is required'
  }),
  requirements: Joi.alternatives().try(
    Joi.array().items(Joi.string()),
    Joi.string()
  ).required().messages({
    'any.required': 'Requirements are required'
  }),
  responsibilities: Joi.alternatives().try(
    Joi.array().items(Joi.string()),
    Joi.string()
  ).optional()
});
