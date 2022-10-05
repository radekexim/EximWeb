const db = require("../../db/db");

class OrderController {

    async showOrders(req, res) {
        const queryOrders = `SELECT distinct tradedocid,(SELECT tradedocid from tradedocs where idxtradedoc=td.idxtradedoc_linked) as offerid,DATE(td.datecreation),clients.ne,reference,td.addressdelivery,string_agg(distinct profilecolors.ne,',') as colors,
        ROUND(get_order_scanning_progress(td.idxtradedoc,idxproductionpack)) as progress,
        (SELECT distinct DATE(data_datetime) 
            FROM tradedoccustomfieldsintradedocs 
            WHERE td.idxtradedoc = tradedoccustomfieldsintradedocs.idxtradedoc AND idxtradedoccustomfield = 14) as date_delivery,
         cntorderstatus,pps.ne as status,weeknumber_realization,users.ne as users,
        (SELECT DISTINCT ROUND(sum(value_sale)::numeric,2) FROM tradedocs 
            LEFT JOIN tradedocsitems ON tradedocsitems.idxtradedoc = tradedocs.idxtradedoc
            WHERE tradedocid=td.tradedocid AND cntdoctype=3 AND isinsideparentprice=false
            GROUP BY tradedocid) as value_sale,datestartingproduction
FROM tradedocs as td LEFT JOIN clients ON td.idxclient = clients.idxclient
LEFT JOIN tradedocsitems tdi ON td.idxtradedoc = tdi.idxtradedoc
LEFT JOIN profilecolors ON tdi.idxprofilecolor = profilecolors.idxprofilecolor
LEFT JOIN tradedocsitemsunits ON tdi.idxtradedocitem = tradedocsitemsunits.idxtradedocitem
LEFT JOIN productionpacksitems ON tradedocsitemsunits.idxtradedocitemunit = productionpacksitems.idxtradedocitemunit
LEFT JOIN productionpackstatuses as pps ON td.cntorderstatus = pps.idxproductionpackstatus
LEFT JOIN users ON td.idxuser_master = users.idxuser
WHERE td.datecreation>'2021-10-21' AND cntdoctype=3 AND cnttradedocitem=1
GROUP BY clients.ne,td.idxtradedoc,idxproductionpack,pps.ne,users.ne
ORDER BY DATE(td.datecreation) DESC, tradedocid DESC` ;

        let orders = await db.query(queryOrders).catch(console.log);

        res.status(200).json(orders.rows);
    }

    async showOrder(req, res) {
        const id = req.query.id
        const param = [id];
        const queryOrders = `SELECT DISTINCT td.idxtradedoc as id,tradedocid as Zlecenie,tradedocitemid as Pozycja,tdi.ne as Konstrukcja,quantity as Sztuki,clients.ne as Klient,td.datecreation as Data_utworzenia,reference,tdi.dscr as Opis,area as Powierzchnia,weight as Waga,perimeter as Metry,profilecolors.ne as Kolor,
        tdif.file AS Obrazek,ucoefficient as Uw,swcoefficient as Sw,
(SELECT count(eventtime) FROM productionpacksitems_workflow as ppiw2 
LEFT JOIN productionpacksitems as ppi2 ON ppiw2.idxproductionpackitem = ppi2.idxproductionpackitem
LEFT JOIN tradedocsitemsunits as tdiu2 ON tdiu2.idxtradedocitemunit = ppi2.idxtradedocitemunit
LEFT JOIN tradedocsitems as tdi2 ON tdi2.idxtradedocitem = tdiu2.idxtradedocitem
WHERE tdi2.idxtradedocitem=tdi.idxtradedocitem AND idxproductionstation=8) as skany,
(
SELECT SUM(skan) as positionprogress FROM
(SELECT MAX(ps.numbertoscanningprogress) as skan FROM productionpacksitems_workflow as ppiw2 
LEFT JOIN productionpacksitems as ppi2 ON ppiw2.idxproductionpackitem = ppi2.idxproductionpackitem
LEFT JOIN tradedocsitemsunits as tdiu2 ON tdiu2.idxtradedocitemunit = ppi2.idxtradedocitemunit
LEFT JOIN tradedocsitems as tdi2 ON tdi2.idxtradedocitem = tdiu2.idxtradedocitem
LEFT JOIN productionstations as ps ON ps.idxproductionstation = ppiw2.idxproductionstation
WHERE tdi2.idxtradedocitem=tdi.idxtradedocitem
GROUP BY tdiu2.idxtradedocitemunit) as Tab
) as progress
        FROM tradedocs as td
        LEFT JOIN tradedocsitems as tdi ON td.idxtradedoc = tdi.idxtradedoc
        LEFT JOIN projects ON projects.idxtradedocitem =  tdi.idxtradedocitem
        LEFT JOIN tradedocsitemsunits as tdiu ON tdi.idxtradedocitem = tdiu.idxtradedocitem
        LEFT JOIN productionpacksitems as ppi ON ppi.idxtradedocitemunit = tdiu.idxtradedocitemunit
        LEFT JOIN tradedocsitemsfiles as tdif ON tdi.idxtradedocitem = tdif.idxtradedocitem
        LEFT JOIN profilecolors ON tdi.idxprofilecolor = profilecolors.idxprofilecolor
        LEFT JOIN clients ON td.idxclient = clients.idxclient
        WHERE tradedocid=$1 AND cntdoctype=3 AND cnttradedocitem=1 AND tdif.symbol='E7'
        ORDER BY tradedocitemid` ;

        let order = await db.query(queryOrders, param).catch(console.log);

        res.status(200).json(order.rows);
    }

