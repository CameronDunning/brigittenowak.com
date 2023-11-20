import { fireEvent, render } from '@testing-library/react'
import { expect, test, vi } from 'vitest'

import { Dashboard } from '~/components/Dashboard'

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

test('renders Dashboard without crashing', () => {
    render(<Dashboard />)
})

test('dashboard renders the correct title', () => {
    const { getByText } = render(<Dashboard />)
    const title = getByText(/Welcome to your dashboard/i)
    expect(title).toBeInTheDocument()
})

test('clicking the upload photo button opens the form', () => {
    const { getByText, getByTestId } = render(<Dashboard />)
    const uploadPhotoButton = getByText(/Upload Photo/i)
    expect(uploadPhotoButton).toBeInTheDocument()

    fireEvent.click(uploadPhotoButton)

    // upload photo button is now disabled
    expect(uploadPhotoButton).toBeDisabled()

    // form is now visible
    const form = getByTestId(/image-upload-form/)
    expect(form).toBeInTheDocument()

    // clicking the close button closes the form
    const closeButton = getByTestId(/close-image-form-button/)
    fireEvent.click(closeButton)

    // form is now hidden
    expect(form).not.toBeInTheDocument()
})

// Test the images list
