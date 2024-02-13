Twilio Flex Plugin - summarizes conversations using OpenAI

2 components:
- a Twilio Plugin
- a serverless function

How does it work? when a task is accepted by an agent, if it has a conversationSid we send the transcript of the conversation to openai to generate a transcript and sentiment of the conversation. 

Make sure you edit the address of your function on the axios request 

Will only attempt to summarize conversations, not calls. 

TODOs 
- add summaries to calls handed over by a voice bot. 
- add environment variables for things like the serverless address

