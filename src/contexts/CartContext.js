import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  collection, addDoc, doc, updateDoc,
  query, where, orderBy, onSnapshot, serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { user } = useAuth();
  const cartKey = `afia_cart_${user?.id || 'guest'}`;
  const [items, setItems] = useState([]);

  // Reload cart from localStorage whenever the logged-in user changes
  useEffect(() => {
    const stored = localStorage.getItem(cartKey);
    if (!stored) { setItems([]); return; }
    try { setItems(JSON.parse(stored)); } catch { setItems([]); }
  }, [cartKey]);

  function persist(newItems) {
    setItems(newItems);
    localStorage.setItem(cartKey, JSON.stringify(newItems));
  }

  function addToCart(product, size, quantity = 1) {
    const existing = items.find(i => i.id === product.id && i.size === size);
    if (existing) {
      persist(items.map(i =>
        i.id === product.id && i.size === size
          ? { ...i, quantity: i.quantity + quantity }
          : i
      ));
    } else {
      persist([...items, {
        ...product, size, quantity,
        cartItemId: `${product.id}-${size}-${Date.now()}`,
      }]);
    }
  }

  function removeFromCart(cartItemId) { persist(items.filter(i => i.cartItemId !== cartItemId)); }
  function updateQuantity(cartItemId, qty) {
    if (qty <= 0) { removeFromCart(cartItemId); return; }
    persist(items.map(i => i.cartItemId === cartItemId ? { ...i, quantity: qty } : i));
  }
  function clearCart() { persist([]); }

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  // ── Firestore order operations ──────────────────────────────────────────────

  async function saveOrder(orderData) {
    const ref = await addDoc(collection(db, 'orders'), {
      ...orderData,
      status: 'pending',
      createdAt: serverTimestamp(),
    });
    return { id: ref.id };
  }

  async function updateOrderStatus(orderId, status) {
    await updateDoc(doc(db, 'orders', orderId), { status });
  }

  // Real-time listener for the current user's orders
  function subscribeToMyOrders(userId, callback) {
    const q = query(
      collection(db, 'orders'),
      where('userId', '==', userId)
    );
    return onSnapshot(q, snap => {
      const orders = snap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .sort((a, b) => {
          const ta = a.createdAt?.toDate?.() || new Date(a.createdAt || 0);
          const tb = b.createdAt?.toDate?.() || new Date(b.createdAt || 0);
          return tb - ta;
        });
      callback(orders);
    });
  }

  // Real-time listener for all orders (admin)
  function subscribeToAllOrders(callback) {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, snap => {
      callback(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
  }

  return (
    <CartContext.Provider value={{
      items, addToCart, removeFromCart, updateQuantity, clearCart, total, count,
      saveOrder, updateOrderStatus, subscribeToMyOrders, subscribeToAllOrders,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
