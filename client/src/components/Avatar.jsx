import Avatar from "boring-avatars"
import { useState } from "react";

export default function AvatarComponent({ display, signup }) {

    const [avatarKey, setAvatarKey] = useState(1);
    const [selectedVariant, setSelectedVariant] = useState('beam');

    const refreshAvatar = () => {
        setAvatarKey(prev => prev + 1);
    };

    const randomIndex = (array) => {
        return Math.floor(Math.random() * array.length)
    };

    const handleOption = (e) => {
        setSelectedVariant(e.target.value)
    };

    const colors = ['#1df097', '#ffffff']; // tweeter colors

    const names = [
        'Mary Baker', 'Amelia Earhart', 'Mary Roebling', 'Sarah Winnemucca', 'Margaret Brent', 'Lucy Stone', 'Mary Edwards', 'Margaret Chase', 'Mahalia Jackson',
        'Maya Angelou', 'Margaret Bourke', 'Eunice Kennedy', 'Carrie Chapman', 'Elizabeth Peratrovich', 'Alicia Dickerson', 'Daisy Gatson', 'Emma Willard', 'Amelia Boynton',
        'Maria Mitchell', 'Sojourner Truth', 'Willa Cather', 'Coretta Scott', 'Harriet Tubman', 'Fabiola Cabeza', 'Sacagawea', 'Esther Martinez', 'Elizabeth Cady',
        'Bessie Coleman', 'Ma Rainey', 'Julia Ward', 'Irene Morgan', 'Babe Didrikson', 'Lyda Conley', 'Annie Dodge', 'Maud Nathan', 'Betty Ford',
        'Rosa Parks', 'Susan La', 'Gertrude Stein', 'Wilma Mankiller', 'Grace Hopper', 'Jane Addams', 'Katharine Graham', 'Florence Chadwick', 'Zora Neale',
        'Wilma Rudolph', 'Annie Jump', 'Mother Frances', 'Jovita Idár', 'Maggie L', 'Henrietta Swan', 'Jane Cunningham', 'Victoria Woodhull', 'Helen Keller'
    ];

    const [avatarName, setAvatarName] = useState(randomIndex(names));

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
                        key={avatarKey} 
                        name={names[randomIndex(names)]} 
                        colors={colors} 
                        variant={selectedVariant}
                    />
                </button>
                <select 
                    className="ml-2 text-center bg-interactive border border-border p-3 rounded-lg hover:shadow-hover hover:shadow-primary transition-all duration-300 ease-in-out focus:outline-none inline-block"
                    value={selectedVariant} 
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