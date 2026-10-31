export default function Home() {
  return <main style={{ maxWidth: 960, padding: 40, margin: 'auto' }}>
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><h1>Fida Hotspot 360</h1><strong>v0.1.0</strong></header>
    <p>Hospitality internet management — hybrid cloud / on-premises.</p>
    <section style={{ border: '1px solid #d9e1ea', background: 'white', borderRadius: 14, padding: 24 }}>
      <h2>Foundation environment</h2>
      <p>The management application is initialized. Hotel management and guest operations will be enabled only after secure identity and tenant authorization are implemented.</p>
      <p>Cloud API health: <code>http://localhost:3001/health</code></p>
    </section>
  </main>;
}
