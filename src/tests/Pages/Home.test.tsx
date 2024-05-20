
import { render, waitFor, screen } from '@testing-library/react';
import ProfileInfo from '../../components/ProfileInfo';
import { getProfile } from '../../auth/authService';
import { MemoryRouter } from 'react-router-dom';
import "@testing-library/jest-dom";

jest.mock('../../auth/authService', () => ({
  getProfile: jest.fn(),
  getToken: jest.fn(),
}));

describe('ProfileInfo', () => {
  it('renders loading when profile is not fetched yet', async () => {
    render(
      <MemoryRouter>
        <ProfileInfo />
      </MemoryRouter>
    );
    expect(screen.getByText('Carregando...')).toBeInTheDocument();
  });

  it('renders error message on failed profile fetch', async () => {
    (getProfile as jest.Mock).mockRejectedValueOnce(new Error('Error fetching profile'));

    render(
      <MemoryRouter>
        <ProfileInfo />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText('Erro ao carregar o perfil')).toBeInTheDocument()
    );
  });

  it('renders profile information when fetched successfully', async () => {
    const mockProfile = {
      name: 'Cliente',
      email: 'cliente@youdrive.com',
      avatar: { high: 'profile.jpg' },
    };
    (getProfile as jest.Mock).mockResolvedValueOnce(mockProfile);

    render(
      <MemoryRouter>
        <ProfileInfo />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Cliente')).toBeInTheDocument();
      expect(screen.getByText('cliente@youdrive.com')).toBeInTheDocument();
    });
  });
});
