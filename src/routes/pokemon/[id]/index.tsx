import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/shared/pokemons/pokemon-image';

export const usePokemonId = routeLoader$<number>(({ params, redirect }) => {

    const id = Number(params.id);
    if ( isNaN( id ) ) redirect( 301, '/' );
    if ( id <= 252 ) redirect( 301, '/' );
    if ( id > 386 ) redirect( 301, '/' );

    return id;
});

export default component$(() => {

    // const location = useLocation();
    const pokemonId = usePokemonId();
  
    return(
        <> 
            <header class="flex flex-col items-center justify-center">
                {/* <span class="text-3xl font-bold mb-2">Pokémon: { location.params.id }</span> */}
                <span class="text-3xl font-bold mb-2">Pokémon: { pokemonId }</span>

                <PokemonImage 
                    id= { pokemonId.value }
                    isVisible
                />
            </header>
        </>
    );    
});