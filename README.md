# Shop — monorepo di esempio

Piccolo e-commerce composto da:

| App | Stack | Porta | Percorso |
|---|---|---|---|
| API | Nest.js 11 | 3001 | `apps/api` |
| Web | Next.js 15 (App Router) | 3000 | `apps/web` |

I dati dei prodotti sono in memoria (`apps/api/src/products/data/products.data.ts`): non serve un database.

## Prima del colloquio (≈10 minuti)

Requisiti: **Node.js 20+** e npm, git e il tuo editor o strumento AI preferito.
In alternativa puoi aprire il repo in **GitHub Codespaces** (Code → Codespaces): l'ambiente è già configurato.

```bash
git clone <URL-DEL-REPO> shop && cd shop
npm install
npm test            # devono passare tutti i test
npm run dev         # avvia API (3001) e Web (3000) insieme
```

Apri http://localhost:3000: devi vedere la lista dei prodotti.
Se qualcosa non funziona, scrivici **prima** del colloquio, così non perdiamo tempo il giorno stesso.

> Durante il colloquio condividerai lo schermo e potrai usare **qualunque strumento AI** (Claude Code, Cursor, Copilot, ChatGPT, ecc.).
> Se non ne hai uno o non puoi usarlo, avvisaci: te ne mettiamo a disposizione uno noi.

## Comandi utili

```bash
npm run dev:api     # solo API, in watch
npm run dev:web     # solo frontend
npm test            # test dell'API (jest)
npm run build       # build di entrambe le app
```

## Endpoint API

| Metodo | Path | Note |
|---|---|---|
| GET | `/products?category=&page=&limit=` | lista paginata, filtro per categoria |
| GET | `/products/categories` | elenco categorie |
| GET | `/products/:id` | dettaglio prodotto |
| POST | `/cart/quote` | body `{ items: [{ productId, quantity }], couponCode? }`: calcola i totali del carrello |

Coupon disponibili: `WELCOME10` (-10%), `FREESHIP` (spedizione gratuita sopra 20 €), `BLACK20` (-20% sopra 100 €).

## Convenzioni

- Gli importi sono **sempre in centesimi** (interi). La formattazione avviene solo nel frontend (`lib/format.ts`).
- I filtri della lista prodotti vivono nell'**URL** (search params), così una pagina filtrata si può condividere.
- La validazione degli input dell'API usa DTO con `class-validator`.
- Ogni nuova logica dell'API va coperta da test (`*.spec.ts` accanto al file).
