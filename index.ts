type ModelData = {
    id : string,
    object : string,
    owned_by : string
}

type ModelResponse = {
    data : ModelData[],
    object : string
}

async function fetchURL () {

    let request = await fetch("https://small-pens-warn.loca.lt/v1/models")
    let response : ModelResponse = await request.json();

    console.log(response.data[0]);
};

fetchURL();

