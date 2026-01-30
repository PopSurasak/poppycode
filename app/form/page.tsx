"use client";

import React, { useState } from "react";

function FormPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const validate = () => {
        const e: { email?: string; password?: string } = {};
        if (!email) e.email = "กรุณากรอกอีเมล";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "รูปแบบอีเมลไม่ถูกต้อง";

        if (!password) e.password = "กรุณากรอกรหัสผ่าน";
        else if (password.length < 6) e.password = "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร";

        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (ev: React.FormEvent) => {
        ev.preventDefault();
        setSuccess(false);
        if (!validate()) return;
        setSubmitting(true);
        try {
            // Replace this with a real API call as needed.
            await new Promise((r) => setTimeout(r, 800));
            setSuccess(true);
            setEmail("");
            setPassword("");
            setErrors({});
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="bg-gradient-to-br from-blue-300 to-blue-500 min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md backdrop-blur-sm bg-white/95 rounded-2xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">ลงทะเบียนเข้าสู่ระบบ</h1>
                    <p className="text-white/90 text-sm">กรุณากรอกข้อมูลของคุณเพื่อดำเนินการต่อ</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} noValidate className="p-8">
                    {/* Email Field */}
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2">
                            📧 อีเมล
                        </label>
                        <input
                            id="email"
                            type="email"
                            className={`input w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                                errors.email 
                                    ? "border-red-400 focus:border-red-600 focus:ring-red-200 bg-red-50" 
                                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-200 bg-gray-50 hover:bg-gray-100"
                            }`}
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            aria-invalid={errors.email ? "true" : "false"}
                            aria-describedby={errors.email ? "email-error" : undefined}
                            required
                        />
                        {errors.email && (
                            <p id="email-error" role="alert" className="text-sm text-red-600 mt-2 flex items-center">
                                <span className="mr-1">⚠️</span> {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="mb-7">
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-800 mb-2">
                            🔒 รหัสผ่าน
                        </label>
                        <input
                            id="password"
                            type="password"
                            className={`input w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                                errors.password 
                                    ? "border-red-400 focus:border-red-600 focus:ring-red-200 bg-red-50" 
                                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-200 bg-gray-50 hover:bg-gray-100"
                            }`}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            aria-invalid={errors.password ? "true" : "false"}
                            aria-describedby={errors.password ? "password-error" : undefined}
                            required
                        />
                        {errors.password && (
                            <p id="password-error" role="alert" className="text-sm text-red-600 mt-2 flex items-center">
                                <span className="mr-1">⚠️</span> {errors.password}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 transform flex items-center justify-center gap-2 ${
                            submitting
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 active:scale-95 shadow-lg hover:shadow-xl"
                        }`}
                        disabled={submitting}
                    >
                        {submitting ? (
                            <>
                                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                กำลังส่ง...
                            </>
                        ) : (
                            <>
                                <span>✓</span>
                                สมัคร / เข้าสู่ระบบ
                            </>
                        )}
                    </button>

                    {/* Success Message */}
                    {success && (
                        <div className="mt-6 p-4 bg-green-50 border-2 border-green-200 rounded-lg animate-bounce">
                            <p role="status" aria-live="polite" className="text-center text-green-700 font-semibold flex items-center justify-center gap-2">
                                <span>✅</span>
                                สำเร็จ! ข้อมูลถูกส่งเรียบร้อยแล้ว
                            </p>
                        </div>
                    )}
                </form>

                {/* Footer */}
                <div className="bg-gray-50/50 px-8 py-4 text-center border-t border-gray-200">
                    <p className="text-xs text-gray-600">🔐 ข้อมูลของคุณปลอดภัย100%</p>
                </div>
            </div>
        </div>
    );
}

export default FormPage;