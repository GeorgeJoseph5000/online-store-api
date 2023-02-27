# API Requirements

# Data Shapes

<table>
    <thead>
        <tr>
            <th>Object</th>
            <th>Data Shape</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody align="center">
        <!-- User -->
        <th rowspan=7>User</th>
        <tr>
            <td>id</td>
            <td>User's ID</td>
        </tr>
        <tr>
            <td>first_name</td>
            <td>User's First Name</td>
        </tr>
        <tr>
            <td>last_name</td>
            <td>User's Last Name</td>
        </tr>
        <tr>
            <td>user_name</td>
            <td>User's Desired Username</td>
        </tr>
        <tr>
            <td>email</td>
            <td>User's Email</td>
        </tr>
        <tr>
            <td>password</td>
            <td>User's Desired Password</td>
        </tr>
        <!-- Product -->
        <th rowspan=5>Product</th>
        <tr>
            <td>id</td>
            <td>Product's ID</td>
        </tr>
        <tr>
            <td>name</td>
            <td>Product's Name</td>
        </tr>
        <tr>
            <td>price</td>
            <td>Product's Price</td>
        </tr>
        <tr>
            <td>category</td>
            <td>Product's Category</td>
        </tr>
        <!-- Order -->
        <th rowspan=8>Order</th>
        <tr>
            <td>id</td>
            <td>Order's ID</td>
        </tr>
        <tr>
            <td>is_done</td>
            <td>Order's Status</td>
        </tr>
        <tr>
            <td>user_id</td>
            <td>Order's UserID</td>
        </tr>
        <tr>
            <td>products_ids</td>
            <td>Order's Products IDs</td>
        </tr>
        <tr>
            <td>products_quantities</td>
            <td>Order's Products Quantities</td>
        </tr>
        <tr>
            <td>date_time</td>
            <td>Order's ISO Date</td>
        </tr>
        <tr>
            <td>date_time_readable</td>
            <td>Order's String Date</td>
        </tr>
        <!-- OrderProduct -->
        <th rowspan=7>OrderProduct</th>
        <tr>
            <td>id</td>
            <td>OrderProduct's ID</td>
        </tr>
        <tr>
            <td>order_id</td>
            <td>Order's ID</td>
        </tr>
        <tr>
            <td>product_id</td>
            <td>Product's ID</td>
        </tr>
        <tr>
            <td>product_quantity</td>
            <td>Product's Quantity</td>
        </tr>
        <tr>
            <td>date_time</td>
            <td>Order's ISO Date</td>
        </tr>
        <tr>
            <td>date_time_readable</td>
            <td>Order's String Date</td>
        </tr>
        <!-- ProductsInOrders -->
        <th rowspan=13>ProductsInOrder</th>
        <tr>
            <td>order_id</td>
            <td>Order's ID</td>
        </tr>
        <tr>
            <td>is_done</td>
            <td>Order's Status</td>
        </tr>
        <tr>
            <td>date_time</td>
            <td>Order's ISO Date</td>
        </tr>
        <tr>
            <td>date_time_readable</td>
            <td>Order's String Date</td>
        </tr>
        <tr>
            <td>user_id</td>
            <td>User's ID</td>
        </tr>
        <tr>
            <td>user_name</td>
            <td>User's ID</td>
        </tr>
        <tr>
            <td>product_id</td>
            <td>Product's ID</td>
        </tr>
        <tr>
            <td>product_name</td>
            <td>Product's Name</td>
        </tr>
        <tr>
            <td>product_category</td>
            <td>Product's Category</td>
        </tr>
        <tr>
            <td>product_price</td>
            <td>Product's Price</td>
        </tr>
        <tr>
            <td>product_quantity</td>
            <td>Product's Quantity</td>
        </tr>
        <tr>
            <td>total_price</td>
            <td>Product's Total Price Per Order</td>
        </tr>
        <!-- OrdersPerUser -->
        <th rowspan=5>OrdersPerUser</th>
        <tr>
            <td>order_id</td>
            <td>Order's ID</td>
        </tr>
        <tr>
            <td>is_done</td>
            <td>Order's Status</td>
        </tr>
        <tr>
            <td>date_time_readable</td>
            <td>Order's String Date</td>
        </tr>
        <tr>
            <td>total_cost</td>
            <td>Order's Total Cost</td>
        </tr>
        <!-- TopProduct -->
        <th rowspan=5>TopProduct</th>
        <tr>
            <td>product_id</td>
            <td>Product's ID</td>
        </tr>
        <tr>
            <td>product_name</td>
            <td>Product's Name</td>
        </tr>
        <tr>
            <td>total_quantity</td>
            <td>Product's Total Ordered Quantity</td>
        </tr>
        <tr>
            <td>x_orders</td>
            <td>Product is Found In {X} Number Of Orders</td>
        </tr>
    </tbody>
