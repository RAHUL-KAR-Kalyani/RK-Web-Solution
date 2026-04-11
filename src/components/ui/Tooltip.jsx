import React, { createContext, useContext, useState } from "react";

const TooltipContext = createContext();

export const TooltipProvider = ({ children }) => {
	return <TooltipContext.Provider value={{}}>{children}</TooltipContext.Provider>;
};

export const Tooltip = ({ text, children }) => {
	const [visible, setVisible] = useState(false);

	return (
		<div className="relative inline-block" onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)} >
			{children}
			{visible && (
				<div className="absolute bottom-full mb-2 px-3 py-1 text-sm bg-black text-white rounded shadow">
					{text}
				</div>
			)}
		</div>
	);
};