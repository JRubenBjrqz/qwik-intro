import { component$, useSignal, useTask$ } from "@builder.io/qwik";

interface Props {
    id: number;
    size?: number;
    backImage: boolean;
    isVisible?: boolean;
}

export const PokemonImage = component$(({ 
    id, 
    size = 150, 
    backImage = false, 
    isVisible = false 
}: Props  ) => {

    // let pokemonImage: string;

    // const isPokemonFront = () => {
    //     if( backImage ){
    //         return pokemonImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ id }.png`;
    //     } else {
    //         return pokemonImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${ id }.png`;
    //     }
    // }

    const imageLoaded = useSignal(false);

    useTask$(({ track }) => {
        track( () => id );

        imageLoaded.value = false;
    }); 

    let ImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ id }.png`;

    if( backImage ) {
        ImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${ id }.png`;
    }
    
    return (
        <div style={{ width:`${ size }px`, height: `${ size }px` }} class="flex items-center justify-center">
            { !imageLoaded.value && (<small class="text-gray-400 opacity-50">Loading...</small>) }
                <img
                    // src={ isPokemonFront() } 
                    src={ ImageUrl }
                    alt="Pokemon Sprite"
                    style={{ width: `${ size }px` }}
                    onLoad$={ () => { imageLoaded.value = true }  }
                    class={[{
                        'hidden': !imageLoaded.value,
                        'brightness-0': !isVisible,
                    }, 'transition-all'] }
                /> 
            
        </div>
    )
 });