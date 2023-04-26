import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Login from './Login'
import userEvent from '@testing-library/user-event'


test('test the logo src ', () => {
    render(<Login />);
    const logo = screen.getByRole('img');
    expect(logo).toHaveAttribute('src', 'https://cdn.dribbble.com/userupload/3841872/file/original-0a6f56e82ee816c6b6ab202747a58307.png?compress=1&resize=1024x768');
});

// test('<Login /> functions properly', async () => {
//   const user = userEvent.setup()

//   render(<Login />)

//   const input = screen.getByRole('textbox')
//   const sendButton = screen.getByText('save')

//   await user.type(input, 'testing a form...')
//   await user.click(sendButton)

//   expect(createNote.mock.calls).toHaveLength(1)
//   expect(createNote.mock.calls[0][0].content).toBe('testing a form...')
// })