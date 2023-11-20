import { render } from '@testing-library/react'
import { expect, test } from 'vitest'

import { LoginForm } from '~/components/LoginForm'

test('renders LoginForm without crashing', () => {
    render(<LoginForm />)
})

test('it renders the correct fields', () => {
    const { getByLabelText } = render(<LoginForm />)

    expect(getByLabelText(/Email/)).toBeInTheDocument()
    expect(getByLabelText(/Password/)).toBeInTheDocument()
})
