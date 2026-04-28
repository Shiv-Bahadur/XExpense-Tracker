import React, { useState, useContext, useEffect } from 'react'
import { Box, Button, IconButton, Typography } from '@mui/material'
import { ExpensesContext, AmountContext } from '../App'
import ExpenseBarChart from './ExpenseBarChart';

import { IoPizzaOutline } from "react-icons/io5";
import { CiGift } from "react-icons/ci";
import { CiRollingSuitcase } from "react-icons/ci";
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddExpense from './AddExpense';

const Transactions = () => {

    const expensesContext = useContext(ExpensesContext)
    const { expenses, setExpenses } = expensesContext

    const amountContext = useContext(AmountContext)
    const { amount, setAmount } = amountContext

    const [showAddExpense, setShowAddExpense] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)
    const [page, setPage] = useState(1);
    const [currentExpense, setCurrentExpense] = useState([])


    const categoryMap = {
        food: { label: "Food", icon: IoPizzaOutline },
        entertainment: { label: "Entertainment", icon: CiGift },
        travel: { label: "Travel", icon: CiRollingSuitcase }
    };

    const deleteItem = (item) => {

        const filteredExpenses = expenses.filter((temp) => temp.id !== item.id)
        setExpenses(filteredExpenses)
        setAmount(Number(amount) + Number(item.price))
        localStorage.setItem('walletBalance', Number(amount) + Number(item.price))
        localStorage.setItem('expenses', JSON.stringify(filteredExpenses))
    }
    const editItem = (item) => {
        setSelectedItem(item)
        setShowAddExpense(true)
    }
    console.log("page number",page===Math.ceil(expenses.length / 3))
    useEffect(() => {
        const limit = 3
        const startIndex = (page - 1) * limit
        const data = expenses.slice(startIndex, startIndex + limit)
        setCurrentExpense(data)
    }, [page, expenses])

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '20px', flexDirection:{xs:'column',md:'row'} }}>
                <Box sx={{ width: {xs:'100%',md:'60%'}, height: '100%' }}>
                    <Typography variant='h6' sx={{ fontWeight: 700, fontStyle: 'italic', fontSize: '28px', color: 'white' }}>Recent Transactions</Typography>
                    <Box sx={{ bgcolor: 'white', borderRadius: '15px', p: '2rem', height:{xs:'auto',md:'345px'} , display: 'flex', flexDirection: 'column', }}>
                        {
                            currentExpense && currentExpense.map((item) => {
                                let Icon = categoryMap[item.category].icon
                                return (
                                    <Box key={item.id} sx={{ fontSize: '16px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid black', p: '10px' }}>
                                        <Box sx={{ display: 'flex', gap: '20px' }}>
                                            <Box sx={{ width: '50px', height: '50px', borderRadius: '50%', bgcolor: '#D9D9D9', p: '10px' }}>{<Icon size={30} />}</Box>
                                            <Box>
                                                <Typography sx={{ fontWeight: 400 }}>{item.title}</Typography>
                                                <Typography sx={{ color: '#9B9B9B' }}>{item.date}</Typography>
                                            </Box>
                                        </Box>
                                        <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'center' }}>
                                            <Typography sx={{ fontWeight: 700, color: '#F4BB4A' }}>₹{item.price}</Typography>
                                            <Box sx={{ p: '1px', bgcolor: '#FF3838', borderRadius: '15px', }}><IconButton onClick={() => deleteItem(item)} sx={{ color: 'white' }} > <HighlightOffSharpIcon /> </IconButton></Box>
                                            <Box sx={{ p: '1px', bgcolor: '#F4BB4A', borderRadius: '15px' }}><IconButton onClick={() => editItem(item)} sx={{ color: 'white' }} > <CreateOutlinedIcon /> </IconButton></Box>
                                        </Box>
                                    </Box>
                                )
                            })
                        }
                        <Box sx={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: "auto", }}>
                            <Box sx={{ p: '1px', bgcolor: '#F1F1F1', borderRadius: '15px', }}>
                                <IconButton disabled={page === 1} onClick={() => setPage(page - 1)} size='large'>  <ArrowBackIcon /></IconButton>
                            </Box>
                            <Box sx={{ bgcolor: '#43967B', color: 'white', width: '50px', height: '50px', borderRadius: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Typography sx={{ fontSize: '24px', fontWeight: 400, }}>{page}</Typography></Box>
                            <Box sx={{ p: '1px', bgcolor: '#F1F1F1', borderRadius: '15px' }}>
                                <IconButton disabled={ expenses.length===0 || page == Math.ceil(expenses.length / 3)} onClick={() => setPage(page + 1)} size='large'> <ArrowForwardIcon /> </IconButton>
                            </Box>

                        </Box>
                    </Box>
                </Box>
                <Box sx={{ width:{xs:'100%',md:'40%'},height:345}}>
                    <ExpenseBarChart />
                </Box>
            </Box>
            {
                showAddExpense && <AddExpense setShowAddExpense={setShowAddExpense} item={selectedItem} />
            }
        </>
    )
}

export default Transactions