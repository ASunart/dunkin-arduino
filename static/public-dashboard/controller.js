const controller = (view) => {
    view.render();

    (async function getDashboardData(){
        const request = await fetch(`${URL}/dashboard`);
        const data = await request.json();
        console.log(data);
        view.updateTable(data);
    })();
}

let view = new View();
controller(view);