import { useEffect, useState } from 'react'
import { Droppable, DroppableProps } from 'react-beautiful-dnd'

export const StrictModeDroppable = ({ droppableId, children, ...props }: DroppableProps) => {
    const [enabled, setEnabled] = useState(false)

    useEffect(() => {
        const animation = requestAnimationFrame(() => setEnabled(true))

        return () => {
            cancelAnimationFrame(animation)
            setEnabled(false)
        }
    }, [])

    if (!enabled) {
        return null
    }

    return (
        <Droppable {...props} droppableId={droppableId}>
            {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps} style={styles.container}>
                    {children(provided, snapshot)}
                </div>
            )}
        </Droppable>
    )
}

const styles = {
    container: {
        width: '100%',
    },
}
