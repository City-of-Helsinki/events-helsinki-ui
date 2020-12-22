import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router';
import { Link } from 'react-router-dom';

import ErrorHero from '../../common/components/error/ErrorHero';
import LoadingSpinner from '../../common/components/spinner/LoadingSpinner';
import { useCourseDetailsQuery } from '../../generated/graphql';
import useLocale from '../../hooks/useLocale';
import isClient from '../../util/isClient';
import MainContent from '../app/layout/MainContent';
import PageWrapper from '../app/layout/PageWrapper';
import { ROUTES } from '../app/routes/constants';
import EventClosedHero from '../event/eventClosedHero/EventClosedHero';
import EventContent from '../event/eventContent/EventContent';
import EventHero from '../event/eventHero/EventHero';
import EventPageMeta from '../event/eventPageMeta/EventPageMeta';
import { isEventClosed } from '../event/EventUtils';
import { useSimilarCoursesQuery } from '../event/queryUtils';
import SimilarEvents from '../event/similarEvents/SimilarEvents';
import { EventFields, EventType } from '../event/types';
import styles from './coursePage.module.scss';

interface RouteParams {
  id: string;
}

const CoursePageContainer: React.FC = () => {
  const { t } = useTranslation();
  const { search } = useLocation();
  const params = useParams<RouteParams>();
  const courseId = params.id;
  const locale = useLocale();

  const { data: courseData, loading } = useCourseDetailsQuery({
    variables: {
      id: courseId,
      include: ['in_language', 'keywords', 'location', 'audience'],
    },
  });

  const course = courseData?.courseDetails;

  const courseClosed = !course || isEventClosed(course);

  return (
    <PageWrapper className={styles.coursePageWrapper} title="event.title">
      <MainContent offset={-70}>
        <LoadingSpinner isLoading={loading}>
          {course ? (
            <>
              {/* Wait for data to be accessible before updating metadata */}
              <EventPageMeta event={course} />
              {courseClosed ? (
                <EventClosedHero />
              ) : (
                <EventHero event={course} eventType={EventType.COURSE} />
              )}
              {/* Show event content only if event is open */}
              {!courseClosed && (
                <EventContent event={course} eventType={EventType.COURSE} />
              )}
              {/* Hide similar event on SSR to make initial load faster */}
              {isClient && <SimilarCoursesContainer event={course} />}
            </>
          ) : (
            <ErrorHero
              text={t('event.notFound.text')}
              title={t('event.notFound.title')}
            >
              <Link to={`/${locale}${ROUTES.COURSES}${search}`}>
                {t('event.notFound.linkSearchEvents')}
              </Link>
            </ErrorHero>
          )}
        </LoadingSpinner>
      </MainContent>
    </PageWrapper>
  );
};

// this wrapper/container component is needed because we want to query similar events
// in the client side but hooks cannot be conditional :)
const SimilarCoursesContainer: React.FC<{ event: EventFields }> = ({
  event,
}) => {
  const { data, loading } = useSimilarCoursesQuery(event);

  return (
    <SimilarEvents
      events={data}
      loading={loading}
      eventsType={EventType.COURSE}
    />
  );
};

export default CoursePageContainer;
