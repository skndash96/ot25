'use client'
import { departments } from '@/client/utils/departments'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import 'react-image-crop/dist/ReactCrop.css'
import ImageCropModal from './ImageCropModal'

export default function CompleteProfile() {
  const { data: session, update: updateSession } = useSession()
  const user = useMemo(() => session?.user, [session])
  const isComplete = useMemo(() => {
    return user?.rollNumber && user?.rollNumber.length > 1
  }, [user])
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const router = useRouter()

  const [newProfilePicture, setNewProfilePicture] = useState<string | null>(null)
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [showCropModal, setShowCropModal] = useState(false)
  const [name, setName] = useState('')
  const [gender, setGender] = useState('')
  const [department, setDepartment] = useState('')
  const [rollNumber, setRollNumber] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)

  useEffect(() => {
    const user = session?.user
    if (name === '') setName(user?.name || '')
    if (gender === '') setGender(user?.gender || '')
    if (department === '') setDepartment(user?.department || '')
    if (rollNumber === '') setRollNumber(user?.rollNumber || '')
    if (phoneNumber === '') setPhoneNumber(user?.phoneNumber || '')
  }, [session])

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!name.trim()) newErrors.name = 'Name is required'
    if (!gender) newErrors.gender = 'Gender is required'
    if (!department) newErrors.department = 'Department is required'
    if (!rollNumber.trim()) newErrors.rollNumber = 'Roll Number is required'
    if (!phoneNumber.trim()) newErrors.phoneNumber = 'Phone Number is required'
    if (phoneNumber && !/^\d{10}$/.test(phoneNumber)) {
      newErrors.phoneNumber = 'Phone Number must be 10 digits'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setOriginalImage(imageUrl)
      setShowCropModal(true)
    }
  }

  const handleCropComplete = (croppedImageUrl: string) => {
    setNewProfilePicture(croppedImageUrl)
    setShowCropModal(false)

    if (originalImage) {
      URL.revokeObjectURL(originalImage)
      setOriginalImage(null)
    }
  }

  const handleCropCancel = () => {
    setShowCropModal(false)

    if (originalImage) {
      URL.revokeObjectURL(originalImage)
      setOriginalImage(null)
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleClearImage = () => {
    setNewProfilePicture(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const getBlobAsFile = async (blobUrl: string): Promise<File | null> => {
    try {
      const response = await fetch(blobUrl)
      const blob = await response.blob()
      return new File([blob], 'profile-picture.jpg', { type: 'image/jpeg' })
    } catch (error) {
      console.error('Error converting blob to file:', error)
      return null
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!user) return
    if (!validate()) return

    try {
      setIsLoading(true)

      const formData = new FormData()

      formData.append('name', name)
      formData.append('gender', gender)
      formData.append('department', department)
      formData.append('rollNumber', rollNumber)
      formData.append('phoneNumber', phoneNumber)

      if (newProfilePicture) {
        const file = await getBlobAsFile(newProfilePicture)
        if (file) {
          formData.append('profilePicture', file)
        }
      }

      const res = await fetch('/api/profile', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        console.error('Failed to update profile')
        throw new Error('Failed to update profile')
      }

      await updateSession()

      toast.success('Profile updated successfully!')
      router.push('/profile')
    } catch (e) {
      console.error('Failed to update profile:', e)
      toast.error('Failed to update profile. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      await signOut()
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      setLoggingOut(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <h1 className="text-2xl font-bold text-amber-400">
          {isComplete ? 'Update' : 'Complete'} Your Profile
        </h1>

        {!isComplete && (
          <p className="-mt-2 text-sm text-amber-200/80">
            Please fill out the following information to complete your profile.
          </p>
        )}

        <div className="space-y-2">
          <label className="block text-sm font-medium text-amber-200">Profile Picture</label>

          <div className="flex flex-col items-center gap-4">
            {newProfilePicture || user?.image ? (
              <Image
                src={newProfilePicture || user?.image!}
                className="w-24 h-24 rounded-full object-cover border-2 border-amber-400"
                alt="Profile Pic"
                width={96}
                height={96}
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-amber-400 text-black text-xl font-bold grid place-items-center">
                {session?.user.name
                  ?.split(' ')
                  .slice(0, 2)
                  .map((word) => word[0])
                  .join('')
                  .toUpperCase()}
              </div>
            )}

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1 text-sm bg-amber-500 text-black rounded hover:bg-amber-600"
              >
                {newProfilePicture ? 'Change' : 'Upload'}
              </button>

              {newProfilePicture && (
                <button
                  type="button"
                  onClick={handleClearImage}
                  className="px-3 py-1 text-sm text-amber-300 border border-amber-400 rounded hover:bg-amber-900/30"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-amber-200">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full p-2 bg-neutral-900 border ${errors.name ? 'border-red-500' : 'border-amber-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400`}
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="gender" className="block text-sm font-medium text-amber-200">
            Gender
          </label>
          <select
            name="gender"
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className={`w-full p-2 bg-neutral-900 border ${errors.gender ? 'border-red-500' : 'border-amber-600'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-400`}
          >
            <option value="">Select your gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
          {errors.gender && <p className="text-red-500 text-xs">{errors.gender}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="department" className="block text-sm font-medium text-amber-200">
            Department
          </label>
          <select
            name="department"
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className={`w-full p-2 bg-neutral-900 border ${errors.department ? 'border-red-500' : 'border-amber-600'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-400`}
          >
            <option value="">Select your Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          {errors.department && <p className="text-red-500 text-xs">{errors.department}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="rollNumber" className="block text-sm font-medium text-amber-200">
            Temp. Roll Number
          </label>
          <input
            type="text"
            placeholder="123456789"
            id="rollNumber"
            name="rollNumber"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            className={`w-full p-2 bg-neutral-900 border ${errors.rollNumber ? 'border-red-500' : 'border-amber-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400`}
          />
          {errors.rollNumber && <p className="text-red-500 text-xs">{errors.rollNumber}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-amber-200">
            Phone Number
          </label>
          <input
            type="tel"
            name="phoneNumber"
            id="phoneNumber"
            placeholder="9876543210"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className={`w-full p-2 bg-neutral-900 border ${errors.phoneNumber ? 'border-red-500' : 'border-amber-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400`}
          />
          {errors.phoneNumber && <p className="text-red-500 text-xs">{errors.phoneNumber}</p>}
        </div>

        <button
          disabled={isLoading || !user}
          type="submit"
          className="w-full px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-md transition"
        >
          {isLoading ? 'Saving...' : 'Save Profile'}
        </button>
      </form>

      {!isComplete && (
        <button
          type="button"
          className="-mt-2 underline text-sm w-fit ml-auto block mr-6"
          onClick={handleLogout}
          disabled={isLoading || !user}
        >
          {loggingOut ? 'Logging out...' : 'Logout'}
        </button>
      )}

      {originalImage && (
        <ImageCropModal
          src={originalImage}
          isOpen={showCropModal}
          onClose={handleCropCancel}
          onCropComplete={handleCropComplete}
        />
      )}
    </div>
  )
}
