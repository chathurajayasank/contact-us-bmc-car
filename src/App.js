import React from 'react';
import './App.css';
import Header from './components/Header';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <h1>Contact Trust</h1>
        <p>Reach out to us through the form below.</p>
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
