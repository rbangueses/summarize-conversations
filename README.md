Twilio Flex Plugin - summarizes conversations using OpenAI

![How does it look](https://github.com/rbangueses/summarize-conversations/blob/main/image.png?raw=true)

2 components:
- a Twilio Plugin
- a serverless function

How does it work? when a task is accepted by an agent, if it has a conversationSid we send the transcript of the conversation to OpenAI to generate a transcript and give us a sentiment of the conversation. 

The serverless function receives a conversation sid, fetches the transcript and then sends it to OpenAI to summarize the conversation. The prompt is defined on the function, where by default we ask OpenAI to summarize the conversation and tell us the sentiment of that conversation by prepending a single letter:
 P for Positive 
 0 for Neutral 
 N for negative

Note: you need to deploy the serverless function manually. Make sure you set the OPENAI_KEY environment variable and add the openai and twilio-flex-token-validator packages to the dependencies.

After deploying the function, make sure you point the request to the address of your function on .env file.

This plugin will only attempt to summarize conversations, not calls. 

To disable this functionality, when we send a task to Flex via Studio we can set a task.attribute.noAI to true.

TODOs 
- add summaries to calls handed over by a voice bot. 
- come up with a better way to turn it off/on.

