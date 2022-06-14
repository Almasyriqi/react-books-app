import React from "react";

const History = (props) => {
    return (
        <>
        {console.log(props)}
            <tr key={props.id}>
                <td>{props.judul}</td>
                <td>{props.jumlah}</td>
                <td>{props.total}</td>
                <td>{props.status}</td>
            </tr>
        </>
    )
}

export default History;