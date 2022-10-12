import jwt from 'jsonwebtoken'
export const verifyToken = (req, res, next) => {
    console.log(req.headers);
    if (req.headers?.authorization === undefined) {
      res.status(500).json({ error:true ,message: "Token Not Provide" });
    }
    const token = req.headers?.authorization.split(" ")[1];
    if (!token) {
      res.status(500).json({ error:true ,message: "Token Not Provide"});
    } else {
      jwt.verify(token, process.env.JWT, (err, decode) => {
        if (err) {
          res.status(500).json({ error:true,message: "Authentication failed" });
        } else {
            res.user=decode
          console.log("verification success");
          next();
        }
      });
    }
  };