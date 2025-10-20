import React from 'react';

type HelloProps = {
    name: string;
};

const HelloComponent: React.FC<HelloProps> = ({ name }) => {
    return <h1>Hej, {name}!</h1>;
};

export default HelloComponent;