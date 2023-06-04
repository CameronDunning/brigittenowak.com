import { Box, Flex, HStack, Text, useMediaQuery } from '@chakra-ui/react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { FaCircle } from 'react-icons/fa'
import { FiCircle } from 'react-icons/fi'
import { MdOutlineDeleteForever } from 'react-icons/md'
import { TiPencil } from 'react-icons/ti'

export const Legend = () => {
    const [isMobile] = useMediaQuery('(max-width: 768px)')

    return (
        <Box w="100%">
            <LegendItem Icon={AiFillEye} text="Image is viewable to the public - hide it" />
            <LegendItem Icon={AiFillEyeInvisible} text="Image is hidden from the public - show it" />
            <LegendItem Icon={FiCircle} text="Image is for sale - mark as sold" styling={{ color: 'red' }} />
            <LegendItem Icon={FaCircle} text="Image is sold (will be shown to public) - mark as for sale" styling={{ color: 'red' }} />
            <LegendItem Icon={TiPencil} text="Edit image details" />
            <LegendItem Icon={MdOutlineDeleteForever} text="Delete image" />
            {isMobile ? <Text pt={4}>On mobile, swipe left to edit and delete</Text> : null}
        </Box>
    )
}

type LegendItemProps = {
    Icon: React.FC
    text: string
    styling?: { [key: string]: string }
}

const LegendItem = ({ Icon, text, styling }: LegendItemProps) => {
    return (
        <HStack py={1}>
            <Flex w="20%" justifyContent="center">
                <Icon {...styling} />
            </Flex>
            <Box w="80%">{text}</Box>
        </HStack>
    )
}
