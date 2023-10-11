import { StatusCodes } from 'http-status-codes';

const notFoundMiddleware = (_req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({ msg: "La route n'existe pas" });
};

export default notFoundMiddleware;
