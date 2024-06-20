

export default function Modal({ isOpen, children }) {
  return (
    <div>
      {isOpen && (
        <div className="fixed z-20 inset-0">
           <div className="w-full h-full bg-opacity-40 bg-gray-400">
			 <div className="flex items-center justify-center h-full">
			 <div className="w-[578px] bg-white-500 rounded-lg">
				{children}
			 </div>
			 </div>
		   </div>
        </div>
      )}
    </div>
  );
}
