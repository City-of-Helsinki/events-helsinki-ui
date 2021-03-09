import { Request, Response } from 'express';

import { supportedLanguages } from '../constants';

// Redirect using 308 if only locale in path e.g. "/:locale" or "/:locale/""
// eslint-disable-next-line max-len
// as described in https://helsinkisolutionoffice.atlassian.net/secure/RapidBoard.jspa?rapidView=130&projectKey=POM&modal=detail&selectedIssue=TH-935
export const handleReactRouterRedirection = (
  req: Request,
  res: Response,
  url: string
): void => {
  // match /:lang and /:lang/
  const langPathRegex = new RegExp(
    `^/(?:${supportedLanguages.join('|')})/?$`,
    'i'
  );

  if (req.path.match(langPathRegex)) {
    res.redirect(308, url);
  } else {
    res.redirect(302, url);
  }
};
