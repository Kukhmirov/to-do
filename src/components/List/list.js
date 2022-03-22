
import { useState, useEffect } from 'react';
import { v4 as uuidv4} from 'uuid';
import { randomColor } from 'randomcolor';
import Draggable from 'react-draggable';
import './list.scss'

function List () {
    const [item, setItem] = useState('');
    const [items, setItems] = useState(JSON.parse(localStorage.getItem('items')) || [])

    useEffect(() => localStorage.setItem('items', JSON.stringify(items)), [items]);

    const newItem = () => {
        if(item.trim() !== ''){
            const newItem = {
                id: uuidv4(),
                item: item,
                v: false,
                colorLight: randomColor({
                    luminosity: 'light'
                }),
                colorBright: randomColor({
                    luminosity: 'bright'
                }),
                itemDefaultPos:{
                    x: 300,
                    y: -300
                }
            }
            
            setItems((items) => [...items, newItem]);
            setItem('');
            
        } else {
            alert('Упс... вы ни чего не написали')
            setItem('');
        }
        
    };

    const delet = (id) => {
        setItems(items.filter(item => item.id !== id));
    }

    const newPosition = (data, index) => {
        let newArr = [...items]
        newArr[index].itemDefaultPos = {x: data.x, y: data.y}
        setItems(newArr)
    }
    const keyPress = (e) => {
        if(e.key === 'Enter'){
            newItem();
        }
    }

    const vddd = (id) => {
        let newArr = [...items];
        newArr.map(item => item.id === id ? item.v = !item.v : item.v)
        setItems(newArr)
    }

    return(
        <>
            <input 
                className='input'
                value={item}
                type="text" 
                onChange={(e) => setItem(e.target.value)}
                onKeyUp={(e) => keyPress(e)}
                placeholder="Писать тут..."/>
            <button onClick={newItem} className="button">Добавить тут</button>
            {
                items.map((item, index) => {
                    return(
                        <Draggable key={item.id} 
                                    defaultPosition={item.itemDefaultPos}
                                    onStop={(e, data) => {
                                        newPosition(data, index)
                                    }}
                                    >
                            <div className="item" style={{background: item.colorLight}}>
                                <p>{`${item.item}`}</p>
                                <div className="items">
                                    <div 
                                        className='stars'
                                        onClick={() => vddd(item.id)}
                                        style={item.v ? {background: item.colorBright} : {background: '#fff'}}></div>
                                    <button onClick={() => delet(item.id)} className='delete'>x</button>
                                </div>
                            </div>
                        </Draggable>
                    )
                })
            }
        </>
    )
}

export default List;