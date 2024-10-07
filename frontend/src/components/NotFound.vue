<template>
    <div class="not-found">
      <h1 class="not-found-title">404</h1>
      <p class="not-found-message">Leider wurde die von Ihnen gesuchte Seite nicht gefunden.</p>
      <router-link to="/" class="home-link">Zurück zur Startseite</router-link>
    </div>
  </template>

  <script>
  export default {
    name: 'NotFound'
  }
  </script>

  <style scoped>
  .not-found {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh; /* Tam ekran yüksekliği */
    text-align: center;
    background-color: #f8f9fa;
    color: #343a40;
  }

  .not-found-title {
    font-size: 4rem;
    font-weight: bold;
    margin: 0;
  }

  .not-found-message {
    font-size: 1.5rem;
    margin: 1rem 0;
  }

  .home-link {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border-radius: 5px;
    text-decoration: none;
    transition: background-color 0.3s;
  }

  .home-link:hover {
    background-color: #0056b3;
  }
  </style>
