import React, { useState } from 'react';
import {
  RedenominasiProvider,
  useRedenominasi,
  CurrencyDisplay,
  CurrencyInput
} from 'redenominasi-idr/react';

// Example 1: Basic Hook Usage
function PriceList() {
  const { format } = useRedenominasi({ ratio: 1000 });

  const items = [
    { name: 'Coffee', price: 15000 },
    { name: 'Tea', price: 10000 },
    { name: 'Cake', price: 25000 },
  ];

  return (
    <ul>
      {items.map(item => (
        <li key={item.name}>
          {item.name}: {format(item.price)}
        </li>
      ))}
    </ul>
  );
}

// Example 2: CurrencyDisplay Component
function ProductCard({ product }: { product: { name: string; price: number } }) {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <CurrencyDisplay
        value={product.price}
        className="price"
        as="span"
      />
    </div>
  );
}

// Example 3: CurrencyInput Component
function PriceForm() {
  const [price, setPrice] = useState(0);
  const { format } = useRedenominasi();

  return (
    <form>
      <label>
        Price (old nominal):
        <CurrencyInput
          value={price}
          onChange={setPrice}
          placeholder="Enter price"
        />
      </label>
      <p>Formatted: {format(price)}</p>
    </form>
  );
}

// Example 4: Shopping Cart with Discount
function ShoppingCart() {
  const { convert, format } = useRedenominasi({ decimalPlaces: 2 });

  const items = [
    { name: 'Product A', price: 15000, qty: 2 },
    { name: 'Product B', price: 25000, qty: 1 },
  ];

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discount = convert(subtotal) * 0.1; // 10% discount
  const total = convert(subtotal) - discount;

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {items.map(item => (
        <div key={item.name}>
          {item.name} x {item.qty}: {format(item.price * item.qty)}
        </div>
      ))}
      <hr />
      <p>Subtotal: {format(subtotal)}</p>
      <p>Discount (10%): {format(discount * 1000)}</p>
      <p><strong>Total: {format(total * 1000)}</strong></p>
    </div>
  );
}

// Example 5: App with Provider
export default function App() {
  return (
    <RedenominasiProvider config={{ ratio: 1000, roundingMode: 'round' }}>
      <div className="app">
        <h1>Redenominasi IDR Examples</h1>

        <section>
          <h2>Price List</h2>
          <PriceList />
        </section>

        <section>
          <h2>Product Card</h2>
          <ProductCard product={{ name: 'Laptop', price: 5000000 }} />
        </section>

        <section>
          <h2>Price Input Form</h2>
          <PriceForm />
        </section>

        <section>
          <h2>Shopping Cart</h2>
          <ShoppingCart />
        </section>
      </div>
    </RedenominasiProvider>
  );
}
