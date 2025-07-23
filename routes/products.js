const express = require('express');
const { body } = require('express-validator');
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validate = require('../middleware/validate');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: Product endpoints
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products (with optional filters)
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Product category
 *       - in: query
 *         name: featured
 *         schema:
 *           type: boolean
 *         description: Filter by featured
 *     responses:
 *       200:
 *         description: List of products
 */
router.get('/', productController.getProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product found
 *       404:
 *         description: Product not found
 */
router.get('/:id', productController.getProductById);

// Admin routes
router.post('/',
  auth,
  admin,
  [
    body('title').notEmpty(),
    body('description').notEmpty(),
    body('price').isNumeric(),
    body('category').notEmpty(),
    body('sizes').isArray({ min: 1 }),
    body('imageUrl').isURL()
  ],
  validate,
  productController.createProduct
);

router.put('/:id',
  auth,
  admin,
  [
    body('title').optional().notEmpty(),
    body('description').optional().notEmpty(),
    body('price').optional().isNumeric(),
    body('category').optional().notEmpty(),
    body('sizes').optional().isArray({ min: 1 }),
    body('imageUrl').optional().isURL()
  ],
  validate,
  productController.updateProduct
);

router.delete('/:id', auth, admin, productController.deleteProduct);

module.exports = router;
