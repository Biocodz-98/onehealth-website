import React from 'react'
export interface SectionCardMiniProps{
    image:string;
    title:string;
    subTitle:string;
    imageAlt:string;
}
export default function SectionCardMini(props:SectionCardMiniProps) {
  return (
    <div className='flex flex-col items-center md:items-start gap-3 w-[80%] md:w-72 p-5 mx-auto md:mx-0'>
        <img src={props.image} alt={props.imageAlt} className='w-20' />
        <h3 className='font-sans font-bold text-xl text-secondary'>{props.title}</h3>
        <p className='font-body font-normal md:text-start text-center'>{props.subTitle}</p>
    </div>
  )
}
