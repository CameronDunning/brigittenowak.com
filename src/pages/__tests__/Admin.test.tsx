import { render } from '@testing-library/react'
import { expect, test } from 'vitest'

import { Admin } from '../Admin'

test('Admin page renders correctly', () => {
    const { getByText } = render(<Admin />)

    expect(getByText(/Welcome back Brigitte/)).toBeInTheDocument()
})
