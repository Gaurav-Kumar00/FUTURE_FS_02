import React, { useState } from 'react';
import { X, User, Mail, Lock } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useStore } from '../../store/useStore';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { loginSchema, registerSchema } from '../../utils/validation';

interface LoginFormData {
  email: string;
  password: string;
}

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const LoginModal: React.FC = () => {
  const { isLoginModalOpen, toggleLoginModal, setUser } = useStore();
  const [isRegister, setIsRegister] = useState(false);
  
  const loginForm = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema)
  });
  
  const registerForm = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema)
  });
  
  const handleLogin = (data: LoginFormData) => {
    // Simulate login
    const user = {
      id: '1',
      email: data.email,
      firstName: 'John',
      lastName: 'Doe',
      createdAt: new Date().toISOString()
    };
    setUser(user);
    toggleLoginModal();
    loginForm.reset();
  };
  
  const handleRegister = (data: RegisterFormData) => {
    // Simulate registration
    const user = {
      id: Date.now().toString(),
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      createdAt: new Date().toISOString()
    };
    setUser(user);
    toggleLoginModal();
    registerForm.reset();
  };
  
  if (!isLoginModalOpen) return null;
  
  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity"
        onClick={toggleLoginModal}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold">
              {isRegister ? 'Create Account' : 'Sign In'}
            </h2>
            <button
              onClick={toggleLoginModal}
              className="p-1 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Form */}
          <div className="p-6">
            {isRegister ? (
              <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    {...registerForm.register('firstName')}
                    error={registerForm.formState.errors.firstName?.message}
                  />
                  <Input
                    label="Last Name"
                    {...registerForm.register('lastName')}
                    error={registerForm.formState.errors.lastName?.message}
                  />
                </div>
                <Input
                  type="email"
                  label="Email"
                  {...registerForm.register('email')}
                  error={registerForm.formState.errors.email?.message}
                />
                <Input
                  type="password"
                  label="Password"
                  {...registerForm.register('password')}
                  error={registerForm.formState.errors.password?.message}
                />
                <Input
                  type="password"
                  label="Confirm Password"
                  {...registerForm.register('confirmPassword')}
                  error={registerForm.formState.errors.confirmPassword?.message}
                />
                
                <Button type="submit" className="w-full" size="lg">
                  Create Account
                </Button>
                
                <p className="text-center text-sm text-slate-600">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setIsRegister(false)}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Sign in
                  </button>
                </p>
              </form>
            ) : (
              <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                <Input
                  type="email"
                  label="Email"
                  placeholder="Enter your email"
                  {...loginForm.register('email')}
                  error={loginForm.formState.errors.email?.message}
                />
                <Input
                  type="password"
                  label="Password"
                  placeholder="Enter your password"
                  {...loginForm.register('password')}
                  error={loginForm.formState.errors.password?.message}
                />
                
                <Button type="submit" className="w-full" size="lg">
                  Sign In
                </Button>
                
                <p className="text-center text-sm text-slate-600">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setIsRegister(true)}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Sign up
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};