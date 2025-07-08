import NMContainer from "@/components/ui/core/NMContainer"
import style from './heroSection.module.css'
import Image from "next/image"
import doctorImg from '../../../../assets/doctor.png'
const HeroSection=()=>{

    return(
  <NMContainer>
    <div className={`${style.banner}`}>
 <div className="flex justify-end">
    <Image src={doctorImg} alt="doctor"></Image>
 </div>
    </div>
  </NMContainer>
    )
}
export default HeroSection