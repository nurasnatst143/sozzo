function IconButton(props) {
  return (
    <button
      {...props}
      className="border-none bg-none inline-block p-0 w-[3rem] h-[3rem] leading-[1.8rem] text-[2rem] bg-transparent text-[hsla(0, 100%, 100%, 0.5)] outline-none"
    />
  );
}

export default IconButton;
