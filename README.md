# 🌐 Full-Stack Portfolio Management System (Admin + User)

A complete **MERN stack portfolio web application** featuring:
- 🧑‍💻 **Admin Dashboard** to manage About, Skills, Projects, Courses, Blogs, and Contact Messages  
- 🌍 **User Portfolio Website** that dynamically displays all public data from the backend  
- ⚙️ Built with **React (Vite)**, **Redux**, **Node.js**, **Express**, **MongoDB**, **Cloudinary**, and **Vercel Deployment**

---

## 🚀 Tech Stack Overview

### 💻 Frontend (Admin + User)
- **React.js (Vite)** — Fast modern UI framework  
- **Redux Toolkit** — Global state management  
- **React Router DOM** — Client-side routing  
- **Tailwind CSS** — Utility-first responsive styling  
- **Framer Motion** — Smooth animations and transitions  
- **Axios** — API communication  
- **Lucide React** — Icon system  
- **Bootstrap (optional)** — Basic layout and responsiveness  
- **Glassmorphism & Gradient UI** — For a sleek, modern design  

### 🧠 Backend
- **Node.js + Express.js** — RESTful API server  
- **MongoDB + Mongoose** — Database and data modeling  
- **JWT Authentication** — Secure admin login and route protection  
- **bcrypt.js** — Password encryption  
- **Multer + Cloudinary Storage** — Image upload & hosting  
- **CORS with Dynamic Origins** — Secure cross-origin requests  
- **Nodemailer** — Contact form email notifications  
- **dotenv** — Environment configuration  

### ☁️ Cloud & Deployment
- **Vercel** — Hosting for frontend and backend  
- **MongoDB Atlas** — Cloud database  
- **Cloudinary** — Image storage for icons, project images, etc.  


---

## 🔐 Authentication & Security

- **JWT Token-based authentication**  
- Automatic logout when token expires or is removed from localStorage  
- Route protection for admin using custom middleware  
- Secure **Multer + Cloudinary** file uploads  
- **CORS** restricted to whitelisted domains  
- **Helmet** (optional) and sanitization middlewares for XSS prevention  

---

## 🧰 Features Summary

### 🧑‍💼 Admin Panel
| Feature | Description |
|----------|--------------|
| **Login & Auth** | Secure JWT-based login |
| **Profile Management** | Update name, email, password, profile picture |
| **About Section** | Title, subtitle, description, tech stack, hobbies, goals |
| **Skills** | Add skills with icons (Cloudinary upload) |
| **Experience** | CRUD for work experience (company, role, tech, duration) |
| **Projects** | CRUD with screenshots, descriptions, tech stack, links |
| **Courses** | Create and manage courses with pricing, discounts, category |
| **Blogs** | Add blogs with images, category, description, content |
| **Contact Messages** | View, search, and delete messages received from users |
| **Dashboard UI** | Sidebar, modals, form validation, notifications |

---

### 🌍 User Portfolio
| Section | Description |
|----------|--------------|
| **Home Page** | Animated hero with introduction |
| **About** | Shows About info from admin |
| **Experience** | Animated timeline |
| **Projects** | Glassmorphic cards with modals for details |
| **Skills** | Icon-based grid cards |
| **Courses** | Dynamic table/grid view with filters |
| **Blogs** | Search, filter, and read blogs in modal |
| **Contact Form** | Sends messages to DB and email/WhatsApp |

---

NPM Packages Used (Backend):-
-----------------------------
express
mongoose
cors
dotenv
jsonwebtoken
bcryptjs
multer
cloudinary
multer-storage-cloudinary
nodemailer
helmet
xss-clean
express-mongo-sanitize
vercel

---------
Frontend 
--------
react
react-dom
react-router-dom
redux
@reduxjs/toolkit
axios
framer-motion
lucide-react
tailwindcss
vite



Live @ 
User - https://my-portfolio-user-frontend.vercel.app/
admin - https://my-portfolio-admin-psi.vercel.app/
backend - https://my-portfolio-backend-murex.vercel.app/

