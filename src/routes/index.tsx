import { $, component$, useSignal } from '@builder.io/qwik';
import { DocumentHead} from '@builder.io/qwik-city';
import { useNavigate } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/shared/pokemons/pokemon-image';

export default component$(() => {

  const nav = useNavigate();
  const pokemonId = useSignal(252); // Primitive, booleans, strings
  const isBackImage = useSignal(false);
  const isPokemonShiny = useSignal(false);
  const isPokemonVisible = useSignal(true);

  const changePokemonId = $(( value: number ) => {
    if ( ( pokemonId.value + value ) <= 252 ) return;
    if ( ( pokemonId.value + value ) >= 386 ) return;

    pokemonId.value += value;
  });

  const goToPokemon = $(() => {
    nav(`pokemon/${ pokemonId.value }/`);
  });

  return (
    <>
      <header class="flex flex-col items-center justify-center">
        <span class="text-3xl font-bold mb-2">Generation 3</span>

        <div onClick$={ () => goToPokemon() }>
          <PokemonImage 
            id={ pokemonId.value }
            backImage={ isBackImage.value }
            isVisible={ isPokemonVisible.value }
            isShiny={ isPokemonShiny.value }/> 
        </div>

        <div>
          <button onClick$={ () => changePokemonId( -1 ) } class="btn btn-primary mr-2">Previous</button>
          <button onClick$={  () => changePokemonId( +1 ) } class="btn btn-primary mr-2">Next</button>
          <button onClick$={ () => isPokemonVisible.value = !isPokemonVisible.value } class="btn btn-primary mr-2">
            {
              (!isPokemonVisible.value) 
              ? 'Show'
              : 'Hide'
            }
          </button>
          <button onClick$={ () => isBackImage.value = !isBackImage.value } class="btn btn-primary mr-2">Flip</button>
          <button onClick$={ () => isPokemonShiny.value = !isPokemonShiny.value } class="btn btn-primary">
            {
              (!isPokemonShiny.value)
              ? 'Shiny'
              : 'Normal'
            }
          </button>
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
