import { Router } from 'express';
import AuthController from './auth.controller';

const authRouter: Router = Router();
const authController = new AuthController();

/**
 * @swagger
 * components:
 *  schemas:
 *    login:
 *        type: object
 *        required:
 *          - email
 *          - password
 *        properties:
 *          email:
 *            type: string
 *          password:
 *            type: string
 *        example:
 *          email : "aman@gmail.com"
 *          password : "123456"
 *
 *    AuthLink:
 *        type: object
 *        required:
 *          - email
 *        properties:
 *          email:
 *            type: string
 *        example:
 *          email : "aman@gmail.com"
 *
 *    verify:
 *        type: object
 *        required:
 *          - email
 *          - token
 *        properties:
 *          email:
 *            type: string
 *          token:
 *            type: string
 *        example:
 *          email : "test@gmail.com"
 *          token : "paste refresh token"
 *
 *    refreshToken:
 *        type: object
 *        required:
 *          - refreshToken
 *        properties:
 *          refreshToken:
 *            type: string
 *        example:
 *          refreshToken : "paste refresh token here"
 */

/**
 * @swagger
 * /auth/login:
 *    post:
 *     summary : User Login endpoint
 *     description:  Any User who has the password set can use this api to authenticate. The user needs email and password. If no password is set at the time of registration, then request a auth link or update the password.
 *     consumes:
 *         - application/json
 *     tags:
 *         - Authentication
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *          $ref: "#/components/schemas/login"
 *     responses:
 *       200:
 *        description: Authenticated Successfully
 *       401:
 *        description: Unauthenticated
 */
authRouter.get('/login', authController.login);

export default authRouter;
