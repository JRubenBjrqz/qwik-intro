import { $, component$, useSignal } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {

  const pokemonId = useSignal(1); // Primitive, booleans, strings

  const changePokemonId = $(( value: number ) => {
    if( ( pokemonId.value + value ) <= 0 ) return;
    if( ( pokemonId.value + value ) >= 151 ) return;

    pokemonId.value += value;
  })
  

  return (
    <>
      <header class="flex flex-col items-center justify-center">
        <span class="text-3xl font-bold mb-2">Generation 1 </span>
        <span class="text-1xl">{ pokemonId }</span>

        <img 
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ pokemonId.value }.png`} 
          alt="Pokemon Sprite"
          style={{ width: '150px' }}/>

        <div>
          <button onClick$={ () => changePokemonId(-1) } class="btn btn-primary mr-2">Previous</button>
          <button onClick$={  () => changePokemonId(+1 ) } class="btn btn-primary">
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
