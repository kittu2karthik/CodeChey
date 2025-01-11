function Hero() {
  return (
    <section className="mx-auto -mt-8 mb-8 flex h-screen max-w-[1200px] items-center justify-center">
      <div className="mx-auto flex w-10/12 items-center gap-24">
        <div className="w-1/2">
          <h1 className="mb-12 text-left text-4xl font-black text-white">
            Start your coding journey today Learn to code from scratch.
          </h1>

          <p className="text-lg">
            Practice as you learn with our
            <span className="text-purple-500"> built-in IDE</span>. Each lesson
            will be followed by a coding exercise to apply the concepts and gain
            immediate feedback.
          </p>
        </div>

        <div className="w-1/2 border-2 border-white shadow-2xl shadow-purple-700/100 hover:shadow-xl hover:shadow-purple-500">
          <img
            src="https://studynotion-frontend.vercel.app/static/media/TimelineImage.a610b1e5d891ac77fe93.png"
            alt="Gril coding in Laptop"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
