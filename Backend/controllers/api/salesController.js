const db = require("../../db/db");

class SalesController {

    async getSalesResultWithoutVat(req, res) {
        const querySales = `SELECT TO_CHAR(DATE_TRUNC('month',td.datecreation),'mm') as month,ROUND(sum(value_sale)::numeric,2) as sale
        FROM tradedocs as td 
        LEFT JOIN tradedocsitems tdi ON td.idxtradedoc = tdi.idxtradedoc
        WHERE td.datecreation>'2021-01-01' AND cntdoctype=3 AND isinsideparentprice=false and td.currencysymbol='EUR'
        GROUP BY DATE_TRUNC('month',td.datecreation)
        ORDER BY month`;

        let sales = await db.query(querySales).catch(console.log);

        res.status(200).json(sales.rows);
    }

    async getSalesResultVat(req, res) {
        const querySales = `SELECT TO_CHAR(DATE_TRUNC('month',td.datecreation),'mm') as month,ROUND(((sum(value_sale)::numeric)*0.2),2) as sale
        FROM tradedocs as td 
        LEFT JOIN tradedocsitems tdi ON td.idxtradedoc = tdi.idxtradedoc
        WHERE td.datecreation>'2021-01-01' AND cntdoctype=3 AND isinsideparentprice=false AND taxrate != 0 and td.currencysymbol='EUR'
        GROUP BY DATE_TRUNC('month',td.datecreation)
        ORDER BY month`;

        let sales = await db.query(querySales).catch(console.log);

        res.status(200).json(sales.rows);
    }
}

module.exports = new SalesController();