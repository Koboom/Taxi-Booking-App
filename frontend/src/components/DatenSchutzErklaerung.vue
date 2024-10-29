<template>
    <div class="container">
        <div class="content-card">
            <h1 class="title">Datenschutzerklärung</h1>
            <p>
                Wir freuen uns sehr über Ihr Interesse an unserer Website. Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges Anliegen.
                In dieser Datenschutzerklärung informieren wir Sie darüber, welche Daten auf unserer Website erhoben werden, wie wir diese verwenden
                und welche Rechte Sie in Bezug auf Ihre Daten haben.
            </p>

            <h2>1. Verantwortliche Stelle</h2>
            <p>
                Verantwortliche Stelle für die Verarbeitung Ihrer personenbezogenen Daten auf dieser Website ist:
                <strong>Yüksel Software</strong>, Adresse: Hauptstraße 93, 33647 Bielefeld
                <br>E-Mail: <a href="mailto:nykoyunoglu@gmail.com">nykoyunoglu@gmail.com</a>
            </p>

            <h2>2. Erhebung und Speicherung personenbezogener Daten</h2>
            <p>Beim Besuch unserer Website werden automatisch Informationen von Ihrem Browser an unseren Server gesendet. Diese Informationen umfassen:</p>
            <ul class="data-list">
                <li>Ihre IP-Adresse</li>
                <li>Datum und Uhrzeit des Zugriffs</li>
                <li>Verwendeter Browser und Version</li>
                <li>Betriebssystem</li>
                <li>Referrer URL (die zuvor besuchte Seite)</li>
            </ul>
            <p>Diese Daten dienen ausschließlich statistischen Zwecken und werden nach der Auswertung gelöscht.</p>

            <h2>3. Cookies</h2>
            <p>
                Unsere Website verwendet Cookies, um die Benutzerfreundlichkeit zu verbessern. Sie können in den Einstellungen Ihres Browsers
                festlegen, ob Cookies gespeichert werden dürfen. Wenn Sie Cookies deaktivieren, kann es sein, dass die Funktionalität unserer Website eingeschränkt ist.
            </p>

            <h2>4. Weitergabe von Daten</h2>
            <p>Ihre personenbezogenen Daten werden nicht an Dritte weitergegeben, es sei denn, Sie haben uns ausdrücklich Ihre Zustimmung erteilt oder es besteht eine gesetzliche Verpflichtung dazu.</p>

            <h2>5. Ihre Rechte</h2>
            <ul class="rights-list">
                <li>Auskunft über Ihre gespeicherten Daten zu verlangen.</li>
                <li>Eine Berichtigung oder Löschung Ihrer personenbezogenen Daten zu fordern.</li>
                <li>Der Verarbeitung Ihrer Daten zu widersprechen.</li>
            </ul>
            <p>
                Wenn Sie von diesen Rechten Gebrauch machen möchten, kontaktieren Sie uns bitte unter der oben genannten E-Mail-Adresse.
            </p>

            <h2>6. Änderungen dieser Datenschutzerklärung</h2>
            <p>
                Wir behalten uns das Recht vor, diese Datenschutzerklärung gelegentlich anzupassen, um aktuellen rechtlichen Anforderungen zu entsprechen oder Änderungen unserer Leistungen umzusetzen.
            </p>
        </div>

        <footer-view></footer-view>
    </div>
</template>

<style>
.container {
    margin-top: 64px;
    padding: 20px;
}

.content-card {
    background-color: #f5f5f5;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    margin: auto;
}

.title {
    font-size: 2.5rem;
    color: #333;
    text-align: center;
    margin-bottom: 20px;
}

h2 {
    font-size: 1.5rem;
    color: #555;
    margin-top: 20px;
    margin-bottom: 10px;
}

p {
    font-size: 1rem;
    line-height: 1.6;
    color: #666;
    margin-bottom: 20px;
}

ul.data-list, ul.rights-list {
    padding-left: 20px;
    margin-bottom: 20px;
}

ul.data-list li, ul.rights-list li {
    margin-bottom: 10px;
}

a {
    color: #3498db;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

</style>
