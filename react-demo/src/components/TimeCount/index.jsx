import React from "react"
import {formateDate} from '../../utils/dateUtils'
import './index.less'

function TimeCount()
{

    const [currentTime,setCurrentTime] = React.useState(formateDate(Date.now()))
    React.useEffect(()=>{
        // 每隔1s获取当前时间, 并更新状态数据currentTime
        const intervalId = setInterval(() => {
            const currentTime = formateDate(Date.now())
            setCurrentTime(currentTime)
            }, 1000)
        return ()=>{
            clearInterval(intervalId)
        }
    },[])

    return (
        <span className="curtime">{currentTime}</span>
    )
}

export default TimeCount