</table>



# Database Schemas

## `products` Table Schema

- Table "`public.products`"
    | Column | Type | Collation | Nullable | Default |
    | ------ | ------ | ------ | ------ | ------ |
    | `id` | uuid | | not null | uuid_generate_v4() |
    | `name` | character varying(100) | | not null | |
    | `price` | double precision | | not null | |
    | `category` | character varying(50) | | not null | |

- Indexes:
    "`products_pkey`" PRIMARY KEY, btree (`id`)
- Referenced by:
    TABLE "`order_products`" CONSTRAINT "`order_products_product_id_fkey`" FOREIGN KEY (`product_id`) REFERENCES `products(id)`


## `users` Table Schema

- Table "`public.users`"

    | Column | Type | Collation | Nullable | Default |
    | ------ | ------ | ------ | ------ | ------ |
    | `id` | uuid | | not null | uuid_generate_v4() |
    | `first_name` | character varying(100) | | not null | |
    | `last_name` | character varying(100) | | not null | |
    | `user_name` | character varying(50)  | | not null | |
    | `email` | character varying(255) | | not null | |
    | `password` | character varying(100) | | not null | |

- Indexes:
    "`users_pkey`" PRIMARY KEY, btree (`id`)

- Referenced by:
    TABLE "`orders`" CONSTRAINT "`orders_user_id_fkey`" FOREIGN KEY (`user_id`) REFERENCES `users(id)`


## `orders` Table Schema

- Table "`public.orders`"
    | Column | Type | Collation | Nullable | Default |
    | ------ | ------ | ------ | ------ | ------ |
    | `id` | uuid | | not null | uuid_generate_v4() |
    | `is_done` | boolean   | | not null | |
    | `user_id` | uuid      | | not null | |
    | `products_ids` | uuid [ ]    | | not null | |
    | `products_quantities` | integer [ ] | | not null | |
    | `date_time` | timestamp with time zone | | not null | |
    | `date_time_readable` | character varying(80) | | not null | |

- Indexes:
    "`orders_pkey`" PRIMARY KEY, btree (`id`)
- Foreign-key constraints:
    "`orders_user_id_fkey`" FOREIGN KEY (`user_id`) REFERENCES `users(id)`
- Referenced by:
    TABLE "`order_products`" CONSTRAINT "`order_products_order_id_fkey`" FOREIGN KEY (`order_id`) REFERENCES `orders(id)`

## `order_products` Table Schema

- Table "`public.order_products`"
    | Column | Type | Collation | Nullable | Default |
    | ------ | ------ | ------ | ------ | ------ |
    | id | uuid | | not null | uuid_generate_v4() |
    | order_id | uuid | | not null | |
    | product_id | uuid | | not null | |
    | product_quantity | integer | | not null | |
    | `date_time` | timestamp with time zone | | not null | |
    | `date_time_readable` | character varying(80) | | not null | |

- Indexes:
    "`order_products_pkey`" PRIMARY KEY, btree (`id`)
- Foreign-key constraints:
    "`order_products_order_id_fkey`" FOREIGN KEY (`order_id`) REFERENCES `orders(id)`
    "`order_products_product_id_fkey`" FOREIGN KEY (`product_id`) REFERENCES `products(id)`







# Endpoints

## `/products` Endpoints

### Create New Product



- **HTTP Method**: **`POST`**
- **Endpoint**: **`/products/create`**
- **Request Body**: **`Product object`** **[ token required ]**
- **Request Params**: **`N/A`**
- **Response Body**: **`Product object`**
- **Example**:

    ```http
    - Request URL: /products/create/
    ```

    ```json
    - Request Body:
        {
            "name": "icecape",
            "price": 10.99,
            "category": "Clothes"
        }
    ```

    ```json
    - Response Body:
        {
            "status": "201 Created",
            "product": {
                "id": "515de79c-a194-47d1-8e76-af097da06ed0",
                "name": "icecape",
                "price": 10.99,
                "categoty": "Clothing"
            },
            "message": "Product created successfully."
        }
    ```

