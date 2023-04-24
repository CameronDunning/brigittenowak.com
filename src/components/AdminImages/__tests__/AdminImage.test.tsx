import { expect, test, vi } from 'vitest'
import { render } from '@testing-library/react'
import { Image } from '~/types'

import { AdminImage } from '../AdminImage'

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

const testImage: Image = {
    id: '1',
    title: 'Test title',
    type: 'oils',
    otherText: '',
    dimensions: '',
    sold: false,
    hidden: false,
    deleted: false,
    url: 'https://test.com',
    width: 100,
    height: 100,
}

test('renders Legend without crashing', () => {
    render(<AdminImage image={testImage} />)
})

test('renders the image', () => {
    const { getByRole } = render(<AdminImage image={testImage} />)

    expect(getByRole('img')).toBeInTheDocument()
})
