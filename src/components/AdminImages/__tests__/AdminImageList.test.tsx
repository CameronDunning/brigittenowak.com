import { expect, test, vi, afterEach } from 'vitest'
import { getByText, render, screen } from '@testing-library/react'
import { DragDropContext } from 'react-beautiful-dnd'

import { AdminImageList } from '~/components/AdminImages/AdminImageList'
import { OILS } from '~/config/constants'
import { ImagesStore } from '~/stores/ImagesStore'
import { Image } from '~/types'

// https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
})

// Sample state with three images
const images: Image[] = [
    {
        deleted: false,
        dimensions: '24" x 36"',
        height: 1015,
        hidden: false,
        id: '00985b29-9d3c-4b92-909a-2d5f859e9663',
        order: 3,
        otherText: 'other text',
        sold: false,
        title: 'Snow profiles',
        type: 'oils',
        url: 'http://res.cloudinary.com/di2dfqt1l/image/upload/v1692419978/brigittenowak_com-dev/00985b29-9d3c-4b92-909a-2d5f859e9663.png',
        width: 1844,
    },
    {
        deleted: false,
        dimensions: '24" x 36"',
        height: 1015,
        hidden: false,
        id: '00985b29-9d3c-4b92-909a-2d5f859e9664',
        order: 3,
        otherText: 'other text 2',
        sold: false,
        title: 'something else',
        type: 'oils',
        url: 'http://res.cloudinary.com/di2dfqt1l/image/upload/v1692419978/brigittenowak_com-dev/00985b29-9d3c-4b92-909a-2d5f859e9663.png',
        width: 1844,
    },
    {
        deleted: false,
        dimensions: '',
        height: 968,
        hidden: false,
        id: '0ef2fc17-564a-4885-b43e-c7ac52834bf8',
        order: 6,
        otherText: '',
        sold: false,
        title: 'Oil test',
        type: 'eggTempera',
        url: 'http://res.cloudinary.com/di2dfqt1l/image/upload/v1685853528/brigittenowak_com-dev/0ef2fc17-564a-4885-b43e-c7ac52834bf8.png',
        width: 1860,
    },
    {
        deleted: false,
        dimensions: '24"x36"',
        height: 400,
        hidden: false,
        id: '09cf8096-f5cd-462c-8452-4a6b8987a311',
        order: 1,
        otherText: '',
        sold: true,
        title: 'tets4',
        type: 'serigraphs',
        url: 'http://res.cloudinary.com/di2dfqt1l/image/upload/v1689302321/brigittenowak_com-dev/09cf8096-f5cd-462c-8452-4a6b8987a311.png',
        width: 390,
    },
]

afterEach(() => {
    ImagesStore.setState({ images: [] })
})

test('renders AdminImageList without crashing', () => {
    ImagesStore.setState({ images })

    render(<AdminImageList type={OILS} />)
})

// Test that only one image is shown
test.skip('renders only one image', async () => {
    ImagesStore.setState({ images })

    const { container } = await render(
        // <DragDropContext onDragEnd={() => {}}>
        <AdminImageList type={OILS} />
        // </DragDropContext>
    )

    expect(container.querySelectorAll('img')).toHaveLength(1)
})

// Test that image title is shown
test.skip('renders image title', () => {
    ImagesStore.setState({ images })

    const { getByText, queryByText } = render(<AdminImageList type={OILS} />)

    expect(queryByText('Snow profiles')).toBeInTheDocument()
    expect(queryByText('Oil test')).not.toBeInTheDocument()
})
