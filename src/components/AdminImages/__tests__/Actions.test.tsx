import { expect, test, vi } from 'vitest'
import { render } from '@testing-library/react'

import { Actions } from '~/components/AdminImages/Actions'
import { IMAGE } from '~/components/AdminImages/__tests__/Constants'

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

test('renders Actions without crashing', () => {
    render(<Actions image={IMAGE} />)
})

test('renders Actions with correct buttons', () => {
    const { getAllByRole, getByLabelText } = render(<Actions image={IMAGE} />)

    const buttons = getAllByRole('button')
    expect(buttons).toHaveLength(4)

    const notSoldButton = getByLabelText('mark sold')
    expect(notSoldButton).toBeInTheDocument()

    const notHiddenButton = getByLabelText('mark hidden')
    expect(notHiddenButton).toBeInTheDocument()
})

test('renders Actions with correct buttons when image is sold', () => {
    const { getAllByRole, getByLabelText } = render(<Actions image={{ ...IMAGE, sold: true }} />)

    const buttons = getAllByRole('button')
    expect(buttons).toHaveLength(4)

    const soldButton = getByLabelText('mark for sale')
    expect(soldButton).toBeInTheDocument()
})

test('renders Actions with correct buttons when image is hidden', () => {
    const { getAllByRole, getByLabelText } = render(<Actions image={{ ...IMAGE, hidden: true }} />)

    const buttons = getAllByRole('button')
    expect(buttons).toHaveLength(4)

    const soldButton = getByLabelText('mark visible')
    expect(soldButton).toBeInTheDocument()
})
