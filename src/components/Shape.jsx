import React, { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'; 

const Shape = ({data}) => {
    const [unload, setLoad] = useState(false)
    const [selected, setSelected] = useState(new Set())
    const boxes = useMemo(()=> data.flat(Infinity), [data])
    const countOfVisibleBoxes = useMemo(()=> boxes.reduce((acc, box)=>{
        if(box===1){
            return acc+=1
        }
        return acc
    }, 0), [boxes])

    const unloading = ()=>{
        setLoad(true)
        const keys = Array.from(selected.keys())
        const removeNextKey = ()=>{
            if(keys.length){
                const currentKey = keys.shift()
                setSelected(prev=>{
                    const updateKeys = new Set(prev)
                    updateKeys.delete(currentKey)
                    return updateKeys
    
                })
                setTimeout(removeNextKey, 500)
            } else{
                setLoad(false)
            }
        }

        setTimeout(removeNextKey, 100)
       
    }

    useEffect(()=>{
        if(selected.size >= countOfVisibleBoxes){
            unloading()
        }
    }, [selected])

    const handleClick = (e)=>{
        const {target} = e;

        const index = target.getAttribute('data-index')
        const status = target.getAttribute('data-status')

        if (index === null || status === 'hidden' || unload){
            return;
        }

        setSelected(prev=>{
          return new Set(prev.add(index))
        })
    }
  return (
    <div className='boxes' onClick={handleClick}>
        {boxes.map((box, index)=>{
            const status = box === 1 ? 'visible': 'hidden'
            const isSelected = selected.has(index.toString())
            return(
                <div key={`${box}-${index}`} className={classNames('box', status, isSelected && 'selected')} data-index={index} data-status={status}>
                </div>
            )
        })}
    </div>
  )
}

export default Shape