import { component$ } from "@builder.io/qwik";

interface Props {
    id: number;
    size?: number;
    backImage: boolean;
}

export const PokemonImage = component$(( { id, size = 150, backImage = false }: Props  ) => {

    let pokemonImage: string;

    const isPokemonFront = () => {
        if(backImage){
            return pokemonImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ id }.png`;
        } else {
            return pokemonImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${ id }.png`;
        }
    }
    
    return (

        <img 
            src={ isPokemonFront() } 
            alt="Pokemon Sprite"
            style={{ width: `${ size }px` }}/>
    )
 });