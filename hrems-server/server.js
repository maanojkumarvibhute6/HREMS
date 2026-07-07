import app from "./app.js";
import { mongodb_server } from "./config/db.config.js";

// Port Settings
const PORT = process.env.PORT || 3000;

// MongoDb Connection
mongodb_server();

// Starting node server
app.listen(PORT, () => {
    console.log(`Success: Node server listening on http://localhost:${PORT}`);
    
})