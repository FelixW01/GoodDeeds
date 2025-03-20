import { describe, it, vi, beforeEach, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { UserContext } from '../../../context/userContext';
import LoginCard from '../LoginCard';
import toast from 'react-hot-toast';
import '@testing-library/jest-dom';

const mockNavigate = vi.fn();

// Mock Toast
vi.mock('react-hot-toast', () => ({
  error: vi.fn(),
  __esModule: true,
  default: {
    error: vi.fn()
  }
}));

// Mock useNavigate
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: vi.fn(() => mockNavigate),
  };
});

describe('LoginCard', () => {
  const mockLogin = vi.fn();

  const renderComponent = (error = '') => {
    return render(
    // Memory Router simulates a routing environment without needing the actual browser
      <MemoryRouter>
        <UserContext.Provider value={{ login: mockLogin, error }}>
          <LoginCard />
        </UserContext.Provider>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Test 1: Check if the login form is rendered correctly
  it('renders the login form correctly', () => {
    renderComponent();
    expect(screen.getByText(/Login now!/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email@gmail.com/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });

  // Test 2: Check if the email and password state is updated on change
  it('updates email and password state on change', () => {
    renderComponent();

    const emailInput = screen.getByPlaceholderText(/Email@gmail.com/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  // Test 3: Check if login is called and navigates on successful submit
  it('calls login and navigates on successful submit', async () => {
    mockLogin.mockResolvedValueOnce({});

    renderComponent();

    const emailInput = screen.getByPlaceholderText(/Email@gmail.com/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });

  // Test 4: Check if error toast is displayed if login fails
  it('displays error toast if login fails', async () => {
    const errorMessage = 'Invalid credentials';
    mockLogin.mockRejectedValueOnce({ response: { data: { message: errorMessage } } });

    renderComponent();

    const emailInput = screen.getByPlaceholderText(/Email@gmail.com/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });

    // Fill out form to avoid validation errors
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    // Wait for async operations to complete
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(errorMessage);
    });
  });

  // Test 5: Check if error message from context is displayed
  it('shows error message from context if present', () => {
    const errorMessage = 'Error from context';
    renderComponent(errorMessage);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});