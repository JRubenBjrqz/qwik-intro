import { $, component$, useSignal } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/shared/pokemons/pokemon-image';

export default component$(() => {

  const pokemonId = useSignal(1); // Primitive, booleans, strings
  const showBackImage = useSignal(false);

  const changePokemonId = $(( value: number ) => {
    if( ( pokemonId.value + value ) <= 0 ) return;
    if( ( pokemonId.value + value ) >= 151 ) return;

    pokemonId.value += value;
  })

  return (
    <>
      <header class="flex flex-col items-center justify-center">
        <span class="text-3xl font-bold mb-2">Generation 1</span>

        <PokemonImage 
          id={ pokemonId.value }
          backImage={showBackImage.value}/> 

        <div>
          <button onClick$={ () => changePokemonId( -1 ) } class="btn btn-primary mr-2">Previous</button>
          <button onClick$={  () => changePokemonId( +1 ) } class="btn btn-primary mr-2">Next</button>
          <button onClick$={ () => showBackImage.value = !showBackImage.value } class="btn btn-primary">Flip</button>
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
