import Link from "next/link";

export default function ButtonsCard({ title, firstButton, secondButton, thirdButton, fourthButton }) {
    return (
        <>
            <h1>{title}</h1>
            <div class="flex flex-wrap -mx-2 md:-mx-4">
                <div class="w-1/2 md:w-1/4 px-2 md:px-4 mb-4">
                    <div class="bg-gray-200 p-4 text-center">
                        <Link href={firstButton.href}>
                            <button class={`bg-${firstButton.color}-500 hover:bg-${firstButton.color}-700 text-white font-bold py-2 px-4 rounded`}>
                                {firstButton.label}
                            </button>
                        </Link>
                    </div>
                </div>
                <div class="w-1/2 md:w-1/4 px-2 md:px-4 mb-4">
                    <div class="bg-gray-200 p-4 text-center">
                        <Link href={secondButton.href}>
                            <button class={`bg-${secondButton.color}-500 hover:bg-${secondButton.color}-700 text-white font-bold py-2 px-4 rounded`}>
                                {secondButton.label}
                            </button>
                        </Link>
                    </div>
                </div>
                <div class="w-1/2 md:w-1/4 px-2 md:px-4 mb-4">
                    <div class="bg-gray-200 p-4 text-center">
                        <Link href={thirdButton.href}>
                            <button class={`bg-${thirdButton.color}-500 hover:bg-${thirdButton.color}-700 text-white font-bold py-2 px-4 rounded`}>
                                {thirdButton.label}
                            </button>
                        </Link>
                    </div>
                </div>
                <div class="w-1/2 md:w-1/4 px-2 md:px-4 mb-4">
                    <div class="bg-gray-200 p-4 text-center">
                        <Link href={fourthButton.href}>
                            <button class={`bg-${fourthButton.color}-500 hover:bg-${fourthButton.color}-700 text-white font-bold py-2 px-4 rounded`}>
                                {fourthButton.label}
                            </button>
                        </Link>
                    </div>
                </div>
                <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-400 p-[0.1] w-full" ></hr>
            </div>
        </>
    );
}