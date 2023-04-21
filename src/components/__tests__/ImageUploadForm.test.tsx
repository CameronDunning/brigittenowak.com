import { fireEvent, render } from '@testing-library/react'
import { expect, test, vi } from 'vitest'

import { ImageUploadForm } from '../ImageUploadForm'

test('renders ImageUploadForm without crashing', () => {
    const setShowForm = vi.fn()

    render(<ImageUploadForm setShowForm={setShowForm} />)
})

test('hitting the close button closes the form', () => {
    const setShowForm = vi.fn()

    const { getByTestId } = render(<ImageUploadForm setShowForm={setShowForm} />)

    const closeButton = getByTestId(/close-image-form-button/)
    fireEvent.click(closeButton)

    expect(setShowForm).toHaveBeenCalledWith(false)
})

test('fills out form', () => {
    const setShowForm = vi.fn()

    const { getByTestId, getByLabelText, getByPlaceholderText, getByDisplayValue, getByText } = render(<ImageUploadForm setShowForm={setShowForm} />)

    const titleInput = getByLabelText(/Title/)
    expect(titleInput).toBeInTheDocument()
    const typeInput = getByLabelText(/Type*/)
    expect(typeInput).toBeInTheDocument()
    const otherTextInput = getByLabelText(/Other Text/)
    expect(otherTextInput).toBeInTheDocument()
    const dimensionsInput = getByLabelText(/Dimensions/)
    expect(dimensionsInput).toBeInTheDocument()
    const soldCheckbox = getByLabelText(/Sold/)
    expect(soldCheckbox).toBeInTheDocument()
    const hiddenCheckbox = getByLabelText(/Hidden/)
    expect(hiddenCheckbox).toBeInTheDocument()
    const imageInput = getByTestId(/image-upload-button/)
    expect(imageInput).toBeInTheDocument()
    const submitButton = getByText(/Submit/)
    expect(submitButton).toBeInTheDocument()

    fireEvent.change(titleInput, { target: { value: 'Test Title' } })
    fireEvent.change(typeInput, { target: { value: 'oils' } })
    fireEvent.change(otherTextInput, { target: { value: 'Test Other Text' } })
    fireEvent.change(dimensionsInput, { target: { value: 'Test Dimensions' } })
    fireEvent.click(soldCheckbox)
    fireEvent.click(hiddenCheckbox)

    expect(titleInput).toHaveValue('Test Title')
    expect(typeInput).toHaveValue('oils')
    expect(otherTextInput).toHaveValue('Test Other Text')
    expect(dimensionsInput).toHaveValue('Test Dimensions')
    expect(soldCheckbox).toBeChecked()
    expect(hiddenCheckbox).toBeChecked()
})
