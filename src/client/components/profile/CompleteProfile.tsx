"use client"
import { useAuth } from '@/context/AuthContext'
import { logout } from '@/services/login'
import { updateStudent } from '@/services/student'
import { departments } from '@/utils/departments'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export default function CompleteProfile() {
  const { firebaseUser, user } = useAuth()
  const router = useRouter()

  // States
  const [name, setName] = useState("")
  const [gender, setGender] = useState("")
  const [department, setDepartment] = useState("")
  const [rollNumber, setRollNumber] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)

  useEffect(() => {
    if (name === "") setName(firebaseUser?.displayName || user?.name || "")
    if (gender === "") setGender(user?.gender || "")
    if (department === "") setDepartment(user?.department || "")
    if (rollNumber === "") setRollNumber(user?.rollNo || "")
    if (phoneNumber === "") setPhoneNumber(user?.phoneNumber || "")
  }, [firebaseUser, user])

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!name.trim()) newErrors.name = "Name is required"
    if (!gender) newErrors.gender = "Gender is required"
    if (!department) newErrors.department = "Department is required"
    if (!rollNumber.trim()) newErrors.rollNumber = "Roll Number is required"
    if (!phoneNumber.trim()) newErrors.phoneNumber = "Phone Number is required"
    if (phoneNumber && !/^\d{10}$/.test(phoneNumber)) {
      newErrors.phoneNumber = "Phone Number must be 10 digits"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!firebaseUser) return
    if (!validate()) return

    try {
      setIsLoading(true)

      await updateStudent(firebaseUser!.uid, {
        name, phoneNumber, gender: gender as "MALE" | "FEMALE" | "OTHER", rollNo: rollNumber, department: department as typeof departments[number]
      })

      toast.success("Profile updated successfully!")
      router.push('/')
    } catch (e) {
      console.error("Failed to update profile:", e)
      toast.error("Failed to update profile. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      await logout()
    } catch (error) {
      console.error("Logout failed:", error)
    } finally {
      setLoggingOut(false)
    }
  }

  return (
    <div className='max-w-2xl mx-auto'>
      <form onSubmit={handleSubmit} className='p-6 space-y-4'>
        <h1 className='text-2xl font-bold text-amber-400'>{user ? "Update" : "Complete"} Your Profile</h1>

        {!user && (
          <p className='-mt-2 text-sm text-amber-200/80'>
            Please fill out the following information to complete your profile.
          </p>
        )}

        {/* Name */}
        <div className='space-y-2'>
          <label htmlFor='name' className='block text-sm font-medium text-amber-200'>Name</label>
          <input
            type='text'
            id='name'
            placeholder='John Doe'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full p-2 bg-neutral-900 border ${errors.name ? 'border-red-500' : 'border-amber-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400`}
          />
          {errors.name && <p className='text-red-500 text-xs'>{errors.name}</p>}
        </div>

        {/* Gender */}
        <div className='space-y-2'>
          <label htmlFor='gender' className='block text-sm font-medium text-amber-200'>Gender</label>
          <select
            id='gender'
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className={`w-full p-2 bg-neutral-900 border ${errors.gender ? 'border-red-500' : 'border-amber-600'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-400`}
          >
            <option value="">Select your gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
          {errors.gender && <p className='text-red-500 text-xs'>{errors.gender}</p>}
        </div>

        {/* Department */}
        <div className='space-y-2'>
          <label htmlFor='department' className='block text-sm font-medium text-amber-200'>Department</label>
          <select
            id='department'
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className={`w-full p-2 bg-neutral-900 border ${errors.department ? 'border-red-500' : 'border-amber-600'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-400`}
          >
            <option value="">Select your department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          {errors.department && <p className='text-red-500 text-xs'>{errors.department}</p>}
        </div>

        {/* Roll Number */}
        <div className='space-y-2'>
          <label htmlFor='rollNumber' className='block text-sm font-medium text-amber-200'>Temp. Roll Number</label>
          <input
            type='text'
            placeholder='123456789'
            id='rollNumber'
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            className={`w-full p-2 bg-neutral-900 border ${errors.rollNumber ? 'border-red-500' : 'border-amber-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400`}
          />
          {errors.rollNumber && <p className='text-red-500 text-xs'>{errors.rollNumber}</p>}
        </div>

        {/* Phone Number */}
        <div className='space-y-2'>
          <label htmlFor='phoneNumber' className='block text-sm font-medium text-amber-200'>Phone Number</label>
          <input
            type='tel'
            id='phoneNumber'
            placeholder='9876543210'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className={`w-full p-2 bg-neutral-900 border ${errors.rollNumber ? 'border-red-500' : 'border-amber-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400`}
          />
          {errors.phoneNumber && <p className='text-red-500 text-xs'>{errors.phoneNumber}</p>}
        </div>

        <button
          disabled={isLoading || !firebaseUser}
          type='submit'
          className='w-full px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-md transition'
        >
          {isLoading ? "Saving..." : "Save Profile"}
        </button>
      </form>

      <button
        type="button"
        className='-mt-2 underline text-sm w-fit ml-auto block mr-6'
        onClick={handleLogout}
        disabled={isLoading || !firebaseUser}
      >
        {loggingOut ? "Logging out..." : "Logout"}
      </button>
    </div>
  )
}
