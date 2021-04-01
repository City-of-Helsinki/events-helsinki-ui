import { formatDate } from '../../src/util/dateUtils';
import { getEnvUrl } from '../utils/settings';
import { createSlackMessageSender } from './slackMessageSender';
import { emojis } from './utils/emojis';
import { bold, italics } from './utils/slackTextFormatters';

// https://devexpress.github.io/testcafe/documentation/reference/plugin-api/reporter.html#testruninfo-object
type TestRunInfo = {
  errs: Record<string, string>[];
  warnings: string[];
  durationMs: number;
  skipped: boolean;
};

type Result = {
  passedCount: number;
  failedCount: number;
  skippedCount: number;
};

type Reporter = {
  reportTaskStart: (start: number, userAgents: string, test: number) => void;
  reportFixtureStart: (fixtureName: string) => void;
  reportTestDone: (name: string, testRunInfo: TestRunInfo) => void;
  reportTaskDone: (
    endTime: number,
    passed: number,
    warnings: TestRunInfo['warnings'],
    result: Result
  ) => void;
};

/**
 * Custom slack reporter for testcafe:
 * https://github.com/ocassio/testcafe-reporter-custom
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const SlackReporter = (): Reporter => {
  let startTime: number, testCount: number;
  const slack = createSlackMessageSender();

  const reportTaskStart = (start: number, userAgents: string, test: number) => {
    startTime = start;
    testCount = test;
    const githubWorkflow = process.env.GITHUB_WORKFLOW_NAME || '';
    const githubWorkflowUrl = process.env.GITHUB_WORKFLOW_URL || '';
    // prettier-ignore
    slack.addMessage(
    `${githubWorkflow}: ${getEnvUrl()}\n
    Workflow Url: ${githubWorkflowUrl}\n
    ${emojis.rocket} ${'Started TestCafe:'} ${bold(formatDate(startTime, 'dd.MM.yyyy HH:mm:ss'))}\n
    ${emojis.computer} Runned ${bold(String(testCount))} tests in: ${bold(userAgents)}\n`
    );
  };

  const getTestDoneMessage = (
    name: string,
    testRunInfo: TestRunInfo
  ): string => {
    let message;
    if (testRunInfo.skipped) {
      message = `${emojis.fastForward} ${italics(name)} - ${bold('skipped')}`;
    } else if (testRunInfo.errs.length) {
      /* prettier-ignore */
      message = `${emojis.heavyMultiplication} ${italics(name)} - ${bold('failed')}`;
    } else {
      message = `${emojis.heavyCheckMark} ${italics(name)}`;
    }
    return message;
  };

  const reportTestDone = (name: string, testRunInfo: TestRunInfo) => {
    slack.addMessage(getTestDoneMessage(name, testRunInfo));
  };

  const reportFixtureStart = (fixtureName: string) => {
    slack.addMessage(bold(fixtureName));
  };

  const reportTaskDone = (
    endTime: number,
    passed: number,
    warnings: TestRunInfo['warnings'],
    result: Result
  ) => {
    const endTimeFormatted = formatDate(endTime, 'dd.MM.yyyy HH:mm:ss');
    const durationMs = endTime - startTime;
    const durationFormatted = formatDate(durationMs, "mm'm' ss's'");
    // prettier-ignore
    const finishedStr = `${emojis.finishFlag} Testing finished at ${bold(endTimeFormatted)}\n`;
    // prettier-ignore
    const durationStr = `${emojis.stopWatch} Duration: ${bold(durationFormatted)}\n`;
    let summaryStr = '';

    if (result.skippedCount) {
      // prettier-ignore
      summaryStr += `${emojis.fastForward} ${bold(`${result.skippedCount} skipped`)}\n`;
    }
    if (result.failedCount) {
      // prettier-ignore
      summaryStr += `${emojis.noEntry} ${bold(`${result.failedCount}/${testCount} failed`)}`;
    } else {
      // prettier-ignore
      summaryStr += `${emojis.checkMark} ${bold(`${result.passedCount}/${testCount} passed`)}`;
    }
    slack.addMessage(`\n\n${finishedStr} ${durationStr} ${summaryStr}`);

    slack.sendTestReport(testCount - passed);
  };

  return {
    reportTaskStart,
    reportFixtureStart,
    reportTestDone,
    reportTaskDone,
  };
};

export default SlackReporter;
