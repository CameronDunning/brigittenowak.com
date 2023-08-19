import { render } from '@testing-library/react'
import { test } from 'vitest'

import { Contact } from '~/pages/Contact'

test('renders Contact without crashing', () => {
    render(<Contact />)
})
