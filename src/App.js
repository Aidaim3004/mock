import React, {useEffect, useState} from 'react';
import axios from "axios";
import './index.css'

function App() {
  const [students, setStudents] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [updateUserId, setUpdateUserId] = useState(null)
  const [newStudent, setNewStudent] = useState({
    name: "",
    group: "",
    year: "",
    phone: "",
    email: ""
  })

  const handleChange = (e) => {
    setNewStudent({...newStudent, [e.target.name]: e.target.value})
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    const uploadUser = await axios.post('https://629988f86f8c03a978445903.mockapi.io/students', newStudent)
    setStudents([...students, uploadUser.data])
    setNewStudent({
      name: "",
      group: "",
      year: "",
      phone: "",
      email: ""
    })
  }


  const handleEdit = (student) => {
    setIsEditing(true)
    setUpdateUserId(student.id)
    setNewStudent({
      name: student.name,
      group: student.group,
      year: student.year,
      phone: student.phone,
      email: student.email,
    })
  }

  const updateUser = async (e) => {
    e.preventDefault();
    const {data: updatedUser} = await axios.put(`https://629988f86f8c03a978445903.mockapi.io/students/${updateUserId}`, newStudent)
    const updateStudentsList = students.map(item => item.id === updatedUser.id ? updatedUser : item)
    setStudents(updateStudentsList)
    setIsEditing(false)
    setNewStudent({
      name: "",
      group: "",
      year: "",
      phone: "",
      email: ""
    })
  }

  const deleteUser = async (id) => {
    await axios.delete(`https://629988f86f8c03a978445903.mockapi.io/students/${id}`)
    const studentsList = students.filter(item => item.id !== id)
    setStudents(studentsList)
  }

  useEffect(() => {
    axios.get('https://629988f86f8c03a978445903.mockapi.io/students')
      .then((res) => {
        setStudents(res.data)
        setIsLoading(false)
      })
  }, [])


  if (isLoading) {
    return 'Loading...'
  }


  return (
    <div className="App">
      <div className="container margin-bottom">
        <div className="flex  justify-items-center p-12 ">
          <div className="mx-auto   w-full  mr-16 ">
            <form onSubmit={isEditing ? updateUser : handleSubmit}>
              <div className="mb-5">
                <label
                  htmlFor="name"
                  className="mb-3 max-w-full block text-base font-medium text-[#07074D]"
                > Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 pl-1.5 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  onChange={handleChange}
                  value={newStudent.name}
                />
              </div>


              <div className="mb-5">
                <label
                  htmlFor="group"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Group
                </label>
                <input
                  type="text"
                  id="group"
                  name="group"
                  placeholder="Enter your group"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 pl-1.5 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  onChange={handleChange}
                  value={newStudent.group}
                />
              </div>


              <div className="mb-5">
                <label
                  htmlFor="year"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Year
                </label>
                <input
                  type="date"
                  id="year"
                  name="year"
                  placeholder="Enter your year"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 pl-1.5 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  onChange={handleChange}
                  value={newStudent.year}
                />
              </div>


              <div className="mb-5">
                <label
                  htmlFor="phone"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Phone number
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="+996"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 pl-1.5 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  onChange={handleChange}
                  value={newStudent.phone}
                />
              </div>


              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="example@domain.com"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 pl-1.5 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  onChange={handleChange}
                  value={newStudent.email}
                />
              </div>
              <div>

                <button
                  className="hover:shadow-form rounded-md bg-[#6A64F1] py-3.5 px-6 text-base font-semibold text-white outline-none"
                >
                  {isEditing ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>


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
                Год поступления
              </th>
              <th
                className="w-1/7 min-w-[160px] text-lg font-semibold text-white  py-4  lg:py-7 px-3 lg:px-4 border-l border-transparent">
                Телефон
              </th>
              <th
                className="w-1/7 min-w-[160px] text-lg font-semibold text-white  py-4  lg:py-7 px-3 lg:px-4 border-l border-transparent">
                E-mail
              </th>
              <th
                className="w-1/7 min-w-[160px] text-lg font-semibold text-white  py-4  lg:py-7 px-3 lg:px-4 border-l border-transparent">
                Actions
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
                      onClick={() => handleEdit(student)}
                      className="border border-blue-400
                              py-1
                              px-2
                              text-primary
                              inline-block
                              rounded
                              hover:bg-blue-400 hover:text-white
                              mr-2
                              "
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteUser(student.id)}
                      className="border border-red-400
                              py-1
                              px-2
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
      </div>
    </div>
  );
}

export default App;