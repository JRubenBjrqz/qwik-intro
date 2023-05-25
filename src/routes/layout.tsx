import { component$, Slot, useContextProvider, useStore, useStyles$ } from '@builder.io/qwik';

import Navbar from '~/components/shared/navbar/navbar';

import styles from './styles.css?inline';
import { PokemonGameContext, type PokemonGameState } from '~/context';

export default component$(() => {
  useStyles$(styles);

  const pokemonGame = useStore<PokemonGameState>({
    pokemonId: 253,
    isPokemonVisible: true,
    showBackImage: false,
  });

  useContextProvider( PokemonGameContext, pokemonGame );

  return (
    <>
      <Navbar />
      <main>
        <Slot />
      </main>
    </>
  );
});
