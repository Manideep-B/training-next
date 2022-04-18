import nc from "next-connect"
import Order from "../../../models/Order";
import { isAuth } from "../../../utlis/auth";
import db from "../../../utlis/db"

const handler = nc();

handler.use(isAuth);
handler.get(async(req, res) => {
    await db.connect();
    const order = await Order.findById(req.query.id);
    await db.disconnect();
    res.send(order)
})

export default handler;