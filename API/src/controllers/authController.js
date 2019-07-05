import Helper from '../helpers/helper';
import users from '../data/data-structure/users';
import userServices from '../services/userServices';

class AuthController {
  /* eslint camelcase: 0 */
  static async createAccount(req, res) {
    const {
      email,
      first_name,
      last_name,
      password,
      phoneNumber,
      address
    } = req.body;

    try {
      const id = Helper.generateID(users);
      const pass = await userServices.encrptPassword(password);
      const user = {
        id,
        email,
        first_name,
        last_name,
        address,
        phoneNumber,
        password: pass,
        is_admin: false
      };
      const status = userServices.save(user);
      if (status) {
        const token = userServices.generateToken(id, false);
        return res.status(201).json({
          status: 'Success',
          data: {
            token,
            id,
            first_name,
            last_name,
            email
          }
        });
      }
      throw new Error('Error Creating new User');
    } catch (err) {
      return res.status(500).json({
        status: '500 Internal server error',
        error: 'Error Creating new User'
      });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await userServices.emailExist(email);
      if (!user)
        return res.status(401).json({
          status: '401 Unauthorized',
          error: 'Invalid Email'
        });
      const isMatch = await userServices.verifyPassword(
        password,
        user.password
      );
      if (!isMatch)
        return res.status(401).json({
          status: '401 Unauthorized',
          error: 'Incorrect Password'
        });
      const { id, first_name, last_name } = user;
      const token = userServices.generateToken();
      return res.status(200).json({
        status: 'Success',
        data: {
          token,
          id,
          first_name,
          last_name,
          email
        }
      });
    } catch (e) {
      return res.status(500).json({
        status: '500 Server Interval Error',
        error: 'Internal server error occured'
      });
    }
  }
}
export default AuthController;