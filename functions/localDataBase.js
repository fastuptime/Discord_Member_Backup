function createLocalDB() {
    if (!fs.existsSync("./fast.json")) {
        fs.writeFileSync("./fast.json", "{}");
    }
}

function get(key) {
    createLocalDB();
    let data = JSON.parse(fs.readFileSync("./fast.json"));
    return data[key];
}

function set(key, value) {
    createLocalDB();
    let data = JSON.parse(fs.readFileSync("./fast.json"));
    data[key] = value;
    fs.writeFileSync("./fast.json", JSON.stringify(data));
}

function deleteKey(key) {
    createLocalDB();
    let data = JSON.parse(fs.readFileSync("./fast.json"));
    delete data[key];
    fs.writeFileSync("./fast.json", JSON.stringify(data));
}

const localDB = {
    get,
    set,
    deleteKey
};

module.exports = localDB;