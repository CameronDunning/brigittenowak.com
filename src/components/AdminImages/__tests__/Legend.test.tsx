import { expect, test, vi } from 'vitest'
import { render } from '@testing-library/react'

import { Legend } from '~/components/AdminImages/Legend'

// https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
})

test('renders Legend without crashing', () => {
    render(<Legend />)
})

test('renders Legend with correct text', () => {
    const { getByText } = render(<Legend />)
    expect(getByText('Image is viewable to the public - hide it')).toBeInTheDocument()
})