### Show Specific Product



- **HTTP Method**: **`GET`**
- **Endpoint**: **`/products/:productID`**
- **Request Body**: **`N/A`** **[ token required ]**
- **Request Params**: **`:productID [UUIDv4]`**
- **Response Body**: **`Product object`**
- **Example**:

    ```http
    - Request URL: /products/515de79c-a194-47d1-8e76-af097da06ed0
    ```

    ```json
    - Response Body:
        {
            "status": "200 Ok",
            "product": {
                "id": "515de79c-a194-47d1-8e76-af097da06ed0",
                "name": "icecape",
                "price": 10.99,
                "category": "Clothing"
            },
            "message": "Product shown successfully."
        }
    ```

### Show All Products



- **HTTP Method**: **`GET`**
- **Endpoint**: **`/products`**
- **Request Body**: **`N/A`** **[ token required ]**
- **Request Params**: **`N/A`**
- **Response Body**: **`Array of Product objects`**
- **Example**:

    ```http
    - Request URL: /products
    ```

    ```json
    - Response Body:
        {
            "status": "200 Ok",
            "totalProducts": 2,
            "products": [{
                "id": "515de79c-a194-47d1-8e76-af097da06ed0",
                "name": "icecape",
                "price": 10.99,
                "category": "Clothing"
            },
            {
                "id": "de26da30-2622-4f46-b777-a698c216f365",
                "name": "Hat",
                "price": 9.88,
                "category": "Clothing"
            }],
            "message": "Products shown successfully."
        }
    ```

### Update Specific Product



- **HTTP Method**: **`PUT`**
- **Endpoint**: **`/products/:productID`**
- **Request Body**: **`Product object`** **[ token required ]**
- **Request Params**: **`:productID [UUIDv4]`**
- **Response Body**: **`Product object`**
- **Example**:

    ```http
    - Request URL: /products/515de79c-a194-47d1-8e76-af097da06ed0
    ```

    ```json
    - Request Body:
        {
            "name": "icecape",
            "price": 40.88,
            "category": "Clothing"
        }
    ```

    ```json
    - Response Body:
        {
            "status": "200 Ok",
            "product": {
                "id": "515de79c-a194-47d1-8e76-af097da06ed0",
                "name": "icecape",
                "price": 40.88,
                "category": "Clothing"
            },
            "message": "Product updated successfully."
        }
    ```

### Delete Specific Product



- **HTTP Method**: **`DELETE`**
- **Endpoint**: **`/products/:productID`**
- **Request Body**: **`N/A`** **[ token required ]**
- **Request Params**: **`:productID [UUIDv4]`**
- **Response Body**: **`Product object`**
- **Example**:

    ```http
    - Request URL: /products/515de79c-a194-47d1-8e76-af097da06ed0
    ```

    ```json
    - Response Body:
        {
            "status": "200 Ok",
            "product": {
                "id": "515de79c-a194-47d1-8e76-af097da06ed0",
                "name": "icecape",
                "price": 10.99,
                "category": "Clothing"
            },
            "message": "Product deleted successfully."
        }
    ```



## `/users` Endpoints

### Authenticate Specific User



