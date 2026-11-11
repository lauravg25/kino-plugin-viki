export async function home() {
  const url = "https://api.viki.io/v4/containers.json?page=1&per_page=24&has_paywall_content=false&sort=views_recent&licensed=true&app=100000a";
  const response = await kino.fetch(url);
  const data = JSON.parse(await response.text());

  const items = data.response.map(item => {
    return {
      id: String(item.id),
      ref: String(item.id),
      title: item.titles?.es || item.titles?.en || "Sin título",
      poster: item.images?.poster?.url,
      kind: item.type === "series" ? "series" : "movie"
    };
  });

  return [
    {
      id: "viki_recientes",
      title: "Series y Películas (Gratis)",
      items: items
    }
  ];
}

export async function browse(ref) {
  return [];
}

export async function search(query) {
  return [];
}

export async function resolve(ref) {
  return {
    url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  };
}

// Pantalla propia de Viki con filas limpias y texto seguro
export async function screen(route) {
  if (!route.path || route.path === "main") {
    const url = "https://api.viki.io/v4/containers.json?page=1&per_page=24&has_paywall_content=false&sort=views_recent&licensed=true&app=100000a";
    const response = await kino.fetch(url);
    const data = JSON.parse(await response.text());

    const listTiles = data.response.map(item => {
      const titulo = item.titles?.es || item.titles?.en || "Sin título";
      return {
        type: "ListTile",
        title: titulo,
        subtitle: "Película / Serie asiática gratuita",
        leading: {
          type: "Image",
          url: item.images?.poster?.url
        },
        onSelect: {
          open: {
            resolve: { ref: String(item.id) }
          }
        }
      };
    });

    return {
      type: "Scaffold",
      appBar: {
        type: "AppBar",
        title: "Tablero Viki Gratis - Catálogo",
        mergeWithKinoBar: true,
        dense: true,
        leading: { close: true }
      },
      body: {
        type: "ListView",
        children: listTiles
      }
    };
  }

  return {
    type: "Scaffold",
    body: { type: "ListTile", title: "Pantalla no encontrada" }
  };
}

export async function screenEvent(event) {
  return null;
}