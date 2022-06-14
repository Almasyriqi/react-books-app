import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserService from "../../service/user-service";
import AuthService from "../../service/auth-service";

const ButtonOrder = (props) => {
    const [content, setContent] = useState("");
    useEffect(() => {
        UserService.getUserBoard().then(
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

    if (content === "User Content." && props.stok !== 0 && AuthService.getCurrentUser().roles[0] === "ROLE_USER") {
        return (
            <>
                <Link to={`/order/${props.id}`} className='btn btn-primary btn-sm'>Order</Link>
            </>
        )
    } else {
        return <></>
    }
}

export default ButtonOrder;