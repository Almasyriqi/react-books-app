import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserService from "../../service/user-service";

const ButtonEdit = (props) =>{
    const [content, setContent] = useState("");
    useEffect(() => {
        UserService.getAdminBoard().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setContent(_content);
            }
        );
    }, []);

    if(content === "Admin Content."){
        console.log(props.id);
        return(
            <Link to={`/edit/${props.id}`} className='btn btn-info btn-sm'>Edit</Link>
        )
    } else {
        return <></>
    }
}

export default ButtonEdit;