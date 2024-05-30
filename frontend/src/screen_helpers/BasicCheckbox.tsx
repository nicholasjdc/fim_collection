
export default function BasicCheckbox({checkValues, checkHandler}) {
    return (
        <div className="basicCheckbox">
                    {checkValues.map((val, idx)=>(
                        <div>
                                                    
                            
                        <label>{val.name}</label>
                        <input type="checkbox" id={val.name} name={val.name} value={val.name} checked={val.checked} onChange={(e)=>checkHandler(e, idx)} ></input>
                        </div>
                    )

                    )}
        </div>
    )
}
