import Navbar from './Navbar';

export default function App() {
  return (
    <>
      <Navbar brand="Syntech" />

      <main
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '40px 16px 80px',
        }}
      >
        <section id="home" style={{ padding: '40px 0' }}>
          <h1 style={{ margin: 0, fontSize: 40 }}>Home</h1>
          <p style={{ marginTop: 12, color: 'rgba(15,23,42,0.7)' }}>
            Responsive navigation bar with hamburger menu.
          </p>
        </section>

        <section id="features" style={{ padding: '40px 0' }}>
          <h2 style={{ margin: 0, fontSize: 28 }}>Features</h2>
          <p style={{ marginTop: 12, color: 'rgba(15,23,42,0.7)' }}>
            Smooth navigation across devices.
          </p>
        </section>

        <section id="pricing" style={{ padding: '40px 0' }}>
          <h2 style={{ margin: 0, fontSize: 28 }}>Pricing</h2>
          <p style={{ marginTop: 12, color: 'rgba(15,23,42,0.7)' }}>
            Add your pricing content here.
          </p>
        </section>

        <section id="contact" style={{ padding: '40px 0' }}>
          <h2 style={{ margin: 0, fontSize: 28 }}>Contact</h2>
          <p style={{ marginTop: 12, color: 'rgba(15,23,42,0.7)' }}>
            Add contact form or links here.
          </p>
        </section>
      </main>
    </>
  );
}

