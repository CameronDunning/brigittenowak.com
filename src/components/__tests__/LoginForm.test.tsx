import { render, fireEvent } from '@testing-library/react'

import { LoginForm } from '../LoginForm'

test('renders LoginForm without crashing', () => {
    render(<LoginForm />)
})

test('it renders the correct fields', () => {
    const { getByRole, getAllByRole, container, getByLabelText } = render(<LoginForm />)

    expect(getByLabelText(/Email/)).toBeInTheDocument()
    expect(getByLabelText(/Password/)).toBeInTheDocument()
})
