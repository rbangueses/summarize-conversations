//create this serverless function manually by copy pasting the code below through the console gui
// TODO make it protected and use flex token to authenticate
// Note: set the OPENAI_KEY environment variable and add the openai package to the dependencies 
exports.handler = async function ( context, event, callback) {

    const client = context.getTwilioClient();
    const OpenAI  = require("openai");
  
    const openai = new OpenAI({
        apiKey: context.OPENAI_KEY, 
      });
  
    console.log(event)
    // Create a custom Twilio Response
    const response = new Twilio.Response();
    // Set the CORS headers to allow Flex to make an error-free HTTP request
    // to this Function
    response.appendHeader('Access-Control-Allow-Origin', '*');
    response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET');
    response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');
  
    try {
      const messages = await client
        .conversations
        .conversations(event.conversationSid)
        .messages
        .list()
  
      let transcript = messages.reduce(
        (acc, next) => acc + buildNewMessage(event, next),
        '',
      )
  
      const chatCompletion = await openai.chat.completions.create({
          messages: [{ role: 'user', content: `Summarise this chat in one sentence and evaluate the customer sentiment. Please evaluate its sentiment with a single character, either P for very positive sentiment, N for strong negative sentiment and 0 for everything else. Do not provide any details of the extrapolated sentiment within the summary, just a description of what was asked and if/how it was solved or not. Please put this P/0 character before the summary, separated by a space. Please make sure the summary has a maximum of 30 words: \n${transcript}` }],
          model: 'gpt-3.5-turbo',
          max_tokens: 40,
        });
      response.appendHeader('Content-Type', 'application/json');
      response.setBody(chatCompletion);
      // Return a success response using the callback function
      return callback(null, response);
    } catch (e) {
      response.appendHeader('Content-Type', 'application/json');
      response.setBody(e);
      // Return a success response using the callback function
      return callback(null, response);
    }
  }
  
  const buildNewMessage = (event, message) =>
    getAuthorName(event.customerName, message) +
    message.body +
    '\n'
  
  const getAuthorName = (customerName, message) => {
    switch (message.author) {
      case customerName:
        return '[Customer]: '
      default:
        return '[Virtual Agent]: '
    }
  }