import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  // const authHeader = req.headers.authorization;

  // if (!authHeader) {
  //   return res
  //     .status(401)
  //     .json({ success: false, message: "Not Authorized Login Again" });
  // }
  // const token = authHeader.split(" ")[1];

  const token = req.headers.authorization;

  if(!token){
    return res.status(400).json({status: false, message: "jwt must be provided"})
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = token_decode;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, message: error.message });
  }
};

export default authMiddleware;