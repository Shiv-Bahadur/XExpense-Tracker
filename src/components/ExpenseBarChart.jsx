import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Box, Typography } from '@mui/material';
import { useContext } from 'react';
import { ExpensesContext } from '../App';


const ExpenseBarChart = () => {

    const expensesContext = useContext(ExpensesContext)
    const { expenses, setExpenses } = expensesContext

    console.log(expenses)
    let entertainment = 0, food = 0, travel = 0;

    for (let expense of expenses) {
        if (expense.category == 'food') {
            food += Number(expense.price)
        } else if (expense.category == 'entertainment') {
            entertainment += Number(expense.price)
        } else {
            travel += Number(expense.price)
        }
    }
    console.log(entertainment, food, travel)
    const data = [
        { name: 'Entertainment', amount: entertainment },
        { name: 'Food', amount: food },
        { name: 'Travel', amount: travel },

    ];
    data.sort((a, b) => b.amount - a.amount)

    return (
        <>
            <Typography variant='h6' sx={{ fontWeight: 700, fontStyle: 'italic', fontSize: '28px', color: 'white' }}>Top Expenses</Typography>
            <Box sx={{ bgcolor: 'white', p: '2rem', borderRadius: '15px', width: '100%', height: '345px' }}>

                <BarChart
                    style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 2 }}
                    responsive
                    layout="vertical"
                    data={data}
                    barGap={1}
                >

                    <XAxis type='number' hide />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={100} />
                    <Bar dataKey="amount" fill="#8884d8" barSize={30} radius={[0, 50, 50, 0]} />

                </BarChart>

            </Box>
        </>
    );
};

export default ExpenseBarChart;