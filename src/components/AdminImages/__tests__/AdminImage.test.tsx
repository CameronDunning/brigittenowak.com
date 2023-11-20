import { render } from '@testing-library/react'
import { expect, test, vi } from 'vitest'

import { IMAGE } from '~/components/AdminImages/__tests__/Constants'
import { AdminImage } from '~/components/AdminImages/AdminImage'

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
    render(<AdminImage image={IMAGE} />)
})

test('renders the image', () => {
    const { getByRole } = render(<AdminImage image={IMAGE} />)

    expect(getByRole('img')).toBeInTheDocument()
})
