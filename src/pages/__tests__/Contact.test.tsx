import { render } from '@testing-library/react'
import { test } from 'vitest'

import { Contact } from '../Contact'

test('renders Contact without crashing', () => {
    render(<Contact />)
})
