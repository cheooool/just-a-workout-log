import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthGuard from './AuthGuard';

const Workouts = lazy(() => import('../pages/Workouts'));
const Exercises = lazy(() => import('../pages/Exercises'));
const SignUp = lazy(() => import('../pages/SignUp'));
const SignIn = lazy(() => import('../pages/SignIn'));

const RootRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<div>loading...</div>}>
            <AuthGuard>
              <Workouts />
            </AuthGuard>
          </Suspense>
        }
      />
      <Route
        path="/exercises"
        element={
          <Suspense fallback={<div>loading...</div>}>
            <AuthGuard>
              <Exercises />
            </AuthGuard>
          </Suspense>
        }
      />
      <Route
        path="/signup"
        element={
          <Suspense fallback={<div>loading...</div>}>
            <SignUp />
          </Suspense>
        }
      />
      <Route
        path="/signin"
        element={
          <Suspense fallback={<div>loading...</div>}>
            <SignIn />
          </Suspense>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default RootRoutes;
