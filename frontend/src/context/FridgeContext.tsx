import { createContext, useContext } from 'react';
import { FridgeItem } from '../models/FridgeItem';

interface FridgeContextType {
    fridgeItems: FridgeItem[];
    temperature: number;
    setFridgeItems: (items: FridgeItem[]) => void;
    addItem: (item: FridgeItem) => void;
    removeItem: (rfid: string) => void;
    setTemperature: (temp: number) => void;
}

const FridgeContext = createContext<FridgeContextType>({
    fridgeItems: [],
    temperature: 2.0,
    setFridgeItems: () => { console.warn("setFridgeItems not implemented"); },
    addItem: () => { },
    removeItem: () => { },
    setTemperature: () => { console.warn("setTemperature not implemented"); },
});

export const useFridge = () => useContext(FridgeContext);
export default FridgeContext;
