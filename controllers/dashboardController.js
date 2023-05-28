import { fs } from "../dependencies.js";

export const getData = (req,res) =>{
    try {
        const usersJSONData = fs.readFileSync('./localCollection/users.json');

        const {users} = JSON.parse(usersJSONData);

        res.send(users);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error reading JSON data');
    }
}