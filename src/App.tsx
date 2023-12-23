import { useLayoutEffect, useState } from "react";

interface Student{
  full_name:string,
  year:string,
  study_field:string,
  site:string
}
//utitlities
function Field(props:any)
{
  
  let style = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ";
  if (props.width === "big"){
    style += "w-[19rem]";
  }
  else{
    style += "w-[5rem]";
  }
  if(props.Type === "Text"){
    return (
      <tr >
        <td className=' text-right text-white text-xl font-bold'>{props.Name}:</td>
        <td><input type={props.Type} className={style}/></td>
      </tr>
    )
  }
  else if (props.Type === "Groupe") {
    
    return (
      <tr >
        <td className=' text-right text-white text-xl font-bold'>{props.Name}:</td>
        <td>
          <select className={style} name={props.Name.replace(" ","_")} id={props.Name.replace(" ","_")}>
            {props.options.map((option:String)=>{

              return <option id={option.replace(" ","_")}  key={option.replace(" ","_")}>{option}</option>
            })}
          </select>
        </td>
      </tr>
    )
  }
  
}
function Text(props:any)
{
  let style:string = "text-2xl font-bold ";
  let parentStyle:string = "flex ";
  if (props.centered === true){
    parentStyle += "justify-center ";
  }
  if (props.color === undefined || props.color === ""){
    style += "text-white";
  }
  else{
    style += props.color;
  }
  style += " " + props.addStyle;
  return (
    <div className={parentStyle}>
      <h2 className={style}>{props.Name}</h2> 
    </div>
  )
}

function Line(props:any)
{
  return (
    <div className="w-[100%] h-[0.2rem] bg-white"></div>
  )
}

function Form()
{
  const [student,setStudent] = useState();
  
  return (
    <form >
      <table className="flex justify-center">
        <tbody className="">
        <Field 
          Name={"Full Name "} 
          Type={"Text"} 
          width={"big"}/>
        
        <Field 
          Name={"Year "}    
          Type={"Groupe"}
          options={
            [ "1 Anne ",
              "2 Anne ",
              "3 Anne ",
              "4 Anne",
              "5 Anne"]
          } 
          width={"small"} />
        
        <Field 
          Name={"Study Field "}    
          Type={"Groupe"}
          options={
            [ "IIR ",
              "Audit & Finance",
              "Industrial 3awd",
              "Civil Rights Movement"]
          } 
          width={"small"} />
        
        <Field 
          Name={"Site "}    
          Type={"Groupe"}
          options={
            [ "EMSI Center(ALCATRAZ)",
              "EMSI Moulay Youssef",
              "EMSI Roundani",
              "EMSI Maarif",
              "EMSI Laymoun"]
          } 
          width={"big"}/>
        </tbody>
      </table>
      <br/>
      <div className="flex justify-center">
        <button  type="button" className="text-white bg-blue-700 transition ease-in-out delay-75  hover:scale-125 hover:bg-gray-100 hover:text-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2   focus:outline-none "
          onClick={()=>{
            const 
            
          }}
        >Add Student </button >
      </div>
    </form>
  )
}

function List_Students(props:any)
{
return (
  <div className="">
    <table className="w-full text-white">
        <thead>
          <tr>
          <th>Full Name</th>
          <th>Year </th>
          <th>Study Field</th>
          <th>Site </th>
          <th></th>
          </tr>
        </thead>
        {students.map((student) =>{
          <td>{student.full_name}</td>
          ...
        })}
    </table>
  </div>
)
}
function App() {

  return (
    <div className='flex justify-center items-center w-full h-[100vh] bg-gray-700'>
      <div  className='w-[50rem] h-[40rem] p-3 space-y-3 bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-blue-700 via-blue-800 to-gray-900  rounded-lg '>
        <Text 
          Name="Fill In Your Student Info" 
          centered={true} 
          color={"text-blue-500"} 
          addStyle={"bg-white p-1 rounded-lg"}/>
        <Form />
        <Line></Line>
        <List_Students/>
      </div>
    </div>
  )
}

export default App
