Twilio Flex Plugin - summarizes conversations using OpenAI

![How does it look](https://github.com/rbangueses/summarize-conversations/blob/main/image.png?raw=true)

2 components:
- a Twilio Plugin
- a serverless function

How does it work? when a task is accepted by an agent, if it has a conversationSid we send the transcript of the conversation to openai to generate a transcript and sentiment of the conversation. 


Make sure you point the request to the address of your function on the axios request on ConversationSummaryComponent.tsx 

Will only attempt to summarize conversations, not calls. 

To disable this we can set a task.attribute.noAI to true for example

TODOs 
- add summaries to calls handed over by a voice bot. 
- add environment variables for things like the serverless address
- come up with a better way to turn it off/on

