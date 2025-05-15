import { useRef, useEffect } from "react";

const Slide = (props) => {
	const { isCurrent, takeFocus, image, id, title } = props;
	const ref = useRef();

	useEffect(() => {
		if (isCurrent && takeFocus) {
			ref.current.focus();
		}
	}, [isCurrent, takeFocus]);

	return (
		<li
			ref={ref}
			aria-hidden={!isCurrent}
			tabIndex='-1'
			aria-labelledby={id}
			className='Slide transition-opacity opacity-100 list-none absolute top-0 left-0 right-0 bottom-0 bg-cover bg-center bg-no-repeat'
			style={{
				backgroundImage: `url(${image.imageurl})`,
			}}
		>
			{title && title !== "" && (
				<div className='flex justify-center items-center h-full'>
					<div className='SlideContent  max-w-lg p-5  text-center bg-black/10 backdrop-blur-md text-white '>
						<h2 id={id}>{title}</h2>
					</div>
				</div>
			)}
		</li>
	);
};

export default Slide;
