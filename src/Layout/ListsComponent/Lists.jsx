import React, { useContext,useState,useRef, useEffect } from 'react'
import Container from '../../UI/Container/Container'
import './Lists.css'
import List from '../../UI/List/List'

function Lists() {
    const [meals,setMeals] = useState([])
    const [isLoading,setIsLoading] = useState(null)
    const [isError,setIsError] = useState(null)

    // const {dispatch} = useContext(OrderedCount)
    const [orderedList,setOrderedList] = useState([])
   
    const onUpdateHandler=(list)=>{
        dispatch({type:'addArray',payload:list})
        setOrderedList(prevList=>[...prevList,...list])
    }

    async function fetchMealData(){
        setIsLoading(true)
        setIsError(false)
        try{
            const response = await fetch("https://food-menu-d90f8-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json")
            const data = await response.json()
            const dataList= []

            for(let key in data){
                dataList.push({
                    id:key,
                    name:data[key].name,
                    description:data[key].description,
                    price:data[key].price,
                })
            }

            setMeals(dataList)
            setIsLoading(false)
        

            if(!response.ok){
                
                throw new Error("An error has occured")
            }
        }

        catch(err){
            alert(err)
            setIsError(true)
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        fetchMealData()
    },[])
console.log(isLoading)
console.log(`error state now is ${isError}`)
    
  return (
    <>
        <Container>
        {isLoading?<p>This is Loading</p>:
            !isLoading && isError ? <p className='error-text'>Network connection lost,please retry again</p> :
                !isLoading && !isError ?
                <div className="lists-container">
                    {meals.map((list,index)=>{
                        return(
                            <List
                            //Can get access to the Input through refs
                            key={index}
                            id={index}
                            name={list.name}
                            description={list.description}
                            price={list.price}
                            // updateListHandler = {onUpdateHandler}
                            // addToCart = {onAddToCart}
                            />
                        )})
                    }
                </div>:""}
            </Container>
            {/* {!isLoading && isError ? <p className='error-text'>Network connection lost,please retry again</p> :""} */}
    </>
  )
}

export default Lists

