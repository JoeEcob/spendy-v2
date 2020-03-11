import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import Charts from '../Charts';

it('renders without crashing', async () => {
  const div = document.createElement('div');
  ReactDOM.render(<Charts />, div);
});

it('renders all page headers', async () => {
  const { getByText } = render(<Charts />);
  expect(getByText('Year Progress')).toBeInTheDocument();
});
