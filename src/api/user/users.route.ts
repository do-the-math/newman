import { celebrate } from 'celebrate';
import { Router } from 'express';
// import passport from 'passport';
import UserController from './user.controller';
import { userCreateReqSchema } from './users.validator';

const userRouter: Router = Router();
const userController = new UserController();

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
 *       '400':
 *          description: Bad Request
 *       '500':
 *          description: Server Error
 */
userRouter.post(
  '/',
  celebrate(userCreateReqSchema, {
    abortEarly: false
  }),
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
 *                $ref: "#/components/schemas/UserList"
 *       '404':
 *          description: Not found
 *       '400':
 *          description: Bad Request
 *       '500':
 *          description: Server Error
 */
userRouter.get(
  '/',
  // passport.authenticate('jwt', { session: false }),
  userController.getAllUsers
);

export default userRouter;
