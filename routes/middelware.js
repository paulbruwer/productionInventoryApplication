let jwt = require("jsonwebtoken");

// if password matches the in the database document, sets username and password to payload
// and creates a jwt token
function loginUser(req, res) {
    let jwtToken = jwt.sign(
        {
            email: req.body.email,
            permissions: req.permissions,
        },
        "secretKey",
        { expiresIn: "1h" }
        );
    res.send({token:jwtToken,message:"You are logged in."});
}

// validates jwt token
function checkJWTToken(req, res, next) {
  if (req.headers.token) {
    let token = req.headers.token;
    jwt.verify(token, "secretKey", function (error, data) {
      if (error) {
        res.send({ message: "Invalid Token" });
      } else {
        req.email = data.email;
        req.permissions = data.permissions;
        next();
      }
    });
  } else {
    res.send({ message: "You are not logged in" });
  }
}

//check the user has permissions for this route
function checkReceivingPermission(req, res, next){
  req.permissions.map((element)=>{
      if (element === "/admin" || element === "/receiving"){
          return next();
      };
      res.send({message:"You don't hve permission to view this page."})
  })
}

//check the user has permissions for this route
function checkProductionPermission(req, res, next){
  req.permissions.map((element)=>{
      if (element === "/admin" || element === "/production"){
          return next();
      };
      res.send({message:"You don't hve permission to view this page."})
  })
}

//check the user has permissions for this route
function checkDispatchPermission(req, res, next){
  req.permissions.map((element)=>{
      if (element === "/admin" || element === "/dispatch"){
          return next();
      };
      res.send({message:"You don't hve permission to view this page."})
  })
}

//check the user has permissions for this route
function checkAdminPermission(req, res, next){
  req.permissions.map((element)=>{
      if (element === "/admin"){
          return next();
      };
      res.send({message:"You don't hve permission to view this page."})
  })
}

// changes user password in users collection
function changePasswordVerification(req, res, next) {
  if (
    req.body.newPassword == req.body.confirmPassword &&
    req.body.newPassword.length >= 6
  ) {
    req.newUserpassword = req.body.newPassword;
    next();
  } else if (req.body.newPassword.length < 6) {
    res.send({
      message: "The new password needs to be longer than six characters.",
    });
    next();
  } else {
    res.send({
      message: "Conformation Password and New Password does not match.",
    });
    next();
  }
}

// check to see that username is gmail
function checkUserName(req, res, next) {
  const username = req.body.username;
  const suffix = username.slice(-10);
  console.log(suffix);
  if (suffix !== "@gmail.com") {
    res.status(403).send({message:"Username must end with @gmail.com"});
  }else{
    next()
  }
}

module.exports = {
  checkJWTToken,
  changePasswordVerification,
  loginUser,
  checkUserName,
  checkReceivingPermission,
  checkAdminPermission,
  checkDispatchPermission,
  checkProductionPermission
};
