import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import React, { useState, useRef } from "react";
import Image, { ImageLoader } from "next/image";
import {
	useSession,
	signIn,
	signOut,
} from "next-auth/react";

type TechnologyCardProps = {
	name: string;
	description: string;
	documentation: string;
};

const HomeComponent = () => {
	const { data: session } = useSession();
	const myLoader = () => {
		return session?.user?.image;
	};

	if (session) {
		return (
			<div className="flex flex-col w-full h-full">
				<div className="flex flex-row items-center justify-center gap-1">
					Hello {session.user?.name}!
					<Image
						className="rounded-full "
						width={40}
						height={40}
						loader={myLoader as ImageLoader}
						src={session.user?.image || ""}
						alt=""
					/>
				</div>
				<button
					className=" bg-amber-500 p-2 rounded m-3"
					onClick={() => signOut()}
				>
					Sign out
				</button>
				<Chat />
			</div>
		);
	}
	return (
		<>
			Not signed in
			<button
				className=" bg-amber-500 p-2 rounded m-3"
				onClick={() => signIn()}
			>
				Sign in{" "}
			</button>
		</>
	);
};

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Chattii</title>
				<meta
					name="description"
					content="Generated by create-t3-app"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="container mx-auto flex flex-col items-center justify-center h-screen p-4">
				<h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold ">
					Cha<span className="text-amber-500">tt</span>ii
				</h1>

				<HomeComponent />
			</main>
		</>
	);
};

const Chat: React.FC = () => {
	const chatRef = useRef<HTMLDivElement>(null);
	const { data: session } = useSession();
	const [messages, setMessages] = useState<string>("");

	const messages2 = trpc.useQuery(["example.getAll"], {
		refetchOnWindowFocus: false,
	});

	const [subMessages, setSubMessages] = useState<
		typeof messages2["data"]
	>(() => {
		return messages2.data;
	});

	trpc.useSubscription(["example.onAdd"], {
		onNext(message) {
			setSubMessages(msgs => [...(msgs || []), message]);
		},
	});

	const scrollToBottom = () => {
		console.log(chatRef.current);
		if (chatRef.current) {
			chatRef.current.scrollIntoView({ behavior: "smooth" });
			console.log("scrolled");
		}
	};

	const addMessage = trpc.useMutation(["example.add"], {
		onSuccess() {
			scrollToBottom();
		},
	});
	const onAdd = async (
		e: React.FormEvent<HTMLFormElement>
	) => {
		e.preventDefault();
		await addMessage.mutate({
			content: messages,
			userName: session?.user?.name || "Anonymous",
		});
		setMessages("");
	};

	return (
		<>
			<div
				ref={chatRef}
				className="p-3 min-w-full bg-slate-800 mb-4 overflow-scroll w-full break-words md:max-w-md"
			>
				{subMessages ? (
					subMessages.map(element => {
						return (
							<p key={element.id}>
								{element.userName + ": "}
								<span className=" text-gray-400 ">
									{element.content + "\n"}
								</span>
							</p>
						);
					})
				) : (
					<p>Loading..</p>
				)}
			</div>
			<form onSubmit={onAdd} className="w-full flex">
				<input
					type="text"
					value={messages}
					onChange={e => setMessages(e.target.value)}
					className="text-slate-800 w-full"
				/>
				<input
					type="submit"
					value="Send"
					className=" bg-amber-500 p-2 rounded ml-2"
					disabled={!session || messages.length === 0}
				/>
				{addMessage.error && (
					<p>Error: {addMessage.error.message}</p>
				)}
			</form>
		</>
	);
};

const TechnologyCard = ({
	name,
	description,
	documentation,
}: TechnologyCardProps) => {
	return (
		<section className="flex flex-col justify-center p-6 duration-500 border-2 border-gray-500 rounded shadow-xl motion-safe:hover:scale-105">
			<h2 className="text-lg text-gray-700">{name}</h2>
			<p className="text-sm text-gray-600">{description}</p>
			<a
				className="mt-3 text-sm underline text-violet-500 decoration-dotted underline-offset-2"
				href={documentation}
				target="_blank"
				rel="noreferrer"
			>
				Documentation
			</a>
		</section>
	);
};

export default Home;
