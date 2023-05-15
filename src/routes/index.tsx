import { component$, useSignal } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {

  const pokemonId = useSignal(1); // Primitive, booleans, strings

  return (
    <>
      <header class="text-center">
        <span class="text-2xl">Searcher</span>
        <span class="text-9xl block">{pokemonId}</span>

        {/* To do: Pokemon image */}

        <div>
          <button class="btn btn-primary mr-2">Previous</button>
          <button class="btn btn-primary">Next</button>
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
