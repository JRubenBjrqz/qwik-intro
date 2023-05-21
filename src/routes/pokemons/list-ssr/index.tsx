import { component$, useComputed$ } from '@builder.io/qwik';
import { type DocumentHead, Link, routeLoader$, useLocation } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/shared/pokemons/pokemon-image';
import { getSmallPokemons } from '~/helpers/get-small-pokemons';
import { PokemonListResponse, SmallPokemon } from '~/interfaces';

export const usePokemonList = routeLoader$<SmallPokemon[]>(async({ query, redirect, pathname }) => {

    const offset = Number( query.get( 'offset' ) || '0' );
    if ( isNaN( offset ) ) redirect( 301, pathname );
    if ( offset < 0 ) redirect( 301, pathname );

    return getSmallPokemons( offset );
    
    // const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${ offset }`);
    // const data = await resp.json() as PokemonListResponse;

    // return data.results;

});

export default component$(() => {

    const pokemons = usePokemonList();
    const location = useLocation();

    const currentOffset = useComputed$<number>(() => {
        // const offsetString = location.url.searchParams.get('offset');
        const offsetString = new URLSearchParams( location.url.search )
        return Number(offsetString.get( 'offset' || 0 ));
    });

  
    return (
        <>
            <header class="flex flex-col items-center justify-center">
                <span class="text-3xl font-bold mb-2">SSR List</span>
                <span class="my-5 text-5xl">Status</span>
                <span>Current page: { currentOffset }</span>
                <span>Is page loading: { location.isNavigating ? 'Yes' : 'No' }</span>
            </header>

            <section class="flex flex-col items-center justify-center mt-10">
                <div>    
                    <Link href={ `/pokemons/list-ssr/?offset=${ currentOffset.value - 10 }` } 
                        class="btn btn-primary mr-2">
                        Previous
                    </Link>
                    <Link href={ `/pokemons/list-ssr/?offset=${ currentOffset.value + 10 }` }  
                        class="btn btn-primary mr-2">
                        Next
                    </Link>
                </div>

                <div class="grid grid-cols-5 mt-5">
                    { pokemons.value.map( ({ name, id }) => ( 
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
    title: 'SSR List',
};