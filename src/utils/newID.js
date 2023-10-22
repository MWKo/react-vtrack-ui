let lastId = 0;

const newID = (prefix = "id") => {
    lastId++;
    return `${prefix}${lastId}`;
}

export default newID;