import { render } from '@testing-library/react'
import { test } from 'vitest'

import { Home } from '../Home'

test('renders Home without crashing', () => {
    render(<Home />)
})
