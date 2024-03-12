import { Theme } from '@twilio-paste/core/theme';
import React, { useEffect, useState } from 'react';
import {Badge, Callout, CalloutHeading, CalloutText} from '@twilio-paste/core';
import axios from 'axios';
import { withTaskContext } from "@twilio/flex-ui";

interface Summary {
  summary: string;
  sentiment: string;
}

interface ConversationSummaryComponentProps {
  task: any;
  token: string;
}


const ConversationSummaryComponent: React.FC<ConversationSummaryComponentProps> = ({ task , token }): JSX.Element | null => {
  const [summaries, setSummaries] = useState<Record<string, Summary>>({});
  const [conversationSid, setConversationSid] = useState(task.attributes.conversationSid);

  useEffect(() => {
    if (!conversationSid || summaries[conversationSid] || task.attributes.noAI ) {
      return;
    }
    const body = {
      Token: token,
      conversationSid: conversationSid
    };

    axios.post(`${process.env.FLEX_APP_SUMMARIZE_FUNCTION_URL}`, body)
    //axios.get(`${process.env.FLEX_APP_SUMMARIZE_FUNCTION_URL}?conversationSid=${conversationSid}`)
      .then(response => {
        const content = response.data.choices[0].message.content;
        const firstChar = content.charAt(0);
        let sentiment = 'Neutral';
        if (firstChar === 'P') {
          sentiment = 'Positive';
        } else if (firstChar === 'N') {
          sentiment = 'Negative';
        }
        setSummaries({
          ...summaries,
          [conversationSid]: {
            summary: content.slice(1),
            sentiment,
          },
        });
      })
      .catch(error => {
        console.error('Error fetching summary:', error);
        setSummaries({
          ...summaries,
          [conversationSid]: {
            summary: 'Error fetching summary',
            sentiment: 'Neutral',
          },
        });
      });
  }, [conversationSid]);

  useEffect(() => {
    setConversationSid(task.attributes.conversationSid);
  }, [task]);

  // If there is no conversationSid, don't render anything
  if (!conversationSid || !summaries[conversationSid]) {
    return null;
  }

  const { summary, sentiment } = summaries[conversationSid] ;

  let badgeVariant: 'neutral' | 'success' | 'warning' = 'neutral';

  if (sentiment === 'Positive') {
    badgeVariant = 'success';
  } else if (sentiment === 'Negative') {
    badgeVariant = 'warning';
  }

  return (
    <Theme.Provider theme="twilio">
      <Callout variant='neutral'>
        <CalloutHeading as="h2">Conversation summary</CalloutHeading>
        <CalloutText>{summary}</CalloutText>
        <Badge variant={badgeVariant} as="span">{sentiment}</Badge>
      </Callout>
    </Theme.Provider>
  );
};

export default withTaskContext(ConversationSummaryComponent);