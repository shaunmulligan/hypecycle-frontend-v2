export const ssr = false;

import websocketStore from "$lib/services/socketStore";

/** @type {import('../$types').PageLoad} */
export function load({ params }) {
    const wsStore = websocketStore() //WS with default values
    return {
        wsStore
    };
  }