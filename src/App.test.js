import { render, screen } from '@testing-library/react';
import App from './App';

test('renders site shell', async () => {
  render(<App />);
  expect(await screen.findByText(/AFIA/i)).toBeInTheDocument();
});
