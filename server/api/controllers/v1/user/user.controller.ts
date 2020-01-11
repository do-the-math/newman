import 'reflect-metadata';
import { Controller, Get, Post, Req, Res } from 'routing-controllers';
import { Request, Response } from '../../../../types/express.extensions';
/**
 * @swagger
 * components:
 *   schemas:
 *    user:
 *        type: object
 *        required:
 *          - email
 *          - role
 *        properties:
 *          email:
 *            type: string
 *          role:
 *            type: number
 *          password:
 *            type: string
 *          isActive:
 *            type: boolean
 *          firstName:
 *            type: string
 *          lastName:
 *            type: number
 *          address:
 *            type: object
 *
 */

@Controller(`/v1/users`)
export class UserController {
  /**
   * @swagger
   * /users:
   *    post:
   *     security:
   *      - JwtTokenAuth: []
   *     summary: Create User
   *     description: ''
   *     consumes:
   *         - application/json
   *     tags:
   *         - Users
   *     requestBody:
   *      required: true
   *      content:
   *       application/json:
   *        schema:
   *          $ref: "#/components/schemas/user"
   *     responses:
   *       200:
   *        description: Created Successfully
   *       500:
   *        description: INTERNAL_SERVER_ERROR
   */
  @Post('/')
  createOne(@Req() request: Request, @Res() response: Response): any {
    return 'This action returns user #';
  }

  @Get('/')
  getAll(@Req() request: Request, @Res() response: Response): any {
    return 'This action returns user #';
  }

  @Post('/')
  getOne(): string {
    return 'This action returns user #';
  }
}
