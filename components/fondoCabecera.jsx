
import portadaVideo from 'public/images/portadaFondoVideo.mp4';
import Link from 'next/link';

const FondoCabecera = ({ portada }) => {
    return (
        <section className={` min-h-20 ${portada ? `h-[24vh] sm:h-[38vh] lg:h-[50vh] max-h-96 ` : ` h-[24vh] `}  relative w-full bg-cover bg-center bg-black overflow-hidden  `} id={`inicio`}>
            <div className={` absolute top-0 left-0 w-full h-full opacity-60 `}>
                <video className={` object-cover ${portada ? `object-left-top` : `object-center `} h-full w-full `} preload="auto" autoPlay="autoplay" muted loop playsInline>
                    <source src={portadaVideo} type="video/mp4" />
                </video>
            </div>
            <div className={`  absolute top-0 left-0 w-full h-full bg-cabeceraVideoFondo `} />
            <div className={`  absolute top-full left-0 w-full h-3 -translate-y-3 bg-gradient-to-t from-[rgba(0,0,0,0.2)] to-transparent `} />
            <div className={` relative mx-auto max-w-6xl flex w-full h-full items-end justify-start `}>
                <h2 data-aos-once="true" data-aos='fade-right' className={`  mx-8 -translate-y-[0.31rem] sm:-translate-y-[0.31rem] md:-translate-y-[0.39rem] lg:-translate-y-[0.47rem] font-LexendDeca text-opacity-100 text-left w-full text-4xl sm:text-5xl md:text-6xl lg:text-7xl `} style={{ textShadow: `0 0 0.3rem rgba(0,0,0,0.5), 0 0 0.6rem rgba(0,0,0,0.2), 0 0 1.5rem rgba(0,0,0,0.7)` }}>
                    {portada ?
                    <><span className={`  font-thin text-[#D4D4E1]`}>so</span><span className={`  font-extralight text-[#C4CDD6] `} >ft</span><span className={`  font-light text-[#C2CCE3] `} >wa</span><span className={`  font-semibold text-[#BBC4D3] `} >re</span><span className={`  font-extrabold  text-[#B7BFC6] `} >ya</span></>
                    :
                    <Link href={`/`} className={` no-underline `}>
                        <span className={`  font-thin text-[#D4D4E1]`}>so</span><span className={`  font-extralight text-[#C4CDD6] `} >ft</span><span className={`  font-light text-[#C2CCE3] `} >wa</span><span className={`  font-semibold text-[#BBC4D3] `} >re</span><span className={`  font-extrabold  text-[#B7BFC6] `} >ya</span>
                    </Link>
                    }
                </h2>
            </div>
        </section>
    );
};

export default FondoCabecera;
