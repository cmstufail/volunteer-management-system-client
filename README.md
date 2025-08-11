# VolunteerHub - Volunteer Management System

VolunteerHub is a full-stack web application designed to connect volunteers with organizations and individuals in need. This platform allows organizers to post volunteer opportunities and manage applications, while volunteers can browse, search for, and apply to posts that match their interests and skills.

---
## Assignment Details

- **My assignment varient is:** [Assignment-11-assignment_category_10]
- **My assignment task description:** [Assignment Category: Assignment-11-assignment_category_10]
---

## Live Site Links

- **Client-Side Live URL:** [https://volunteer-management-sys-a4e9f.web.app]
- **Server-Side Live URL:** [https://volunteer-management-system-server-pearl.vercel.app]

---
## GitHub Links

- **Client-Side GitHub URL:** [https://github.com/Programming-Hero-Web-Course4/b11a11-client-side-cmstufail]
- **Server-Side Github URL:** [https://github.com/Programming-Hero-Web-Course4/b11a11-server-side-cmstufail]

---

## Key Features

- **User Authentication:** Secure login and registration system using Firebase Authentication, with JWT (JSON Web Token) for private route protection.
- **Dynamic Homepage:** Features an eye-catching banner, a "Volunteer Needs Now" section with 6 posts sorted by upcoming deadlines, and two extra meaningful sections.
- **Post Management (CRUD):** Logged-in users (organizers) can create, read, update, and delete their own volunteer need posts.
- **Volunteer Application System:**
  - Volunteers can apply for posts through a dedicated application page.
  - The number of needed volunteers decreases automatically upon a new request.
  - Organizers can view all applications for their posts and **Approve** or **Reject** them.
  - Volunteers can view all their applied posts and their current status (`requested`, `approved`).
  - Volunteers can **cancel** their own "requested" applications.
- **Advanced UI/UX:**
  - **Dynamic Title:** Website title changes based on the current route.
  - **Search Functionality:** Users can search for posts by title on the "All Volunteer Posts" page.
  - **Layout Toggle:** Users can switch between a card view and a table view on the "All Volunteer Posts" page.
  - **Dark/Light Theme:** A theme toggler is available in the navbar for the entire application.
  - **Animations:** Smooth and meaningful animations implemented using Framer Motion.
  - **Responsive Design:** The website is fully responsive and works seamlessly on all devices.
  - **Error Handling:** A custom 404 page for not-found routes and relevant feedback notifications (SweetAlert2) for all user actions.

---

## Technologies Used

### Frontend:
- **Framework:** React
- **Routing:** React Router DOM
- **UI Components:** daisyUI, Tailwind CSS
- **API Calls:** Axios
- **Animations:** Framer Motion, Lottie for React
- **Notifications:** SweetAlert2, React Toastify
- **Icons:** React Icons
- **Date Picker:** React Datepicker

### Backend:
- **Framework:** Express.js
- **Database:** MongoDB (with MongoDB Atlas)
- **Authentication:** JWT (JSON Web Token)
- **Middleware:** CORS, cookie-parser

### Deployment:
- **Client:** Firebase Hosting
- **Server:** Vercel

---
