import React from 'react'
import Card from '../UI/Card';
import ExpenseFilter from './Expensesfilter';
import ExpenseList from './ExpensesList';
import { useState } from 'react';
import ExpenseChart from './ExpensesChart';
function Expenses(props){
    const [filteredYear, setFilteredYear] = useState('2021');
    const filterChangeHandler = (selectedYear)=>{
        setFilteredYear(selectedYear);
      }
      const filteredexpenses = props.items.filter(expense =>{
        return expense.date.getFullYear().toString() === filteredYear;
      });
    return(<div>
        <Card className='expenses'>
        <ExpenseFilter selected={filteredYear} onChangeFilter={filterChangeHandler}></ExpenseFilter>
        <ExpenseChart expenses={filteredexpenses}/>
        <ExpenseList items={filteredexpenses} />
            </Card>
            </div>
    )
}

export default Expenses;