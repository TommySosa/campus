/* eslint-disable @next/next/no-img-element */
import CollapsableButton from "./CollapsableButton";
export default function Sidebar() {
    return (
        <aside className="h-[90vh] w-64 text-black">
            <nav className="h-full flex flex-col bg-white border-r shadow-sm">
                <div className="p-4 pb-2 flex justify-between items-center">
                    <img
                        src="https://img.logoipsum.com/243.svg"
                        className="w-32"
                        alt="Logo"
                    />
                </div>
                <CollapsableButton/>
            </nav>
        </aside>
    )
}