import { fireEvent, render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { expect, test } from 'vitest'

import { NavBar } from '~/components/NavBar'

test('renders NavBar without crashing', () => {
    render(
        <BrowserRouter>
            <NavBar />
        </BrowserRouter>
    )
})

test('renders NavBar title', () => {
    const { getByText } = render(
        <BrowserRouter>
            <NavBar />
        </BrowserRouter>
    )
    const title = getByText('Brigitte Nowak')
    expect(title).toBeInTheDocument()
})

test('renders NavBar links', () => {
    const { getByText } = render(
        <BrowserRouter>
            <NavBar />
        </BrowserRouter>
    )
    const about = getByText(/About/)
    const images = getByText(/Artwork/)
    const galleries = getByText(/Galleries/)
    const contact = getByText(/Contact/)
    expect(about).toBeInTheDocument()
    expect(images).toBeInTheDocument()
    expect(galleries).toBeInTheDocument()
    expect(contact).toBeInTheDocument()
})

test('toggles dropdown menu when hamburger icon is clicked', () => {
    const { getByLabelText, getAllByText } = render(
        <BrowserRouter>
            <NavBar />
        </BrowserRouter>
    )
    const hamburger = getByLabelText('Open Menu')
    fireEvent.click(hamburger)
    const about = getAllByText(/About/)
    const images = getAllByText(/Artwork/)
    const galleries = getAllByText(/Galleries/)
    const contact = getAllByText(/Contact/)
    expect(about.length).toBe(2)
    expect(images.length).toBe(2)
    expect(galleries.length).toBe(2)
    expect(contact.length).toBe(2)
    fireEvent.click(hamburger)
})
