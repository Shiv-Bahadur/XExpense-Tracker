import { useState, createContext } from 'react'
import './App.css'
import Wallet from './components/Wallet'
import Expense from './components/Expense'
import ExpensesPieChart from './components/ExpensesPieChart'
import { Button, Typography, Box } from '@mui/material'
import Transactions from './components/Transactions'

export const AmountContext = createContext()
export const ExpensesContext = createContext()

function App() {

  const [amount, setAmount] = useState(localStorage.getItem('WalletBalance') ?? 5000)
  const [expenses, setExpenses] = useState(JSON.parse(localStorage.getItem('expenses')) ?? [])
  return (
    <>

      <AmountContext.Provider value={{ amount, setAmount }}>
        <ExpensesContext.Provider value={{ expenses, setExpenses }}>
          <Typography component='h1' sx={{ color: 'white', fontSize: '32px', fontWeight: 700 }}>Expense Tracker</Typography>
          <Box sx={{ display: 'flex', justifyContent:'space-around', marginTop: '40px', p:'1%',paddingTop:'3%',bgcolor:'#626262',flexDirection:{xs:'column',md:'row'},gap:{xs:1} }}>
            <Wallet />
            <Expense />
            <ExpensesPieChart />
          </Box>
          <Box sx={{marginTop:'2rem'}}>
            <Transactions/>
          </Box>
        </ExpensesContext.Provider>
      </AmountContext.Provider>
    </>

  )
}

export default App
