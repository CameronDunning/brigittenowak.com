import { expect, test, vi } from 'vitest'
import { render } from '@testing-library/react'

import { Actions } from '../Actions'
import { Image } from '~/types'

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

test('renders Actions without crashing', () => {
    render(<Actions image={testImage} />)
})

test('renders Actions with correct buttons', () => {
    const { getAllByRole, getByLabelText } = render(<Actions image={testImage} />)

    const buttons = getAllByRole('button')
    expect(buttons).toHaveLength(4)

    const notSoldButton = getByLabelText('mark sold')
    expect(notSoldButton).toBeInTheDocument()

    const notHiddenButton = getByLabelText('mark hidden')
    expect(notHiddenButton).toBeInTheDocument()
})

test('renders Actions with correct buttons when image is sold', () => {
    const { getAllByRole, getByLabelText } = render(<Actions image={{ ...testImage, sold: true }} />)

    const buttons = getAllByRole('button')
    expect(buttons).toHaveLength(4)

    const soldButton = getByLabelText('mark for sale')
    expect(soldButton).toBeInTheDocument()
})

test('renders Actions with correct buttons when image is hidden', () => {
    const { getAllByRole, getByLabelText } = render(<Actions image={{ ...testImage, hidden: true }} />)

    const buttons = getAllByRole('button')
    expect(buttons).toHaveLength(4)

    const soldButton = getByLabelText('mark visible')
    expect(soldButton).toBeInTheDocument()
})
