"use client";
import axios from "axios";
import { useEffect, useState } from "react";

interface DealItem {
  title: string;
  thumb: string;
  salePrice: string;
  normalPrice: string;
  savings: string;
  metacriticScore: number;
  dealID: string;
}

function PricePage() {
  const [deals, setDeals] = useState<DealItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    function fetchPrice() {
      axios
        .get("https://www.cheapshark.com/api/1.0/deals")
        .then((res) => {
          setDeals(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError("ไม่สามารถดึงข้อมูลได้");
          setLoading(false);
        });
    }
    fetchPrice();
  }, []);

  const calculateDiscount = (salePrice: string, normalPrice: string): number => {
    const sale = parseFloat(salePrice);
    const normal = parseFloat(normalPrice);
    if (normal === 0) return 0;
    return Math.round(((normal - sale) / normal) * 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-2xl text-gray-600">⏳ กำลังโหลดเกม...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-2xl text-red-600">❌ {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-5xl font-bold text-center mb-2 text-white">
          🎮 เกมลดราคา
        </h1>
        <p className="text-center text-gray-400 mb-8">
          เกมที่ลดราคาดีที่สุดวันนี้
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {deals.map((item) => {
            const discountPercent = calculateDiscount(item.salePrice, item.normalPrice);

            return (
              <div
                key={item.dealID}
                className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-300 shadow-lg"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.thumb}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Discount Badge */}
                  {discountPercent > 0 && (
                    <div className="absolute top-2 right-2 bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-xl">
                      -{discountPercent}%
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  {/* Title */}
                  <h2 className="text-lg font-semibold text-white mb-3 line-clamp-2 h-14">
                    {item.title}
                  </h2>

                  {/* Metacritic Score */}
                  {item.metacriticScore > 0 && (
                    <p className="text-sm text-yellow-400 mb-3">
                      ⭐ คะแนน: {item.metacriticScore}
                    </p>
                  )}

                  {/* Price Info */}
                  <div className="bg-gray-700 p-3 rounded-lg space-y-2">
                    {/* Original Price */}
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">ราคาเต็ม:</span>
                      <span className="text-gray-400 line-through text-sm">
                        ${item.normalPrice}
                      </span>
                    </div>

                    {/* Sale Price */}
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 font-semibold">ราคาลด:</span>
                      <span className="text-green-400 font-bold text-lg">
                        ${item.salePrice}
                      </span>
                    </div>

                    {/* Savings */}
                    {discountPercent > 0 && (
                      <div className="flex justify-between items-center pt-2 border-t border-gray-600">
                        <span className="text-gray-400 text-sm">ประหยัด:</span>
                        <span className="text-red-400 font-semibold">
                          ${(parseFloat(item.normalPrice) - parseFloat(item.salePrice)).toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {deals.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-xl">ไม่พบเกมที่ลดราคา</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PricePage;