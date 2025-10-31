function BackgroundMisctic() {
  return (
    <div className="w-full h-dvh overflow-hidden absolute z-[-10] inset-0 opacity-40 pointer-events-none">
      <img
        src="/images/sun-inner.png"
        alt="moon"
        className="absolute z-30 w-[600px] h-[600px]
          -bottom-[300px] origin-bottom-center md:w-[800px] md:h-[800px] md:-bottom-[400px] md:-left-[200px]"
        style={{ animation: 'rotate 8s linear infinite' }}
      />

      <img
        src="/images/sun-outer.png"
        alt="circle"
        className="absolute z-30 w-[600px] h-[600px]
          -bottom-[300px] origin-bottom-center md:w-[900px] md:h-[900px] md:-bottom-[400px] md:-left-[200px]"
        style={{ animation: 'rotate 8s linear infinite' }}
      />

      <img
        src="/images/sun-static.png"
        alt="stars"
        className="absolute z-30 w-[600px] h-[600px]
          -bottom-[300px] origin-bottom-center md:w-[950px] md:h-[950px] md:-bottom-[400px] md:-left-[200px]"
        style={{ animation: 'rotate 8s linear infinite' }}
      />
    </div>
  )
}

export default BackgroundMisctic
