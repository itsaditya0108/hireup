# HireUp - Job Portal

A modern, full-stack job portal application built with React, Vite, Supabase, and Clerk authentication. HireUp connects job seekers with employers, providing a seamless platform for job searching, applications, and recruitment.

## Features

### For Job Seekers
- Browse and search thousands of job listings
- Apply to jobs with easy application tracking
- Save favorite jobs for later
- View application history and status

### For Employers
- Post job openings with detailed descriptions
- Manage and review job applications
- Access employer dashboard for analytics
- Find the best candidates efficiently

## Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS
- **UI Components**: Radix UI, Lucide Icons
- **Authentication**: Clerk
- **Database**: Supabase
- **Routing**: React Router DOM
- **Forms**: React Hook Form with Zod validation
- **State Management**: React Hooks
- **Deployment**: Vite build for production

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Supabase account
- Clerk account

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

3. Set up environment variables:
   Create a `.env` file in the root directory with:
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

## Project Structure

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

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Author

Aditya Verma
