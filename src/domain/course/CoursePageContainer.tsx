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
import styles from '../event/eventPage.module.scss';
import EventPageMeta from '../event/eventPageMeta/EventPageMeta';
import { isEventClosed } from '../event/EventUtils';
import SimilarEvents from '../event/similarEvents/SimilarEvents';

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
      include: ['in_language', 'keywords', 'location'],
    },
  });

  const course = courseData?.courseDetails;

  const courseClosed = !course || isEventClosed(course);

  return (
    <PageWrapper className={styles.eventPageWrapper} title="event.title">
      <MainContent offset={-70}>
        <LoadingSpinner isLoading={loading}>
          {course ? (
            <>
              {/* Wait for data to be accessible before updating metadata */}
              <EventPageMeta event={course} />
              {courseClosed ? (
                <EventClosedHero />
              ) : (
                <EventHero event={course} />
              )}
              {/* Show event content only if event is open */}
              {!courseClosed && <EventContent event={course} />}
              {/* Hide similar event on SSR to make initial load faster */}
              {isClient && <SimilarEvents event={course} />}
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

export default CoursePageContainer;
