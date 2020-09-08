import React, { useState, useEffect } from 'react'; //Se hace el import de React, y subsecuentemente el import de los hooks useState y useEffect 
//useState se utiliza como reemplazo de "state" y useEffect se usa como componentDidMount(); que se ocupa cuando se hace un cambio en el rendereo
import axios from 'axios'; //importamos la libreria de axios para hacer el request 


//Generamos el functional component en vez de la clase 
export const Search =()=>{

    const [term, setTerm] = useState(''); // use state que trae un objeto que sería busqueda
    const [results, setResults] = useState([]); //state de los elementos que traen desde la petición Axios, 

    useEffect(()=>{    //el useEffect sirve como si fuera un componentDidMount, y este componente sirve sencillamente para que cuando se modifica algo se rerendere el virtualDOM
        const search=async()=>{ //como no se puede hacer async el  useEffect, metemos una funcion Async para poder hacer el llamado de axios y traer la información
            const {data}= await axios.get('https://en.wikipedia.org/w/api.php',{
            params:{
                action:'query',
                list:'search',
                origin:'*',
                format:'json',
                srsearch: term,  //aqui traemos desde el searchbar la información  este es lo que vamos a buscar
            }
        });
        setResults(data.query.search); //aqui se modifica el arreglo de results y agregamos el resultado que se trae desde la API
        };

        if(term && !results.length){
            search();
        }else{
        const timeoutId = setTimeout(()=>{ //metemos un timeout para que no haga un search cada que escribamos una tecla
            if(term){  //si term NO está vacía entonces ejecuta la funcion asyncrona search
        
            search();
        }
        },700); // y mete un delay de 700 milisegundos 
        return ()=>{ //este return sirve para hacer un cancel del timeOut cada que se escriba una tecla
            clearTimeout(timeoutId);  //si se presiona una tecla entonces limpia el timeout, solo ejecuta el timeout cuando se dejen de presionar teclas
        };
    }
            
    },[term] );  // este es un parametro del useEffect, y existen 3 variantes, 1 se renderea una sola vez, 2 se mete un parametro dentro de una declaración de arreglo[] y solo cuando ese parametro 
    //se modifique entonces se va a rerenderear y 3 se ejecuta el useEffect cada que se hace una modificación a cualquer elemento 

    const renderedResults = results.map((result)=>{ //Aqui hicimos esta funcion para traer los valores de results y los vamos a meter en un elemento JSX un "div" y todo lo que va adentro
        return (<div key={result.pageid} className="item">
            <div className="right floated content">
                <a href={`https://en.wikipedia.org?curid=${result.pageid}`} className="ui button">Go</a>    {/* traemos desde el arreglo results un resultado singular result y de ahí extraemos el pageid */}
            </div>
            <div className="content">
                <div className="Header">
                    {result.title}
                </div>
                <span dangerouslySetInnerHTML={{__html: result.snippet}}></span>  {/* esta etiqueta dangerouslySetInnerHTML sirve para "parsear" el código HTML que trae la API */}
                
            </div>
        </div>)
    })

    return (   //se hace el return de los JSX que va a traer los elementos al virtual DOM 
        <div>   
            <div className="ui form">
                <div className="field">
                    <label>Enter Search Term</label>
                    <input 
                    value={term}
                    onChange={e => setTerm(e.target.value)}   /* Aqui vamos a hacer una funcion onChange, y cuando se ejecute un cambio vamos a llevar el valor de term  */
                    className="input"/>
                </div>
            </div>
            <div className="ui celled list">
                {renderedResults}    {/* Aqui vamos a traer el resultado de la funcion de mapeo que ejecutamos allá arriba*/}
            </div>
        </div>
    )
}

