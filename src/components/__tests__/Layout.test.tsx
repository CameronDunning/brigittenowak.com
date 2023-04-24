import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { test } from 'vitest'

import { Layout } from '../Layout'

test('renders Layout without crashing', () => {
    render(
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    )
})
