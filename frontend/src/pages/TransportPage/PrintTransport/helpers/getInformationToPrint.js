import axios from '../../../../axios'

const constructions = [
    { id: 1, name: 'Okna', value: '110', units: 0 },
    { id: 2, name: 'Balkony', value: '120', units: 0 },
    { id: 3, name: 'Drzwi wejściowe', value: '130', units: 0 },
    { id: 4, name: 'Drzwi serwisowe', value: '140', units: 0 },
    { id: 5, name: 'Patia', value: '150', units: 0 },
    { id: 6, name: 'Multi', value: '160', units: 0 },
    { id: 7, name: 'HST', value: '170', units: 0 },
    { id: 8, name: 'FIX', value: '180', units: 0 },
    { id: 9, name: 'Rolety', value: '109', units: 0 },
    { id: 9, name: 'Szyby', value: '108', units: 0 },
];

export const getInformationToPrint = async (transportData, id) => {
    const ordersTable = transportData.find((transport) => transport.id === id);
    const constructionsInOrders = [];
    try {
        const response = await axios.post('/getInformationTransport', { orders: ordersTable.transportOrders });
        const orders = response.data;
        ordersTable.transportOrders.forEach((order) => {
            const newOrder = orders.filter((el) => el.zlecenie === order)
            const projects = []
            let projectString = ""
            let notFinishConstructions = [];
            for (const key in constructions) {
                let countConstruction = newOrder.filter((el) => el.konstrukcja.includes(constructions[key].value))
                    .reduce((sum, a) => sum + a.sztuki, 0);
                if (countConstruction !== 0) {
                    projectString += countConstruction + " " + constructions[key].name + " ";
                    projects.push({ id: constructions[key].id, name: constructions[key].name, value: countConstruction })
                }
            }

            newOrder.forEach((position) => {
                let progressToFinish = position.sztuki * 11;
                let name = constructions.filter(el => el.value === position.konstrukcja.slice(0, 3))[0].name
                if (position.progress < progressToFinish && !position.konstrukcja.includes('109') && !position.konstrukcja.includes('108')) {
                    notFinishConstructions.push({ id: position.pozycja, name: name, value: position.sztuki - (position.progress / 11).toString().slice(0, 1) });
                }
            })
            constructionsInOrders.push({ id: order, constructions: projects, projectString: projectString, notFinishConstructions: notFinishConstructions })
        })

    } catch (ex) {
        console.log(ex.response.data);
    }

    let rows = [];
    ordersTable.ordersData.forEach((client) => {
        let newordersClient = [];
        client.orders.forEach((order) => {
            newordersClient.push(order.tradedocid)
        })
        let address = client.orders.map(order => order.addressdelivery).filter((v, i, a) => a.indexOf(v) === i)
        rows.push({
            id: client.id,
            place: address.join(),
            client: client.client,
            orders: newordersClient.join(),
            palets: client.id
        })
    })

    return {
        transport: ordersTable.name,
        date: ordersTable.date_delivery,
        rows: rows,
        constructions: constructionsInOrders
    }

}