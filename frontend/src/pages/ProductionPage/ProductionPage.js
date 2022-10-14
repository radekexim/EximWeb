import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { Box, Card } from '@mui/material'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Tab from '@mui/material/Tab'

import { ForecastCard } from '../../components/UI/Cards/ForecastCard'
import { TasksProgressCard } from '../../components/UI/Cards/TaskProgressCard'
import { TotalCard } from '../../components/UI/Cards/TotalCard'
import { TotalUnitsCard } from '../../components/UI/Cards/TotalUnitsCard'
import { ColumnCharts } from '../../components/UI/Charts/ColumnCharts'
import { RoundCharts } from '../../components/UI/Charts/RoundCharts'
import RefreshPage from '../../components/UI/Elements/RefreshPage'
import SelectList from '../../components/UI/Elements/SelectList'
import { ConstructionTable } from '../../components/UI/Tables/ConstructionTable'
import { MaterialTable } from '../../components/UI/Tables/MaterialTable'
import { filterTableByMonthAndConstr } from '../../helpers/filterTableByMonthAndConstr'
import { fetchData, selectAll } from './productionSlice'

const constructions = [
  { id: 1, name: 'Okna', value: '110', units: 0 },
  { id: 2, name: 'Balkony', value: '120', units: 0 },
  { id: 3, name: 'Drzwi wejściowe', value: '130', units: 0 },
  { id: 4, name: 'Drzwi serwisowe', value: '140', units: 0 },
  { id: 5, name: 'Patia', value: '150', units: 0 },
  { id: 6, name: 'Multi', value: '160', units: 0 },
  { id: 7, name: 'HST', value: '170', units: 0 },
  { id: 8, name: 'FIX', value: '180', units: 0 },
]

export default function ProductionCharts() {
  const [value, setValue] = useState('1')

  const [bonusUnits, setbonusUnits] = useState([])
  const [constructionsCount, setconstructionCount] = useState(constructions)
  const [constructionsSalesCount, setconstructionSalesCount] = useState(constructions)

  const dispatch = useDispatch()
  const {
    productionUnits,
    salesUnits,
    totalSales,
    productionOrders,
    salesOrders,
    forecast,
    lastScans,
    goal,
    month,
    status,
    error,
  } = useSelector(selectAll)

  const countBonusUnits = (units, currentGoal) => {
    const arr = []
    units.forEach((item) => {
      let bonus = (item.units - currentGoal).toFixed(2)
      arr.push(bonus)
    })
    return arr
  }

  const tabChange = (event, newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchData())
    }
  }, [status, dispatch])

  useEffect(() => {
    setconstructionCount(filterTableByMonthAndConstr(constructions, productionOrders, month))
  }, [productionOrders, month])

  useEffect(() => {
    setconstructionSalesCount(filterTableByMonthAndConstr(constructions, salesOrders, month))
  }, [salesOrders, month])

  useEffect(() => {
    setbonusUnits(countBonusUnits(productionUnits, goal))
  }, [productionUnits, goal])

  return status === 'loading' ? (
    <RefreshPage reload={() => dispatch(fetchData())} progress={status} />
  ) : status === 'succeeded' ? (
    <>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={tabChange} aria-label='lab API tabs example'>
            <Tab label='Statystyki' value='1' />
            <Tab label='Produkcja/Sprzedaż' value='2' />
            <Tab label='Skanowania' value='3' />
            <RefreshPage reload={() => dispatch(fetchData())} progress={status} />
          </TabList>
        </Box>
        <Box
          component='main'
          sx={{
            flexGrow: 1,
            py: 0,
          }}
        >
          <Container maxWidth={false}>
            <TabPanel value='1'>
              <Grid container spacing={3}>
                <Grid item lg={3} sm={6} xl={3} xs={12}>
                  <TotalUnitsCard units={salesUnits} label={'Sprzedane'} />
                </Grid>
                <Grid item xl={3} lg={3} sm={6} xs={12}>
                  <TotalUnitsCard units={productionUnits} label={'Produkcja'} />
                </Grid>
                <Grid item xl={2} lg={2} sm={6} xs={12}>
                  <TasksProgressCard
                    progress={productionUnits[productionUnits.length - 1]}
                    label={'Procent celu'}
                  />
                </Grid>
                <Grid item xl={2} lg={2} sm={6} xs={12}>
                  <ForecastCard forecast={forecast} label={`Prognoza [${goal}]`} result={goal} />
                </Grid>
                <Grid item xl={2} lg={2} sm={6} xs={12}>
                  <TotalCard value={totalSales} label={'Sprzedaz [rok]'} />
                </Grid>
                <Grid item lg={6} md={12} xl={6} xs={12}>
                  <ColumnCharts
                    seriesone={productionUnits.map((productionunit) => productionunit.units)}
                    seriesonelabel={'Produkcja'}
                    seriestwo={salesUnits.map((salesunit) => salesunit.units)}
                    seriestwolabel={'Sprzedaż'}
                    title={'Jednostki produkcyjne'}
                  />
                </Grid>
                <Grid item lg={6} md={12} xl={6} xs={12}>
                  <ColumnCharts
                    seriesone={bonusUnits}
                    title={'Jednostki premiowe'}
                    legend={0}
                    colorone={'#4caf50'}
                  />
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value='2'>
              <Grid container spacing={3}>
                <Grid lg={4} md={4} xl={4} xs={4} item>
                  <RoundCharts count={constructionsCount} />
                </Grid>
                <Grid lg={4} md={4} xl={4} xs={4} item>
                  <Card sx={{ height: '100%', boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)' }}>
                    <SelectList></SelectList>
                    <ConstructionTable
                      data={constructionsCount}
                      columns={['Konstrukcja', 'Sztuki', 'Jednostki']}
                      title={'Konstrukcje wyprodukowane'}
                    />
                  </Card>
                </Grid>
                <Grid lg={4} md={4} xl={4} xs={4} item>
                  <Card sx={{ height: '100%', boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)' }}>
                    <SelectList></SelectList>
                    <ConstructionTable
                      data={constructionsSalesCount}
                      columns={['Konstrukcja', 'Sztuki', 'Jednostki']}
                      title={'Konstrukcje sprzedane'}
                    />
                  </Card>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value='3'>
              <Grid item lg={12} md={12} xl={12} xs={12}>
                <MaterialTable data={lastScans} title={'Ostatnie skanowania'} />
              </Grid>
            </TabPanel>
          </Container>
        </Box>
      </TabContext>
    </>
  ) : (
    <div>{error}</div>
  )
}
