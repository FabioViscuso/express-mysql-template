/* Add .env support */
import "dotenv/config"

/* Import the server code */
import app from "./server"

/* Import config file */
import config from "./config";

/* Launch the server on specified PORT and print a log */
const PORT = config["PORT"];
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
