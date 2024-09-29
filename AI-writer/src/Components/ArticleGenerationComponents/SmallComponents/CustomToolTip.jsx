import React from 'react'
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';

function CustomToolTip({ title, children }) {
    return (
        <Tooltip title={title} TransitionComponent={Fade}  placement="right" TransitionProps={{ timeout: 300 }} arrow >
            {children}
        </Tooltip>

    )
}

export default CustomToolTip