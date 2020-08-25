import React from 'react';

import Container from '../app/layout/Container';
import Hero from './hero/Hero';

const AboutPageSv = () => {
  return (
    <>
      <Hero>
        <h1>Om tjänsten</h1>
        <p>
          Denna webbplats (tapahtumat.helsinki) använder så kallade webbkakor
          (cookies). Webbkakor är små textfiler som sparas i webbläsaren när du
          laddar en webbplats. De låter oss känna igen din dator/IP-adress och
          används för att samla information om sidorna du besöker och vilka
          egenskaper du använder dig av.
        </p>
        <p>
          Webbkakorna från vår webbplats samlar inte in personliga uppgifter om
          användarna. Uppgifterna som samlas in används enbart för att förbättra
          kvaliteten på och tillgången till vårt innehåll och våra tjänster och
          för att erbjuda våra besökare bättre stöd. Uppgifterna kan tidvis
          publiceras, men enbart i aggregatformat utan personligt identifierbara
          uppgifter, till exempel för att ange den totala mängden besökare på
          webbplatsen.
        </p>
      </Hero>
      <Container>
        <p>
          Följande tredje parter lagrar följande webbkakor på
          tapahtumat.helsinki-webbplatsen:
        </p>

        <ul>
          <li>
            Google Analytics (från Google Inc.) som tillåter oss att (i) utföra
            statistisk analys över t.ex. antalet besökare och (ii) förbättra
            webbplatsens användarvänlighet t.ex. utgående från webbplatsens
            trafikmängd. Du kan läsa mer om hur Google samlar in och skyddar
            data{' '}
            <a
              href="https://www.google.com/analytics/learn/privacy.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              här
            </a>
            . Google Analytics har också{' '}
            <a
              href="https://tools.google.com/dlpage/gaoptout/"
              target="_blank"
              rel="noopener noreferrer"
            >
              opt-out verktyg
            </a>{' '}
            för nätet.
          </li>
          <li>
            Google AdWords (från Google Inc.) för att tillåta oss att inrikta
            vår marknadsföring baserat på hur du använder webbplatser. Google
            AdWords sparar inte personligt identifierbara uppgifter eller
            känsliga uppgifter. Du kan läsa mer om hur Google samlar in och
            skyddar data{' '}
            <a
              href="https://www.google.com/intl/en/policies/privacy/"
              target="_blank"
              rel="noopener noreferrer"
            >
              här
            </a>
            .
          </li>
        </ul>
        <p>
          Genom att använda webbplatsen tapahtumat.helsinki godkänner du
          användningen av webbkakor (cookies) enligt beskrivningen ovan. Om du
          inte längre vill ge ditt samtycke till användningen av webbkakor kan
          du i din webbläsares inställningar förbjuda användningen av webbkakor.
          De flesta webbläsare har som standardinställning att tillåta
          webbkakor. Om du vill kan du ställa in din webbläsare så att den
          blockerar alla webbkakor eller enbart webbkakor från tredje parter.
          Ifall du förbjuder användningen av webbkakor kan du inte nödvändigtvis
          använda alla funktioner på denna webbplats eller andra webbplatser som
          använder sig av webbkakor för att förbättra användarupplevelsen.
        </p>
      </Container>
    </>
  );
};

export default AboutPageSv;
