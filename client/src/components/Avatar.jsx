import Avatar from "boring-avatars"
import { useState, useContext, useEffect } from "react";
import { AvatarContext } from "../context/AvatarContext";

export default function AvatarComponent({ settings }) {

    const {
        avatarName,
        avatarVariant,
        avatarColor,
        updateAvatarName,
        updateAvatarVariant
    } = useContext(AvatarContext);

    const refreshAvatar = () => {
        // setAvatarName(names[randomIndex(names)]);
        updateAvatarName(names[randomIndex(names)]);
    };

    const randomIndex = (array) => {
        return Math.floor(Math.random() * array.length)
    };

    const handleOption = (e) => {
        // setAvatarVariant(e.target.value)
        updateAvatarVariant(e.target.value)
    };

    const names = [
        'Mary Baker', 'Amelia Earhart', 'Mary Roebling', 'Sarah Winnemucca', 'Margaret Brent', 'Lucy Stone', 'Mary Edwards', 'Margaret Chase', 'Mahalia Jackson',
        'Maya Angelou', 'Margaret Bourke', 'Eunice Kennedy', 'Carrie Chapman', 'Elizabeth Peratrovich', 'Alicia Dickerson', 'Daisy Gatson', 'Emma Willard', 'Amelia Boynton',
        'Maria Mitchell', 'Sojourner Truth', 'Willa Cather', 'Coretta Scott', 'Harriet Tubman', 'Fabiola Cabeza', 'Sacagawea', 'Esther Martinez', 'Elizabeth Cady',
        'Bessie Coleman', 'Ma Rainey', 'Julia Ward', 'Irene Morgan', 'Babe Didrikson', 'Lyda Conley', 'Annie Dodge', 'Maud Nathan', 'Betty Ford',
        'Rosa Parks', 'Susan La', 'Gertrude Stein', 'Wilma Mankiller', 'Grace Hopper', 'Jane Addams', 'Katharine Graham', 'Florence Chadwick', 'Zora Neale',
        'Wilma Rudolph', 'Annie Jump', 'Mother Frances', 'Jovita Idár', 'Maggie L', 'Henrietta Swan', 'Jane Cunningham', 'Victoria Woodhull', 'Helen Keller'
    ];

    useEffect(() => {
        updateAvatarName(names[0]);
    }, []);

    if (settings) {
        const {
            avatarName,
            avatarVariant,
            avatarColor
        } = settings
        return (
            <Avatar
                name={avatarName}
                variant={avatarVariant}
                colors={avatarColor}
            />
        )
    }

    // return for signup form
    return (
        <div className="flex flex-col items-center justify-center w-100">
            
            <div className="flex flex-row items-center justify-center">
                <button
                    className="hover:shadow-hover hover:shadow-primary rounded-full p-[0.5px] transition-all duration-300 ease-in-out"
                    onClick={refreshAvatar}     
                    type="button" 
                    id="avatarBtn"
                >
                    <Avatar 
                        size={50}
                        name={avatarName} 
                        colors={avatarColor} 
                        variant={avatarVariant}
                    />
                </button>
                <select 
                    className="ml-2 text-center bg-interactive border border-border p-3 rounded-lg hover:shadow-hover hover:shadow-primary transition-all duration-300 ease-in-out focus:outline-none inline-block"
                    value={avatarVariant} 
                    onChange={handleOption}
                >
                    <option value="beam">beam</option>
                    <option value="pixel">pixel</option>
                    <option value="bauhaus">bauhaus</option>
                </select>
            </div>
        </div>
    )
};