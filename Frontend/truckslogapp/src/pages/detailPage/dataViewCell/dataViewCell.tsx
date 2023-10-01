import React, { useEffect, useState } from "react";
import "./dataViewCellStyle.css";

type DataViewCellProps = 
{
    label:string,
    value:string
}

const DataViewCell:React.FC<DataViewCellProps> = ({label, value}) => 
{
    
    const [textMargin, setTextMargin] = useState<number>(40);
    
    // useEffect(() => {
    //     checkMargin();
    // },[]);  


    const checkMargin = () =>
    {
        if(label.length > 20 || value.length > 18)
        {
            setTextMargin(5);
        }
    }


    return(
    <div className="DataViewCellMainDiv">
        <p style={{marginLeft:textMargin}}>{label}:</p>
        <p style={{marginRight:textMargin, marginLeft:10}}>{value}</p>
    </div>
    );
}

export default DataViewCell;