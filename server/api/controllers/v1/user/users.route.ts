import { Router } from 'express';
// import passport from 'passport';
import UserController from './user.controller';
import { createValidator } from 'express-joi-validation';
import { userIdParam } from './users.validator';
const userRouter: Router = Router();
const userController = new UserController();
const validator = createValidator();

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create User
 *     description: Create User
 *     consumes:
 *       - application/json
 *     tags:
 *       - Users
 *     requestBody:
 *       description: Optional description in *Markdown*
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/User"
 *     responses:
 *       '201':
 *          description: Successful
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/User"
 *       '500':
 *          description: Server Error
 */
userRouter.post(
  '/',
  // passport.authenticate('jwt', { session: false }),
  // validator.body(userCreateRequest),
  userController.createUser
);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: get User
 *     description: Email and
 *     consumes:
 *        - application/json
 *     tags:
 *        - Users
 *     responses:
 *       '200':
 *          description: Successful
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/UserArray"
 *       '404':
 *          description: Error Not found
 */
userRouter.get(
  '/',
  // validator.params(userIdParam),
  userController.getAllUsers
);

export default userRouter;