- **HTTP Method**: **`POST`**
- **Endpoint**: **`/users/signin`**
- **Request Body**: **`User object`**
- **Request Params**: **`N/A`**
- **Response Body**: **`User object` + `token`**
- **Example**:

    ```http
    - Request URL: /users/signin/
    ```

    ```json
    - Request Body:
        {
            "email": "george5000@mail.com",
            "password": "123456789"
        }
    ```

    ```json
    - Response Body:
        {
            "status": "202 Accepted",
            "user": {
                "id": "f451d697-69c2-4198-8231-f6054841bfaf",
                "first_name": "George",
                "last_name": "Joseph",
                "user_name": "george5000",
                "email": "george5000@mail.com",
                "password": "$2a$10$fqs3/GySb7T6ZSDfLy.o1OLnx1Y241vt7D0zT7p/.6JZDYbYIRzMi",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiYjUwYjNiYTktYmY5MS00YjA1LWJmODAtNTlkOTljNzFkYmE0IiwiZmlyc3RfbmFtZSI6IklicmFoaW0iLCJsYXN0X25hbWUiOiJFbC1Nb2todGFyIiwidXNlcl9uYW1lIjoiaWJyYWhpbWVsbW9raHRhciIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJDU3cGFIQ1hURm1jdDRTam04ZU1PVXU0NnpGcmMySFBCU1BrZlpVelYwdXlLWkNHa3c5WkJDIn0sImlhdCI6MTY1MjI3NzUzNX0.7pPPtjDomqteV0byD89oAQw6F5coF5l7ZOVo0O-gep0"
            },
            "message": "User authenticated successfully."
        }
    ```


### Show All Users

- **HTTP Method**: **`GET`**
- **Endpoint**: **`/users`**
- **Request Body**: **`N/A`** **[ token required ]**
- **Request Params**: **`N/A`**
- **Response Body**: **`Array of User objects`**
- **Example**:

    ```http
    - Request URL: /users
    ```

    ```json
    - Response Body:
        {
            "status": "200 Ok",
            "totalUsers": 2,
            "users": [{
                "id": "f451d697-69c2-4198-8231-f6054841bfaf",
                "first_name": "George",
                "last_name": "Joseph",
                "user_name": "george5000",
                "email": "george5000@mail.com",
                "password": "$2a$10$fqs3/GySb7T6ZSDfLy.o1OLnx1Y241vt7D0zT7p/.6JZDYbYIRzMi"
            },
            {
                "id": "b2eee22f-4e60-464d-9456-314ae190388d",
                "first_name": "James",
                "last_name": "Bond",
                "user_name": "jamesbond",
                "email": "email@email.com",
                "password": "$2b$10$JzbrVDsB0AbYmDYV7TgqGuTNKiHJP9brF1xVrV6krgNw/VBoRemce"
            }],
            "message": "Users shown successfully."
        }
    ```


### Create New User


- **HTTP Method**: **`POST`**
- **Endpoint**: **`/users/signup`**
- **Request Body**: **`User object`**
- **Request Params**: **`N/A`**
- **Response Body**: **`User object`**
- **Example**:

    ```http
    - Request URL: /users/signup/
    ```

    ```json
    - Request Body:
        {
            "first_name": "George",
            "last_name": "Joseph",
            "user_name": "george5000",
            "email": "george5000@mail.com",
            "password": "123456789"
        }
    ```

    ```json
    - Response Body:
        {
            "status": "201 Created",
            "user": {
                "id": "f451d697-69c2-4198-8231-f6054841bfaf",
                "first_name": "George",
                "last_name": "Joseph",
                "user_name": "george5000",
                "email": "george5000@mail.com",
                "password": "$2a$10$fqs3/GySb7T6ZSDfLy.o1OLnx1Y241vt7D0zT7p/.6JZDYbYIRzMi"
            },
            "message": "User created successfully."
        }
    ```


### Show Specific User



- **HTTP Method**: **`GET`**
- **Endpoint**: **`/users/:userID`**
- **Request Body**: **`N/A`** **[ token required ]**
- **Request Params**: **`:userID [UUIDv4]`**
- **Response Body**: **`User object`**
- **Example**:

    ```http
    - Request URL: /users/f451d697-69c2-4198-8231-f6054841bfaf
    ```

    ```json
    - Response Body:
        {
            "status": "200 Ok",
            "user": {
                "id": "f451d697-69c2-4198-8231-f6054841bfaf",
                "first_name": "George",
                "last_name": "Joseph",
                "user_name": "george5000",
                "email": "george5000@mail.com",
                "password": "$2a$10$fqs3/GySb7T6ZSDfLy.o1OLnx1Y241vt7D0zT7p/.6JZDYbYIRzMi",
                "recentOrders": [{
                    "order_id": "803d11b3-6cd9-45e5-b497-bf7479445245",
                    "is_done": false,
                    "date_time_readable": "Tues Jan 10 2023 17:44:59 GMT+0200 (Eastern European Standard Time)",
                    "total_cost": 64.94
                },
                {
                    "order_id": "df983eba-d894-4f53-975f-738dcd82b265",
                    "is_done": false,
                    "date_time_readable": "Tues Jan 10 2023 17:44:59 GMT+0200 (Eastern European Standard Time)",
                    "total_cost": 24.950000000000003
            }]},
            "message": "User shown successfully."
        }
    ```


