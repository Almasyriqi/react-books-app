import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserService from "../../service/user-service";

const ButtonAdd = () =>{
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
        return(
            <Link to="/add" className='btn btn-primary btn-lg'>Add New</Link>
        )
    } else {
        return <></>
    }
}

export default ButtonAdd;