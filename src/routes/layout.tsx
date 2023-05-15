import { component$, Slot, useStyles$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';

import Navbar from '~/components/shared/navbar/navbar';

import styles from './styles.css?inline';

export default component$(() => {
  useStyles$(styles);
  return (
    <>
      <Navbar />
      <main>
        <Slot />
      </main>
    </>
  );
});
