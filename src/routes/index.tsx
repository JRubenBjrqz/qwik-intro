import { $, component$, useContext } from '@builder.io/qwik';
import { DocumentHead} from '@builder.io/qwik-city';
import { useNavigate } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/shared/pokemons/pokemon-image';
import { PokemonGameContext } from '~/context';

export default component$(() => {

  const nav = useNavigate();
  // const pokemonId = useSignal(252); // Primitive, booleans, strings
  // const isBackImage = useSignal(false);
  // const isPokemonShiny = useSignal(false);
  // const isPokemonVisible = useSignal(true);

  const pokemonGame = useContext( PokemonGameContext );

  const changePokemonId = $(( value: number ) => {
    if ( ( pokemonGame.pokemonId + value ) <= 251 ) return;
    if ( ( pokemonGame.pokemonId + value ) >= 386 ) return;

    pokemonGame.pokemonId += value;
  });

  const goToPokemon = $(( id: number ) => {
    nav(`pokemon/${ id }/`);
  });

  return (
    <>
      <header class="flex flex-col items-center justify-center">
        <span class="text-3xl font-bold mb-2">Generation 3</span>

        <div onClick$={ () => goToPokemon( pokemonGame.pokemonId ) }>
          <PokemonImage
            id={ pokemonGame.pokemonId }
            backImage={ pokemonGame.showBackImage }
            isVisible={ pokemonGame.isPokemonVisible }
          /> 
        </div>

        <div>
          <button onClick$={ () => changePokemonId( -1 ) } class="btn btn-primary mr-2">Previous</button>
          <button onClick$={  () => changePokemonId( +1 ) } class="btn btn-primary mr-2">Next</button>
          <button onClick$={ () => pokemonGame.isPokemonVisible = !pokemonGame.isPokemonVisible} class="btn btn-primary mr-2">
            {
              (!pokemonGame.isPokemonVisible) 
              ? 'Show'
              : 'Hide'
            }
          </button>
          <button onClick$={ () => pokemonGame.showBackImage = !pokemonGame.showBackImage } class="btn btn-primary mr-2">Flip</button>
        </div>
      </header>
        
    </>
  );
});

export const head: DocumentHead = {
  title: 'PokeQwik',
  meta: [
    {
      name: 'description',
      content: 'Learning Qwik',
    },
  ],
};
