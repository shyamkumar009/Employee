# Employee Management System

A full-stack **Employee Management System** built using **Angular (Frontend)** and **Node.js with Express (Backend)**. It integrates **MongoDB** for storing employee data, **AWS S3** for image storage, and **Nodemailer** for sending emails to employees.

##  Project Overview

This system enables:
- Full CRUD operations on employee records
- Image upload to AWS S3
- Email messaging using Gmail SMTP
- Search/filter functionality for employees

---

##  Tech Stack

| Layer       | Technology                         |
|-------------|------------------------------------|
| Frontend    | Angular                            |
| Backend     | Node.js, Express.js                |
| Database    | MongoDB (via Mongoose)             |
| Cloud       | AWS S3 (for image storage)         |
| Email       | Nodemailer (Gmail SMTP)            |

---

##  Backend Details

###  API Endpoints

| Method | Route               | Description                  |
|--------|---------------------|------------------------------|
| POST   | `/api/employee`     | Create employee (image upload) |
| GET    | `/api/employee`     | Get all employees            |
| GET    | `/api/employee/:id` | Get employee by ID           |
| PUT    | `/api/employee/:id` | Update employee              |
| DELETE | `/api/employee/:id` | Delete employee              |
| POST   | `/api/message`      | Send an email to an employee |

###  MongoDB Schema

```js
{
  name: String,
  phone: String,
  email: String,
  skills: [String],
  image: String, // S3 URL
  bio: String,
  position: String
}
```

###  AWS S3 Integration

- Uses `@aws-sdk/client-s3` (v3) and `multer-s3`
- Images are stored in: `employee-images/{timestamp}_{filename}`

###  Nodemailer Integration

- Uses Gmail SMTP
- Requires the following environment variables:
  - `EMAIL_USER`
  - `EMAIL_PASSWORD`

---

##  Frontend Details (Angular)

###  Components Overview

| Component        | Description                                                                 |
|------------------|-----------------------------------------------------------------------------|
| CardComponent     | Displays employees as cards with name, email, position, image. Includes search. |
| DetailsComponent  | Shows detailed employee info. Allows edit, delete, or send email.           |
| EditComponent     | Form to edit employee information.                                          |
| MessageComponent  | Form to compose and send email to employee.                                |
| CrudComponent     | Standalone view for bulk operations (list, add, update, delete).           |

###  Flow Diagram

- `CardComponent` → click → `DetailsComponent`
- `DetailsComponent` → Edit → `EditComponent`
- `DetailsComponent` → Send Email → `MessageComponent`
- `CrudComponent` is a separate full CRUD interface

---

##  Environment Variables

Create a `.env` file in your **backend root** with the following:

```env
PORT=5000
URI=mongodb://localhost:27017/employees
AWS_REGION=your-region
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_S3_BUCKET=your-bucket-name
EMAIL_USER=your@gmail.com
EMAIL_PASSWORD=yourpassword
```

---

##  Installation & Setup

###  Backend Setup

```bash
cd backend
npm install
npm run start
```

###  Frontend Setup

```bash
cd frontend
npm install
ng serve
```

---

##  Team Members

- Shyam Kumar  
- Sudarshana M G


