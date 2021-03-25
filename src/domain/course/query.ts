import gql from 'graphql-tag';

export const QUERY_COURSE_DETAILS = gql`
  fragment courseFields on EventDetails {
    ...eventFields
    audienceMinAge
    audienceMaxAge
    extensionCourse {
      enrolmentStartTime
      enrolmentEndTime
      maximumAttendeeCapacity
      minimumAttendeeCapacity
      remainingAttendeeCapacity
    }
  }
  query CourseDetails($id: ID!, $include: [String]) {
    courseDetails(id: $id, include: $include) {
      ...courseFields
    }
  }
`;
