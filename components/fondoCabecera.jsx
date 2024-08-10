
import portadaVideo from 'public/images/portadaFondoVideo.mp4';

const FondoCabecera = () => {
    return (
        <section className={` min-h-20 h-[24vh] sm:h-[38vh] lg:h-[50vh] relative w-full bg-cover bg-center bg-black overflow-hidden  `} id={`inicio`}>
            <div className={` absolute top-0 left-0 w-full h-full opacity-60`}>
                <video className='object-cover object-center h-full w-full' preload="auto" autoPlay="autoplay" muted loop playsInline>
                    <source src={portadaVideo} type="video/mp4" />
                </video>
            </div>
            <div className={`  absolute top-0 left-0 w-full h-full bg-cabeceraVideoFondo `} />
            <div className={`  absolute top-full left-0 w-full h-3 -translate-y-3 bg-gradient-to-t from-[rgba(0,0,0,0.2)] to-transparent `} />
            <div className={` relative mx-auto max-w-6xl flex w-full h-full items-end justify-start `}>
                <h2 data-aos-once="true" data-aos='fade-right' className={`  mx-8 -translate-y-[0.31rem] sm:-translate-y-[0.31rem] md:-translate-y-[0.39rem] lg:-translate-y-[0.47rem] font-LexendDeca text-opacity-100 text-left w-full text-6xl md:text-7xl lg:text-8xl `} style={{ textShadow: `0 0 0.1rem #000, 0 0 0.6rem #000` }}><span className={`  font-thin text-[#B99CD0]`}>so</span><span className={`  font-extralight text-[#9F8CCC] `} >ft</span><span className={`  font-light text-[#867AC8] `} >wa</span><span className={`  font-semibold text-[#746FC6] `} >re</span><span className={`  font-extrabold  text-[#6364C3] `} >ya</span></h2>
            </div>
        </section>
    );
};

export default FondoCabecera;
