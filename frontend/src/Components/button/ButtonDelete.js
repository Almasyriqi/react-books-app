import React from "react";
import { useState, useEffect } from "react";
import UserService from "../../service/user-service";

const ButtonDelete = (props) => {
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
            <button onClick={() => props.hapus(props.id)} className="btn btn-danger btn-sm">Delete</button>
        )
    } else {
        return <></>
    }
}

export default ButtonDelete;