import {fs} from '../dependencies.js';
import firestoreDB from '../firestoreConfig.js';

export const postUserdata = async (req, res) =>{
    try {
    const data = fs.readFileSync('./localCollection/users.json'); 
    const jsonData = JSON.parse(data);
    const user = req.body;
    const submissionDate = new Date();
    const days = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];
    const dayOfSubmission = days[submissionDate.getDay()];
    const jsonUser = {
        id: jsonData.users.length + 1,
        nombre: user.nombre,
        email: user.email,
        celular: user.celular,
        location: user.mupi_location, 
        day: dayOfSubmission,
        hour: `${submissionDate.getHours()}:${submissionDate.getMinutes()}`
    };
    jsonData.users.push(jsonUser);
    await firestoreDB.addNewDocumentTo(jsonUser, 'Leads');
    fs.writeFileSync('./localCollection/users.json', JSON.stringify(jsonData, null, 2)); 
    res.render('final', {user: user});
    res.end();
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding user');
    }
    
}
