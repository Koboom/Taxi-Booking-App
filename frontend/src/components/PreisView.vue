<script>
import emailjs from 'emailjs-com';
    export default {
        data() {
            return {
                basicPreis: 695,  // Temel fiyat
                standardPreis: 920, // Standart fiyat
                extraCost: 170,   // Ekstra maliyet
                extraCostStandard: 170, // Ekstra maliyet (Standart)
                extraCostSeiten: 180, // Ekstra maliyet (Seiten)
                extraCostSeitenStandard: 155, //Ekstra maliyet (Seiten Standart)
                extraAddedSeitenStandard: 180, // Ekstra maliyet (Seiten)
                extraCostPlugIn: 50, // Ekstra maliyet (Plugin Installation)
                extraCostPlugInStandard: 50, // Ekstra maliyet (Plugin Installation)
                extraSeoBasic: 200,
                extraSeoAdvenced: 500,
                extraAddSeoBasic: false, // Ekstra SEO (Basic)
                extraAddSeoAdvenced: false, // Ekstra SEO (Fortgeschrittene)
                extraSeoBasicStandard: 200,
                extraSeoAdvencedStandard: 200,
                extraAddSeoBasicStandard: false, // Ekstra SEO (Basic)
                extraAddSeoAdvencedStandard: false, // Ekstra SEO (Fortgeschrittene)
                extraAddedTreeDays: false, // Ekstra hizmet seçili mi?
                extraAddedTreeDaysStandard: false, // Ekstra hizmet seçili mi?
                extraAddedSeiten: false,
                extraAddedSeitenStandard: false,
                extraAddedPlugIn: false,
                extraAddedPlugInStandard: false,
                lieferTage: 7,
                lieferTageStandard: 14,
                seitenZahl: 2,
                seitenZahlStandart: 5,
                plugIn: 3,
                plugInStandard: 14,
                orderMessage: "",
                orderMessageStandard: "",
                disOn: false,
                disOnStandard: false,
                formData: {
                    name: '',
                    lastname: '',
                    email: '',
                    phone: '',
                    message: ''
                }
            }
        },
        computed: {
            totalPrice() {
                // Temel fiyat ve ekstra ücretin toplamı
                return this.basicPreis +
                (this.extraAddedTreeDays ? this.extraCost : 0) + // Ekstra hizmet seçili mi?
                (this.extraAddedSeiten ? this.extraCostSeiten : 0) + // Ekstra maliyet (Seiten)
                (this.extraAddedPlugIn ? this.extraCostPlugIn : 0) + // Ekstra maliyet (Plugin Installation)
                (this.extraAddSeoBasic ? this.extraSeoBasic : 0) // Ekstra SEO (BASIC)
            },
            totalPriceStandand() {
                // Standart fiyat ve extra ücretin toplamı
                return this.standardPreis +
                (this.extraAddedSeitenStandard ? this.extraCostSeitenStandard : 0)+
                (this.extraAddedTreeDaysStandard ? this.extraCostStandard : 0)+
                (this.extraAddedPlugInStandard ? this.extraCostPlugInStandard : 0)+
                (this.extraAddSeoAdvenced ? this.extraSeoAdvenced : 0)
            },
            totalPriceStandandPlusMwSt() {
                return (this.totalPriceStandand * 1.19).toFixed(2)
            },
            totalPricePlusMwSt() {
                return (this.totalPrice * 1.19).toFixed(2)
            }
        },
        methods: {
            async submitForm() {
              // EmailJS için gerekli bilgileri buraya ekleyin
              const serviceID = 'service_brxny4s';
              const templateID = 'template_u9b1cm3';
              const userID = 'SGZlSzOXIsZEDbkUc';

              try {
                const response = await emailjs.send(serviceID, templateID,{
                  ...this.formData,
                  from_email: this.formData.email
                }, userID);
                console.log('SUCCESS!', response.status, response.text);
                alert('Ihre Nachricht wurde erfolgreich gesendet!');
                this.formData.name = '';
                this.formData.lastname = '';
                this.formData.email = '';
                this.formData.phone = '';
                this.formData.message = '';
                this.disOn = false
                this.disOnStandard = false
              } catch (error) {
                console.error('Fehler beim E-Mail-Versand:', error);
                alert('Beim Senden der Nachricht ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.');
              }
            },
            updatePrice() {
                this.lieferTage = this.extraAddedTreeDays ? 3 : 7;
                this.lieferTageStandard = this.extraAddedTreeDaysStandard ? 7 : 14;
                this.seitenZahl = this.extraAddedSeiten ? 4 : 2;
                this.seitenZahlStandart = this.extraAddedSeitenStandard ? 7 : 5;
                this.plugIn = this.extraAddedPlugIn ? 7 : 3;
            },
            handleOrderClickStandard() {
                let message = `Sie haben eine Standart-Website bestellt mit ${this.seitenZahlStandart} Seiten, die in ${this.lieferTageStandard} Tagen geliefert wird. Die Wartung der Website ist zwei Wochen kostenlos nach Lieferung.`

                if (this.extraAddedTreeDaysStandard) {
                    message += " Sie haben die schnelle Lieferung (7 Tage) ausgewählt.";
                }
                if (this.extraAddedSeitenStandard) {
                    message += ` Es werden zusätzliche 2 Seiten enthalten sein.`
                }
                if (this.extraAddedPlugInStandard) {
                    message += ` Sie haben ${this.plugInStandard} Plugin-Installationen gewählt.`
                }

                this.orderMessageStandard = message
                this.formData.message = this.orderMessageStandard + " Price: mit ink.MwSt: " + this.totalPriceStandandPlusMwSt + "€"
                this.disOnStandard = !this.disOnStandard
                this.orderMessageStandard=""

            },
            handleOrderClick() {
                let message = `Sie haben eine Basis-Website bestellt mit ${this.seitenZahl} Seiten, die in ${this.lieferTage} Tagen geliefert wird.`

                if (this.extraAddedTreeDays) {
                    message += " Sie haben die schnelle Lieferung (3 Tage) ausgewählt.";
                }
                if (this.extraAddedSeiten) {
                    message += ` Es werden zusätzliche 2 Seiten enthalten sein.`
                }
                if (this.extraAddedPlugIn) {
                    message += ` Sie haben ${this.plugIn} Plugin-Installationen gewählt.`
                }

                this.orderMessage = message
                this.formData.message = this.orderMessage + " Price: mit ink.MwSt: " + this.totalPricePlusMwSt + "€"
                this.orderMessage=""
                this.disOn = !this.disOn
            },
            close() {
                this.orderMessage = ""
                this.orderMessageStandard = ""
            }
        }
    }