### Delete Specific User


- **HTTP Method**: **`DELETE`**
- **Endpoint**: **`/users/:userID`**
- **Request Body**: **`N/A`** **[ token required ]**
- **Request Params**: **`:userID [UUIDv4]`**
- **Response Body**: **`User object`**
- **Example**:

    ```http
    - Request URL: /users/d485b697-69c2-4198-8231-f6054841baaf
    ```

    ```json
    - Response Body:
        {
            "status": "200 Ok",
            "user": {
                "id": "f451d697-69c2-4198-8231-f6054841bfaf",
                "first_name": "George",
                "last_name": "Joseph",
                "user_name": "george5000",
                "email": "george5000@mail.com",
                "password": "$2a$10$fqs3/GySb7T6ZSDfLy.o1OLnx1Y241vt7D0zT7p/.6JZDYbYIRzMi"
            },
            "message": "User deleted successfully."
        }
    ```





### Update Specific User



- **HTTP Method**: **`PUT`**
- **Endpoint**: **`/users/:userID`**
- **Request Body**: **`User object`** **[ token required ]**
- **Request Params**: **`:userID [UUIDv4]`**
- **Response Body**: **`User object`**
- **Example**:

    ```http
    - Request URL: /users/f451d697-69c2-4198-8231-f6054841bfaf
    ```

    ```json
    - Request Body:
        {
            "first_name": "George",
            "last_name": "Joseph",
            "user_name": "george5000",
            "email": "george5000@mail.com",
            "password": "123456789"
        }
    ```

    ```json
    - Response Body:
        {
            "status": "200 Ok",
            "user": {
                "id": "f451d697-69c2-4198-8231-f6054841bfaf",
                "first_name": "George",
                "last_name": "Joseph",
                "user_name": "george5000",
                "email": "george5000@mail.com",
                "password": "$2a$10$fqs3/GySb7T6ZSDfLy.o1OLnx1Y241vt7D0zT7p/.6JZDYbYIRzMi"
            },
            "message": "User updated successfully."
        }
    ```


## `/orders` Endpoints

### Create New Order



- **HTTP Method**: **`POST`**
- **Endpoint**: **`/orders/create`**
- **Request Body**: **`Order object`** **[ token required ]**
- **Request Params**: **`N/A`**
- **Response Body**: **`Order object`**
- **Example**:

    ```http
    - Request URL: /orders/create/
    ```

    ```json
    - Request Body:
        {
            "user_id": "08068ea7-471c-402e-8f89-f3437a205a48",
            "is_done": false,
            "products_ids_": ["53d01fd5-7fcb-4f1e-84d7-227c50089651", "3dce8160-630e-4cb9-8a75-0bb8fcf638dc"],
            "products_quantities": [2, 1]
        }
    ```

    ```json
    - Response Body:
        {
            "status": "201 Created",
            "order": {
                "id": "4428b5d9-a52f-4fa8-8494-92bf5c050c04",
                "is_done": false,
                "user_id": "08068ea7-471c-402e-8f89-f3437a205a48",
                "products_ids": [
                    "53d01fd5-7fcb-4f1e-84d7-227c50089651",
                    "3dce8160-630e-4cb9-8a75-0bb8fcf638dc"
                ],
                "products_quantities": [
                    2,
                    1
                ],
                "date_time": "2023-01-09T22:46:57.951Z",
                "date_time_readable": "Mon Jan 9 2023 00:46:57 GMT+0200 (Eastern European Standard Time)"
            },
            "message": "Order created successfully."
        }
    ```

### Show Specific Order



