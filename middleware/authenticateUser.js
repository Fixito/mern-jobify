import {
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError
} from '../errors/customErrors.js';
import { verifyJWT } from '../utils/tokenUtils.js';

export const authenticateUser = async (req, _res, next) => {
  const { token } = req.cookies;

  if (!token) {
    throw new UnauthenticatedError('Authentification invalide');
  }

  try {
    const { userId, role } = verifyJWT(token);
    const testUser = userId === '64d4b4923650b8523c96ce06';
    req.user = { userId, role, testUser };
    next();
  } catch (error) {
    throw new UnauthenticatedError('Authentification invalide');
  }
};

export const authorizePermissions = (...roles) => {
  return (req, _res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError('Accès refusé');
    }

    next();
  };
};

export const checkForTestUser = (req, _res, next) => {
  if (req.user.testUser) {
    console.log('NON !');
    throw new BadRequestError('Utilisateur démo. En lecture seule !');
  }

  next();
};
