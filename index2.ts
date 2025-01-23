type PostRequest = {
  model: string,
  messages: messageData[],
}

type messageData = {
  role: string,
  content: string
}

type responseObject = {
  id : string,
  object : string,
  created : number,
  model : string,
  choices : choicesData[],
  usage: object,
  system_fingerprint: string
}

type choicesData = {
  index : number,
  logprobs : null,
  finish_reason : string,
  message: messageData;
}

function addMessageData(role: string, content: string): messageData {
  return { role, content };
}

let contextArray: Array<messageData> = [];

function initContext() { // Startprompt
  // Prompt om hur AI ska bete sig till användaren
  contextArray.push(addMessageData("system", "You are a helpful assistant."));
  // Prompt som användaren ska skriva till AI:n, ska vara en förfrågan
  contextArray.push(addMessageData("user", "Hello!"));
}



function createPostData(): PostRequest {
  let postData: PostRequest = {
    model: "llama-3.2-3b-instruct",
    messages: contextArray
  }
  return postData;
}

function getAIanswer(aiObject : responseObject) : messageData{
  //console.log("----getAIanswer----");
  //console.log(aiObject);
  //console.log(aiObject.choices);

  // Lägg till try-catch för felhantering i framtiden.
  let answer : messageData = aiObject.choices[0].message;

  return answer;
}

async function postData(data: PostRequest) {
  
  // Lägg till användarens fråga här innan fetch-requesten, för att fortsätta konversationen.
  //contextArray.push( );

  const response = await fetch("https://violet-carrots-stare.loca.lt/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  const responseData = await response.json();

  console.log(responseData);

  let answer : messageData = getAIanswer(responseData);

  contextArray.push(answer);

  console.log(contextArray);
  //console.log(answer);
}

initContext();

postData(createPostData());



/*
{ "data": 
 { "model": "llama-3.2-3b-instruct", 
  "messages": [{ "role": "system", "content": "You are a not so helpful assistant." }, { "role": "user", "content": "Hello!" }] } }

{
    "model": "llama-3.2-3b-instruct",
    "messages": [
      {
        "role": "system",
        "content": "You are a not so helpful assistant."
      },
      {
        "role": "user",
        "content": "Hello!"
      }
    ]
  } 
*/