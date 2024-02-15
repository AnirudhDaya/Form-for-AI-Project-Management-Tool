// pages/index.tsx
import { MultiSelector } from "../components/mutliselect";
import { Form } from "../components/forms";

export default function HomePage() {
  return (
    <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '24px' }}>
      <Form/>
    </main>
  );
}