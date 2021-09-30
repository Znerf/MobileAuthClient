import React,{useState} from 'react'
// import './CanvasContainer.css'
import axios from 'axios';


const baseURL = "https://mobileauth.herokuapp.com/CheckAuth/";
const MAX_FIELD = 6;


const Verify = (props) => {
    const [response, UpdateResponse]= useState('')
    var Code=0;

    const onSubmit = async e => {
        e.preventDefault();
        console.log(Code)
        postCode()
        

    }
  
  function postCode(){
    axios.post(baseURL, {
        Code: Code
      })
      .then(function (response) {
        console.log(response.data.response);
        UpdateResponse(response.data.response)
      })
  }

   function processInput(e) {
      if (!/[0-9]/.test(e.key)  ) {
         e.preventDefault();
      }
      

      var x = e.charCode || e.keyCode;
      var id=parseInt(e.target.name);
      var num=String.fromCharCode(e.charCode)


        

      if( (x >= 48 && x <= 57)) {

         var querycheck=".Auth input[name='" + String(id)+"']"
         var selectedcheck= document.querySelector(querycheck)
         selectedcheck.value=num

         var temp= Math.floor(Code/Math.pow(10,MAX_FIELD-id))%10
         var temp2= Code-Math.pow(10,MAX_FIELD-id)*temp
         var temp3= temp2+Math.pow(10,MAX_FIELD-id)*parseInt(num)
         // console.log(temp)    
         // console.log(temp2) 
         // console.log(temp3)   
         
         Code=temp3
         console.log(Code)        
         // console.log('last')        

                
         
        
         if (id===MAX_FIELD){
            //  console.log(Code)
            postCode()
            
         }else{
            
            var query=".Auth input[name='" + String(id+1)+"']"
            // console.log(query)
            var selected= document.querySelector(query)
            selected.focus()
            console.log(selected.value)
         }
      }
   }
    return (

         <div id="dialog" class='block w-1/3 mx-auto mt-20 p-7 b-4 text-2xl bg-gray-100 rounded shadow-md'>
            <h3 class='text-2xl py-6 text-center'>Please enter the 6-digit verification code</h3>
            <div id="form" class='w-full'>
               <form onSubmit ={onSubmit}>
                  <div class='inline-block mx-auto  inset-x-1/2	Auth'>
                     
                     <input name='1' onKeyPress={processInput} class='p-3 w-14 mr-2 rounded shadow-md' type="text" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
                     <input name='2' onKeyPress={processInput} class='p-3 w-14 mr-2 rounded shadow-md' type="text" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
                     <input name='3' onKeyPress={processInput} class='p-3 w-14 mr-2 rounded shadow-md' type="text" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
                     <input name='4' onKeyPress={processInput} class='p-3 w-14 mr-2 rounded shadow-md' type="text" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
                     <input name='5' onKeyPress={processInput} class='p-3 w-14 mr-2 rounded shadow-md' type="text" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
                     <input name='6' onKeyPress={processInput} class='p-3 w-14 mr-2 rounded shadow-md' type="text" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />

                  </div>
                  <div  name='sub' class='m-auto pl-36 block'><input onSubmit ={onSubmit}  type='submit' value='Verify' class="bg-purple-600 btn btn-primary btn-embossed mt-6 mx-auto" /></div>
               </form>
                { response!==''&& response!=='accepted' &&(
                <div class='bg-red-100 p-3 mt-5 rounded text-sm'>
                    You have wrong code
                </div>
                )}
                { response!==''&& response==='accepted' &&(
                <div class='bg-green-100 p-3 mt-5 rounded text-sm'>
                    Congrats
                </div>
                )}
            </div>
            
         </div>
    )
}

export default Verify
