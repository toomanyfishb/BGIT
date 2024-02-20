import React from 'react';
function Greeting(props) {
    const { name } = props;
    return (
        <div>
            {/* Displaying the greeting based on the provided name */}
            <h1>Hello, {name}! </h1>
        </div>
    );
}
export default Greeting;