import { render } from '@testing-library/react'
import { test } from 'vitest'
import { BrowserRouter } from 'react-router-dom'

import { About } from '~/pages/About'

test('renders About without crashing', () => {
    render(
        <BrowserRouter>
            <About />
        </BrowserRouter>
    )
})
