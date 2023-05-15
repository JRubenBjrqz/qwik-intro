import { component$, useSignal } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {

  const pokemonId = useSignal(1); // Primitive, booleans, strings

  return (
    <>
      <header class="flex flex-col items-center justify-center">
        <span class="text-2xl font-bold">Pokémon by Id</span>
        <span class="text-3xl">{ pokemonId }</span>

        <img 
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ pokemonId.value }.png`} 
          alt="Pokemon Sprite"
          style={{ width: '150px' }}/>

        <div>
          <button onClick$={ () => pokemonId.value-- } class="btn btn-primary mr-2">Previous</button>
          <button onClick$={  () => pokemonId.value++ } class="btn btn-primary">
            Next
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
