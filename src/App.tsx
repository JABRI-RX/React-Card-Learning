import {
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { propsField, setObject } from "./type";

const context = createContext<Array<setObject>>([]);
//utitlities
function Field({ Type, Name, Width, Option, getTarget }: propsField) {
  let style =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ";
  if (Width === "big") {
    style += "w-[19rem]";
  } else {
    style += "w-[5rem]";
  }
  if (Type === "Text") {
    return (
      <tr>
        <td className=" text-right text-white text-xl font-bold">{Name}:</td>
        <td>
          <input
            type={Type}
            className={style}
            onBlur={(e) => {
              getTarget(Name, e.target.value);
            }}
          />
        </td>
      </tr>
    );
  } else if (Type === "Groupe") {
    return (
      <tr>
        <td className=" text-right text-white text-xl font-bold">{Name}:</td>
        <td>
          <select
            className={style}
            name={Name.replace(" ", "_")}
            id={Name.replace(" ", "_")}
            onChange={(e) => {
              getTarget(Name, e.target.selectedOptions[0].innerText);
            }}>
            {Option?.map((option: string) => {
              return <option key={option.replace(" ", "_")}>{option}</option>;
            })}
          </select>
        </td>
      </tr>
    );
  }
}
function Text(props: any) {
  let style: string = "text-2xl font-bold ";
  let parentStyle: string = "flex ";
  if (props.centered === true) {
    parentStyle += "justify-center ";
  }
  if (props.color === undefined || props.color === "") {
    style += "text-white";
  } else {
    style += props.color;
  }
  style += " " + props.addStyle;
  return (
    <div className={parentStyle}>
      <h2 className={style}>{props.Name}</h2>
    </div>
  );
}

function Line() {
  return <div className="w-[100%] h-[0.2rem] bg-white"></div>;
}

function Form({ setData }: { setData: Dispatch<Array<setObject>> }) {
  const [object, setObject] = useState<setObject>({
    name: "",
    site: "",
    study: "",
    year: "",
  });

  const getTarget = (target: string, value: string) => {
    switch (target) {
      case "Full Name":
        setObject((prev) => {
          return {
            ...prev,
            ["name"]: value,
          };
        });
        break;
      case "Year":
        setObject((prev) => {
          return {
            ...prev,
            ["year"]: value,
          };
        });
        break;
      case "Study Field":
        setObject((prev) => {
          return {
            ...prev,
            ["study"]: value,
          };
        });
        break;
      case "Site":
        setObject((prev) => {
          return {
            ...prev,
            ["site"]: value,
          };
        });
        break;
      default:
        break;
    }
  };
  const [student, SetStudent] = useState<setObject[]>([]);
  const fillDataSet = (student: setObject) => {
    SetStudent((prev) => {
      return [...prev, student];
    });
  };
  let useContextValue = useContext(context);
  return (
    <form>
      <table className="flex justify-center">
        <tbody>
          <Field
            Name={"Full Name"}
            Type={"Text"}
            Width={"big"}
            setObject={setObject}
            getTarget={getTarget}
          />

          <Field
            Name={"Year"}
            Type={"Groupe"}
            Option={["1 Anne ", "2 Anne ", "3 Anne ", "4 Anne", "5 Anne"]}
            Width={"small"}
            setObject={setObject}
            getTarget={getTarget}
          />

          <Field
            Name={"Study Field"}
            Type={"Groupe"}
            Option={[
              "IIR ",
              "Audit & Finance",
              "Industrial 3awd",
              "Civil Rights Movement",
            ]}
            Width={"small"}
            setObject={setObject}
            getTarget={getTarget}
          />

          <Field
            Name={"Site"}
            Type={"Groupe"}
            Option={[
              "EMSI Center(ALCATRAZ)",
              "EMSI Moulay Youssef",
              "EMSI Roundani",
              "EMSI Maarif",
              "EMSI Laymoun",
            ]}
            Width={"big"}
            setObject={setObject}
            getTarget={getTarget}
          />
        </tbody>
      </table>
      <br />
      <div className="flex justify-center">
        <button
          type="button"
          className="text-white bg-blue-700 transition ease-in-out delay-75  hover:scale-125 hover:bg-gray-100 hover:text-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2   focus:outline-none "
          onClick={() => {
            alert(`The student ${object.name} is insert into data set`);
            fillDataSet(object);
            useContextValue.push(object);
          }}>
          Add Student
        </button>
      </div>
    </form>
  );
}

function ListStudents() {
  let useContextValueStudent = useContext(context);
  return (
    <div>
      <table className="w-full text-white">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Year </th>
            <th>Study Field</th>
            <th>Site</th>
          </tr>
        </thead>
        {useContextValueStudent.map((student: setObject) => {
          return (
            <tr>
              <td>{student.name}</td>
              <td>{student.site}</td>
              <td>{student.study}</td>
              <td>{student.year}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

function App() {
  const [data, setData] = useState<Array<setObject>>([]);
  return (
    <div className="flex justify-center items-center w-full h-[100vh] bg-gray-700">
      <div className="w-[50rem] h-[40rem] p-3 space-y-3 bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-blue-700 via-blue-800 to-gray-900  rounded-lg ">
        <Text
          Name="Fill In Your Student Info"
          centered={true}
          color={"text-blue-500"}
          addStyle={"bg-white p-1 rounded-lg"}
        />
        <context.Provider value={data}>
          <Form setData={setData} />
          <Line></Line>
          <ListStudents />
        </context.Provider>
      </div>
    </div>
  );
}

export default App;
