import { screen } from '@testing-library/react';
import Navigator from './Navigator';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderWithProviders } from '../../../test-utils/test-utils';
import { setupStore } from '../../../app/store';
import { login, logout } from '../../../app/authSlice';

test('Renders categories if user exists', () => {
    const store = setupStore()
    store.dispatch(login(true))
    renderWithProviders(<Router><Navigator open={true} /></Router>, { store })
    const linkElement = screen.getByText(/Główne/i)
    const linkAdminElement = screen.queryByText(/Inne/i)
    expect(linkElement).toBeInTheDocument()
    expect(linkAdminElement).not.toBeInTheDocument()
});
test('Renders categories if user not exists', () => {
    const store = setupStore()
    store.dispatch(logout())
    renderWithProviders(<Router><Navigator open={true} /></Router>, { store })
    const linkElement = screen.queryByText(/Główne/i)
    const linkAdminElement = screen.queryByText(/Inne/i)
    expect(linkElement && linkAdminElement).not.toBeInTheDocument()
});
test('Renders categories if user is admin', () => {
    const store = setupStore()
    store.dispatch(login({ userId: 1, role: 1 }))
    renderWithProviders(<Router><Navigator open={true} /></Router>, { store })
    const linkElement = screen.getByText(/Główne/i)
    const linkAdminElement = screen.getByText(/Inne/i)
    expect(linkElement).toBeInTheDocument()
    expect(linkAdminElement).toBeInTheDocument()
});