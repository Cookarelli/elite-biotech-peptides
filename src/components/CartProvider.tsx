"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  clampQuantity,
  getCartSummary,
  normalizeReferralCode,
  type CartItem,
  type CartSummary,
  type Product,
} from "@elite-biotech/shared";

type CartContextValue = {
  items: CartItem[];
  summary: CartSummary;
  referralCode: string;
  addItem: (product: Product, quantity?: number) => void;
  updateItem: (slug: string, quantity: number) => void;
  removeItem: (slug: string) => void;
  setReferralCode: (code: string) => void;
  clearCart: () => void;
};

const STORAGE_KEY = "elite-biotech-cart";
const REFERRAL_STORAGE_KEY = "elite-biotech-referral-code";

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [referralCode, setReferralCodeState] = useState("");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) return;

      const parsed = JSON.parse(stored) as CartItem[];
      if (Array.isArray(parsed)) {
        const nextItems = parsed
          .filter((item) => typeof item.slug === "string")
          .map((item) => ({
            slug: item.slug,
            quantity: clampQuantity(item.quantity),
          }));

        const timer = window.setTimeout(() => {
          setItems(nextItems);
        }, 0);

        return () => window.clearTimeout(timer);
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(REFERRAL_STORAGE_KEY);
      if (stored) {
        const timer = window.setTimeout(() => {
          setReferralCodeState(normalizeReferralCode(stored));
        }, 0);

        return () => window.clearTimeout(timer);
      }
    } catch {
      window.localStorage.removeItem(REFERRAL_STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (referralCode) {
      window.localStorage.setItem(REFERRAL_STORAGE_KEY, referralCode);
    } else {
      window.localStorage.removeItem(REFERRAL_STORAGE_KEY);
    }
  }, [referralCode]);

  const value = useMemo<CartContextValue>(() => {
    const addItem = (product: Product, quantity = 1) => {
      setItems((current) => {
        const existing = current.find((item) => item.slug === product.slug);
        if (existing) {
          return current.map((item) =>
            item.slug === product.slug
              ? {
                  ...item,
                  quantity: clampQuantity(item.quantity + quantity),
                }
              : item
          );
        }

        return [
          ...current,
          {
            slug: product.slug,
            quantity: clampQuantity(quantity),
          },
        ];
      });
    };

    const updateItem = (slug: string, quantity: number) => {
      const nextQuantity = clampQuantity(quantity);
      setItems((current) =>
        current.map((item) =>
          item.slug === slug ? { ...item, quantity: nextQuantity } : item
        )
      );
    };

    const removeItem = (slug: string) => {
      setItems((current) => current.filter((item) => item.slug !== slug));
    };

    const setReferralCode = (code: string) => {
      setReferralCodeState(normalizeReferralCode(code));
    };

    const clearCart = () => {
      setItems([]);
      setReferralCodeState("");
    };

    return {
      items,
      summary: getCartSummary(items),
      referralCode,
      addItem,
      updateItem,
      removeItem,
      setReferralCode,
      clearCart,
    };
  }, [items, referralCode]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider.");
  }

  return context;
}
