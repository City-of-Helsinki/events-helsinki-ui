import { useApolloClient } from '@apollo/react-hooks';
import { SearchInput } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  KeywordFieldsFragment,
  KeywordListDocument,
  KeywordListQuery,
} from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import { Language } from '../../../types';
export interface SearchAutosuggestProps {
  label?: string;
  helperText: string;
  onSubmit: (value: string) => void;
}

type KeyWord = {
  id: KeywordFieldsFragment['id'];
  name: string;
};

const getKeyWordList = (data: KeywordListQuery, locale: Language) =>
  data.keywordList.data
    .map((keyword) => ({ id: keyword.id, name: keyword.name?.[locale] }))
    .filter((keyword) => keyword.id && keyword.name) as KeyWord[];

const SearchAutosuggest: React.FC<SearchAutosuggestProps> = ({
  label = '',
  helperText,
  onSubmit,
}) => {
  const apolloClient = useApolloClient();
  const locale = useLocale();
  const { t } = useTranslation();
  const getSuggestions = async (text: string): Promise<KeyWord[]> => {
    const { data } = await apolloClient.query<KeywordListQuery>({
      query: KeywordListDocument,
      variables: {
        hasUpcomingEvents: true,
        text,
      },
    });
    return getKeyWordList(data, locale);
  };
  return (
    <SearchInput<KeyWord>
      label={label}
      helperText={helperText}
      getSuggestions={getSuggestions}
      suggestionLabelField="name"
      onSubmit={onSubmit}
      highlightSuggestions
      visibleSuggestions={5}
      loadingSpinnerText={t(
        'commons.searchAutoSuggest.loadingSearchSuggestions'
      )}
      loadingSpinnerFinishedText={t(
        'commons.searchAutoSuggest.loadingSearchSuggestionsFinished'
      )}
    />
  );
};

export default SearchAutosuggest;
