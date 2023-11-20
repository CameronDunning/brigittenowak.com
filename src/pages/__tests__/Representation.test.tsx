import { render } from '@testing-library/react'
import { test } from 'vitest'

import { Representation } from '~/pages/Representation'

test('renders Representation without crashing', () => {
    render(<Representation />)
})
