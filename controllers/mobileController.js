import {fs} from '../dependencies.js';

export const postUserdata = (req, res) =>{
    try {
    const data = fs.readFileSync('./localCollection/users.json'); 
    const jsonData = JSON.parse(data);
    const user = req.body;
    const jsonUser = {
        id: jsonData.users.length + 1,
        nombre: user.nombre,
        email: user.email,
        celular: user.celular 
    };
    jsonData.users.push(jsonUser);
    console.log(jsonData);
    fs.writeFileSync('./localCollection/users.json', JSON.stringify(jsonData, null, 2)); 
    res.render('final', {user: user});
    res.end();
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding user');
    }
    
}
