const db = require("../../db/authDb");

class TransportController {

    async ShowTransports(req, res) {
        const queryTransports = `SELECT * FROM transports`;
        const queryTransportsOrders = `SELECT * FROM transportorders`;

        let transports = await db.query(queryTransports).catch(console.log);
        let transportsOrders = await db.query(queryTransportsOrders).catch(console.log);
        transports.rows.map(row => {
            let orders = transportsOrders.rows.filter(order => order.transportid === row.id).map(order => order.orderid);
            row.transportOrders = orders
        })

        res.status(200).json(transports.rows);
    }

    async AddTransport(req, res) {
        try {
            const date = req.body.date;
            const name = req.body.name;
            const supplier = req.body.supplier;
            const truck = req.body.truck;
            const costDelivery = req.body.costDelivery;
            const marginDelivery = req.body.marginDelivery;
            const saleTotal = req.body.saleTotal;
            const paramTransport = [
                date,
                name,
                supplier,
                truck,
                costDelivery,
                saleTotal,
                marginDelivery
            ]
            const queryTransport = `INSERT INTO transports(date_delivery,name,supplier,car,cost_delivery,totalsale,margin_delivery) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id`;
            let resultTransport = await db.query(queryTransport, paramTransport).catch(console.log);

            req.body.transportOrders.map(async order => {
                const paramOrders = [order.tradedocid, resultTransport.rows[0].id]
                const queryTransportOrders = `INSERT INTO transportorders(orderid,transportid) VALUES ($1,$2) `;
                let resultOrders = await db.query(queryTransportOrders, paramOrders).catch(console.log);
            })

            if (!resultTransport.rowCount) {
                res.sendStatus(401);
            } else {
                res.status(200).json(resultTransport)
            }
        } catch (ex) {
            console.log(ex.toString());
        }
    }
}

module.exports = new TransportController();