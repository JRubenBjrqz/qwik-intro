import { component$ } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  
    return (
        <>
            <header class="flex flex-col items-center justify-center">
                <span class="text-3xl font-bold mb-2">SSR List</span>
            </header>
        </>
    );
});

export const head: DocumentHead = {
    title: 'SSR List',
};