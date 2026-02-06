function HomePage() {
  return (
  <div><div className="text-center mt-3 p-3">
    <h1 className="text-4xl bg-blue-300">Welcome to My App</h1>
    <p className="text-2xl p-3 bg-blue-200">นี่คือ Next.js ที่ฉันเขียนเพื่อเรียน</p>
    </div>
    <div className="text-center text-2xl mt-6 text-red-500">
    <a href="/light">บทเรียนที่ 1 State ของการปิด/เปิดไฟ </a>
    <br />
    <a href="/count">บทเรียนที่ 2 State เพิ่ม/ลบเลข </a>
        <br />
    <a href="/form">บทเรียนที่ 3 State form </a>
            <br />
    <a href="/gay">บทเรียนที่ 4 State ของการแสดง/ซ่อนข้อความ </a>
    <br />
    <a href="/jiikan">บทเรียนที่ 5 API Jikan </a>
        <br />
    <a href="/newpime">บทเรียนที่ 6 API Newsdata </a>
            <br />
    <a href="/price">บทเรียนที่ 7 API Price </a>
    </div>
  </div>
  );
}

export default HomePage