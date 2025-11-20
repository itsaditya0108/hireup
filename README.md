# 🚀 HireUp – Modern Job Portal Platform

HireUp is a full-stack job portal built with **React 19, Vite, Supabase, and Clerk authentication**. It connects job seekers with employers, providing a seamless platform for job search, applications, and recruitment.

**🌐 Live Demo:** [https://hireup-seven.vercel.app](https://hireup-seven.vercel.app/jobs)

---

## ✨ Features

### For Job Seekers

* 🔍 Browse and search thousands of job listings
* 📝 Apply to jobs with easy application tracking
* ⭐ Save favorite jobs for later
* 📄 View application history and status

### For Employers

* 🏢 Post job openings with detailed descriptions
* 📊 Manage and review job applications
* 📈 Access employer dashboard for analytics
* ⚡ Efficient candidate search and management

---

## 🛠 Tech Stack

* **Frontend:** React 19, Vite, Tailwind CSS
* **UI Components:** Radix UI, Lucide Icons
* **Authentication:** Clerk
* **Database:** Supabase
* **Routing:** React Router DOM
* **Forms:** React Hook Form with Zod validation
* **State Management:** React Hooks
* **Deployment:** Vite build for production

---

## 🖼 Screenshots / Preview

Here’s a quick look at HireUp in action:

 ![home](<img width="1653" height="855" alt="image" src="https://github.com/user-attachments/assets/35d1ff99-df50-474c-ab16-327f626a6391" />
 ![details](<img width="1889" height="801" alt="image" src="https://github.com/user-attachments/assets/ceafd6db-4929-4758-ba2d-5cb8abe62cbd" />


> **Tip:** Add your screenshots to a `screenshots` folder in your project root with these filenames: `home.png`, `job.png`, `dash.png`. Update the filenames in the table if they are different.

---

## ⚡ Getting Started

### Prerequisites

* Node.js (v18 or higher)
* npm or yarn
* Supabase account
* Clerk account

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/itsaditya0108/hireup.git
   cd hireup
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables by creating a `.env` file in the root directory:

   ```
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🗂 Project Structure

```
src/
├── api/          # API calls to Supabase
├── components/   # Reusable UI components
├── data/         # Static data (companies, FAQs)
├── hooks/        # Custom React hooks
├── layouts/      # Layout components
├── pages/        # Page components
├── utils/        # Utility functions
└── lib/          # Library configurations
```

---

## 🔐 Authentication Flow

* Users sign in or register via Clerk authentication
* Roles (Job Seeker / Employer) determine UI and permissions
* Supabase handles database operations with role-based security

---

## 🚀 Deployment

You can deploy the app using platforms like **Vercel** or **Netlify**:

1. Push your repository to GitHub
2. Connect your GitHub repo to your deployment platform
3. Set environment variables in your deployment platform
4. Deploy and enjoy the live app

**🌐 Live App:** [Click here ](https://hireup-seven.vercel.app/)

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes and commit with clear messages
4. Push to your fork
5. Open a Pull Request for review

Contributions are welcome for bug fixes, UI improvements, new features, and documentation.

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 👤 Author

**Aditya Verma**
GitHub: [https://github.com/itsaditya0108](https://github.com/itsaditya0108)

---

If you want, I can also **add a small badge section** at the top with GitHub stars, license, and live demo — it looks very professional and catches attention.

Do you want me to do that?
