import { describe, it, vi, beforeEach, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { UserContext } from '../../../context/userContext';
import Navbar from '../Navbar';
import '@testing-library/jest-dom';

// Mock toast
vi.mock('react-hot-toast', () => ({
  toast: {
    success: vi.fn(),
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

describe('Navbar', () => {
  const mockLogout = vi.fn();
  
  // Helper function to render component with different user states
  const renderNavbar = (user = null) => {
    return render(
      <BrowserRouter>
        <UserContext.Provider value={{ user, logout: mockLogout }}>
          <Navbar />
        </UserContext.Provider>
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Test 1: see if the navbar is rendered correctly
  it('renders the navbar with GoodDeeds brand', () => {
    renderNavbar();
    const brandLinks = screen.getAllByText('GoodDeeds');
    expect(brandLinks.length).toBeGreaterThan(0);
  });

  // Test 2: see if the navbar links are rendered correctly
  it('shows login and signup buttons when user is not logged in', () => {
    renderNavbar();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  // Test 3: see if the default user icon is shown when profile picture is not available properly
  it('shows fallback user icon when profile picture is not available', () => {
    renderNavbar({ id: 1, name: 'Test User', profile_picture: null });
    
    const userIcons = document.querySelectorAll('.fa-user');
    expect(userIcons.length).toBeGreaterThan(0);
  });

  // Test 4: see if the user icon is shown when profile picture is available
  it('updates isLoggedIn state when user context changes', async () => {
    const { rerender } = renderNavbar();
    
    // Initially shows login button
    expect(screen.getByText('Login')).toBeInTheDocument();
    
    // Update the user context
    rerender(
      <BrowserRouter>
        <UserContext.Provider value={{ user: { id: 1 }, logout: mockLogout }}>
          <Navbar />
        </UserContext.Provider>
      </BrowserRouter>
    );
    
    // Now it should show Dashboard instead
    await waitFor(() => {
      expect(screen.queryByText('Login')).not.toBeInTheDocument();
      const dashboardLinks = screen.getAllByText('Dashboard');
      expect(dashboardLinks.length).toBeGreaterThan(0);
    });
  });
});