import { express, Server, cors, SerialPort, ReadlineParser } from './dependencies.js'

const PORT = 5050;

//⚙️ HTTP COMMUNICATION SETUP _________________________________________________
const app = express();
const STATIC_MUPI_DISPLAY = express.static('public-display');
app.use('/mupi-display', STATIC_MUPI_DISPLAY);
app.use(express.json());
//============================================ END

//⚙️ SERIAL COMMUNICATION SETUP -------------------------------------------------
// const protocolConfiguration = { // *New: Defining Serial configurations
//     path: 'COM3', //*Change this COM# or usbmodem#####
//     baudRate: 9600
// };
// const port = new SerialPort(protocolConfiguration);

// //El parser es para desencriptar el mensaje de Arduino
// const parser = port.pipe(new ReadlineParser);
// parser.on('data', (arduinoData) =>{

// })
//============================================ END

//⚙️ WEBSOCKET COMMUNICATION SETUP -------------------------------------------------
const httpServer = app.listen(PORT, () => {
    console.table(
        {
            'Mupi display:' : 'http://localhost:5050/mupi-display',
        }
    )
});
const ioServer = new Server(httpServer, { path: '/real-time' });
//============================================ END



/* 🔄 WEBSOCKET COMMUNICATION __________________________________________

1) Create the socket methods to listen the events and emit a response
It should listen for directions and emit the incoming data.*/

ioServer.on('connection', (socket) => {



});

/* 🔄 HTTP COMMUNICATION ___________________________________________

2) Create an endpoint to POST user score and print it
_____________________________________________ */

app.post('/', (request, response) =>{

})