/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - role
 *       properties:
 *         email:
 *           type: string
 *         role:
 *           type: number
 *         password:
 *           type: string
 *         isActive:
 *           type: boolean
 *         firstName:
 *           type: string
 *         lastName:
 *           type: number
 *
 *     UserArray:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/User'
 */
