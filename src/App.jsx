import { Routes, Route } from 'react-router-dom';
import Landing from './pages/landing';
import JobListing from './pages/job-listing';
import Job from './pages/job';
import PostJob from './pages/post-job';
import SavedJob from './pages/saved-job';
import MyJob from './pages/my-job';
import Onboarding from './pages/onboarding';
import { ThemeProvider } from './components/theme-provider';
import ProtectedRoute from './components/protected-route';
import { Toaster } from 'sonner';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/onboarding" element={
          <ProtectedRoute>
            <Onboarding />
          </ProtectedRoute>
        } />

        <Route path="/jobs" element={
          <ProtectedRoute>
            <JobListing />
          </ProtectedRoute>
        } />

        <Route path="/job/:id" element={
          <ProtectedRoute>
            <Job />
          </ProtectedRoute>
        } />

        <Route path="/post-job" element={
          <ProtectedRoute>
            <PostJob />
          </ProtectedRoute>
        } />

        <Route path="/saved-job" element={
          <ProtectedRoute>
            <SavedJob />
          </ProtectedRoute>
        } />

        <Route path="/my-job" element={
          <ProtectedRoute>
            <MyJob />
          </ProtectedRoute>
        } />

      </Routes>
      <Toaster richColors closeButton position="bottom-right" />
    </ThemeProvider>
  );
}

export default App;
