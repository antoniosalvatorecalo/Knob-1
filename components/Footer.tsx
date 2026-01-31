import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-20 px-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-12">
        <div className="text-center md:text-left">
          <h2 className="text-4xl font-bold mb-4">LOREM IPSUM DOLOR</h2>
          <p className="text-gray-500 mb-6">Lorem ipsum dolor sit amet.</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Lorem ipsum..."
              className="bg-[#111] border border-white/20 px-4 py-3 focus:outline-none focus:border-[#FD7F18] w-64 text-sm"
            />
            <button className="bg-[#FD7F18] text-black font-bold px-6 py-3 hover:bg-white transition-colors">
              LOREM
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-12 text-sm text-gray-500">
          <div className="flex flex-col gap-2">
            <span className="text-white font-bold mb-2 uppercase">Lorem</span>
            <a href="#" className="hover:text-[#FD7F18]">Ipsum</a>
            <a href="#" className="hover:text-[#FD7F18]">Dolor</a>
            <a href="#" className="hover:text-[#FD7F18]">Sit Amet</a>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-white font-bold mb-2 uppercase">Ipsum</span>
            <a href="#" className="hover:text-[#FD7F18]">Consectetur</a>
            <a href="#" className="hover:text-[#FD7F18]">Adipiscing</a>
            <a href="#" className="hover:text-[#FD7F18]">Elit</a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between text-xs text-gray-600 font-mono">
        <div>© 2024 LOREM IPSUM INC.</div>
        <div>SED DO EIUSMOD TEMPOR</div>
      </div>
    </footer>
  );
};