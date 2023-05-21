import { component$, useStore, useVisibleTask$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/shared/pokemons/pokemon-image';
import { getSmallPokemons } from '~/helpers/get-small-pokemons';
import type { SmallPokemon } from '~/interfaces';

interface PokemonPageState {
    currentPage: number;
    pokemons: SmallPokemon[];
}

export default component$(() => {

    const pokemonState = useStore<PokemonPageState>({
        currentPage: 0,
        pokemons: [],
    });

    // Visible to the client
    useVisibleTask$( async({ track }) => {
        track( () => pokemonState.currentPage )
        const pokemons = await getSmallPokemons( pokemonState.currentPage * 10 );
        pokemonState.pokemons = [ ...pokemonState.pokemons, ...pokemons];
    });
  
    return (
        <>
            <header class="flex flex-col items-center justify-center">
                <span class="text-3xl font-bold mb-2">SSR List</span>
                <span class="my-5 text-5xl">Status</span>
                <span>Current page: { pokemonState.currentPage }</span>
                <span>Page is loading: </span>
            </header>

            <section class="flex flex-col items-center justify-center mt-10">
                <div>    
                    <button onClick$={ () => pokemonState.currentPage-- }
                        class="btn btn-primary mr-2">
                        Previous
                    </button>
                    <button onClick$={ () => pokemonState.currentPage++ }
                        class="btn btn-primary mr-2">
                        Next
                    </button>
                </div>

                <div class="grid grid-cols-5 mt-5">
                    { 
                        pokemonState.pokemons.map( ({ name, id }) => ( 
                            <div key={ name } class="m-5 flex flex-col justify-center items-center">
                                <PokemonImage 
                                    id= { id }
                                />
                                <span class="capitalize">{ name }</span>
                            </div>
                        )) 
                    } 
                </div>

            </section>

        </>
    );
});

export const head: DocumentHead = {
    title: 'Client List',
};