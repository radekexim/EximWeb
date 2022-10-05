const db = require("../../db/db");

class ProductionController {

    async showProductionUnits(req, res) {
        const queryProductionUnits = `SELECT TO_CHAR(DATE_TRUNC('month',eventtime),'mm') as month,ROUND(sum(tradedocsitemselements.quantity)::numeric,2) as units
        FROM productionpacksitems_workflow ppiw 
        LEFT JOIN productionpacksitems ppi 
        ON ppi.idxproductionpackitem = ppiw.idxproductionpackitem
        LEFT JOIN tradedocsitemsunits ON ppi.idxtradedocitemunit = tradedocsitemsunits.idxtradedocitemunit
        LEFT JOIN tradedocsitems ON tradedocsitemsunits.idxtradedocitem = tradedocsitems.idxtradedocitem
        LEFT JOIN tradedocs ON tradedocsitems.idxtradedoc = tradedocs.idxtradedoc
        LEFT JOIN tradedocsitemselements ON tradedocsitemsunits.idxtradedocitem = tradedocsitemselements.idxtradedocitem
        LEFT JOIN stockelements ON tradedocsitemselements.idxstockelement = stockelements.idxstockelement
        WHERE eventtime::date>'2022-01-01' AND idxproductionstation in (8) AND name = 'Jednostka produkcyjna' 
        GROUP BY DATE_TRUNC('month',eventtime)
        ORDER BY month` ;

        let units = await db.query(queryProductionUnits).catch(console.log);

        res.status(200).json(units.rows);
    }

    async showSalesUnits(req, res) {
        const querySalesUnits = `select TO_CHAR(DATE_TRUNC('month',tradedocs.datecreation),'mm') as month,ROUND(sum(tradedocsitemselements.quantity)::numeric,2) as units
        FROM tradedocsitems
        LEFT JOIN tradedocs ON tradedocsitems.idxtradedoc = tradedocs.idxtradedoc
        LEFT JOIN tradedocsitemsunits ON tradedocsitems .idxtradedocitem = tradedocsitemsunits.idxtradedocitem
        LEFT JOIN tradedocsitemselements ON tradedocsitems .idxtradedocitem = tradedocsitemselements.idxtradedocitem
        LEFT JOIN stockelements ON tradedocsitemselements.idxstockelement = stockelements.idxstockelement
        WHERE tradedocs.datecreation>'2022-01-01' AND cntdoctype=3 AND name = 'Jednostka produkcyjna'
        GROUP BY DATE_TRUNC('month',tradedocs.datecreation)
        ORDER BY month` ;

        let units = await db.query(querySalesUnits).catch(console.log);

        res.status(200).json(units.rows);
    }

    async showProdcutionOrders(req, res) {
        const queryProdcutionOrders = `SELECT distinct tradedocid,tradedocitemid,eventtime,ROUND(sum(tradedocsitemselements.quantity)::numeric,2) as units,ne as construction
        FROM productionpacksitems_workflow ppiw 
        LEFT JOIN productionpacksitems ppi 
        ON ppi.idxproductionpackitem = ppiw.idxproductionpackitem
        LEFT JOIN tradedocsitemsunits ON ppi.idxtradedocitemunit = tradedocsitemsunits.idxtradedocitemunit
        LEFT JOIN tradedocsitems ON tradedocsitemsunits.idxtradedocitem = tradedocsitems.idxtradedocitem
        LEFT JOIN tradedocs ON tradedocsitems.idxtradedoc = tradedocs.idxtradedoc
        LEFT JOIN tradedocsitemselements ON tradedocsitemsunits.idxtradedocitem = tradedocsitemselements.idxtradedocitem
        LEFT JOIN stockelements ON tradedocsitemselements.idxstockelement = stockelements.idxstockelement
        WHERE idxproductionstation in (8) AND name = 'Jednostka produkcyjna' 
        GROUP BY tradedocs.tradedocid,tradedocsitems.tradedocitemid,ppiw.eventtime,ne
        ORDER BY eventtime;` ;

        let orders = await db.query(queryProdcutionOrders).catch(console.log);

        res.status(200).json(orders.rows);
    }

    async showLastScans(req, res) {
        const queryLastScans = `SELECT productionstations.ne AS Stanowisko,max(eventtime) AS Skanowanie,tradedocid as Zlecenie ,tradedocitemid as Pozycja,tradedocsitems.ne AS Konstrukcja,tradedocsitemsfiles.file AS Obrazek
        FROM productionpacksitems_workflow ppiw 
        LEFT JOIN productionpacksitems ppi ON ppi.idxproductionpackitem = ppiw.idxproductionpackitem
        LEFT JOIN productionstations ON ppiw.idxproductionstation = productionstations.idxproductionstation
        LEFT JOIN tradedocsitemsunits ON ppi.idxtradedocitemunit = tradedocsitemsunits.idxtradedocitemunit
        LEFT JOIN tradedocsitems ON tradedocsitemsunits.idxtradedocitem = tradedocsitems.idxtradedocitem
        LEFT JOIN tradedocs ON tradedocsitems.idxtradedoc = tradedocs.idxtradedoc
        LEFT JOIN tradedocsitemsfiles ON tradedocsitems.idxtradedocitem = tradedocsitemsfiles.idxtradedocitem
        WHERE symbol='E7' AND eventtime IN (SELECT czas
                           FROM
                            (SELECT productionstations.ne AS Stanowisko,max(eventtime) AS czas
                            FROM productionpacksitems_workflow ppiw 
                            LEFT JOIN productionpacksitems ppi ON ppi.idxproductionpackitem = ppiw.idxproductionpackitem
                            LEFT JOIN productionstations ON ppiw.idxproductionstation = productionstations.idxproductionstation
                            GROUP BY productionstations.ne) AS CZAS)
        GROUP BY productionstations.ne,tradedocsitems.ne,tradedocid,tradedocsitemsfiles.file,tradedocitemid
        ORDER BY Skanowanie DESC;` ;

        let scans = await db.query(queryLastScans).catch(console.log);

        res.status(200).json(scans.rows);
    }
    async showSalesOrders(req, res) {
        const querySaleOrders = `SELECT tradedocid,tradedocitemid,unitnumber,CAST(tradedocs.datecreation as date) as eventtime,ROUND(sum(tradedocsitemselements.quantity)::numeric,2) as units,ne as construction from tradedocsitems 
        LEFT JOIN tradedocs ON tradedocsitems.idxtradedoc = tradedocs.idxtradedoc
        LEFT JOIN tradedocsitemsunits ON tradedocsitems .idxtradedocitem = tradedocsitemsunits.idxtradedocitem
        LEFT JOIN tradedocsitemselements ON tradedocsitems .idxtradedocitem = tradedocsitemselements.idxtradedocitem
        LEFT JOIN stockelements ON tradedocsitemselements.idxstockelement = stockelements.idxstockelement
        WHERE cntdoctype=3 AND name = 'Jednostka produkcyjna'
        GROUP BY CAST(tradedocs.datecreation as date),tradedocid,tradedocitemid,ne,unitnumber
        ORDER BY eventtime;` ;

        let orders = await db.query(querySaleOrders).catch(console.log);

        res.status(200).json(orders.rows);
    }
}

module.exports = new ProductionController();