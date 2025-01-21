type PostRequest = {
    model: string,
    messages: messageData[],
}

type messageData = {
    role: string,
    content: string
}

function createMessageData(role: string, content: string): messageData {
    return { role, content };
}

function createPostData(): PostRequest {
    let postData: PostRequest = {
        model: "",
        messages: []
    };
    postData.model = "llama-3.2-3b-instruct";

    // Prompt om hur AI ska bete sig till användaren
    postData.messages.push(createMessageData("system", "You are a helpful assistant."));

    // Prompt som användaren ska skriva till AI:n, ska vara en förfrågan
    postData.messages.push(createMessageData("user", "Hello!"));

    return postData;
}


async function postData(data: PostRequest) {
    console.log("------------------")

    //console.log(JSON.stringify(data));
    console.log(data.messages[1].role + ": " + data.messages[1].content)

    const response = await fetch("https://curly-sloths-raise.loca.lt/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    const responseData = await response.json();

    console.log("---------")

    const dataArray = responseData.choices;

    dataArray.forEach((element: any) => {

        console.log(element.message.role + ": " + element.message.content ,"\n");
        
    });



}

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