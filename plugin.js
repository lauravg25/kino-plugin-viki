export async function home() {
  const url = "https://api.viki.io/v4/containers.json?page=1&per_page=30&has_paywall_content=false&sort=views_recent&licensed=true&app=100000a";
  const response = await kino.fetch(url);
  const data = JSON.parse(await response.text());

  const items = (data.response || []).map(item => {
    return {
      id: String(item.id),
      ref: String(item.id),
      title: item.titles?.es || item.titles?.en || "Sin título",
      poster: item.images?.backdrop?.url || item.images?.poster?.url,
      kind: item.type === "series" ? "series" : "movie"
    };
  });

  return [
    {
      id: "viki_todo",
      title: "Series y Películas Populares",
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

export async function screen(route) {
  if (!route.path || route.path === "main") {
    return {
      type: "Scaffold",
      appBar: {
        type: "AppBar",
        title: "Tablero Viki - Acceso Directo",
        mergeWithKinoBar: true,
        dense: true,
        leading: { close: true }
      },
      body: {
        type: "ListView",
        children: [
          {
            type: "ListTile",
            title: "Catálogo Principal Disponible",
            subtitle: "Todo el contenido gratuito de Viki está sincronizado en la pestaña de Inicio de Kino."
          },
          {
            type: "ListTile",
            title: "Explorar Tendencias",
            subtitle: "Haz clic aquí para ir al listado completo de series y películas asiáticas",
            onSelect: {
              open: {
                home: true
              }
            }
          }
        ]
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