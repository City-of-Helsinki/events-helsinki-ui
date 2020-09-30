import * as Sentry from '@sentry/browser';
import classNames from 'classnames';
import { saveAs } from 'file-saver';
import {
  Button,
  IconAngleRight,
  IconCalendarClock,
  IconGlobe,
  IconInfoCircle,
  IconLocation,
  IconTicket,
} from 'hds-react';
import { createEvent, EventAttributes } from 'ics';
import React from 'react';
import { useTranslation } from 'react-i18next';

import Link from '../../../common/components/link/Link';
import linkStyles from '../../../common/components/link/link.module.scss';
import { EventFieldsFragment } from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import IconDirections from '../../../icons/IconDirections';
import getDateArray from '../../../util/getDateArray';
import getDateRangeStr from '../../../util/getDateRangeStr';
import getDomain from '../../../util/getDomain';
import { translateValue } from '../../../util/translateUtils';
import { ROUTES } from '../../app/constants';
import { getEventFields, getEventPrice, getServiceMapUrl } from '../EventUtils';
import styles from './eventInfo.module.scss';
import OrganizationInfo from './OrganizationInfo';
import OtherEventTimes from './OtherEventTimes';

interface Props {
  event: EventFieldsFragment;
}

const EventInfo: React.FC<Props> = ({ event }) => {
  const { t } = useTranslation();
  const locale = useLocale();

  const {
    addressLocality,
    district,
    email,
    endTime,
    externalLinks,
    googleDirectionsLink,
    hslDirectionsLink,
    infoUrl,
    languages,
    locationName,
    name,
    offerInfoUrl,
    shortDescription,
    startTime,
    streetAddress,
    telephone,
  } = getEventFields(event, locale);
  const eventPriceText = getEventPrice(
    event,
    locale,
    t('event.info.offers.isFree')
  );
  const showOtherInfo = Boolean(
    email || externalLinks.length || infoUrl || telephone
  );

  const moveToBuyTicketsPage = () => {
    window.open(offerInfoUrl);
  };

  const downloadIcsFile = () => {
    if (startTime) {
      const domain = getDomain();
      const icsEvent: EventAttributes = {
        description: t('event.info.textCalendarLinkDescription', {
          description: shortDescription,
          link: `${domain}/${locale}${ROUTES.EVENT.replace(':id', event.id)}`,
        }),
        end: endTime ? getDateArray(endTime) : getDateArray(startTime),
        location: [locationName, streetAddress, district, addressLocality]
          .filter((e) => e)
          .join(', '),
        productId: domain,
        start: getDateArray(startTime),
        startOutputType: 'local',
        title: name,
      };
      createEvent(icsEvent, (error: Error | undefined, value: string) => {
        if (error) {
          Sentry.captureException(error);
        } else {
          const blob = new Blob([value], { type: 'text/calendar' });
          saveAs(blob, `event_${event.id.replace(/:/g, '')}.ics`);
        }
      });
    }
  };

  return (
    <div className={styles.eventInfo}>
      <div className={styles.contentWrapper}>
        {/* Date info */}
        <div className={styles.infoWithIcon}>
          <div className={styles.iconWrapper}>
            <IconCalendarClock className={styles.icon} />
          </div>
          <div className={styles.iconTextWrapper}>
            <h2 className={styles.title}>{t('event.info.labelDateAndTime')}</h2>

            {!!startTime &&
              getDateRangeStr(
                startTime,
                endTime,
                locale,
                true,
                true,
                t('commons.timeAbbreviation')
              )}
            {startTime && (
              <button className={linkStyles.link} onClick={downloadIcsFile}>
                {t('event.info.buttonAddToCalendar')}
                <IconAngleRight />
              </button>
            )}
          </div>
        </div>

        {/* Other event times */}
        <OtherEventTimes event={event} />

        {/* Location info */}
        <div className={styles.infoWithIcon}>
          <div className={styles.iconWrapper}>
            <IconLocation className={styles.icon} />
          </div>
          <div className={styles.iconTextWrapper}>
            <h2 className={styles.title}>{t('event.info.labelLocation')}</h2>
            <div className={styles.mobileOnly}>
              {[locationName, streetAddress, district, addressLocality]
                .filter((e) => e)
                .join(', ')}
            </div>
            {locationName && (
              <div className={styles.desktopOnly}>{locationName}</div>
            )}
            {streetAddress && (
              <div className={styles.desktopOnly}>{streetAddress}</div>
            )}
            {district && <div className={styles.desktopOnly}>{district}</div>}
            {addressLocality && (
              <div className={styles.desktopOnly}>{addressLocality}</div>
            )}
            <Link isExternal={true} to={getServiceMapUrl(event, locale, false)}>
              {t('event.info.openMap')}
            </Link>
          </div>
        </div>

        {/* Languages */}
        {!!languages.length && (
          <div className={styles.infoWithIcon}>
            <div className={styles.iconWrapper}>
              <IconGlobe className={styles.icon} />
            </div>
            <div className={styles.iconTextWrapper}>
              <h2 className={styles.title}>{t('event.info.labelLanguages')}</h2>
              <div>{languages.join(', ')}</div>
            </div>
          </div>
        )}

        {/* Other info */}
        {showOtherInfo && (
          <div className={styles.infoWithIcon}>
            <div className={styles.iconWrapper}>
              <IconInfoCircle className={styles.icon} />
            </div>
            <div className={styles.iconTextWrapper}>
              <h2 className={styles.title}>{t('event.info.labelOtherInfo')}</h2>
              {email && <div>{email}</div>}
              {telephone && <div>{telephone}</div>}
              {infoUrl && (
                <Link isExternal={true} to={infoUrl}>
                  {t('event.info.linkWebPage')}
                </Link>
              )}

              {externalLinks.map((externalLink, index) => {
                return (
                  !!externalLink.link && (
                    <Link key={index} isExternal={true} to={externalLink.link}>
                      {translateValue(
                        'event.info.',
                        externalLink.name || '',
                        t
                      )}
                    </Link>
                  )
                );
              })}
            </div>
          </div>
        )}

        {/* Directions */}
        <div className={styles.infoWithIcon}>
          <div className={styles.iconWrapper}>
            <IconDirections className={styles.icon} />
          </div>
          <div className={styles.iconTextWrapper}>
            <h2 className={styles.title}>{t('event.info.labelDistricts')}</h2>
            <Link isExternal={true} to={googleDirectionsLink}>
              {t('event.info.directionsGoogle')}
            </Link>
            <Link isExternal={true} to={hslDirectionsLink}>
              {t('event.info.directionsHSL')}
            </Link>
          </div>
        </div>
        {/* Organization info */}
        <OrganizationInfo event={event} />

        {/* Price info */}
        <div className={classNames(styles.infoWithIcon, styles.mobileOnly)}>
          <div className={styles.iconWrapper}>
            <IconTicket className={styles.icon} />
          </div>
          <div className={styles.iconTextWrapper}>
            <h2 className={styles.title}>{t('event.info.labelPrice')}</h2>
            {eventPriceText || '-'}
          </div>
        </div>

        {offerInfoUrl && (
          <div
            className={classNames(styles.buyButtonWrapper, styles.mobileOnly)}
          >
            <Button
              aria-label={t('event.info.ariaLabelBuyTickets')}
              fullWidth={true}
              onClick={moveToBuyTicketsPage}
              variant="success"
            >
              {t('event.info.buttonBuyTickets')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventInfo;
