import React from 'react';
import { Link } from 'react-router-dom';

// ── Ghanaian Foods (every dish, grouped) ──────────────────────────────────────
const FOODS = [
  {
    title: 'Soups & Stews', icon: '🍲', colour: '#e07020',
    items: ['Palm Nut Soup', 'Light Soup', 'Groundnut / Peanut Butter Soup', 'Abenkwan', 'Nkontomire & Kontomire Soup', 'Garden Egg Stew', 'Tomato Stew', 'Egusi Soup', 'Okra Soup & Okra Stew', 'Bitterleaf Soup', 'Palava Sauce'],
  },
  {
    title: 'Main Dishes & Staples', icon: '🍛', colour: '#C9A558',
    items: ['Fufu', 'Banku (with Okra Stew)', 'Kenkey', 'Omo Tuo / Rice Balls', 'Tuo Zaafi (TZ)', 'Waakye', 'Jollof Rice', 'Fried Rice', 'Ampesi', 'Red Red', 'Palava Sauce with Yam or Rice', 'Yam Porridge', 'Konkonte', 'Akple'],
  },
  {
    title: 'Grilled & Skewered', icon: '🔥', colour: '#b05060',
    items: ['Kyinkyinga (spiced meat skewers)', 'Grilled Tilapia', 'Grilled Chicken', 'Whole Roasted Goat'],
  },
  {
    title: 'Breakfast Foods', icon: '🌅', colour: '#5a9e6a',
    items: ['Hausa Koko', 'Koose', 'Bofrot', 'Kelewele', 'Bread & Egg', 'Tom Brown', 'Oblayo', 'Fried Yam', 'Plantain Porridge'],
  },
  {
    title: 'Street Foods & Snacks', icon: '🥜', colour: '#9b7fc8',
    items: ['Chin Chin', 'Kelewele', 'Kyinkyinga', 'Roasted Plantain & Corn', 'Red Red with Fried Plantain', 'Meat Pie', 'Spring Rolls', 'Puff Puff', 'Nkatie Cake', 'Coconut Candy', 'Plantain Chips', 'Roasted Groundnuts', 'Biscuits', 'Ice Kenkey'],
  },
  {
    title: 'Proteins & Accompaniments', icon: '🐟', colour: '#4a9ec4',
    items: ['Tilapia', 'Kontomire', 'Salted & Smoked Fish', 'Grilled Chicken', 'Goat Meat', 'Cow Meat', 'Snails', 'Crabs', 'Shrimp', 'Eggs'],
  },
  {
    title: 'Celebration Foods', icon: '🎉', colour: '#C9A558',
    items: ['Jollof Rice', 'Kyinkyinga', 'Whole Roasted Goat', 'Whole Grilled Tilapia', 'Fufu & Goat Light Soup', 'Waakye with all toppings', 'Rice Balls with Peanut Butter Soup', 'Omo Tuo with Groundnut Soup', 'Tuo Zaafi with Leafy Soup', 'Red Red with Fried Plantain', 'Palava Sauce with Yam', 'Kelewele', 'Bofrot', 'Rice Water', 'Sobolo'],
  },
  {
    title: 'Drinks & Beverages', icon: '🥤', colour: '#e07020',
    items: ['Sobolo (hibiscus)', 'Asaana', 'Rice Water', 'Alvaro', 'Malt Drink', 'Fresh Coconut Water', 'Fresh Ginger Drink', 'Palm Wine', 'Akpeteshie (elders only)'],
  },
  {
    title: "Fruits in Afia's World", icon: '🥭', colour: '#5a9e6a',
    items: ['Mango', 'Pawpaw (Papaya)', 'Pineapple', 'Coconut', 'Watermelon', 'Banana', 'Garden Eggs', 'Oranges'],
  },
];

export default function GhanaianFoodsPage() {
  return (
    <div className="page-wrapper" style={{ background: '#050300', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ padding: '32px 24px 0', maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/culture" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, letterSpacing: '0.16em', color: '#7C5F48', textDecoration: 'none', textTransform: 'uppercase' }}>
          ← Culture Hub
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#e07020', boxShadow: '0 0 8px #e07020' }} />
          <span style={{ fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: '0.2em', color: '#9E7D42', textTransform: 'uppercase' }}>
            A Taste of Home
          </span>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 24px 80px' }}>
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 4vw, 40px)', color: '#FAF0E0', margin: '0 0 12px' }}>
            Ghanaian Foods in the World of Afia's Village
          </h1>
          <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 17, color: '#BA9D7C', fontStyle: 'italic', margin: '0 auto', maxWidth: 680, lineHeight: 1.7 }}>
            A culturally authentic taste of Ghana — from rich soups and pounded staples to
            roadside snacks, celebration feasts, refreshing drinks, and the fruits that grow in Afia's world.
          </p>
        </div>

        {/* Food categories */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 18 }}>
          {FOODS.map((cat) => (
            <div
              key={cat.title}
              style={{
                background: '#0F0A04',
                border: '1px solid rgba(201,165,88,0.14)',
                borderLeft: `4px solid ${cat.colour}`,
                borderRadius: 12, padding: '22px 22px 18px',
                height: '100%',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <span style={{ fontSize: 24 }}>{cat.icon}</span>
                <h2 style={{
                  fontFamily: "'Cinzel', serif", fontSize: 16, color: cat.colour,
                  letterSpacing: '0.06em', margin: 0,
                }}>
                  {cat.title}
                </h2>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {cat.items.map((item) => (
                  <span
                    key={item}
                    style={{
                      fontFamily: "'Montserrat', sans-serif", fontSize: 12.5,
                      color: '#D4B896', lineHeight: 1.4,
                      background: 'rgba(201,165,88,0.06)',
                      border: '1px solid rgba(201,165,88,0.16)',
                      borderRadius: 999, padding: '5px 12px',
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
