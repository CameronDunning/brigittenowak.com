import { render } from '@testing-library/react'

import { Dashboard } from '../Dashboard'

test('renders Dashboard without crashing', () => {
    render(<Dashboard />)
})
