import { describe, it, vi, beforeEach, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DashboardCards from '../DashboardCards';
import axios from 'axios';
import '@testing-library/jest-dom';

// Mock axios
vi.mock('axios');

// Mock Chart.js
vi.mock('chart.js/auto', () => ({
  __esModule: true,
  default: {}
}));

// Mock react-chartjs-2
vi.mock('react-chartjs-2', () => ({
  Line: () => <div data-testid="line-chart"></div>
}));

describe('DashboardCards', () => {
  const mockUserVolunteer = {
    role: 'user'
  };

  const mockUserOrganization = {
    role: 'organization'
  };

  const mockFormatTime = vi.fn((time) => `${time} formatted`);
  const mockSetEventHeaders = vi.fn();
  const mockCurrentEventView = 1;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = (user = mockUserVolunteer) => {
    return render(
      <DashboardCards 
        user={user} 
        formatTime={mockFormatTime} 
        currentEventView={mockCurrentEventView} 
        setEventHeaders={mockSetEventHeaders} 
      />
    );
  };

  // Test 1: See if line chart component renders 
  it('renders the line chart component', () => {
    // Mocks the behaviour of axios.get
    axios.get.mockResolvedValueOnce({ data: [] });
    renderComponent();
    
    const chartTitle = screen.getByText('Volunteer Hours');
    expect(chartTitle).toBeInTheDocument();
    expect(screen.getByTestId('line-chart')).toBeInTheDocument();
  });

  // Test 2: Check if the title changes based on user role
  it('displays organization-specific title when user is an organization', () => {
    axios.get.mockResolvedValueOnce({ data: [] });
    renderComponent(mockUserOrganization);
    
    // Title should be 'Number of Volunteers' for organizations
    const chartTitle = screen.getByText('Number of Volunteers');
    expect(chartTitle).toBeInTheDocument();
  });

  // Test 3: Check if the events table renders
  it('renders the tabs for events table', () => {
    axios.get.mockResolvedValueOnce({ data: [] });
    renderComponent();
    
    // Both tabs should be present
    expect(screen.getByText('Current Events')).toBeInTheDocument();
    expect(screen.getByText('Upcoming Events')).toBeInTheDocument();
  });

  // Test 4: Check if the events table renders
  it('changes active tab when clicked', async () => {
    axios.get.mockResolvedValueOnce({ data: [] });
    renderComponent();
    
    const upcomingEventsTab = screen.getByText('Upcoming Events');
    fireEvent.click(upcomingEventsTab);
    
    // Upcoming Events should render when clicked
    expect(upcomingEventsTab).toBeInTheDocument();
  });

  // Test 5: Check if the events table renders
  it('calls the appropriate API endpoints based on user role', async () => {
    axios.get.mockResolvedValueOnce({ data: [] });
    renderComponent(mockUserVolunteer);
    
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('/api/user-events/user/get');
    });
    
    vi.clearAllMocks();
    axios.get.mockResolvedValueOnce({ data: [] });
    
    renderComponent(mockUserOrganization);
    
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('/api/events/org/get');
    });
  });

  // Test 6: Check if the events table renders
  it('opens the log hours modal when button is clicked', async () => {
    // Mock event
    const pastEvent = {
      user_event_id: 1,
      title: 'Past Event',
      description: 'Description',
      contact_email: 'org@example.com',
      location: 'Location',
      start_date: '2023-01-01',
      hours_worked: 0
    };
    
    axios.get.mockResolvedValueOnce({ data: [pastEvent] });
    renderComponent(mockUserVolunteer);
    
    await waitFor(() => {
      const logHoursButton = screen.getByText('Log Hours');
      fireEvent.click(logHoursButton);
      
      // Modal should open with the correct title and input field
      const modalTitle = screen.getByText('Log Hours for Past Event');
      expect(modalTitle).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter hours')).toBeInTheDocument();
    });
  });

  // Test 7: Check if the events table renders
  it('submits hours and closes modal when submit button is clicked', async () => {
    const pastEvent = {
      user_event_id: 1,
      title: 'Past Event',
      description: 'Description',
      contact_email: 'org@example.com',
      location: 'Location',
      start_date: '2023-01-01',
      hours_worked: 0
    };
    
    // Hours submission workflow
    axios.get.mockResolvedValueOnce({ data: [pastEvent] });
    axios.put.mockResolvedValueOnce({ data: { success: true } });
    
    renderComponent(mockUserVolunteer);
    
    await waitFor(() => {
      const logHoursButton = screen.getByText('Log Hours');
      fireEvent.click(logHoursButton);
      
      const hoursInput = screen.getByPlaceholderText('Enter hours');
      fireEvent.change(hoursInput, { target: { value: '5' } });
      
      const submitButton = screen.getByText('Submit');
      fireEvent.click(submitButton);
    });
    
    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith('/api/user-events/update', {
        user_event_id: 1,
        hours_worked: '5'
      });
    });
  });
});