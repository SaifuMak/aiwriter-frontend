import React, { useState } from 'react'
import { Reorder, useDragControls } from "framer-motion"
import Item from './Item'

function Worksheet() {
    const [items, setItems] = useState([0, 1, 2, 3])

    return (
         <Reorder.Group axis="y" onReorder={setItems} values={items}>
      {items.map((item) => (
        <Item key={item} item={item} />
      ))}
    </Reorder.Group>
    )
}

export default Worksheet