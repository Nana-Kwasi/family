import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { DAY_NAMES, getTodayBornDay } from '../utils/dayBorn';

// The shop used to be a static module (src/data/products.js). It now comes from the Mama
// Africa backend so the admin console owns it. One request on mount serves every store
// screen — the catalogue is under a hundred products and each screen filters it locally.
const API_URL = (process.env.REACT_APP_AI_API_URL || 'http://localhost:8080').replace(/\/$/, '');
const API_KEY = process.env.REACT_APP_AI_API_KEY || '';

const CatalogContext = createContext(null);

const EMPTY = { products: [], bundles: [], promotions: [] };

export function CatalogProvider({ children }) {
  const [data, setData] = useState(EMPTY);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    // Abort on unmount so a slow catalogue does not set state after navigation away.
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_URL}/api/storefront/catalog`, {
          signal: controller.signal,
          headers: API_KEY ? { 'X-Api-Key': API_KEY } : {},
        });
        if (!res.ok) throw new Error(`Catalog request failed (${res.status})`);
        const body = await res.json();
        setData({
          products: body.products || [],
          bundles: body.bundles || [],
          promotions: body.promotions || [],
        });
      } catch (err) {
        if (err.name === 'AbortError') return;
        // eslint-disable-next-line no-console
        console.error('Could not load the store catalogue →', err);
        setError(err);
        setData(EMPTY);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [reloadToken]);

  const value = useMemo(() => {
    const { products, bundles, promotions } = data;
    const inStock = products.filter((p) => !p.soldOut);

    /** Everything for a given day, falling back to the whole shop if that day is empty. */
    function productsForDay(day) {
      const matches = inStock.filter((p) => p.bornDay === day);
      return matches.length ? matches : inStock;
    }

    return {
      products,
      bundles,
      promotions,
      loading,
      error,
      reload: () => setReloadToken((n) => n + 1),

      findProduct(idOrSlug) {
        if (idOrSlug === undefined || idOrSlug === null) return null;
        const key = String(idOrSlug);
        return products.find((p) => String(p.id) === key || p.slug === key) || null;
      },

      /** A small, type-diverse set of today's day-borns — used by the welcome pop-up. */
      activeDayFeatured(count = 3, date = new Date()) {
        const todays = productsForDay(getTodayBornDay(date));
        const order = ['tshirt', 'mug', 'babysuit', 'hoodie'];
        const picked = [];
        const used = new Set();
        for (const type of order) {
          const match = todays.find((p) => p.type === type && !used.has(p.id));
          if (match) {
            picked.push(match);
            used.add(match.id);
          }
          if (picked.length >= count) break;
        }
        for (const product of todays) {
          if (picked.length >= count) break;
          if (!used.has(product.id)) {
            picked.push(product);
            used.add(product.id);
          }
        }
        return picked.slice(0, count);
      },

      /** Today's product of a given type, for the homepage category tiles. */
      pickActiveDayByType(type, date = new Date()) {
        const day = getTodayBornDay(date);
        return (
          inStock.find((p) => p.bornDay === day && p.type === type) ||
          inStock.find((p) => p.type === type) ||
          null
        );
      },

      /** A bundle with its products resolved, or null when the slug is unknown. */
      resolveBundle(slug) {
        const bundle = bundles.find((b) => b.slug === slug);
        if (!bundle || !bundle.items?.length) return null;
        return {
          id: bundle.slug,
          title: bundle.title,
          subtitle: bundle.subtitle,
          desc: bundle.description,
          productIds: bundle.items.map((item) => item.id),
          // Bundle items are summaries; swap in the full catalogue entry so the detail
          // page gets images, sizes and marketplace links.
          items: bundle.items
            .map((item) => products.find((p) => p.slug === item.slug) || null)
            .filter(Boolean),
        };
      },

      /** Live promotions for a placement, most important first. */
      promotionsFor(placement) {
        return promotions.filter((p) => p.placement === placement);
      },
    };
  }, [data, loading, error]);

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalog() {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error('useCatalog must be used inside a CatalogProvider');
  }
  return context;
}

export { DAY_NAMES, getTodayBornDay };
