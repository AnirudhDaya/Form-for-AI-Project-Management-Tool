// pages/index.tsx
import { Form } from "../components/forms";

export default function HomePage() {
  return (
    <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '24px' }}>
      <Form/>
    </main>
  );
}