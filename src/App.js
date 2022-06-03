import React, {useEffect, useState} from 'react';
import axios from "axios";
import Form from "./components/Form";
import './index.css'

function App () {
  const [students, setStudents] = useState([])
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    axios.get('https://629988f86f8c03a978445903.mockapi.io/students')
      .then((res) => {
        setStudents(res.data)
        setIsLoading(false)
      })
  }, [])

  const deleteUser =  async (id) => {
   await axios.delete(`https://629988f86f8c03a978445903.mockapi.io/students/${id}`)
        const studentsList = students.filter(item => item.id !== id)
        setStudents(studentsList)
  }

  if (isLoading) {
    return 'Loading...'
  }



  return (
    <div className="App">
      <Form />
      <table className="table-auto w-full">
        <thead>
        <tr className="bg-blue-500 text-center">
          <th
            className="w-1/7 min-w-[160px] text-lg font-semibold text-white  py-4  lg:py-7 px-3 lg:px-4 border-l border-transparent">
            #
          </th>
          <th
            className="w-1/6 min-w-[160px] text-lg font-semibold text-white  py-4  lg:py-7 px-3 lg:px-4 border-l border-transparent">
            Ф.И.О студента
          </th>
          <th
            className="w-1/7 min-w-[160px] text-lg font-semibold text-white  py-4  lg:py-7 px-3 lg:px-4 border-l border-transparent">
            Группа
          </th>
          <th
            className="w-1/7 min-w-[160px] text-lg font-semibold text-white  py-4  lg:py-7 px-3 lg:px-4 border-l border-transparent">
            Телефон
          </th>
          <th
            className="w-1/7 min-w-[160px] text-lg font-semibold text-white  py-4  lg:py-7 px-3 lg:px-4 border-l border-transparent">
            Год поступления
          </th>
          <th
            className="w-1/7 min-w-[160px] text-lg font-semibold text-white  py-4  lg:py-7 px-3 lg:px-4 border-l border-transparent">
            E-mail
          </th>
          <th
            className="w-1/7 min-w-[160px] text-lg font-semibold text-white  py-4  lg:py-7 px-3 lg:px-4 border-l border-transparent">
            Исключить
          </th>
        </tr>
        </thead>


        <tbody>
        {
          students.map((student) => (
            <tr key={student.id}>
              <td
                className=" text-center text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF]  border-b border-l border-[#E8E8E8]">
                {student.id}
              </td>
              <td
                className=" text-center text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF]  border-b border-l border-[#E8E8E8]">
                {student.name}
              </td>
              <td
                className=" text-center text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF]  border-b border-l border-[#E8E8E8]">
                {student.group}
              </td>
              <td
                className=" text-center text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF]  border-b border-l border-[#E8E8E8]">
                {student.year}
              </td>
              <td
                className=" text-center text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF]  border-b border-l border-[#E8E8E8]">
                {student.phone}
              </td>
              <td
                className=" text-center text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF]  border-b border-l border-[#E8E8E8]">
                {student.email}
              </td>
              <td
                className=" text-center text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF]  border-b border-l border-[#E8E8E8]">
                <button
                  onClick={() => deleteUser(student.id)}
                  className="border border-red-400
                              py-1
                              px-4
                              text-primary
                              inline-block
                              rounded
                              hover:bg-red-400 hover:text-white
                              "
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        }


        </tbody>
      </table>
    </div>
  );
}

export default App;