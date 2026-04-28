import React, { useContext, useMemo, useState } from 'react'
import { Box, Button, Typography, Stack } from '@mui/material'
import AddExpense from './AddExpense'
import { ExpensesContext } from '../App'

const Expense = () => {

  const [showAddExpense, setShowAddExpense] = useState(false)
  const expensesContext=useContext(ExpensesContext)
  const {expenses,setExpenses}=expensesContext
  console.log("expenses", expenses)

  const expenseTotal=()=>{
    let total=0;
    for(let i=0;i<expenses.length;i++){
      total += Number(expenses[i].price)
    }
    console.log("total",total)
    return total;
  }


  return (
    <Box>
      <Box sx={{ p: '20px', borderRadius: '15px', bgcolor: '#9B9B9B', width: {sm:'100%',md:'335px'}, height: {sm:'auto',md:'181px'}, display: 'flex', flexDirection: 'column', gap: '25px', justifyContent: 'center', alignItems: 'center' }}>

        <Typography variant='p' sx={{ fontSize: '30px', fontWeight: 400, color: 'white' }}>Expenses: <span style={{ color: '#F4BB4A', fontWeight: '700' }}>₹{expenseTotal()}</span></Typography>
        <Button variant="contained" sx={{ color: 'white', background: "linear-gradient(to right, #FF9595, #FF4747,#FF3838)", borderRadius: '15px', px: '35px', py: '10px' }} onClick={() => setShowAddExpense(true)}>+ Add Expense</Button>

      </Box>
      {
        showAddExpense && <AddExpense setShowAddExpense={setShowAddExpense}/>
      }
    </Box>
  )
}

export default Expense;