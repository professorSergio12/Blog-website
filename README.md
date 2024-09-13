# Full-Stack Blog Website


## Overview
This is a fully functional blog website where users can sign up, log in, like, comment on blogs, and sign out. It includes an admin dashboard for posting, updating, and deleting blogs, 
as well as viewing site analytics like total posts and comments. The website supports dark/light themes and is fully responsive across devices.

### Features
- User Authentication: Users can sign up/log in using email/password or Google Firebase authentication.
- Blog Interaction: Users can like posts, comment on blogs, and view all published blogs.
- Admin Dashboard: Admin can create, update, and delete blogs, and view total posts, total comments, and last month's activity.
- Dark/Light Theme Toggle: Users can switch between dark and light modes.
- Responsive Design: The website is fully responsive and works seamlessly across devices.
- Session Management: Cookies are used to manage user sessions, ensuring secure login.
- Data Fetching & Testing: Admin functionalities are tested using Postman for data fetching.

### Technology Stack
- Frontend: React.js, Tailwind CSS, Redux Toolkit
- Backend: Node.js, MongoDB, Express.js
- Authentication: Firebase (Google and email/password), JWT, Bcrypt
- Storage: Firebase Storage
- Session Management: JWT and Cookies
- Deployment: Render for hosting the site
- State Management: Redux Toolkit

 ## Installation & Setup
 To run this project locally, follow these steps:

1.  Clone the repository:
```
git clone https://github.com/professorSergio12/Blog-website.git
cd MERN-Blog
```

2. Install dependencies for both backend and frontend:
### In the project root directory
```
npm install
cd client
npm install
```
3. Set up environment variables:
Create a two .env file one in the root directory and another in client directory add the following variables:
In root directory:
```
DATABASE_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
In client directory:
```
FIREBASE_API_KEY=your_firebase_api_key
```
4. Run the project:
```
npm run dev
```

### Admin Dashboard
To access the admin dashboard, log in as an admin (you can set this in your database manually) and navigate to /admin. From there, you can:

- Post new blogs
- Update and delete blogs
- View total posts, comments, and last month's activity
