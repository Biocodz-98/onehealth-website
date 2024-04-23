export interface SectionCardMiniProps{
    image:string;
    title:string;
    subTitle:string;
    imageAlt:string;
}
export default function SectionCardMini(props:SectionCardMiniProps) {
  return (
    <div className='flex flex-col items-center md:items-start gap-3 min-w-[80%] md:min-w-[25%] w-fit md:w-72 p-5 mx-auto md:mx-0'>
        <img loading="lazy" src={props.image} alt={props.imageAlt} className='w-20' />
        <h1 className='font-sans font-bold text-xl text-secondary'>{props.title}</h1>
        <p className='font-body font-normal md:text-start text-center'>{props.subTitle}</p>
    </div>
  )
}
