import { express, Server, cors, SerialPort, ReadlineParser } from './dependencies.js'
const PORT = 5050;



//⚙️ HTTP COMMUNICATION SETUP _________________________________________________
const app = express();
const STATIC_MUPI_DISPLAY = express.static('public-display');
const STATIC_MOBILE= express.static('public-mobile');
app.use('/mupi-display', STATIC_MUPI_DISPLAY);
app.use('/mobile', STATIC_MOBILE);
app.use(express.json());
app.use(cors({origin: "*"}));
app.use(express.urlencoded({extended: true}));
app.use(express.static('./public-mobile'));
app.set('view engine', 'ejs');
app.set('views', 'public-mobile');

//============================================ END

//⚙️ SERIAL COMMUNICATION SETUP -------------------------------------------------
const protocolConfiguration = { // *New: Defining Serial configurations
    path: 'COM3', //*Change this COM# or usbmodem#####
    baudRate: 9600
};
const port = new SerialPort(protocolConfiguration);

//El parser es para desencriptar el mensaje de Arduino
const parser = port.pipe(new ReadlineParser);
parser.on('data', (arduinoData) =>{
    
    let dataArray = arduinoData.split(" ");
    let controlStatus = {
        x: dataArray[1],
        y: dataArray[3],
        button: dataArray[5]
    }
    //console.log(controlStatus);
    ioServer.emit('controlStatus', controlStatus);
})
//============================================ END

//⚙️ WEBSOCKET COMMUNICATION SETUP -------------------------------------------------
const httpServer = app.listen(PORT, () => {
    console.table(
        {
            'Mupi display:' : 'http://localhost:5050/mupi-display',
            'Mobile:' : 'http://localhost:5050/mobile'
        }
    )
});
const ioServer = new Server(httpServer, { path: '/real-time' });
//============================================ END



/* 🔄 WEBSOCKET COMMUNICATION __________________________________________

1) Create the socket methods to listen the events and emit a response
It should listen for directions and emit the incoming data.*/

ioServer.on('connection', (socket) => {

    socket.on('point', message => {
        port.write(message);
    })

    socket.on('mobile-form', mobile =>{
        socket.broadcast.emit('screen-change', mobile);
    })

});

/* 🔄 HTTP COMMUNICATION ___________________________________________

2) Create an endpoint to POST user score and print it
_____________________________________________ */

let userFinalScore = 0;

const users =  [];

app.post('/user-data', (request, response) =>{
    const user = request.body;
    users.push(user);
    console.log(users);
    response.render('final', {user: user});
    response.end();
})

app.post('/score', (request, response) =>{
    let userPoints = request.body;
    userFinalScore = userPoints.content;
})

app.get('/final-score', (request, response) =>{
    let message = {content: userFinalScore}
    response.send(message);
    response.end();
})