# API Documentation - Swagger

## Access Swagger Documentation

Once the server is running, you can access the Swagger UI documentation at:

```
http://localhost:3000/api-docs
```

## Server Setup

1. **Install Dependencies:**
```bash
npm install
```

2. **Start the Server:**
```bash
npm start
```
or for development with auto-reload:
```bash
npm run dev
```

3. **Open Swagger UI:**
Navigate to `http://localhost:3000/api-docs` in your browser

## API Routes

### Products API
- Base URL: `/api/products`

#### CRUD Operations
- `GET /api/products/getAllProducts` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

#### Filtering
- `POST /api/products/category` - Filter by category
- `POST /api/products/price` - Filter by price range
- `POST /api/products/stock` - Filter by stock availability
- `POST /api/products/date` - Filter by creation date
- `POST /api/products/filter` - Filter by multiple criteria

#### Search
- `POST /api/products/name` - Search by product name
- `POST /api/products/description` - Search by description

#### Sorting
- `POST /api/products/sort/price` - Sort by price
- `POST /api/products/sort/date` - Sort by date
- `POST /api/products/sort/name` - Sort by name
- `POST /api/products/sort/stock` - Sort by stock
- `POST /api/products/sort/category` - Sort by category
- `POST /api/products/sort/multiple` - Sort by multiple criteria

#### Pagination
- `POST /api/products/paginate` - Paginated results

#### Statistics
- `GET /api/products/stats/category` - Statistics by category
- `GET /api/products/stats/price` - Statistics by price range
- `GET /api/products/stats/stock` - Stock availability stats
- `GET /api/products/stats/date` - Statistics by creation date
- `GET /api/products/stats/criteria` - Statistics by multiple criteria

### Users API
- Base URL: `/users`

#### Available Routes
- `GET /users/esm` - Get ESM users
- `GET /users/getAllUsers` - Get all users
- `POST /users/addUser` - Add new user
- `POST /users/addAdmin` - Add new admin
- `PUT /users/updateUser/:id` - Update user
- `DELETE /users/deleteUser/:id` - Delete user
- `POST /users/addUserWithPhoto` - Add user with photo

## Example Requests

### Get All Products
```bash
GET http://localhost:3000/api/products/getAllProducts
```

### Create Product
```bash
POST http://localhost:3000/api/products
Content-Type: application/json

{
  "name": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "category": "Electronics",
  "stock": 50,
  "imageUrl": "image-url.jpg"
}
```

### Filter by Price Range
```bash
POST http://localhost:3000/api/products/price
Content-Type: application/json

{
  "minPrice": 50,
  "maxPrice": 500
}
```

### Get Paginated Results
```bash
POST http://localhost:3000/api/products/paginate
Content-Type: application/json

{
  "page": 1,
  "limit": 10
}
```

### Get Category Statistics
```bash
GET http://localhost:3000/api/products/stats/category
```

## Seeding Database with Sample Data

To populate the database with 30 sample products:

```bash
node seed.js
```

This will add various products across different categories:
- Electronics
- Accessories
- Audio
- Storage
- Hardware
- Cables
- Furniture

## Database

- **MongoDB** - Used for data storage
- **Mongoose** - ODM for MongoDB

## Notes

- All responses are in JSON format
- Error responses include detailed error messages
- Timestamps (createdAt, updatedAt) are automatically managed by MongoDB
- Images are stored as URL references in the database
