import { express } from "../dependencies.js";
import { postUserdata } from "../controllers/mobileController.js";

const router = express.Router();

router.post('/', postUserdata);

export default router;