# Todo Maker

Todo Maker is a simple and user-friendly application that allows users to create, manage, and delete their personal todos. Built with Next.js, Node.js, and MongoDB, it provides a full-stack experience with authentication and CRUD (Create, Read, Update, Delete) operations for managing todos.

## Features

- **User Registration & Login**: Users can register and log in to manage their todos.
- **Create Todos**: Add new todos with a title and description.
- **View Todos**: Display a list of all your todos.
- **Delete Todos**: Remove unwanted todos from your list.

## Technologies Used

- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Tokens)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB instance (local or cloud)
- Git

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/todo-maker.git
   cd todo-maker
   ```

2. **Install Dependencies**

   For the backend:

   ```bash
   cd server
   npm install
   ```

   For the frontend:

   ```bash
   cd ../client
   npm install
   ```

3. **Configure Environment Variables**

   Create a `.env` file in the `server` directory with the following variables:

   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=4000
   ```

   And in the `client` directory:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:4000/api
   ```

4. **Run the Application**

   Start the backend server:

   ```bash
   cd server
   npm start
   ```

   Start the frontend application:

   ```bash
   cd ../client
   npm run dev
   ```

   The application should be accessible at `http://localhost:3000`.

## Usage

1. **Register a New User**

   Navigate to `/register` to create a new account.

2. **Login**

   Go to `/login` to log into your account.

3. **Manage Todos**

   After logging in, you can create new todos, view existing todos, and delete todos from the dashboard.

## API Endpoints

- `POST /api/register` - Register a new user
- `POST /api/login` - Authenticate a user
- `GET /api/read` - Retrieve all todos
- `POST /api/createTodo` - Create a new todo
- `DELETE /api/deleteTodo/:id` - Delete a specific todo

## Contributing

If you'd like to contribute to this project, please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature/your-feature`)
6. Create a new Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)

```

Replace placeholders such as `your-username`, `your_mongodb_connection_string`, and `your_jwt_secret_key` with your actual details. This `README.md` covers the basics of setting up and using the application, as well as how to contribute. Adjust sections as needed to fit your project's specifics.
