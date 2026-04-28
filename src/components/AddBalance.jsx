import React, { useContext, useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import { enqueueSnackbar } from 'notistack'
import { AmountContext } from '../App'

const AddBalance = ({ setShowAddBalance }) => {
    const [balance, setBalance] = useState("")
    const amountContext = useContext(AmountContext)
    const { amount, setAmount } = amountContext
    const addBalance = () => {
        if (!balance) {
            enqueueSnackbar('Enter Amount', { variant: 'warning' })
            return
        }

        localStorage.setItem('WalletBalance', Number(amount) + Number(balance))
        setAmount(Number(amount) + Number(balance))
        setShowAddBalance(false)
    }
    return (
        <>

            <Box sx={{ width: '100%', height: '100%', position: 'fixed', top: 0, left: 0, zIndex: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: 'rgba(255,255,255,0.5)' }}>
                <Box sx={{ width: '538px', height: '164px', p: '20px', bgcolor: '#EFEFEF', borderRadius: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'between' }}>

                    <Typography variant='h4' component='h2' sx={{ marginBottom: '10px' }}>Add Balance</Typography>
                    <Box component="form" onSubmit={(e) => { e.preventDefault();   
                        addBalance();
                    }} sx={{ display: 'flex', justifyContent: 'space-around' }}>
                        <TextField type='number' placeholder='Income Amount' label="Income Amount" variant="outlined" sx={{ borderRadius: '15px' }} onChange={(e) => setBalance(e.target.value)} />
                        <Button variant='contained' type='submit' sx={{ bgcolor: '#F4BB4A', color: '#FFFFFF', borderRadius: '15px' }}>Add Balance</Button>
                        <Button variant='contained' type='button' sx={{ bgcolor: '#E3E3E3', color: '#000000', borderRadius: '15px' }} onClick={() => setShowAddBalance(false)}>Cancel</Button>
                    </Box>

                </Box>
            </Box>

        </>
    )
}

export default AddBalance