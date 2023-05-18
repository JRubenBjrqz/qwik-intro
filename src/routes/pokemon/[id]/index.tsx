import { component$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/shared/pokemons/pokemon-image';

export default component$(() => {

    const location = useLocation();
  
    return(
        <> 
            <header class="flex flex-col items-center justify-center">
                <span class="text-3xl font-bold mb-2">Pokémon: { location.params.id }</span>

                <PokemonImage 
                    id= { location.params.id }
                />
            </header>
        </>
    );    
});