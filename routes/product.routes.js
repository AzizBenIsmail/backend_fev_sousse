var express = require('express');
var router = express.Router();
const productController = require('../controllers/product.controller');

/**
 * @swagger
 * /api/products/getAllProducts:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get all products
 *     description: Retrieve list of all products
 *     responses:
 *       200:
 *         description: List of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 */
// GET all products
router.get('/getAllProducts', productController.getAllProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
// GET product by ID
router.get('/products/:id', productController.getProductById);

/**
 * @swagger
 * /api/products:
 *   post:
 *     tags:
 *       - Products
 *     summary: Add new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 */
// POST - Add new product
router.post('/products', productController.addProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     tags:
 *       - Products
 *     summary: Update product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
// PUT - Update product by ID
router.put('/products/:id', productController.updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     tags:
 *       - Products
 *     summary: Delete product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
// DELETE product by ID
router.delete('/products/:id', productController.deleteProduct);

/**
 * @swagger
 * /api/products/count:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get products count
 *     responses:
 *       200:
 *         description: Total count of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: number
 *       500:
 *         description: Server error
 */
// GET products count
router.get('/count', productController.getProductsCount);

/**
 * @swagger
 * /api/products/category:
 *   post:
 *     tags:
 *       - Products - Filter
 *     summary: Filter products by category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Products filtered by category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 */
// POST - Filter by category
router.post('/category', productController.getProductsByCategory);

/**
 * @swagger
 * /api/products/price:
 *   post:
 *     tags:
 *       - Products - Filter
 *     summary: Filter products by price range
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               minPrice:
 *                 type: number
 *               maxPrice:
 *                 type: number
 *     responses:
 *       200:
 *         description: Products in price range
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 */
// POST - Filter by price range
router.post('/price', productController.getProductsByPriceRange);

/**
 * @swagger
 * /api/products/stock:
 *   post:
 *     tags:
 *       - Products - Filter
 *     summary: Filter products by stock availability
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               inStock:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Products filtered by stock
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 */
// POST - Filter by stock availability
router.post('/stock', productController.getProductsByStockAvailability);

/**
 * @swagger
 * /api/products/name:
 *   post:
 *     tags:
 *       - Products - Search
 *     summary: Search products by name
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Products matching the name
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 */
// POST - Search by name
router.post('/name', productController.getProductsByName);

/**
 * @swagger
 * /api/products/description:
 *   post:
 *     tags:
 *       - Products - Search
 *     summary: Search products by description
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Products matching the description
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 */
// POST - Search by description
router.post('/description', productController.getProductsByDescription);

/**
 * @swagger
 * /api/products/date:
 *   post:
 *     tags:
 *       - Products - Filter
 *     summary: Filter products by creation date
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Products created in date range
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 */
// POST - Filter by creation date
router.post('/date', productController.getProductsByCreationDate);

/**
 * @swagger
 * /api/products/filter:
 *   post:
 *     tags:
 *       - Products - Filter
 *     summary: Filter products by multiple criteria
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               minPrice:
 *                 type: number
 *               maxPrice:
 *                 type: number
 *               inStock:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Filtered products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 */
// POST - Filter by multiple criteria
router.post('/filter', productController.getProductsByMultipleCriteria);

/**
 * @swagger
 * /api/products/sort/price:
 *   post:
 *     tags:
 *       - Products - Sort
 *     summary: Get products sorted by price
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sortOrder:
 *                 type: string
 *                 enum: ['asc', 'desc']
 *     responses:
 *       200:
 *         description: Sorted products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 */
// POST - Sort by price
router.post('/sort/price', productController.getProductsSortedByPrice);

/**
 * @swagger
 * /api/products/sort/date:
 *   post:
 *     tags:
 *       - Products - Sort
 *     summary: Get products sorted by creation date
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sortOrder:
 *                 type: string
 *                 enum: ['asc', 'desc']
 *     responses:
 *       200:
 *         description: Sorted products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 */
// POST - Sort by creation date
router.post('/sort/date', productController.getProductsSortedByCreationDate);

/**
 * @swagger
 * /api/products/sort/name:
 *   post:
 *     tags:
 *       - Products - Sort
 *     summary: Get products sorted by name
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sortOrder:
 *                 type: string
 *                 enum: ['asc', 'desc']
 *     responses:
 *       200:
 *         description: Sorted products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 */
// POST - Sort by name
router.post('/sort/name', productController.getProductsSortedByName);

/**
 * @swagger
 * /api/products/sort/stock:
 *   post:
 *     tags:
 *       - Products - Sort
 *     summary: Get products sorted by stock
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sortOrder:
 *                 type: string
 *                 enum: ['asc', 'desc']
 *     responses:
 *       200:
 *         description: Sorted products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 */
// POST - Sort by stock
router.post('/sort/stock', productController.getProductsSortedByStock);

/**
 * @swagger
 * /api/products/sort/category:
 *   post:
 *     tags:
 *       - Products - Sort
 *     summary: Get products sorted by category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sortOrder:
 *                 type: string
 *                 enum: ['asc', 'desc']
 *     responses:
 *       200:
 *         description: Sorted products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 */
// POST - Sort by category
router.post('/sort/category', productController.getProductsSortedByCategory);

/**
 * @swagger
 * /api/products/sort/multiple:
 *   post:
 *     tags:
 *       - Products - Sort
 *     summary: Get products sorted by multiple criteria
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sortBy:
 *                 type: string
 *               sortOrder:
 *                 type: string
 *                 enum: ['asc', 'desc']
 *     responses:
 *       200:
 *         description: Sorted products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 */
// POST - Sort by multiple criteria
router.post('/sort/multiple', productController.getProductsSortedByMultipleCriteria);

/**
 * @swagger
 * /api/products/paginate:
 *   post:
 *     tags:
 *       - Products - Pagination
 *     summary: Get products with pagination
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               page:
 *                 type: number
 *                 default: 1
 *               limit:
 *                 type: number
 *                 default: 10
 *     responses:
 *       200:
 *         description: Paginated products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 */
// POST - Pagination
router.post('/paginate', productController.getProductsWithPagination);

/**
 * @swagger
 * /api/products/stats/category:
 *   get:
 *     tags:
 *       - Products - Statistics
 *     summary: Get statistics by category
 *     responses:
 *       200:
 *         description: Category statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   totalProducts:
 *                     type: number
 *                   averagePrice:
 *                     type: number
 *       500:
 *         description: Server error
 */
// GET - Statistics by category
router.get('/stats/category', productController.statiqticsByCategory);

/**
 * @swagger
 * /api/products/stats/price:
 *   get:
 *     tags:
 *       - Products - Statistics
 *     summary: Get statistics by price range
 *     responses:
 *       200:
 *         description: Price range statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   count:
 *                     type: number
 *       500:
 *         description: Server error
 */
// GET - Statistics by price range
router.get('/stats/price', productController.statiqticsByPriceRange);

/**
 * @swagger
 * /api/products/stats/stock:
 *   get:
 *     tags:
 *       - Products - Statistics
 *     summary: Get statistics by stock availability
 *     responses:
 *       200:
 *         description: Stock availability statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   count:
 *                     type: number
 *       500:
 *         description: Server error
 */
// GET - Statistics by stock availability
router.get('/stats/stock', productController.statiqticsByStockAvailability);

/**
 * @swagger
 * /api/products/stats/date:
 *   get:
 *     tags:
 *       - Products - Statistics
 *     summary: Get statistics by creation date
 *     responses:
 *       200:
 *         description: Creation date statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   count:
 *                     type: number
 *       500:
 *         description: Server error
 */
// GET - Statistics by creation date
router.get('/stats/date', productController.statiqticsByCreationDate);

/**
 * @swagger
 * /api/products/stats/criteria:
 *   get:
 *     tags:
 *       - Products - Statistics
 *     summary: Get statistics by multiple criteria
 *     responses:
 *       200:
 *         description: Multiple criteria statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: object
 *                   count:
 *                     type: number
 *       500:
 *         description: Server error
 */
// GET - Statistics by multiple criteria
router.get('/stats/criteria', productController.statiqticsByMultipleCriteria);

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         category:
 *           type: string
 *         stock:
 *           type: number
 *         imageUrl:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     ProductInput:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - category
 *         - stock
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         category:
 *           type: string
 *         stock:
 *           type: number
 *         imageUrl:
 *           type: string
 */

module.exports = router;