- **HTTP Method**: **`GET`**
- **Endpoint**: **`/orders/:orderID`**
- **Request Body**: **`N/A`** **[ token required ]**
- **Request Params**: **`:orderID [UUIDv4]`**
- **Response Body**: **`order object`**
- **Example**:

    ```http
    - Request URL: /orders/4428b5d9-a52f-4fa8-8494-92bf5c050c04
    ```

    ```json
    - Response Body:
        {
            "status": "200 Ok",
            "order": {
                "id": "4428b5d9-a52f-4fa8-8494-92bf5c050c04",
                "is_done": false,
                "user_id": "08068ea7-471c-402e-8f89-f3437a205a48",
                "products_ids": [
                    "53d01fd5-7fcb-4f1e-84d7-227c50089651",
                    "3dce8160-630e-4cb9-8a75-0bb8fcf638dc"
                ],
                "products_quantities": [
                    2,
                    1
                ],
                "date_time": "2023-01-09T22:46:57.951Z",
                "date_time_readable": "Mon Jan 9 2023 00:46:57 GMT+0200 (Eastern European Standard Time)"
            },
            "message": "Order shown successfully."
        }
    ```

### Show All Orders



- **HTTP Method**: **`GET`**
- **Endpoint**: **`/orders`**
- **Request Body**: **`N/A`** **[ token required ]**
- **Request Params**: **`N/A`**
- **Response Body**: **`Array of Order objects`**
- **Example**:

    ```http
    - Request URL: /orders
    ```

    ```json
    - Response Body:
        {
        "status": "200 Ok",
        "totalOrders": 2,
        "orders": [{
                "id": "3bc72e17-10d0-4f81-bd8e-0b0f72791b78",
                "is_done": false,
                "user_id": "08068ea7-471c-402e-8f89-f3437a205a48",
                "products_ids": [
                    "53d01fd5-7fcb-4f1e-84d7-227c50089651"
                ],
                "products_quantities": [ 3 ],
                "date_time": "2023-01-09T22:46:57.951Z",
                "date_time_readable": "Mon Jan 9 2023 00:46:57 GMT+0200 (Eastern European Standard Time)"
            },
            {
                "id": "4428b5d9-a52f-4fa8-8494-92bf5c050c04",
                "is_done": false,
                "user_id": "08068ea7-471c-402e-8f89-f3437a205a48",
                "products_ids": [
                    "53d01fd5-7fcb-4f1e-84d7-227c50089651",
                    "3dce8160-630e-4cb9-8a75-0bb8fcf638dc"
                ],
                "products_quantities": [ 2, 1 ],
                "date_time": "2023-01-09T22:46:57.951Z",
                "date_time_readable": "Mon Jan 9 2023 00:46:57 GMT+0200 (Eastern European Standard Time)"
        }],
        "message": "Orders shown successfully."
    }
    ```

### Update Specific Order Status



- **HTTP Method**: **`PUT`**
- **Endpoint**: **`/orders/:orderID`**
- **Request Body**: **`Order object`** **[ token required ]**
- **Request Params**: **`:orderID [UUIDv4]`**
- **Response Body**: **`Order object`**
- **Example**:

    ```http
    - Request URL: /orders/4428b5d9-a52f-4fa8-8494-92bf5c050c04
    ```

    ```json
    - Request Body:
        {
            // we only need the order status:
            "is_done": true,
        }
    ```

    ```json
    - Response Body:
        {
            "status": "200 Ok",
            "order": {
                "id": "4428b5d9-a52f-4fa8-8494-92bf5c050c04",
                "is_done": true,
                "user_id": "08068ea7-471c-402e-8f89-f3437a205a48",
                "products_ids": [
                    "53d01fd5-7fcb-4f1e-84d7-227c50089651",
                    "3dce8160-630e-4cb9-8a75-0bb8fcf638dc"
                ],
                "products_quantities": [ 2, 1 ],
                "date_time": "2023-01-09T22:46:57.951Z",
                "date_time_readable": "Mon Jan 9 2023 00:46:57 GMT+0200 (Eastern European Standard Time)"
            },
            "message": "Order updated successfully."
        }
    ```

### Delete Specific Order



