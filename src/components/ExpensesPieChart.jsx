import { Box } from '@mui/material';
import { Legend, Pie, PieChart, ResponsiveContainer, Sector, Cell } from 'recharts';
import { ExpensesContext } from '../App';
import { useContext } from 'react';


const RADIAN = Math.PI / 180;
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) / 2;

  const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
  const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

  return (
    <text x={x} y={y} fill="white" textAnchor="middle">
      {(percent * 100).toFixed(0)}%
    </text>
  );
};


export default function ExpensesPieChart() {

  const expensesContext = useContext(ExpensesContext)
  const { expenses, setExpenses } = expensesContext

  console.log(expenses)
  let entertainment = 0, food = 0, travel = 0;

  for (let expense of expenses) {
    if (expense.category == 'Food') {
      food += Number(expense.price)
    } else if (expense.category == 'Entertainment') {
      entertainment += Number(expense.price)
    } else {
      travel += Number(expense.price)
    }
  }
  console.log(entertainment, food, travel)
  const data = [
    { name: 'Entertainment', value: entertainment },
    { name: 'Food', value: food },
    { name: 'Travel', value: travel },

  ];

  return (
    <Box sx={{ marginTop: {md:'-60px'},}}>
      <ResponsiveContainer width={300} aspect={1}>
        <PieChart>
          <Pie
            data={data}
            label={renderLabel}
            dataKey="value"
            labelLine={false}
            isAnimationActive={true}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}

          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
}