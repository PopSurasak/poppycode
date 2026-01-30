'use client'
import { useState } from "react";


function GayPage() {
        const [istextshow, setIsTextShow] = useState(true);    return (
        <div>
            <div className="text-center mt-3 p-3">
                <h1 className="text-4xl bg-blue-400">บทเรียนที่ 4 State ของการแสดง/ซ่อนข้อความ</h1>
            </div>
            <div className="text-center text-2xl mt-6">
                <p>ข้อความที่จะถูกแสดง/ซ่อน</p>
            </div>
            <div className="text-center">
                <button type="button" className="bg-green-500 p-5 rounded-2xl text-2xlcursor-pointer" onClick={() => setIsTextShow(true)}>แสดงข้อความ</button>
            </div>
            <div className="text-center"><button type="button" className="bg-red-500 p-5 rounded-2xl text-2xlcursor-pointer" onClick={() => setIsTextShow(false)}>ซ่อนข้อความ</button>
            </div>
            <div className="text-center">
                {istextshow && <h1 className="text-3xl">ข้อความ</h1>}
            </div>
        </div>
    );
}
export default GayPage