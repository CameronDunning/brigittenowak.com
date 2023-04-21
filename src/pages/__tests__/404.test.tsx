import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import { NotFound } from '../404'

test('404 page renders correctly', () => {
    const { getByRole, getByText } = render(
        <BrowserRouter>
            <NotFound />
        </BrowserRouter>
    )

    const heading = getByText(/404/i)
    expect(heading).toBeInTheDocument()

    const text = getByText(/page not found/i)
    expect(text).toBeInTheDocument()

    const link = getByRole('link', { name: /go to home/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/')
})

test('404 page has the correct styling', () => {
    const { getByRole } = render(
        <BrowserRouter>
            <NotFound />
        </BrowserRouter>
    )

    const main = getByRole('main')
    expect(main).toHaveStyle({
        marginTop: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 104px)',
    })

    const link = getByRole('link', { name: /go to home/i })
    expect(link).toHaveStyle({
        textDecoration: 'underline',
        cursor: 'pointer',
    })
})
