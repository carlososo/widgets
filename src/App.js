import React, { useState } from 'react';
// import Accordion from './components/Accordion'
// import {Search} from './components/Search'
import {Dropdown} from './components/Dropdown'

const items =[
    {
        title:'What is React',
        content:'React is a FrontEnd Javascript Framework'
    },
    {
        title:'Why Use React',
        content:'React is a favorite JS library among engineers'
    },
    {
        title:'How do you use React?',
        content:'You use react by  creating components'
    },
]
const options=[
    {
        label: 'The color red',
        value:'red'
    },
    {
        label: 'The color green',
        value:'green'
    },
    {
        label: 'A shade of blue',
        value:'blue'
    },
]


export const App =()=>{
    
    const [selected, setSelected] =useState(options[0]);
    const [showDropdown, setShowDropdown] = useState(true);

    return(
        <div>
            {/* <Accordion items={items}/> */}
            {/* <Search/> */}
            <button onClick={()=>setShowDropdown(!showDropdown)}>Toggle Dropdown</button>
            {showDropdown? 
            <Dropdown 
            options={options} 
            onSelectedChange={setSelected}
            selected={selected}
            />: null
        }
        </div>
    )
}