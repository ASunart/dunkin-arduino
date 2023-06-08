import { fs } from "../dependencies.js";
import * as KPI from './kpiCalculations.js';

export const getData = (req,res) =>{
    try {
        const usersJSONData = fs.readFileSync('./localCollection/users.json');

        const {users} = JSON.parse(usersJSONData);

        const interactionsPerPlace = KPI.getPlacePopularity(users);
        const visitsByDay = KPI.getPlacePopularityByDay(users);
        const visitsByHour = KPI.getPlacePopularityByInterval(users);

        const dashboardData = {interactionsPerPlace, visitsByDay, visitsByHour, users};

        res.send(dashboardData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error reading JSON data');
    }
}