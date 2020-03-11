import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import Reminders from '../Reminders';

it('renders without crashing', async () => {
  const div = document.createElement('div');
  ReactDOM.render(<Reminders />, div);
});

it('renders all page headers', async () => {
  const { getAllByRole, getAllByTitle } = render(<Reminders />);
  const results = getAllByRole('heading');
  const addReminderButtons = getAllByTitle('Add reminder');

  expect(results).toHaveLength(4);
  expect(addReminderButtons).toHaveLength(3);
  expect(results[0]).toContainHTML('<h2>Reminders</h2>');

  expect(results[1]).toHaveTextContent('Daily');
  expect(results[1]).toContainElement(addReminderButtons[0]);

  expect(results[2]).toHaveTextContent('Weekly');
  expect(results[2]).toContainElement(addReminderButtons[1]);

  expect(results[3]).toHaveTextContent('Monthly');
  expect(results[3]).toContainElement(addReminderButtons[2]);
});
