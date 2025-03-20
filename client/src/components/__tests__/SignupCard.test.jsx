import { describe, it, vi, beforeEach, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SignUpCard from '../SignupCard';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import '@testing-library/jest-dom';

// Mock axios
vi.mock('axios');

// Mock toast
vi.mock('react-hot-toast', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    __esModule: true
  }
}));

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: vi.fn(() => mockNavigate),
  };
});

describe('SignUpCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <SignUpCard />
      </BrowserRouter>
    );
  };
  
  // Test 1: see if the signup form is rendered correctly
  it('renders the signup form correctly', () => {
    renderComponent();
    expect(screen.getByText(/Become a member today!/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email@example.com/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument();
  });

  // Test 2: see if the form data state is updates properly
  it('updates form data state on input change', () => {
    renderComponent();
    
    const firstNameInput = screen.getByPlaceholderText(/First Name/i);
    const lastNameInput = screen.getByPlaceholderText(/Last Name/i);
    const emailInput = screen.getByPlaceholderText(/Email@example.com/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123' } });
    
    expect(firstNameInput.value).toBe('John');
    expect(lastNameInput.value).toBe('Doe');
    expect(emailInput.value).toBe('john.doe@example.com');
    expect(passwordInput.value).toBe('Password123');
  });

  // Test 3: see if the user is created successfully
  it('successfully creates a user and navigates to login page', async () => {
    axios.post.mockResolvedValueOnce({ data: { id: 1, email: 'john.doe@example.com' } });
    
    renderComponent();
    
    const firstNameInput = screen.getByPlaceholderText(/First Name/i);
    const lastNameInput = screen.getByPlaceholderText(/Last Name/i);
    const emailInput = screen.getByPlaceholderText(/Email@example.com/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const signupButton = screen.getByRole('button', { name: /Sign Up/i });
    
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123' } });
    
    fireEvent.click(signupButton);
    
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/api/user/create', {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        password: 'Password123'
      });
      expect(toast.success).toHaveBeenCalledWith('Account created successfully!');
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });

  // Test 4: see if an error message is displayed when the API request fails
  it('displays an error message when API request fails', async () => {
    const errorMessage = 'Email already exists';
    axios.post.mockRejectedValueOnce({ 
      response: { data: { message: errorMessage } } 
    });
    
    renderComponent();
    
    const firstNameInput = screen.getByPlaceholderText(/First Name/i);
    const lastNameInput = screen.getByPlaceholderText(/Last Name/i);
    const emailInput = screen.getByPlaceholderText(/Email@example.com/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const signupButton = screen.getByRole('button', { name: /Sign Up/i });
    
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123' } });
    
    fireEvent.click(signupButton);
    
    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
      expect(toast.error).toHaveBeenCalledWith('Error creating user');
    });
  });

  // Test 5: see if the sign in link and organization signup link are working
  it('navigates to login page when sign in link is clicked', () => {
    renderComponent();
    
    const signInLink = screen.getByText('Sign in');
    expect(signInLink.closest('a')).toHaveAttribute('href', '/login');
  });

  // Test 6: see if the organization signup link is working
  it('navigates to organization signup page when "Click here!" is clicked', () => {
    renderComponent();
    
    const orgSignupLink = screen.getByText('Click here!');
    expect(orgSignupLink.closest('a')).toHaveAttribute('href', '/signuporg');
  });
});