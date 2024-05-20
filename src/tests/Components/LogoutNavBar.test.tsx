
import { render, fireEvent } from '@testing-library/react';
import LogoutNavBar from '../../components/LogoutNavBar';
import { removeToken } from '../../auth/authService';
import { useNavigate } from 'react-router-dom';
import "@testing-library/jest-dom";

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('../../auth/authService', () => ({
  removeToken: jest.fn(),
}));

describe('LogoutNavBar', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('calls removeToken and navigates to home page on logout', () => {
    const navigateMock = jest.fn();
    (useNavigate as jest.Mock).mockReturnValueOnce(navigateMock);

    const { getByText } = render(<LogoutNavBar />);

    fireEvent.click(getByText('Logout'));

    expect(removeToken).toHaveBeenCalled();
    expect(navigateMock).toHaveBeenCalledWith('/');
  });
});
