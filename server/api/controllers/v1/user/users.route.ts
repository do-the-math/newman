import { Router } from 'express';
// import passport from 'passport';
import UserController from './user.controller';

const userRouter: Router = Router();
const userController = new UserController();
// const validator = createValidator();

/**
 * @swagger
 * /users:
 *    post:
 *     security:
 *      - JwtTokenAuth: []
 *     summary: Create User
 *     description: Email and
 *     consumes:
 *         - application/json
 *     tags:
 *         - Users
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *          $ref: "#/components/schemas/User"
 *     responses:
 *       200:
 *        description: Created Successfully
 *       500:
 *        description: INTERNAL_SERVER_ERROR
 */
userRouter.post(
  '/',
  // passport.authenticate('jwt', { session: false }),
  // validator.body(userCreateRequest),
  userController.createUser
);

export default userRouter;
