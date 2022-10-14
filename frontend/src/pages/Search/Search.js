import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import axios from '../../axios'
import LoadingIcon from '../../components/UI/Elements/LoadingIcon'
import { objectToArrayWithId } from '../../helpers/objectOrders'
import Orders from '../HomeOrders/components/Orders'

export default function Search() {
  const [searchparams] = useSearchParams()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const search = async () => {
    try {
      const res = await axios.get('/orders')
      const newOrders = objectToArrayWithId(res.data).filter((order) =>
        order.tradedocid.includes(searchparams.get('id')),
      )

      setOrders(newOrders)
    } catch (ex) {
      console.log(ex.response)
    }
    setLoading(false)
  }

  useEffect(() => {
    search()
  }, [searchparams])

  return loading ? (
    <LoadingIcon />
  ) : (
    <>
      <Orders orders={orders} reload={() => search()} />
    </>
  )
}
