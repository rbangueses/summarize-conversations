import React from 'react';
import * as Flex from '@twilio/flex-ui';
import { FlexPlugin } from '@twilio/flex-plugin';
import ConversationSummaryComponent from './components/ConversationSummaryComponent/ConversationSummaryComponent';

const PLUGIN_NAME = 'SummariseTasksPlugin';

export default class SummariseTasksPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof Flex }
   */
  async init(flex: typeof Flex, manager: Flex.Manager): Promise<void> {
    const options: Flex.ContentFragmentProps = { sortOrder: -1 };
    
    flex.TaskCanvas.Content.add(<ConversationSummaryComponent key="conv-sum-component" />, options);
  }
}
