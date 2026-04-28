import React, { useContext, useState } from 'react'
import "../styles/Wallet.css"
import { Box, Button, Typography, Stack } from '@mui/material'
import AddBalance from './AddBalance'
import { AmountContext } from '../App'

const Wallet = () => {

  const [showAddBalance,setShowAddBalance]=useState(false);
  const amountContext=useContext(AmountContext)
  const {amount,setAmount}=amountContext
  console.log("balance", amount)
  
  const addIncome = () => {

  }
  return (
    <Box>
    <Box sx={{ p: '20px', borderRadius: '15px', bgcolor: '#9B9B9B', width: {sm:'100%',md:'335px'}, height: {sm:'auto',md:'181px'}, display: 'flex', flexDirection: 'column', gap: '25px', justifyContent: 'center', alignItems: 'center' }}>

      <Typography variant='p' sx={{ fontSize: '30px', fontWeight: 400, color: 'white' }}>Wallet Balance: <span style={{ color: '#9DFF5B', fontWeight: '700' }}>₹{amount}</span></Typography>
      <Button variant="contained" sx={{ color: 'white', bgcolor: '#B5DC52', borderRadius: '15px', px: '35px', py: '10px' }} onClick={()=>setShowAddBalance(true)}>+ Add Income</Button>

    </Box>
{
  showAddBalance && <AddBalance setShowAddBalance={setShowAddBalance}/>
}
    </Box>
  )
}

export default Wallet;