- **HTTP Method**: **`DELETE`**
- **Endpoint**: **`/orders/:orderID`**
- **Request Body**: **`N/A`** **[ token required ]**
- **Request Params**: **`:orderID [UUIDv4]`**
- **Response Body**: **`Order object`**
- **Example**:

    ```http
    - Request URL: /orders/4428b5d9-a52f-4fa8-8494-92bf5c050c04
    ```

    ```json
    - Response Body:
        {
            "status": "200 Ok",
            "order": {
                "id": "4428b5d9-a52f-4fa8-8494-92bf5c050c04",
                "is_done": false,
                "user_id": "08068ea7-471c-402e-8f89-f3437a205a48",
                "products_ids": [
                    "53d01fd5-7fcb-4f1e-84d7-227c50089651",
                    "3dce8160-630e-4cb9-8a75-0bb8fcf638dc"
                ],
                "products_quantities": [ 2, 1 ],
                "date_time": "2023-01-09T22:46:57.951Z",
                "date_time_readable": "Mon Jan 9 2023 00:46:57 GMT+0200 (Eastern European Standard Time)"
            },
            "message": "Order deleted successfully."
        }
    ```

### Add New Product Into Order



- **HTTP Method**: **`POST`**
- **Endpoint**: **`/orders/:orderID/add`**
- **Request Body**: **`OrderProduct object`** **[ token required ]**
- **Request Params**: **`:orderID [UUIDv4]`**
- **Response Body**: **`OrderProduct object`**
- **Example**:

    ```http
    - Request URL: /orders/72da8597-11cb-4ba5-b4ef-4125525e1084/add
    ```

    ```json
    - Request Body:
        {
            "product_id": "ac85b670-9f17-4ae0-8c71-f517dc037e47",
            "product_quantity": 10
        }
    ```

    ```json
    - Response Body:
        {
            "status": "200 Ok",
            "orderProduct": {
                "id": "b6a62a3c-9195-482d-8f46-83c61d440951",
                "order_id": "72da8597-11cb-4ba5-b4ef-4125525e1084",
                "product_id": "ac85b670-9f17-4ae0-8c71-f517dc037e47",
                "product_quantity": 10,
                "date_time": "2023-01-09T22:46:57.951Z",
                "date_time_readable": "Mon Jan 9 2023 00:46:57 GMT+0200 (Eastern European Standard Time)"
            },
            "message": "Product added successfully to the order."
        }
    ```

### Show Specific Product From Order



- **HTTP Method**: **`GET`**
- **Endpoint**: **`/orders/:orderID/:productID`**
- **Request Body**: **`N/A`** **[ token required ]**
- **Request Params**: **`:orderID [UUIDv4]`**, **`:productID [UUIDv4]`**
- **Response Body**: **`OrderProduct object`**
- **Example**:

    ```http
    - Request URL: /orders/72da8597-11cb-4ba5-b4ef-4125525e1084/ac85b670-9f17-4ae0-8c71-f517dc037e47
    ```

    ```json
    - Response Body:
        {
            "status": "200 Ok",
            "orderProduct": {
                "id": "ee75debb-f292-416a-95d3-0ea8a449d5f8",
                "order_id": "72da8597-11cb-4ba5-b4ef-4125525e1084",
                "product_id": "ac85b670-9f17-4ae0-8c71-f517dc037e47",
                "product_quantity": 10,
                "date_time": "2023-01-09T22:46:57.951Z",
                "date_time_readable": "Mon Jan 9 2023 00:46:57 GMT+0200 (Eastern European Standard Time)"
            },
            "message": "Product shown successfully from the order."
        }
    ```

### Show All Products Within Order



- **HTTP Method**: **`GET`**
- **Endpoint**: **`/orders/:orderID/products`**
- **Request Body**: **`N/A`** **[ token required ]**
- **Request Params**: **`:orderID [UUIDv4]`**
- **Response Body**: **`Array of OrderProduct objects`**
- **Example**:

    ```http
    - Request URL: /orders/72da8597-11cb-4ba5-b4ef-4125525e1084/products
    ```

    ```json
    - Response Body:
        {
            "status": "200 Ok",
            "totalProductsInOrder": 2,
            "orderProducts": [{
                    "id": "ee75debb-f292-416a-95d3-0ea8a449d5f8",
                    "order_id": "72da8597-11cb-4ba5-b4ef-4125525e1084",
                    "product_id": "ac85b670-9f17-4ae0-8c71-f517dc037e47",
                    "product_quantity": 10,
                    "date_time": "2023-01-09T22:46:57.951Z",
                    "date_time_readable": "Mon Jan 9 2023 00:46:57 GMT+0200 (Eastern European Standard Time)"
                },
                {
                    "id": "e07f5c7f-3f63-4452-9921-ae53f4bd36ed",
                    "order_id": "72da8597-11cb-4ba5-b4ef-4125525e1084",
                    "product_id": "ac85b670-9f17-4ae0-8c71-f517dc037e47",
                    "product_quantity": 15,
                    "date_time": "2023-01-09T22:46:57.951Z",
                    "date_time_readable": "Mon Jan 9 2023 00:46:57 GMT+0200 (Eastern European Standard Time)"
            }],
            "message": "Products shown successfully from the order."
        }
    ```



