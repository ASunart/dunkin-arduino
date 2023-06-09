//Import dependencies
import { express, Server, cors, SerialPort, ReadlineParser, dotenv } from './dependencies.js'
import mobileRoutes from './routes/mobileRoutes.js'
import dashboardRoutes from './routes/dashboardRoutes.js';
import firestoreDB from './firestoreConfig.js';
const PORT = 5050;
dotenv.config();


//⚙️ HTTP COMMUNICATION SETUP _________________________________________________
const app = express();
//Static
const STATIC_MUPI_DISPLAY = express.static('./static/public-display');
const STATIC_MOBILE = express.static('./static/public-mobile');
const STATIC_DASHBOARD = express.static('./static/public-dashboard');
//Middlewares
app.use(express.json());
app.use(cors({origin: "*"}));
app.use(express.urlencoded({extended: true}));
app.use(express.static('./static/public-mobile'));

//Endpoints
app.use('/mupi-display', STATIC_MUPI_DISPLAY);
app.use('/mobile', STATIC_MOBILE);
app.use('/dashboard-app', STATIC_DASHBOARD);
app.use('/user-data', mobileRoutes);
app.use('/dashboard', dashboardRoutes);
app.set('view engine', 'ejs');
app.set('views', './static/public-mobile');

//============================================ END

//⚙️ SERIAL COMMUNICATION SETUP -------------------------------------------------
// const protocolConfiguration = { // *New: Defining Serial configurations
//     path: '/dev/cu.usbmodem14101', //*Change this COM# or usbmodem#####
//     baudRate: 9600
// };
// const port = new SerialPort(protocolConfiguration);

// //El parser es para desencriptar el mensaje de Arduino
// const parser = port.pipe(new ReadlineParser);

// //Listen to arduino messages
// parser.on('data', (arduinoData) =>{
    
//     //Organizing an array of the arduino message to use it for the interaction
//     let dataArray = arduinoData.split(" ");
//     let controlStatus = {
//         x: dataArray[1],
//         y: dataArray[3],
//         button: dataArray[5]
//     }
//     //Emit arduino message
//     ioServer.emit('controlStatus', controlStatus);
// })
//============================================ END

//⚙️ WEBSOCKET COMMUNICATION SETUP -------------------------------------------------
const httpServer = app.listen(PORT, () => {
    console.table(
        {
            'Mupi display:' : 'http://localhost:5050/mupi-display',
            'Mobile:' : 'http://localhost:5050/mobile',
            'Dashboard app:' : 'http://localhost:5050/dashboard-app'
        }
    )
});
const ioServer = new Server(httpServer, { path: '/real-time' });
//============================================ END



/* 🔄 WEBSOCKET COMMUNICATION __________________________________________

1) Create the socket methods to listen the events and emit a response.*/

ioServer.on('connection', (socket) => {

    socket.on('point', message => {
        //Send message to arduino
        // port.write(message);
    })

    socket.on('mobile-form', mobile =>{
        //Listen mobile screen changes
        socket.broadcast.emit('screen-change', mobile);
    })

});

export {ioServer};

/* 🔄 HTTP COMMUNICATION ___________________________________________
*/

//User final score variable
let userFinalScore = 0;


//Receive points obtain by user in game and store them in user final score variable
app.post('/score', (request, response) =>{
    let userPoints = request.body;
    userFinalScore = userPoints.content;
})

//Send final score to endpoint to print it on mupi screen
app.get('/final-score', (request, response) =>{
    let message = {content: userFinalScore}
    response.send(message);
    response.end();
})