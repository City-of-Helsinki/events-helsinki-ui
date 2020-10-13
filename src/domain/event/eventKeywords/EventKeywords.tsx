import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

import Keyword from '../../../common/components/keyword/Keyword';
import { DATE_TYPES } from '../../../constants';
import { EventFieldsFragment } from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import scrollToTop from '../../../util/scrollToTop';
import { ROUTES } from '../../app/constants';
import { DEFAULT_SEARCH_FILTERS } from '../../eventSearch/constants';
import { getSearchQuery } from '../../eventSearch/utils';
import { getEventFields } from '../EventUtils';

interface Props {
  blackOnMobile?: boolean;
  event: EventFieldsFragment;
  hideKeywordsOnMobile?: boolean;
  showIsFree: boolean;
  showKeywords?: boolean;
}
const EventKeywords: React.FC<Props> = ({
  blackOnMobile,
  event,
  hideKeywordsOnMobile = false,
  showIsFree,
  showKeywords = true,
}) => {
  const history = useHistory();
  const { t } = useTranslation();
  const locale = useLocale();
  const { freeEvent, keywords, thisWeek, today } = getEventFields(
    event,
    locale
  );

  const handleClick = (
    type: 'dateType' | 'isFree' | 'text',
    value = ''
  ) => () => {
    const search = getSearchQuery({
      ...DEFAULT_SEARCH_FILTERS,
      dateTypes: type === 'dateType' ? [value] : [],
      isFree: type === 'isFree',
      text: type === 'text' ? [value] : [],
    });

    history.push({ pathname: `/${locale}${ROUTES.EVENTS}`, search });
    scrollToTop();
  };

  const showComponent =
    today ||
    thisWeek ||
    (showKeywords && keywords.length) ||
    (showIsFree && freeEvent);

  if (!showComponent) {
    return null;
  }

  return (
    <>
      {!!keywords.length &&
        showKeywords &&
        keywords.map((keyword) => {
          return (
            <Keyword
              blackOnMobile={blackOnMobile}
              hideOnMobile={hideKeywordsOnMobile}
              key={keyword.id}
              keyword={keyword.name}
              onClick={handleClick('text', keyword.name)}
            />
          );
        })}
      {today && (
        <Keyword
          color="engelLight50"
          keyword={t('event.categories.labelToday')}
          onClick={handleClick('dateType', DATE_TYPES.TODAY)}
        />
      )}
      {!today && thisWeek && (
        <Keyword
          color="engelLight50"
          keyword={t('event.categories.labelThisWeek')}
          onClick={handleClick('dateType', DATE_TYPES.THIS_WEEK)}
        />
      )}
      {showIsFree && freeEvent && (
        <Keyword
          color="tramLight20"
          keyword={t('event.categories.labelFree')}
          onClick={handleClick('isFree')}
        />
      )}
    </>
  );
};

export default EventKeywords;
