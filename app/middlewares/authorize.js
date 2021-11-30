const jwt = require('jsonwebtoken');

const userAuth = (req, res, next) => {

    let pathArray = req.path.split('/');
    let mainPath = pathArray[pathArray.length - 1];
    const excludePaths = ['login','register'];
    if(excludePaths.includes(mainPath)){
        return next();
    }
    let jwAccess;
    const userHeader = req.header("Authorization");
    if (userHeader !== undefined) {
      jwAccess = userHeader.split(" ")[1];
    }
    // console.log(jwAccess);
    if (jwAccess === undefined) {
    //   console.log("first");
      res.status(401);
      res.json({message: "Invalid JWT Token"});
    } else {
      jwt.verify(jwAccess, "huwbegopwr89nbvjei90", async (error, payLoad) => {
        if (error) {
          res.status(401);
          res.send({message:"Invalid JWT Token"});
        } else {
          req.token = payLoad;
          next();
        }
      });
    }
  };

  module.exports = userAuth
