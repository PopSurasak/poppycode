'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    nickname: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setError('โปรดกรอกอีเมล รหัสผ่าน และยืนยันรหัสผ่าน')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('รหัสผ่านไม่ตรงกัน')
      return
    }

    if (formData.password.length < 6) {
      setError('รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร')
      return
    }

    try {
      setLoading(true)
      const response = await axios.post('/api/auth/register', {
        email: formData.email,
        password: formData.password,
        name: formData.name || null,
        nickname: formData.nickname || null,
      })

      if (response.status === 201) {
        router.push('/?message=สมัครสมาชิกสำเร็จแล้ว โปรดเข้าสู่ระบบ')
      }
    } catch (err: any) {
      setError(
        err.response?.data?.error || 'เกิดข้อผิดพลาดในการสมัครสมาชิก'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #dc2626 0%, #000000 100%)',
      }}
    >
      <div className="w-full max-w-md">
        <div className="card bg-white shadow-2xl">
          <div className="card-body">
            <h1 className="card-title text-3xl font-bold text-center mb-6">
              <span
                className="bg-gradient-to-r from-red-600 to-black bg-clip-text text-transparent"
              >
                สมัครสมาชิก
              </span>
            </h1>

            {error && (
              <div className="alert alert-error mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l-2-2m0 0l-2-2m2 2l2-2m-2 2l-2 2"
                  />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">อีเมล</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="กรอกอีเมล"
                  className="input input-bordered border-red-300 focus:border-red-600 focus:ring-red-600"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">ชื่อจริง</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="กรอกชื่อจริง (ไม่บังคับ)"
                  className="input input-bordered border-red-300 focus:border-red-600 focus:ring-red-600"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">ชื่อเล่น</span>
                </label>
                <input
                  type="text"
                  name="nickname"
                  value={formData.nickname}
                  onChange={handleChange}
                  placeholder="กรอกชื่อเล่น (ไม่บังคับ)"
                  className="input input-bordered border-red-300 focus:border-red-600 focus:ring-red-600"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">รหัสผ่าน</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="กรอกรหัสผ่าน"
                  className="input input-bordered border-red-300 focus:border-red-600 focus:ring-red-600"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">
                    ยืนยันรหัสผ่าน
                  </span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="ยืนยันรหัสผ่าน"
                  className="input input-bordered border-red-300 focus:border-red-600 focus:ring-red-600"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-error w-full text-white font-bold text-lg mt-6"
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  'สมัครสมาชิก'
                )}
              </button>
            </form>

            <div className="divider my-4">หรือ</div>

            <p className="text-center text-gray-600">
              มีบัญชีแล้ว?{' '}
              <Link
                href="/"
                className="text-red-600 font-bold hover:text-red-700"
              >
                เข้าสู่ระบบ
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
