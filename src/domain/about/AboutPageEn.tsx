import React from 'react';

import Hero from '../../common/components/staticPageHero/StaticPageHero';
import Container from '../app/layout/Container';

const AboutPageEn: React.FC = () => {
  return (
    <>
      <Hero>
        <h1>About the service</h1>
        <p>
          This website (tapahtumat.helsinki) uses so-called cookies, Cookies are
          small pieces of data which are saved in your browser when you load a
          website. It allows for recognition of your computer/IP address and for
          collection of information about the pages you visit and which features
          you use.
        </p>
        <p>
          The cookies set on our website do not collect personal data about
          users. The data retrieved will be used only to enhance the quality and
          accessibility of content, service and support to our visitors. The
          data may be made public from time to time, however only in an
          aggregate, non-personally identifiable form, indicating for instance
          the total number of site visitors.
        </p>
      </Hero>
      <Container>
        <p>
          The following third parties store the following cookies on
          tapahtumat.helsinki’s websites:
        </p>
        <ul>
          <li>
            Google Analytics (provided by Google Inc.) to enable us (i) to
            perform statistical analysis of e.g. number of visitors and (ii) to
            improve the website’s usability, e.g. on the basis of website
            traffic measurements. You can read more about how Google collects
            and protects data{' '}
            <a
              href="https://www.google.com/analytics/learn/privacy.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
            . Google Analytics also provides{' '}
            <a
              href="https://tools.google.com/dlpage/gaoptout/"
              target="_blank"
              rel="noopener noreferrer"
            >
              opt-out tools
            </a>
            for the web.
          </li>
          <li>
            Google AdWords (provided by Google Inc.) to enable us to target
            advertising based on site behavior. Google AdWords does not store
            any personally identifiable or sensitive information. You can read
            more about how Google collects and protects data{' '}
            <a
              href="https://www.google.com/intl/en/policies/privacy/"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
            .
          </li>
        </ul>
        <p>
          By using the tapahtumat.helsinki website, you consent to us using
          cookies as described above. If you no longer wish to consent to the
          use of cookies, you must disable cookies by changing your browser
          settings. Most browsers are initially set up to accept cookies. If you
          prefer, you can set your browser to reject cookies, or to reject third
          party cookies only. If you reject cookies you may not be able use
          other features on this or other websites that rely on cookies to
          enable a better user experience.
        </p>
        <p>
          Please refer to the help guide for your browser below for further
          guidance on how to delete cookies from your browser.
        </p>
      </Container>
    </>
  );
};

export default AboutPageEn;
