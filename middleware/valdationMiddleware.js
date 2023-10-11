import { body, validationResult, param } from 'express-validator';
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError
} from '../errors/customErrors.js';
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js';
import mongoose from 'mongoose';
import Job from '../models/JobModel.js';
import User from '../models/UserModel.js';

const withValidationErrors = (validateValues) => {
  // on retourne plusieurs middlewares dans un tableau
  return [
    validateValues,
    (req, _res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);

        if (errorMessages[0].startsWith("Pas d'offre")) {
          throw new NotFoundError(errorMessages);
        }

        if (errorMessages[0].startsWith('Accès non')) {
          throw new UnauthorizedError(errorMessages);
        }

        throw new BadRequestError(errorMessages);
      }

      next();
    }
  ];
};

// test
export const validateTest = withValidationErrors([
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Le nom est requis')
    .isLength({ min: 3, max: 50 })
    .withMessage('Le nom doit avoir au moins entre 3 et 50 caractères')
    .escape()
]);

export const validateJobInput = withValidationErrors([
  body('company')
    .trim()
    .notEmpty()
    .withMessage('La compagnie est requise')
    .escape(),
  body('position')
    .trim()
    .notEmpty()
    .withMessage('La position est requise')
    .escape(),
  body('jobLocation')
    .trim()
    .notEmpty()
    .withMessage('La localisation est requise')
    .escape(),
  body('jobStatus')
    .isIn(Object.values(JOB_STATUS))
    .withMessage('statut invalide')
    .escape(),
  body('jobType')
    .isIn(Object.values(JOB_TYPE))
    .withMessage('type invalide')
    .escape()
]);

export const validateIdParam = withValidationErrors([
  param('id').custom(async (value, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);

    if (!isValidId) throw new Error('Identifiant MongoDb invalide');

    const job = await Job.findById(value);

    if (!job) {
      throw new Error(`Pas d'offre d'emploi avec l'id ${value}`);
    }

    const isAdmin = req.user.role === 'admin';
    const isOwner = req.user.userId === job.createdBy.toString();
    console.log(isAdmin);
    console.log(isOwner);
    if (!isAdmin && !isOwner) {
      throw new Error('Accès non autorisé');
    }
  })
]);

export const validateRegisterInput = withValidationErrors([
  body('name').notEmpty().withMessage('Le prénom est requis').escape(),
  body('email')
    .notEmpty()
    .withMessage("L'email est requis")
    .isEmail()
    .withMessage("Format d'email non valide")
    .escape()
    .custom(async (email) => {
      const user = await User.findOne({ email });

      if (user) {
        throw new Error("L'email existe déjà");
      }
    }),
  body('password')
    .notEmpty()
    .withMessage('Le mot de passe est requis')
    .isLength({ min: 8 })
    .withMessage('Le mot de passe doit contenir au moins 8 caractères')
    .escape(),
  body('location')
    .notEmpty()
    .withMessage('La localisation est requise')
    .escape(),
  body('lastName').notEmpty().withMessage('Le nom est requis').escape()
]);

export const validateLoginInput = withValidationErrors([
  body('email')
    .notEmpty()
    .withMessage("L'email est requis")
    .isEmail()
    .withMessage("Format d'email non valide")
    .escape(),
  body('password').notEmpty().withMessage('Le mot de passe est requis').escape()
]);

export const validateUpdateUserInput = withValidationErrors([
  body('name').notEmpty().withMessage('Le nom est requis').escape(),
  body('email')
    .notEmpty()
    .withMessage("L'email est requis")
    .isEmail()
    .withMessage("Format d'email non valide")
    .escape()
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });

      if (user && user._id.toString() !== req.user.userId) {
        throw new Error("L'email existe déjà");
      }
    }),
  body('lastName').notEmpty().withMessage('Le nom est requis').escape(),
  body('location')
    .notEmpty()
    .withMessage('La localisation est requise')
    .escape()
]);
