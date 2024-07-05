import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
	try {
		const token = req.cookies.jwt;

		if (!token) {
			return res.status(401).json({ error: "Não autorizado - Sem token" });
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		if (!decoded) {
			return res.status(401).json({ error: "Não autorizado - Token Invalido" });
		}

		const user = await User.findById(decoded.userId).select("-password");

		if (!user) {
			return res.status(404).json({ error: "Usuário não encontrado" });
		}

		req.user = user;

		next();
	} catch (error) {
		console.log("Erro na verificação: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export default protectRoute;