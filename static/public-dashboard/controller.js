const controller = (view) => {

    (async function getDashboardData(){
        const request = await fetch(`${URL}/dashboard`);
        const data = await request.json();
        kpi = data;
        console.log(kpi)
        //Update Leads Table
        view.updateTable(kpi.users);
        //Update Interactions Per Place Chart
        view.updateLocationDoughnut([kpi.interactionsPerPlace.Unicentro, kpi.interactionsPerPlace["Jardín Plaza"]]);
        //Update visits by day per place chart
        view.updateBarChart(
        [kpi.visitsByDay[1]["Jardín Plaza"], kpi.visitsByDay[2]["Jardín Plaza"], kpi.visitsByDay[3]["Jardín Plaza"],
        kpi.visitsByDay[4]["Jardín Plaza"], kpi.visitsByDay[5]["Jardín Plaza"], kpi.visitsByDay[6]["Jardín Plaza"], kpi.visitsByDay[0]["Jardín Plaza"]],

        [kpi.visitsByDay[1].Unicentro, kpi.visitsByDay[2].Unicentro, kpi.visitsByDay[3].Unicentro,
         kpi.visitsByDay[4].Unicentro, kpi.visitsByDay[5].Unicentro, kpi.visitsByDay[6].Unicentro], kpi.visitsByDay[0].Unicentro, )
    })();

    view.render();
}

let view = new View();
controller(view);
