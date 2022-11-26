/** @type {import('./$types').PageLoad} */
export function load({ route }) {
    return {
        title: (route.id).slice(1)
    };
  }