    async getInformationTransportOrders(req, res) {
        const orders = req.body.orders;
        let params = [];
        for (var i = 1; i <= orders.length; i++) {
            params.push('$' + i);
        }

        const queryOrders = `SELECT DISTINCT tradedocid as Zlecenie,tradedocitemid as Pozycja,tdi.ne as Konstrukcja,quantity as Sztuki,
        (
        SELECT SUM(skan) as positionprogress FROM
        (SELECT MAX(ps.numbertoscanningprogress) as skan FROM productionpacksitems_workflow as ppiw2 
        LEFT JOIN productionpacksitems as ppi2 ON ppiw2.idxproductionpackitem = ppi2.idxproductionpackitem
        LEFT JOIN tradedocsitemsunits as tdiu2 ON tdiu2.idxtradedocitemunit = ppi2.idxtradedocitemunit
        LEFT JOIN tradedocsitems as tdi2 ON tdi2.idxtradedocitem = tdiu2.idxtradedocitem
        LEFT JOIN productionstations as ps ON ps.idxproductionstation = ppiw2.idxproductionstation
        WHERE tdi2.idxtradedocitem=tdi.idxtradedocitem
        GROUP BY tdiu2.idxtradedocitemunit) as Tab
        ) as progress
                FROM tradedocs as td
                LEFT JOIN tradedocsitems as tdi ON td.idxtradedoc = tdi.idxtradedoc
                LEFT JOIN projects ON projects.idxtradedocitem =  tdi.idxtradedocitem
                LEFT JOIN tradedocsitemsunits as tdiu ON tdi.idxtradedocitem = tdiu.idxtradedocitem
                LEFT JOIN productionpacksitems as ppi ON ppi.idxtradedocitemunit = tdiu.idxtradedocitemunit
                LEFT JOIN tradedocsitemsfiles as tdif ON tdi.idxtradedocitem = tdif.idxtradedocitem
                LEFT JOIN profilecolors ON tdi.idxprofilecolor = profilecolors.idxprofilecolor
                LEFT JOIN clients ON td.idxclient = clients.idxclient
                WHERE tradedocid IN(` + params.join(',') + `) AND cntdoctype=3 AND cnttradedocitem=1 AND tdif.symbol='E7'
                ORDER BY tradedocid,tradedocitemid` ;

        try {
            let responseOrders = await db.query(queryOrders, orders).catch(console.log);
            res.status(200).json(responseOrders.rows);
        } catch (ex) {
            console.log(ex.toString());
        }
    }

}

module.exports = new OrderController();