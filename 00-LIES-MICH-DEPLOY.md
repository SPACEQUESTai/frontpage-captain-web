# ⚓ Frontpage Captain — Cinematic Landingpage v2 (deploy-fertig)

**Stand:** 23.06.2026 · mehrseitig · cinematic · 5 Sprachen · Motor + Stripe verdrahtet

Diese Sammlung ist die neue Marketing-Website mit dem **alles-sehenden Auge**. Sie ist statisch — kein Build nötig.

## Inhalt (11 Seiten)
| Datei | Rolle |
|---|---|
| `index.html` | **Startseite** — Auge-Hero, „Deine Website wird Kino.", Teaser, 4 Schritte, Preise |
| `warum-cinematic.html` | Warum cinematic — Vergleich gewöhnlich vs. Kino |
| `so-laeufts.html` | So läuft's — 4 Schritte im Detail |
| `preise.html` | Preise — 777 / 1.976 € + FAQ |
| `vor-ort.html` | Captain vor Ort — Programm + Buchungs-Ablauf (1.976 €) |
| `live-gehen.html` | Live gehen — 3 Wege, das Datei-Paket online zu bringen |
| `impressum · datenschutz · agb · kontakt` | Recht-Seiten (anwaltlich, **deutsch**) |
| `kundenseite-public.html` | Das Motor-Tool „erst sehen, dann zahlen" (Hero leitet hierher) |
| `assets/` | site.css · site.js · **i18n.js** (5 Sprachen) · Auge-Videos/Bilder |
| `studio-assets/` | Bilder für das Motor-Tool (9 MB) |

`_src/` enthält nur die Bau-Skripte + QA-Screenshots — **nicht deployen** (schadet aber nicht).

## So deployst du (dein Schritt)
1. Diesen Ordner auf **Vercel** hochladen (Wurzel = `index.html`). Statisch, kein Build.
2. Domain **frontpagecaptain.de** verbinden (DNS).

## Wie es zusammenspielt
- **Hero-Eingabe** → Verwandlungs-Clip → übergibt die Adresse an `kundenseite-public.html?url=…` → dort läuft der **Railway-Motor** (Vorschau, „erst sehen, dann zahlen", Kauf).
- **5 Sprachen** (DE/EN/FR/NL/AR) über Umschalter oben rechts; Wahl wird gemerkt (localStorage), `?lang=en` als Deep-Link möglich, Arabisch automatisch RTL. Recht-Seiten bleiben bewusst deutsch.
- **Stripe:** Cinematic 777 € → `…5kQ7sL…87K03` · Vor-Ort 1.976 € → `…6oUeVd…87K02` (aus deiner alten Seite übernommen).

## 🔴 Vor dem ersten Verkauf — dein / Anwalts-Terrain
1. **Stripe-Beträge prüfen:** In Stripe bestätigen, dass die zwei verlinkten Bezahllinks wirklich **777 €** bzw. **1.976 €** zeigen (Konfig = dein Klick, ich bewege kein Geld).
2. **AGB-Preise:** `agb.html` listet noch alte Preise (690/990/1.998 €, Datei vom 13.06.). Mit der anwaltlich abgesicherten Fassung auf **777/1.976 + nur Cinematic** abgleichen.
3. **Widerrufs-Button + Rechts-Freigabe** durch den Anwalt.
4. **Motor-CORS:** Der Railway-Motor muss CORS für die Live-Domain (`frontpagecaptain.de`) erlauben, damit das Tool live baut. Solange nicht: Demo-Fallback im Tool greift automatisch.
