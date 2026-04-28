import React, { useContext, useState } from 'react'
import { Box, Button, TextField, Typography, FormControl, Select, InputLabel, MenuItem } from '@mui/material'
import { enqueueSnackbar } from 'notistack'
import { ExpensesContext, AmountContext } from '../App'

const AddExpense = ({ setShowAddExpense, item :product}) => {

    const amountContext = useContext(AmountContext)
    const { amount, setAmount } = amountContext
    const expensesContext = useContext(ExpensesContext)
    const { expenses, setExpenses } = expensesContext

    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [spendingDate, setSpendingDate] = useState("")

    const addExpenses = () => {
        if (!title) {
            enqueueSnackbar("Enter title", { variant: 'warning' })
            return
        }
        if (!price) {
            enqueueSnackbar("Price cannot be empty", { variant: 'warning' })
            return
        }
        if (!category) {
            enqueueSnackbar("Select category", { variant: 'warning' })
            return
        }
        if (!spendingDate) {
            enqueueSnackbar("Select date", { variant: 'warning' })
            return
        }

        if (product) {

            if (Number(amount) + Number(product.price) < price) {
                enqueueSnackbar("Not enough balance in your wallet", { variant: 'warning' })
                alert("Not enough balance in your wallet")
                return
            }
            let modified = expenses.map((exp) => exp.id === product.id ? { ...exp, title, price, category, spendingDate } : exp)
            setExpenses(modified);
            setAmount(Number(amount) + Number(product.price) - Number(price))
            localStorage.setItem('WalletBalance', Number(amount) + Number(product.price) - Number(price))
            localStorage.setItem('expenses', JSON.stringify(modified))
            setShowAddExpense(false)
            return
        }
        if (Number(amount) < price) {
            enqueueSnackbar("Not enough balance in your wallet", { variant: 'warning' })
            alert("Not enough balance in your wallet")
            return
        }



        localStorage.setItem('WalletBalance', Number(amount) - Number(price))
        setAmount(Number(amount) - Number(price))

        let item = {
            id: Date.now(),
            title,
            price,
            category,
            spendingDate
        }
        console.log(item)

        localStorage.setItem('expenses', JSON.stringify([...expenses, item]))
        setExpenses([...expenses, item])

        setTitle("")
        setPrice("")
        setCategory("")
        setSpendingDate("")
    }

    return (

        <Box sx={{ width: '100%', height: '100%', position: 'fixed', top: 0, left: 0, zIndex: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: 'rgba(255,255,255,0.5)' }}>
            <Box component='form' onSubmit={(e)=>{e.preventDefault(); addExpenses()} } sx={{ width: '538px', height: '335px', p: '20px', bgcolor: '#EFEFEF', borderRadius: '15px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

                <Typography variant='h4' component='h2' sx={{ marginBottom: '10px' }}>Add Expenses</Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-around', gap: '20px' }}>
                    <TextField fullWidth id="outlined-basic" label="Title" variant="outlined" sx={{ borderRadius: '15px' }} value={title} name='title' onChange={(e) => setTitle(e.target.value)} />
                    <TextField fullWidth type='number' id="outlined-basic" label="Price" variant="outlined" sx={{ borderRadius: '15px' }} name='price' value={price} onChange={(e) => setPrice(e.target.value)} />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-around', gap: '20px' }}>

                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={category}
                            label="Age"
                            name='category'
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <MenuItem value='Food'>Food</MenuItem>
                            <MenuItem value='Entertainment'>Entertainment</MenuItem>
                            <MenuItem value="Travel">Travel</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField fullWidth type='date' name='date' id="outlined-basic" variant="outlined" sx={{ borderRadius: '15px' }} value={spendingDate} onChange={(e) => setSpendingDate(e.target.value)} />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-around', gap: '20px' }}>
                    <Button fullWidth type='submit' variant='contained' sx={{ bgcolor: '#F4BB4A', color: '#FFFFFF', borderRadius: '15px' }}>Add Expense</Button>
                    <Button fullWidth variant='contained' sx={{ bgcolor: '#E3E3E3', color: '#000000', borderRadius: '15px' }} onClick={() => setShowAddExpense(false)}>Cancel</Button>
                </Box>


            </Box>
        </Box>

    )
}

export default AddExpense