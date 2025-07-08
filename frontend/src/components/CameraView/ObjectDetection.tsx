import React from 'react';

interface Props {
    detections: string[]; // Adjust type as needed
}

function ObjectDetection({ detections }: Props) {
    return (
        <div>
            <h3>Detected Objects:</h3>
            <ul>
                {detections.map((object, index) => (
                    <li key={index}>{object}</li>
                ))}
            </ul>
        </div>
    );
}

export default ObjectDetection;