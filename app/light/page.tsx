"use client"
import { useState } from "react";

function HomePage() {
    const [isLightOn, setIsLightOn] = useState(false);//State
    return (
        <div><div className="text-center mt-3 p-3">
            <h1 className="text-4xl bg-blue-300">บทเรียนที่1 State ของการเปิด/ปิดไฟ</h1>
        </div>
            <div className="flex justify-center">
                <button type="button"
                    className="bg-green-500 p-5 rounded-2xl text-2xl hover:bg-red-600 cursor-pointer"
                    onClick={() => setIsLightOn(!isLightOn)}>
                    เปิด/ปิดไฟ
                </button>
            </div>
            <div className="text-center text-5xl mt-4">
                <h1>สถานะหลอดไฟ: {isLightOn ? "เปิด" : "ปิด"}</h1>
                <div className="flex justify-center">
                    {isLightOn ? <img src="https://www.w3schools.com/js/pic_bulbon.gif"/> : <img src="https://www.w3schools.com/js/pic_bulboff.gif"/>}
                </div>
            </div>
        </div>
    );
}
//ตั้งชื่อไฟล์ด้วยพิมพ์เล็กเท่านั้น ขึ้นต้นด้วยพิมพ์ใหญ่พังเจ๊ง
export default HomePage