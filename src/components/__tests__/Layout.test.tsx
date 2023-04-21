import { render } from '@testing-library/react'
import { test } from 'vitest'

import { Dashboard } from '../Dashboard'

test('renders Dashboard without crashing', () => {
    render(<Dashboard />)
})
