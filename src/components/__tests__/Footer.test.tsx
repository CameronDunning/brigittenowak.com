import { render } from '@testing-library/react'

import { Footer } from '../Footer'

test('renders Footer without crashing', () => {
    render(<Footer />)
})

test('footer renders the copyright notice', () => {
    const { getByText } = render(<Footer />)
    const copyrightNotice = getByText(/©\d{4} Brigitte Nowak, painter and printmaker\./i)
    expect(copyrightNotice).toBeInTheDocument()
})

test('footer has the correct styling', () => {
    const { getByTestId } = render(<Footer />)
    const footer = getByTestId(/footer/)
    expect(footer).toHaveStyle({
        position: 'absolute',
        bottom: 0,
        textAlign: 'center',
        fontSize: 'sm',
        width: '100%',
        padding: '2px',
    })
})
