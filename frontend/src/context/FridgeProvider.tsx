import React, { useState } from 'react';
import FridgeContext from './FridgeContext';
import { FridgeItem } from '../models/FridgeItem';

interface Props {
    children: React.ReactNode;
}

export const FridgeProvider: React.FC<Props> = ({ children }) => {
    const [fridgeItems, setFridgeItems] = useState<FridgeItem[]>([]);
    const [temperature, setTemperature] = useState<number>(2.0);

    const addItem = (item: FridgeItem) => {
        setFridgeItems(prevItems => [...prevItems, item]);
    };

    const removeItem = (rfid: string) => {
        setFridgeItems(prevItems => prevItems.filter(item => item.rfid !== rfid));
    };

    const setTemperatureValue = (temp: number) => {
        console.log("Setting temperature to:", temp);
        setTemperature(temp);
    };

    const value = {
        fridgeItems,
        temperature,
        setFridgeItems, // ✅ Sharing with Dashboard
        addItem,
        removeItem,
        setTemperature: setTemperatureValue,
    };

    return (
        <FridgeContext.Provider value={value}>
            {children}
        </FridgeContext.Provider>
    );
};
