import mongoose from "mongoose";

const connectToMongoDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_DB_URI);
		console.log("Conectado ao banco de dados");
	} catch (error) {
		console.log("Erro ao se conectar com o banco de dados", error.message);
	}
};

export default connectToMongoDB;