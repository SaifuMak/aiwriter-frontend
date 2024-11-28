import React from 'react'
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';

function CustomToolTip({ title, position='right', children }) {
    return (
        <Tooltip title={title} TransitionComponent={Fade}  placement={position} TransitionProps={{ timeout: 300 }} arrow >
            {children}
        </Tooltip>

    )
}

export default CustomToolTip