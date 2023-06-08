const URL = `http://${window.location.hostname}:5050`;
let socket = io(URL, { path: '/real-time' });

const controller = (view, socket) => {

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

        view.updateLineChart(
            [kpi.visitsByHour["7am-9am"]["Jardín Plaza"], kpi.visitsByHour["9am-11am"]["Jardín Plaza"], kpi.visitsByHour["11am-1pm"]["Jardín Plaza"],
            kpi.visitsByHour["1pm-3pm"]["Jardín Plaza"], kpi.visitsByHour["3pm-5pm"]["Jardín Plaza"], kpi.visitsByHour["5pm-7pm"]["Jardín Plaza"], kpi.visitsByHour["7pm-9pm"]["Jardín Plaza"], 
            kpi.visitsByHour["9pm-11pm"]["Jardín Plaza"] ],
    
            [kpi.visitsByHour["7am-9am"].Unicentro, kpi.visitsByHour["9am-11am"].Unicentro, kpi.visitsByHour["11am-1pm"].Unicentro,
             kpi.visitsByHour["1pm-3pm"].Unicentro, kpi.visitsByHour["3pm-5pm"].Unicentro, kpi.visitsByHour["5pm-7pm"].Unicentro, kpi.visitsByHour["7pm-9pm"].Unicentro, kpi.visitsByHour["9pm-11pm"].Unicentro])

        view.updateGoalsDoughnut([kpi.users.length, 100]);
    })();

    const updateRealTime = async () =>{
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

        view.updateLineChart(
            [kpi.visitsByHour["7am-9am"]["Jardín Plaza"], kpi.visitsByHour["9am-11am"]["Jardín Plaza"], kpi.visitsByHour["11am-1pm"]["Jardín Plaza"],
            kpi.visitsByHour["1pm-3pm"]["Jardín Plaza"], kpi.visitsByHour["3pm-5pm"]["Jardín Plaza"], kpi.visitsByHour["5pm-7pm"]["Jardín Plaza"], kpi.visitsByHour["7pm-9pm"]["Jardín Plaza"], 
            kpi.visitsByHour["9pm-11pm"]["Jardín Plaza"] ],
    
            [kpi.visitsByHour["7am-9am"].Unicentro, kpi.visitsByHour["9am-11am"].Unicentro, kpi.visitsByHour["11am-1pm"].Unicentro,
             kpi.visitsByHour["1pm-3pm"].Unicentro, kpi.visitsByHour["3pm-5pm"].Unicentro, kpi.visitsByHour["5pm-7pm"].Unicentro], kpi.visitsByHour["7pm-9pm"].Unicentro,
             kpi.visitsByHour["9pm-11pm"].Unicentro )

        view.updateGoalsDoughnut([kpi.users.length, 100]);
    }

    socket.on('real-time-update', (data) =>{
        updateRealTime();
    })

    view.render();
}

let view = new View();
controller(view, socket);
