/* Add .env support */
import "dotenv/config"

/* Import the server code */
import app from "./server"

/* Launch the server on specified PORT and print a log */
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
