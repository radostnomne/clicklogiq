export const validateQuery = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.query);

  if (error) {
    return res.status(400).send({
      message: error.details.map((e) => e.message).join(', '),
    });
  }

  req.query = {
    ...req.query,
    ...value,
  };

  next();
};
