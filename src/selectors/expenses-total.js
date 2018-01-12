
const sum=(expenses)=>{
    if(!Array.isArray(expenses)) {
        expenses=[expenses];
    }
    return (expenses.reduce((accum,current)=>accum+parseInt(current.amount),0)/100);
}

export default sum;