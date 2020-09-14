import React from 'react';

import Hero from '../../common/components/staticPageHero/StaticPageHero';
import Container from '../app/layout/Container';

const AboutPageFi: React.FC = () => {
  return (
    <>
      <Hero>
        <h1>Tietoa palvelusta</h1>
        <p>
          Tapahtumat.helsinki -verkkosivusto auttaa helsinkiläisiä ja
          Helsingissä vierailevia löytämään tekemistä helposti ja kätevästi
          yhdestä paikasta. Mukana on kaupungin oman tapahtumatarjonnan lisäksi
          yhdistysten, yritysten ja yksittäisten kaupunkilaisten järjestämiä
          tapahtumia. Vuodesta 2021 alkaen sivustolla on tarkoitus julkaista
          tietoa myös harrastuksista ja kursseista.
        </p>
        <p>
          Sivustoa ylläpitää Helsingin kaupungin kulttuurin ja vapaa-ajan
          toimialan viestintä
        </p>
      </Hero>
      <Container>
        <h2>Evästeet</h2>
        <p>
          Tämä verkkosivusto (tapahtumat.helsinki) käyttää niin sanottuja
          evästeitä. Evästeet ovat pieniä tiedostoja, jotka tallentuvat
          selaimeesi, kun käyt verkkosivustolla. Evästeiden avulla voimme
          tunnistaa tietokoneesi/IP-osoitteesi ja kerätä tietoa siitä, millä
          sivuilla vierailet ja mitä toimintoja käytät.
        </p>
        <p>
          Verkkosivustollamme olevat evästeet eivät kerää käyttäjien
          henkilötietoja. Kerättyä tietoa käytetään ainoastaan parantamaan
          verkkosivuston sisällön, palveluiden ja asiakastuen laatua ja
          saavutettavuutta. Tietoja saatetaan ajoittain julkaista mutta
          ainoastaan kokonaisuuksina, joista ei voi tunnistaa yksittäisiä
          käyttäjiä. Tällaisia tietoja ovat esimerkiksi sivuston käyttäjien
          kokonaismäärä.
        </p>
        <p>
          Seuraavat kolmannet osapuolet tallentavat seuraavia evästeitä
          tapahtumat.helsinki-verkkosivuille:
        </p>
        <ul>
          <li>
            Google Analytics (tarjoajana Google Inc.) auttaa meitä (i)
            analysoimaan esim. verkkosivustolla kävijöiden määrää ja (ii)
            parantamaan verkkosivuston käytettävyyttä esim. sivuston liikennettä
            koskevien mittausten perusteella. Voit tutustua tarkemmin Googlen
            tietosuojakäytäntöihin. Voit asentaa tietokoneellesi myös Google
            Analyticsin käytön estävän selaimen lisäosan.
          </li>
          <p>
            <a
              href="https://support.google.com/analytics/answer/6004245"
              target="_blank"
              rel="noopener noreferrer"
            >
              Lue lisää Googlen tietosuojakäytännöistä
            </a>{' '}
            (linkki avautuu uudelle sivustolle)
          </p>
          <p>
            <a
              href="https://support.google.com/analytics/answer/181881?hl=fi"
              target="_blank"
              rel="noopener noreferrer"
            >
              Lue lisää Google Analyticsin käytön estämisestä
            </a>{' '}
            (linkki avautuu uudelle sivustolle)
          </p>
          <li>
            Google AdWords (tarjoajana Google Inc.) auttaa meitä kohdentamaan
            markkinointia verkkosivuston käyttäjien toiminnan mukaan. Google
            AdWords ei tallenna mitään arkaluonteisia tai yksittäiseen
            käyttäjään yhdistettävissä olevia tietoja. Voit tutustua tarkemmin
            Googlen tietosuojakäytäntöihin.
            <p>
              <a
                href="https://support.google.com/analytics/answer/6004245"
                target="_blank"
                rel="noopener noreferrer"
              >
                Lue lisää Googlen tietosuojakäytännöistä
              </a>{' '}
              (linkki avautuu uudelle sivustolle)
            </p>
          </li>
        </ul>
        <p>
          Käyttämällä sivustoa www.tapahtumat.helsinki hyväksyt evästeiden
          käytön yllä kuvatun mukaisesti. Jos et jatkossa halua sallia
          evästeiden käyttöä, sinun täytyy estää evästeet oman selaimesi
          asetuksista. Useimmat selaimet on aluksi asetettu sallimaan evästeet.
          Voit halutessasi asettaa selaimesi estämään kaikki evästeet tai
          ainoastaan kolmansien osapuolien evästeet. Jos estät evästeet, et
          välttämättä pysty käyttämään kaikkia tämän tai muiden sivustojen
          ominaisuuksia, jotka käyttävät evästeitä käyttökokemuksen
          parantamiseksi.
        </p>
      </Container>
    </>
  );
};

export default AboutPageFi;
