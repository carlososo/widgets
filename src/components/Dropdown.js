import React, { useState, useEffect, useRef } from 'react'
import './Dropdown.css'

export const Dropdown =({options, selected, onSelectedChange, label})=>{

    const [open, setOpen]=useState(false);
    const ref = useRef()

    useEffect (()=>{
        const onBodyClick =(event)=>{
            if(ref.current.contains(event.target)){
                return;
            }
            setOpen(false);
        }
        document.body.addEventListener('click', onBodyClick );

        return ()=>{
            document.body.removeEventListener('click', onBodyClick);
        }
    },[])
    
    const renderedOptions = options.map((option)=>{

        if(option.value === selected.value){
            return null;
        }
        return (
            <div key={option.value} 
            onClick={()=>onSelectedChange(option)} //le pasamos al onSelectedChange el valor del Option
            className="item">
            {option.label}
            </div>
            
        )
    })
    
    return (
        <div ref={ref} className ="ui form">
            <div className="field">
                <label className="label">{label}</label>
                <div onClick={()=>setOpen(!open)} 
                className={`ui selection dropdown ${open?'visible active':''}`}>
                    <i className="dropdown icon"></i>
                    <div className="text">{selected.label}</div>
                    <div className={`menu ${open?'visible transition': ''}`}>
                        {renderedOptions}
                    </div>
                </div>
                {/* <div>
                <p className={(selected.value==='red')?'color red': (selected.value==='green')?'color green':'color blue'}>The color is {selected.value}</p>
                </div> */}
            </div>
        </div>
    );


}