import React from 'react';
import {useFormik} from 'formik';
import axios from "axios";
import * as Yup from 'yup';

// const validate = values => {
//   const errors = {};
//
//   if (!values.name) {
//     errors.name = 'Введите имя студента';
//   } else if (values.name.length > 15) {
//     errors.name = 'Must be 15 characters or less';
//   }
//
//   if (!values.group) {
//     errors.group = 'Введите группу студента';
//   } else if (values.lastName.length > 20) {
//     errors.lastName = 'Must be 20 characters or less';
//   }
//
//   if (!values.year) {
//     errors.year = 'Введите дату зачисления';
//   } else if (values.lastName.length > 20) {
//     errors.lastName = 'Must be 20 characters or less';
//   }
//
//   if (!values.phone) {
//     errors.phone = 'Введите номер телефона студента';
//   } else if (values.lastName.length > 20) {
//     errors.lastName = 'Must be 20 characters or less';
//   }
//
//   if (!values.email) {
//     errors.email = 'Введите e-mail студента';
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//     errors.email = 'Invalid email address';
//   }
//
//   return errors;
// }; это чисто формике

const AddUserModal = ({students, setStudents, setOpenModal, editingUser, setEditingUser}) => {
  // const [newStudent, setNewStudent] = useState({
  //   name: editingUser?.name || '',
  //   group: editingUser?.group || '',
  //   year: editingUser?.year || '',
  //   phone: editingUser?.phone || '',
  //   email: editingUser?.email || ''
  // })

  // const updateUser = async (e) => {
  //   e.preventDefault();
  //   const {data: updatedUser} = await axios.put(`https://629988f86f8c03a978445903.mockapi.io/students/${editingUser.id}`, newStudent)
  //   const updateStudentsList = students.map(item => item.id === updatedUser.id ? updatedUser : item)
  //   setStudents(updateStudentsList)
  //
  //   setOpenModal(false)
  // }

  // const handleChange = (e) => {
  //   setNewStudent({...newStudent, [e.target.name]: e.target.value})
  // }

  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   const uploadUser = await axios.post('https://629988f86f8c03a978445903.mockapi.io/students', newStudent)
  //   setStudents([...students, uploadUser.data])
  //   setNewStudent({
  //     name: "",
  //     group: "",
  //     year: "",
  //     phone: "",
  //     email: ""
  //   })
  //   setOpenModal(false)
  // }

  const formik = useFormik({
    initialValues: {
      name: editingUser?.name || '',
      group: editingUser?.group || '',
      year: editingUser?.year || '',
      phone: editingUser?.phone || '',
      email: editingUser?.email || ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, 'Must be 3 characters or less')
        .max(15, 'Must be 15 characters or less')
        .required('Введите имя студента'),

      group: Yup.string()
        .min(3, 'Must be 3 characters or less')
        .max(15, 'Must be 15 characters or less')
        .required('Введите группу студента'),

      year: Yup.string()
        .min(3, 'Must be 8 characters or less')
        .max(15, 'Must be 8 characters or less')
        .required('Введите дату зачисления студента'),

      phone: Yup.string()
        .min(9, 'Must be 9 characters or less')
        .max(15, 'Must be 15 characters or less')
        .required('Введите контактный номер студента'),
      email: Yup.string().email('Invalid email address').required('Required'),
    }),
    onSubmit: async (values) => {
      if (editingUser.name) {
        const {data: updatedUser} = await axios.put(`https://629988f86f8c03a978445903.mockapi.io/students/${editingUser.id}`, values)
        const updateStudentsList = students.map(item => item.id === editingUser.id ? updatedUser : item)
        setStudents(updateStudentsList)
      } else {
        const uploadUser = await axios.post('https://629988f86f8c03a978445903.mockapi.io/students', values)
        setStudents([...students, uploadUser.data])
      }
      setOpenModal(false)
    },
  });


  return (
    <div
      className="fixed flex justify-center w-full bg-indigo-600 p-6  p-6 rounded-md shadow-md dark:bg-gray-800 h-screen ">
      <div
        className="absolute border border-blue-400  py-0.5 inline-block px-3 right-9 top-9 font-black text-3xl text-white cursor-pointer"
        onClick={() => {
          setOpenModal(false)
          setEditingUser(null)
        }}>x
      </div>
      <form onSubmit={formik.handleSubmit}>
        <h1 className="border-b border-[#e0e0e0] mb-12 text-3xl font-semibold text-white text-center">Adding a new
          student</h1>
        <div className="mb-5 w-96">
          <label
            htmlFor="name"
            className="mb-3  text-white max-w-full text-lg font-medium "
          > Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 pl-1.5 text-lg font-medium  outline-none focus:border-[#6A64F1] focus:shadow-md"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.errors.name ? <div className="text-red-500">{formik.errors.name}</div> : null}
        </div>


        <div className="mb-5 w-96">
          <label
            htmlFor="group"
            className="mb-3 block  text-white text-base font-medium"
          >
            Group
          </label>
          <input
            type="text"
            id="group"
            name="group"
            placeholder="Enter your group"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 pl-1.5 text-lg font-medium  outline-none focus:border-[#6A64F1] focus:shadow-md"
            onChange={formik.handleChange}
            value={formik.values.group}
          />
          {formik.errors.group ? <div className="text-red-500">{formik.errors.group}</div> : null}
        </div>


        <div className="mb-5 w-96">
          <label
            htmlFor="year"
            className="mb-3 block  text-white text-base font-medium"
          >
            Year
          </label>
          <input
            type="date"
            id="year"
            name="year"
            placeholder="Enter your year"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 pl-1.5 text-lg font-medium  outline-none focus:border-[#6A64F1] focus:shadow-md"
            onChange={formik.handleChange}
            value={formik.values.year}
          />
          {formik.errors.year ? <div className="text-red-500">{formik.errors.year}</div> : null}
        </div>


        <div className="mb-5 w-96">
          <label
            htmlFor="phone"
            className="mb-3 block  text-white text-base font-medium "
          >
            Phone number
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            placeholder="+996"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 pl-1.5 text-lg font-medium  outline-none focus:border-[#6A64F1] focus:shadow-md"
            onChange={formik.handleChange}
            value={formik.values.phone}
          />
          {formik.errors.phone ? <div className="text-red-500">{formik.errors.phone}</div> : null}
        </div>


        <div className="mb-5">
          <label
            htmlFor="email"
            className="mb-3 block text-white text-base font-medium "
          >
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="example@domain.com"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 pl-1.5 text-lg font-medium  outline-none focus:border-[#6A64F1] focus:shadow-md"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email ? <div className="text-red-500">{formik.errors.email}</div> : null}
        </div>
        <div>

          <button
            className="hover:shadow-form rounded-md bg-[#6A64F1] py-3.5 px-6 text-lg font-semibold text-white outline-none"
          >
            {editingUser ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUserModal;