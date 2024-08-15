import { createContext, useState, useEffect } from "react";

export const AvatarContext = createContext();

export function AvatarProvider({ children }) {
    const [avatarName, setAvatarName] = useState('');
    const [avatarVariant, setAvatarVariant] = useState('beam');
    const [avatarColor, setAvatarColor] = useState(['#1df097', '#ffffff']); // tweeter colors

    // functions so children can update this parent state
    const updateAvatarName = (name) => setAvatarName(name);
    const updateAvatarVariant = (variant) => setAvatarVariant(variant);

   

    return (
        <AvatarContext.Provider
            value={{
                avatarName,
                avatarVariant,
                avatarColor,
                updateAvatarName,
                updateAvatarVariant
            }}
        >
            {children}
        </AvatarContext.Provider>
    )
}   