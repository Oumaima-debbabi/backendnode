const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { roles } = require('../roles')

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

async function validatePassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}
exports.deleteUser= async (req, res) => {
	try {
	  const removeUser = await User.findByIdAndDelete(req.params.userId);
	  res.json(removeUser);
	} catch (error) {
	  res.json({ message: error });
	}
  };
exports.grantAccess = function(action, resource) {
  return async (req, res, next) => {
    try {
      const permission = roles.can(req.user.role)[action](resource);
      if (!permission.granted) {
        return res.status(401).json({
          error: "You don't have enough permission to perform this action"
        });
      }
      next()
    } catch (error) {
      next(error)
    }
  }
}

exports.allowIfLoggedin = async (req, res, next) => {
  try {
    const user = res.locals.loggedInUser;
    if (!user)
      return res.status(401).json({
        error: "You need to be logged in to access this route"
      });
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}
// exports.login = async (req, res, next) => {
//     try {
//       const { email, password } = req.body;
//       const user = await User.findOne({ email });
//       if (!user) return next(new Error('Email does not exist'));
//       const validPassword = await validatePassword(password, user.password);
//       if (!validPassword) return next(new Error('Password is not correct'))
//       const accessToken = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
//         expiresIn: "1d"
//       });
//       await User.findByIdAndUpdate(user._id, { accessToken })
//       res.status(200).json({
//         data: { email: user.email,
//             name:user.name,
//              role: user.role },
//         accessToken
//       })
//     } catch (error) {
//       next(error);
//     }
//   }
exports.getAll= function(req, res,) {
    User.find({}, function(err, users){
        if (err){
            next(err);
        } else{
            res.json({status:"success", message: "Users list found!!!", data:{users}});
                        
        }

    });


      }