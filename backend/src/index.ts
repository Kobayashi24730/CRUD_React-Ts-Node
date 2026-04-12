import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/controllersRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.get("/api", router);

app.listen(PORT || 5000, () => {
    console.log(`Servidor rodando na porta ${PORT || 5000}`);
});