/* Import config file */
import config from "./config";

/* Import the server code */
import app from "./server"

/* Launch the server on specified PORT and print a log */
app.listen(config["PORT"], () => console.log(`Server running on port ${config["PORT"]}`));
