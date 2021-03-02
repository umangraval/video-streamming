import React from "react";


const Card = (props) => {
    return(
        <div className="Card">
            <h1 className="Card--Heading">{props.name}</h1>
        </div>
    )
}

export default Card;
