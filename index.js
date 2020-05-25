const text = document.getElementById("text");
const body = document.querySelector(".value");
const btn = document.getElementById("btn");

let chain_data = [];

const hash_converter = () => {
    const data = text.value;
    if (data !== "") {
        let previous_hash = chain_data[chain_data.length - 1].hash;
        blocks(data, previous_hash);
        text.value = "";
    }
};

const genesis_block = () => {
    let data = text.value;
    if (data !== "") {
        console.log("The genesisi block");
        const date = new Date();
        const hash = sha256(data + date);
        generate_tags(data, date, hash);
        chain_data.push({
            data,
            date,
            hash,
        });
        console.log(chain_data);
        text.value = "";
    }
};

const blocks = (data, prevhash = null) => {
    const date = new Date();
    const hash = sha256(data + date);
    generate_tags(data, date, hash, prevhash);
    chain_data.push({
        data,
        date,
        hash,
        prevhash,
    });
};

const generate_tags = (data, date, hash, prevhash = null) => {
    const val = document.createElement("ul");
    val.className = "list-groups";
    const li1 = document.createElement("li");
    const li2 = document.createElement("li");
    const li3 = document.createElement("li");
    const li4 = document.createElement("li");
    let list_array = [li1, li2, li3, li4];
    list_array.map(r => r.className = "list-group-item");
    li1.innerText = "Date : " + data;
    li2.innerText = "Creation Date : " + date;
    li3.innerText = "Hash : " + hash;
    prevhash === null ?
        (li4.innerText = "No Previous Hash") :
        (li4.innerText = "Previous Hash : " + prevhash);
    list_array.map(r => val.appendChild(r));
    body.appendChild(val);
};

// Event Listener
btn.addEventListener("click", genesis_block, {
    once: true,
});
btn.addEventListener("click", hash_converter);