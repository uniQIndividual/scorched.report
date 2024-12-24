import React from "react";
import MatchHistory from "../components/profile/MatchHistory";

export default class ErrorNotFound extends React.Component {

	override render() {
		const errorCodes = [
			{
				title: "Explosive Misfire",
				description:
					"Oops! It seems you have incinerated yourself. Please contact the Char Guardian for a Ghost revive.",
			},
			{
				title: "Misadventure",
				description:
					"Oops! It seems you have incinerated yourself. Please contact the Char Guardian for a Ghost revive.",
			},
			{
				title: "Killed by the Architects",
				description: "Another misplaced ramen sign?",
			},
			{
				title: "Turnback",
				description:
					"you have been forcibly turned back, please stop trying to break the game, thank you.",
			},
			{
				title: "Mongoose",
				description: "There is no one here.",
			},
		];
		const pickedCode = errorCodes[Math.floor(Math.random() * errorCodes.length)];

		return (
			<div
				className="flex flex-col justify-center items-center h-screen mb-96 m px-6 mx-auto xl:px-0 dark:bg-gray-900"
			>
				<div className="block md:max-w-lg">
					<img src="/images/icons/light_fading.png" alt="404 image" />
				</div>
				<div className="text-center xl:max-w-4xl">
					<h1
						className="mb-5 text-2xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white"
						id="404_error_title"
					>
						{pickedCode?.title}
					</h1>
					<p
						className="mb-20 text-base font-normal text-gray-500 md:text-lg dark:text-gray-400"
						id="404_error_description"
					>
						{pickedCode?.description}
					</p>
					<a
						href="/"
						className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-3 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
					>
						<svg
							className="mr-2 -ml-1 w-5 h-5"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path

								d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"

							>
							</path>
						</svg>
						Return to orbit
					</a>
				</div>
			</div>)
	}
}