## `/dashboard` Endpoints

### Show All Products In Orders


- **HTTP Method**: **`GET`**
- **Endpoint**: **`/dashboard/showProductsInOrders`**
- **Request Body**: **`N/A`** **[ token required ]**
- **Request Params**: **`N/A`**
- **Response Body**: **`Array of ProductsInOrder objects`**
- **Example**:

    ```http
    - Request URL: /dashboard/showProductsInOrders
    ```

    ```json
    - Response Body:
        {
            "status": "200 Ok",
            "totalProductsInOrders": 2,
            "productsInOrders": [{
                    "order_id": "72da8597-11cb-4ba5-b4ef-4125525e1084",
                    "is_order_done": true,
                    "order_date_time": "2023-01-09T22:46:57.951Z",
                    "order_date_time_readable": "Mon Jan 9 2023 00:46:57 GMT+0200 (Eastern European Standard Time)",
                    "product_name": "icecape",
                    "product_category": "clothes",
                    "product_price": 10.99,
                    "product_quantity": 15,
                    "total_price": 164.85
                },
                {
                    "order_id": "a98da1b3-3d65-409c-af97-be13843104df",
                    "is_order_done": false,
                    "order_date_time": "2023-01-09T22:46:57.951Z",
                    "order_date_time_readable": "Mon Jan 9 2023 00:46:57 GMT+0200 (Eastern European Standard Time)",
                    "product_name": "trousers",
                    "product_category": "clothes",
                    "product_price": 10.99,
                    "product_quantity": 5,
                    "total_price": 54.95
            }],
            "message": "Products in orders shown successfully."
        }
    ```

### Show Recent Orders Per User

- **HTTP Method**: **`GET`**
- **Endpoint**: **`/dashboard/recentOrders/:userID`**
- **Request Body**: **`N/A`** **[ token required ]**
- **Request Params**: **`:userID [UUIDv4]`**
- **Response Body**: **`Array of OrdersPerUser objects`**
- **Example**:

    ```http
    - Request URL: /dashboard/recentOrders/08068ea7-471c-402e-8f89-f3437a205a48
    ```

    ```json
    - Response Body:
        {
            "status": "200 Ok",
            "recentOrders": [{
                    "order_id": "72da8597-11cb-4ba5-b4ef-4125525e1084",
                    "is_done": false,
                    "date_time_readable": "Mon Jan 9 2023 00:46:57 GMT+0200 (Eastern European Standard Time)",
                    "total_cost": 164.85
                },
                {
                    "order_id": "4428b5d9-a52f-4fa8-8494-92bf5c050c04",
                    "is_done": false,
                    "order_date_time_readable": "Mon Jan 9 2023 00:46:57 GMT+0200 (Eastern European Standard Time)",
                    "total_cost": 54.95
            }],
            "message": "Orders per user shown successfully."
        }
    ```

### Show Top Ordered Products

- **HTTP Method**: **`GET`**
- **Endpoint**: **`/dashboard/topProducts`**
- **Request Body**: **`N/A`** **[ token required ]**
- **Request Params**: **`N/A`**
- **Response Body**: **`Array of TopProduct objects`**
- **Example**:

    ```http
    - Request URL: /dashboard/topProducts
    ```

    ```json
    - Response Body:
        {
            "status": "200 Ok",
            "topProducts": [{
                    "product_id": "3f1f3aa3-cc24-4202-99e2-09007dd1429b",
                    "product_name": "Veges",
                    "product_quantity": 26,
                    "x_orders": 6
                },
                {
                    "product_id": "6fcad767-fbc2-481d-a0b9-d30652d078f8",
                    "product_name": "Shoes",
                    "product_quantity": 6,
                    "x_orders": 2
            }],
            "message": "Top products shown successfully."
        }
    ```
