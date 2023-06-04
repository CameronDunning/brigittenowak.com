import { render } from '@testing-library/react'
import { test } from 'vitest'

import { Resume } from '../Resume'

test('renders Resume without crashing', () => {
    render(<Resume />)
})
