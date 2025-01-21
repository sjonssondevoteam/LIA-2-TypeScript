type ModelData = {
    id : string,
    object : string,
    owned_by : string
}

type ModelResponse = {
    data : ModelData[],
    object : string
}

async function fetchURL() {

    let request = await fetch("https://smart-feet-rest.loca.lt")
    let response = await request.json();

    console.log(response);
};

fetchURL();

/* 
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