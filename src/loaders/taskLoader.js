// returns the data to be loaded
// in this case mocked data
async function taskLoader(params) {
    const tasks = [
        {id: 1, title: "Pick up Saul", status: "to do"},
        {id: 2, title: "Cook dinner", status: "doing"},
        {id: 3, title: "Exercise", status: "done"}
    ];

    return { tasks };
}


export default taskLoader;