</script>

<template>
    <div class="w3-row-padding w3-margin-top">
        <div class=" w3-padding-32 w3-center">
            <i class="fa fa-users w3-jumbo w3-text-green"></i>
            <h2 class="w3-text-green">Leistungen</h2>
        </div>
        <div class="w3-third w3-justify">
            <i class="fa fa-globe w3-xxxlarge w3-text-green"></i><h3 class="w3-text-green">Websites Erstellen Lassen</h3>
            <p>
                Eine professionell gestaltete Webseite ist das digitale Schaufenster Ihres Unternehmens. Wir erstellen maßgeschneiderte Websites, die nicht nur visuell ansprechend sind, sondern auch funktional und benutzerfreundlich. Von der Konzeption bis zur Umsetzung arbeiten wir eng mit Ihnen zusammen, um Ihre Vision in die digitale Welt zu bringen.
            </p>
            <i class="fa fa-code w3-xxxlarge w3-text-green"></i>
            <h3 class="w3-text-green">Software Development</h3>
            <p>
                Innovative Softwarelösungen sind entscheidend für den Erfolg in der digitalen Welt. Unser Team aus erfahrenen Entwicklern kann maßgeschneiderte Softwareanwendungen entwickeln, die Ihre spezifischen Geschäftsanforderungen erfüllen. Ob Webanwendungen, mobile Apps oder Unternehmenssoftware – wir liefern Lösungen, die Ihre Prozesse optimieren und Ihre Produktivität steigern.
            </p>
        </div>
        <div class="w3-third w3-justify">
            <i class="fa fa-user w3-xxxlarge w3-text-green"></i>
            <h3>Websites Betreuen Lassen</h3>
            <p>
                Eine großartige Website erfordert kontinuierliche Pflege und Wartung, um sicherzustellen, dass sie immer optimal funktioniert. Unser Betreuungspaket bietet regelmäßige Updates, Sicherheitsprüfungen und technische Unterstützung, damit Ihre Website stets auf dem neuesten Stand ist und reibungslos läuft.
            </p>
            <i class="fa fa-cog w3-xxxlarge w3-text-green"></i>
            <h3>Google Optimierung</h3>
            <p>
                In der heutigen digitalen Welt ist es entscheidend, online sichtbar zu sein. Unsere SEO-Dienstleistungen helfen Ihrer Website, in den Suchergebnissen von Google besser platziert zu werden. Durch gezielte Strategien und Techniken verbessern wir Ihre Sichtbarkeit und Reichweite, sodass potenzielle Kunden Sie leichter finden können.
            </p>
        </div>
        <div class="w3-third w3-justify">
            <i class="fa fa-cloud w3-xxxlarge w3-text-green"></i>
            <h3>Domain Hosting</h3>
            <p>
                Ihre Domain ist der Schlüssel zu Ihrer Online-Präsenz. Wir bieten zuverlässige und sichere Hosting-Dienste an, die Ihre Website jederzeit verfügbar und schnell machen. Mit unseren Hosting-Paketen können Sie sich darauf verlassen, dass Ihre Daten sicher und Ihre Seite für Ihre Besucher immer erreichbar ist.
            </p>
            <i class="fa fa-battery-full w3-xxxlarge w3-text-green"></i>
            <h3>Warum Uns Wählen?</h3>
            <p>
                Mit umfassender Erfahrung und einem engagierten Team bieten wir mehr als nur technische Lösungen. Wir verstehen Ihre Geschäftsziele und arbeiten daran, diese durch kreative und maßgeschneiderte digitale Lösungen zu verwirklichen. Kontaktieren Sie uns, um zu erfahren, wie wir Ihnen helfen können, Ihr Unternehmen in der digitalen Welt zu stärken.
            </p>
        </div>
    </div>
    <!-- Pricing Section -->
    <div class="w3-container w3-grey w3-row-padding" style="padding: 128px 16px;">
        <h3 class="w3-center w3-text-white">PRICING</h3>
        <p class="w3-large w3-center w3-text-white">Wählen Sie einen Preisplan, der Ihren Anforderungen entspricht.</p>

        <div class="w3-row-padding" style="margin-top: 64px;">
            <!-- Basic Paket -->
            <div class="w3-col l3 s12 m6 w3-section">
                <div class="w3-card-4 w3-light-grey ">
                    <ul class="w3-ul">
                        <li class="w3-padding-32 w3-orange w3-xlarge" style="border-radius: 80% 20% / 10% 90%;">Basic <span class="w3-tiny">(OHNE RECHTLICHE SEITEN)</span><span class="w3-right w3-badge w3-round-large w3-green w3-large">{{ totalPrice }} € </span>
                            <span class="w3-right w3-round-large w3-small">zzgl. mwst.</span></li>
                        <li><span class="w3-tooltip" style="cursor: pointer;">- Statik Website <span class="w3-text w3-tag" style="position: absolute; left:100px; bottom: 18px;">Ohne backend</span></span> <br>
                            <span class="w3-tooltip" style="cursor: pointer;">- {{ seitenZahl }} Seiten <span class="w3-text w3-tag" style="position: absolute; left:100px; bottom: 18px;">Der Verkäufer fügt die angegebene Anzahl an Seiten zu deiner Website hinzu.</span></span> <br>
                            <span class="w3-tooltip" style="cursor: pointer;">- Responsive Design <span class="w3-text w3-tag" style="position: absolute; left: 100px; bottom: 18px;">Der Verkäufer erstellt ein reaktionsfähiges Design, das alle Geräte unterstützt</span></span><br>
                            <span class="w3-tooltip" style="cursor: pointer;">- Design Anpassung <span class="w3-text w3-tag" style="position: absolute; left: 100px; bottom: 18px;">Der Freelancer passt das Farbschema und das Layout deiner Website individuell an.</span></span><br>
                            <span>- {{ lieferTage }} Tage Lieferzeit</span><br>
                            <span class="w3-tooltip" style="cursor: pointer;">- Quellcode integrieren<span class="w3-text w3-tag" style="position: absolute; left: 100px; bottom: 18px;">Lege der Lieferung den Quellcode bei.</span></span><br>
                            <span class="w3-tooltip" style="cursor: pointer;">- Detaillierte Codekommentare<span class="w3-text w3-tag" style="position: absolute; left: 100px; bottom: 18px;">Der Freelancer fügt dem Code detaillierte Kommentare hinzu, die die Codestruktur erklären.</span></span><br>
                            <span class="w3-tooltip" style="cursor: pointer;">- Content Upload <span class="w3-text w3-tag" style="position: absolute; left: 100px; bottom: 18px;">Der Freelancer lädt die bereitgestellten Inhalte auf Seiten/Blogs deiner Website hoch.</span></span><br>
                            <span class="w3-tooltip" style="cursor: pointer;">- Social-Media-Icons  <span class="w3-text w3-tag" style="position: absolute; left: 100px; bottom: 18px;">Der Freelancer lädt die bereitgestellten Inhalte auf Seiten/Blogs deiner Website hoch.</span></span><br>
                            <span class="w3-tooltip" style="cursor: pointer;">- {{ plugIn }} Plugin-Installation  <span class="w3-text w3-tag" style="position: absolute; left: 100px; bottom: 18px;">Die Wartung der Website ist {{ plugIn }} Tage kostenlos nach Lieferung.</span></span><br>
                        </li>
                        <li><input type="checkbox" class="w3-check" v-model="extraAddedTreeDays" @change="updatePrice" style="cursor: pointer;">
                            Extraschnelle 3-tägige Lieferung (+{{ extraCost }} €)
                        </li>
                        <li><input type="checkbox" class="w3-check" v-model="extraAddedSeiten" @change="updatePrice" style="cursor: pointer;">
                            Extra Seiten (+2 Seiten) (+{{ extraCostSeiten }} €)
                        </li>
                        <li><input type="checkbox" class="w3-check" v-model="extraAddedPlugIn" @change="updatePrice" style="cursor: pointer;">
                            Plugin-Installation (+7 Tage) (+{{ extraCostPlugIn }} €)
                        </li>
                        <li><input type="checkbox" class="w3-check" v-model="extraAddSeoBasic" @change="updatePrice" style="cursor: pointer;">
                            <span class="w3-tooltip"> SEO-Basic
                                <span class="w3-text w3-tag" style="position: absolute; left: 100px; bottom: 18px;">
                                    Umfang: Verbesserungen der Seitenladezeit, Bild- und Medienoptimierung, Caching-Strategien, grundlegende Geschwindigkeitstests und Berichte.
                                </span>
                                </span>(+{{ extraSeoBasic }} €)
                        </li>
                        <!-- <li><input type="checkbox" class="w3-check" v-model="extraAddSeoAdvenced" @change="updatePrice" style="cursor: pointer;">
                            SEO-Advenced (+{{ extraSeoAdvenced }} €)
                        </li> -->
                        <li>
                            <p class="w3-small">Kosten pro Stunde <span class="w3-padding">"50 €"</span><br> (Allgemeines Webdesign - Technische Entwicklung-Spezialisierte Dienste(z.B.UX/UI-Design))
                                <br>"Ich kann nicht ein halbes Projekt abschließen.Ich akzeptiere Projekte zum Starten und Beenden."
                            </p>
                        </li>
                        <li class="w3-center w3-padding-32"><button class="w3-button w3-green" @click="handleOrderClick">Anfrage Senden</button></li>
                    </ul>
                </div>
                <!-- <div v-if="orderMessage" class="w3-center w3-padding-32 w3-animate-top w3-justify w3-margin-top w3-container w3-opacity-min">
                    <div class="w3-orange w3-animate-top w3-card-4 w3-display-middle w3-padding-32 w3-bottom w3-display-container" style="border-radius: 80% 20% / 10% 90%;">
                        <button class="w3-display-topright w3-button w3-red w3-tag" @click="close()">X</button>
                        <p class="w3-left">Total: {{ totalPricePlusMwSt }} € inkl.MwSt</p>
                        <p class="w3-container w3-padding-32 w3-large">{{ orderMessage }} </p>
                    </div>
                </div> -->
            </div>
            <!-- Standart Paket -->
            <div class="w3-col l3 s12 m6 w3-section" >
                <div class="w3-card-4 w3-light-grey" style="">
                    <ul class="w3-ul">
                        <li class="w3-padding-32 w3-red w3-xlarge w3-text-black" style="border-radius: 80% 20% / 10% 90%;">Standart <span class="w3-tiny">(OHNE RECHTLICHE SEITEN)</span><span class="w3-right w3-badge w3-round-large w3-green w3-large">{{ totalPriceStandand }} € </span>
                        <span class="w3-right w3-round-large w3-small">zzgl. mwst.</span></li>
                        <li><span class="w3-tooltip" style="cursor: pointer;">- Statik Website <span class="w3-text w3-tag" style="position: absolute; left:100px; bottom: 18px;">Ohne backend</span></span> <br>
                            <span class="w3-tooltip" style="cursor: pointer;">- {{ seitenZahlStandart }} Seiten <span class="w3-text w3-tag" style="position: absolute; left:100px; bottom: 18px;">Der Verkäufer fügt die angegebene Anzahl an Seiten zu deiner Website hinzu.</span></span> <br>

                            <span class="w3-tooltip" style="cursor: pointer;">- Responsive Design <span class="w3-text w3-tag" style="position: absolute; left: 100px; bottom: 18px;">Der Verkäufer erstellt ein reaktionsfähiges Design, das alle Geräte unterstützt</span></span><br>
                            <span class="w3-tooltip" style="cursor: pointer;">- Design Anpassung <span class="w3-text w3-tag" style="position: absolute; left: 100px; bottom: 18px;">Der Freelancer passt das Farbschema und das Layout deiner Website individuell an.</span></span><br>
                            <span>- {{ lieferTageStandard }} Tage Lieferzeit</span><br>
                            <span class="w3-tooltip" style="cursor: pointer;">- Quellcode integrieren<span class="w3-text w3-tag" style="position: absolute; left: 100px; bottom: 18px;">Lege der Lieferung den Quellcode bei.</span></span><br>
                            <span class="w3-tooltip" style="cursor: pointer;">- Detaillierte Codekommentare<span class="w3-text w3-tag" style="position: absolute; left: 100px; bottom: 18px;">Der Freelancer fügt dem Code detaillierte Kommentare hinzu, die die Codestruktur erklären.</span></span><br>
                            <span class="w3-tooltip" style="cursor: pointer;">- Content Upload <span class="w3-text w3-tag" style="position: absolute; left: 100px; bottom: 18px;">Der Freelancer lädt die bereitgestellten Inhalte auf Seiten/Blogs deiner Website hoch.</span></span><br>
                            <span class="w3-tooltip" style="cursor: pointer;">- Social-Media-Icons  <span class="w3-text w3-tag" style="position: absolute; left: 100px; bottom: 18px;">Der Freelancer lädt die bereitgestellten Inhalte auf Seiten/Blogs deiner Website hoch.</span></span><br>
                            <span class="w3-tooltip" style="cursor: pointer;">- {{ plugInStandard }} Plugin-Installation  <span class="w3-text w3-tag" style="position: absolute; left: 100px; bottom: 18px;">Die Wartung der Website ist zwei Wochen kostenlos nach Lieferung.</span></span><br>
                        </li>
                        <li><input type="checkbox" class="w3-check" v-model="extraAddedTreeDaysStandard" @change="updatePrice" style="cursor: pointer;">
                            Extraschnelle 7-tägige Lieferung (+{{ extraCostStandard }} €)
                        </li>
                        <li><input type="checkbox" class="w3-check" v-model="extraAddedSeitenStandard" @change="updatePrice" style="cursor: pointer;">
                            Extra Seiten (+2 Seiten) (+{{ extraCostSeiten }} €)
                        </li>
                        <li class="w3-opacity"><input type="checkbox" class="w3-check w3-disabled" v-model="extraAddedPlugInStandard" @change="updatePrice" style="cursor: pointer;">
                            Plugin-Installation (+7 Tage) (+{{ extraCostPlugInStandard }} €)
                        </li>
                        <li><input type="checkbox" class="w3-check" v-model="extraAddSeoAdvenced" @change="updatePrice" style="cursor: pointer;">
                            <span class="w3-tooltip"> SEO-Basic
                                <span class="w3-text w3-tag" style="position: absolute; left: 100px; bottom: 18px;">
                                    Umfang: Verbesserungen der Seitenladezeit, Bild- und Medienoptimierung, Caching-Strategien, grundlegende Geschwindigkeitstests und Berichte.
                                </span>
                                </span>(+{{ extraSeoAdvencedStandard }} €)
                        </li>
                        <li>
                            <p class="w3-small">Kosten pro Stunde <span class="w3-padding">"50 €"</span><br> (Allgemeines Webdesign - Technische Entwicklung-Spezialisierte Dienste(z.B.UX/UI-Design))
                                <br>"Ich kann nicht ein halbes Projekt abschließen.Ich akzeptiere Projekte zum Starten und Beenden."
                            </p>
                        </li>
                        <li class="w3-center w3-padding-32"><button class="w3-button w3-green" @click="handleOrderClickStandard">Anfrage Senden</button></li>
                    </ul>
                </div>
                <!-- <div v-if="orderMessageStandard" class="w3-center w3-padding-32 w3-animate-top w3-justify w3-margin-top w3-container w3-opacity-min">
                    <div class="w3-red w3-animate-top w3-card-4 w3-display-middle w3-padding-32 w3-bottom" style="border-radius: 80% 20% / 10% 90%;">
                        <button class="w3-display-topright w3-button w3-orange w3-tag" @click="close()">X</button>
                        <p class="w3-left">Total: {{ totalPriceStandandPlusMwSt }} € inkl.MwSt</p>
                        <p class="w3-container w3-padding-32 w3-large">{{ orderMessageStandard }}</p>
                    </div>
                </div> -->
            </div>

        </div>
    </div>
    <div v-show="disOn" class="" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 80%; " >
                    <div class="" >
                        <div class="w3-animate-top">
                            <span class="w3-button w3-text-blue w3-display-topright w3-xlarge w3-hover-red w3-transparent" @click="disOn = !disOn">&times;</span>
                            <header class="w3-container w3-padding-32">
                                <form @submit.prevent="submitForm" class="w3-container w3-card-4 w3-light-grey w3-text-blue w3-margin">
                                  <h2>Kontakt Formular</h2>
                                  <div class="w3-row w3-section">
                                    <div class="w3-col" style="width:50px"><i class="w3-xxlarge fa fa-user"></i></div>
                                      <div class="w3-rest">
                                        <input class="w3-input w3-border" v-model="formData.name" name="first" type="text" required placeholder="Vorname">
                                      </div>
                                  </div>
                                  <div class="w3-row w3-section">
                                    <div class="w3-col" style="width:50px"><i class="w3-xxlarge fa fa-user"></i></div>
                                      <div class="w3-rest">
                                        <input class="w3-input w3-border" v-model="formData.lastname" name="last" type="text" required placeholder="Nachname">
                                      </div>
                                  </div>
                                  <div class="w3-row w3-section">
                                    <div class="w3-col" style="width:50px"><i class="w3-xxlarge fa fa-envelope-o"></i></div>
                                      <div class="w3-rest">
                                        <input class="w3-input w3-border" v-model="formData.email" name="email" type="text" required placeholder="Email">
                                      </div>
                                  </div>
                                  <div class="w3-row w3-section">
                                    <div class="w3-col" style="width:50px"><i class="w3-xxlarge fa fa-phone"></i></div>
                                      <div class="w3-rest">
                                        <input class="w3-input w3-border" v-model="formData.phone" name="phone" type="text" required placeholder="Phone" >
                                      </div>
                                  </div>
                                  <div class="w3-row w3-section">
                                    <div class="w3-col" style="width:50px"><i class="w3-xxlarge fa fa-pencil"></i></div>
                                      <div class="w3-rest">
                                        <textarea name="message" class="w3-input w3-border w3-justify" id="" cols="30" rows="10"
                                        v-model="formData.message" required placeholder="Message"
                                        >
                                        </textarea>

                                      </div>
                                  </div>
                                  <button type="submit" class="w3-button w3-block w3-section w3-blue w3-ripple w3-padding">Send</button>
                                </form>
                            </header>
                        </div>
                    </div>
    </div>
    <div v-show="disOnStandard"  style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 80%; ">
                    <div class="" >
                        <div class="w3-animate-top">
                            <span class="w3-button w3-text-blue w3-display-topright w3-xlarge w3-hover-red w3-transparent" @click="disOnStandard = !disOnStandard">&times;</span>
                            <header class="w3-container w3-padding-32">
                                <form @submit.prevent="submitForm" class="w3-container w3-card-4 w3-light-grey w3-text-blue w3-margin">
                                    <h2>Kontakt Formular</h2>
                                    <div class="w3-row w3-section">
                                    <div class="w3-col" style="width:50px"><i class="w3-xxlarge fa fa-user"></i></div>
                                      <div class="w3-rest">
                                        <input class="w3-input w3-border" v-model="formData.name" name="first" type="text" required placeholder="Vorname">
                                      </div>
                                  </div>
                                  <div class="w3-row w3-section">
                                    <div class="w3-col" style="width:50px"><i class="w3-xxlarge fa fa-user"></i></div>
                                      <div class="w3-rest">
                                        <input class="w3-input w3-border" v-model="formData.lastname" name="last" type="text" required placeholder="Nachname">
                                      </div>
                                  </div>
                                  <div class="w3-row w3-section">
                                    <div class="w3-col" style="width:50px"><i class="w3-xxlarge fa fa-envelope-o"></i></div>
                                      <div class="w3-rest">
                                        <input class="w3-input w3-border" v-model="formData.email" name="email" type="text" required placeholder="Email">
                                      </div>
                                  </div>
                                  <div class="w3-row w3-section">
                                    <div class="w3-col" style="width:50px"><i class="w3-xxlarge fa fa-phone"></i></div>
                                      <div class="w3-rest">
                                        <input class="w3-input w3-border" v-model="formData.phone" name="phone" type="text" required placeholder="Phone" >
                                      </div>
                                  </div>
                                  <div class="w3-row w3-section">
                                    <div class="w3-col" style="width:50px"><i class="w3-xxlarge fa fa-pencil"></i></div>
                                      <div class="w3-rest">
                                        <textarea name="message" class="w3-input w3-border w3-justify" id="" cols="30" rows="10"
                                        v-model="formData.message" required placeholder="Message"
                                        >
                                        </textarea>

                                      </div>
                                  </div>
                                  <button type="submit" class="w3-button w3-block w3-section w3-blue w3-ripple w3-padding">Send</button>
                                </form>
                            </header>
                        </div>
                    </div>
    </div>
</template>

<style scoped>
.contact-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background: #f9f9f9;
}
.form-group {
  margin-bottom: 15px;
}
.form-group label {
  display: block;
  margin-bottom: 5px;
}
.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.submit-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #28a745;
  color: white;
  cursor: pointer;
}
.submit-button:hover {
  background-color: #218838;
}
</style>