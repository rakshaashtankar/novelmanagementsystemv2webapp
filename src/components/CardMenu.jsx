import React from 'react'
import './ComponentsStyle.css'

const CardMenu = (props) => {
    return (
        <div className='w-3xs h-32 bg-[#88cfdd] rounded-xl shadow-lg flex items-center justify-center '>
            {props.title}
        </div>
    )
}

export default CardMenu