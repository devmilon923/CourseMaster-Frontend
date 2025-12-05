# CourseMaster

CourseMaster is a web application designed to manage and take courses with features like course enrollment, quizzes, assignments, and progress tracking, catering to admins, users, and guests.

## Authentication

[Admin Login](https://course-master-frontend-eosin.vercel.app/admin/login)
[Student Login](https://course-master-frontend-eosin.vercel.app/auth/login)

### Admin default login credentials:

email: `admin@gmail.com`
password: `1qazxsw2`

## Installation and Running

Clone the repository, install dependencies, and start the app by running the following commands in your terminal:

```bash
    git clone https://github.com/devmilon923/CourseMaster-Frontend.git
```

```bash
    cd CourseMaster-Frontend
```

```bash
    npm install
```

```bash
    npm run dev
```

This will start the app locally on your machine.

## Environment Variables

This project uses a public `.env` file. You **do not** need to add or configure any environment variables manually. Simply cloning the repo is enough to get started.

### API Documentation (Summary)

[Postman](https://documenter.getpostman.com/view/50499953/2sB3dPSVzN#intro)

## Features Outline (Summary)

### Authentication

- Login
- Register

### Admin Capabilities

- View assignment submissions per module
- Get quizzes by module
- Update enrollment request status
- View all courses
- View details of a single course
- Update course information
- Change course status (private/public)
- Add quizzes to a module
- Add videos to a module
- Create modules within courses
- Create new courses
- View enrollment requests

### Guest Capabilities

- Detailed course view (title, description, instructor, syllabus, price)
- Searching by title or instructor
- Sorting courses by price (low to high, high to low)
- Filtering courses by category
- View available courses with server-side pagination

### User Capabilities

- Submit quizzes
- Submit assignments
- Get quizzes by module
- View modules with progress tracking (e.g., "40% Completed")
- Mark videos as completed
- Get module videos
- View list of enrolled courses
- Send enrollment requests
