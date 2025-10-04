import { ReactNode } from "react";

export default function CardUi({ children }: { children: ReactNode }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-1 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

      <div className="relative rounded-2xl bg-slate-900 p-6 transition-all duration-300">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
          <div className="absolute top-0 left-0 h-32 w-32 rounded-full bg-purple-500/10 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 h-24 w-24 rounded-full bg-blue-500/10 blur-2xl"></div>
        </div>
        {children}
        <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-700 group-hover:translate-x-full"></div>
      </div>
    </div>
  );
}
