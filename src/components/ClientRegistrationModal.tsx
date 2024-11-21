import React, {useState, useEffect, ChangeEvent} from "react";
import {Input} from "@/components/ui/input.tsx";
import SelectInput from "@/components/ui/SelectInput.tsx";
import {Button} from "@/components/ui/button.tsx";
import Spinner from "@/components/Spinner.tsx";

interface ClientRegistrationModalProps {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>

}

export default function ClientRegistrationModal({show, setShow}: ClientRegistrationModalProps) {
    const process = import.meta.env;
    const [states, setStates] = useState([]);
    const [lgas, setLgas] = useState([]);

    const sectors: string[] = [
        "Hospitals & Clinics",
        "HMOs",
        "Telemedicine providers",
        "Government agencies",
        "NGOs",
        "Pharmaceutical companies",
        "Health Tech",
        "Marketplace"
    ];

    const fetchStates = async () => {
        try {
            const response = await fetch(process.VITE_FULFILMENT_URL + "/api/states");

            if(response.status == 200) {
                const result = await response.json();
                setStates(result.data)
            }
        } catch (err) {
            // setError(err.message);
        } finally {
            // setLoading(false);
        }
    }



    const fetchStateLgas = async (state: string) => {
        try{
            const response = await fetch(process.VITE_FULFILMENT_URL + "/api/states/" + state + '/lgas');

            if(response.status == 200) {
                const result = await response.json();
                setLgas(result)
            }
            console.log(response.status)

        }  catch (err) {
            // setError(err.message);
        } finally {
            // setLoading(false);
        }
    }

    const handleStateChange = async (e: ChangeEvent<HTMLSelectElement>) => {
        const state = e.target.value;

        setLgas([]);
        setData({ ...data, state: state });

        await fetchStateLgas(state)
    }

    useEffect(() => {
        fetchStates()
    }, []);


    const closeModal = () => {
       setShow(false)
        console.log(show)
    }

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone_number: "",
        businessName: "",
        address: "",
        state: "",
        lga: "",
        sector: ""
    })
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsProcessing(true);
        setError(null)

        try {
            const response = await fetch(process.VITE_FULFILMENT_URL + '/api/register/client', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })

            if(response.status == 201){
                setIsSubmitted(true)
            }else if(response.status == 422){
                const result = await response.json()
                setError(result.message)
            }
        }catch (error: unknown){
            console.error(error)
        }finally {
            setIsProcessing(false)
        }
    }


    return (
        <>
            {
                !isSubmitted &&

                <>
                    <div className='col-span-10 items-center text-center mb-4'>
                        <p className='text-lg md:text-3xl font-bold text-primary'>Provide your details</p>

                        <p className='text-orange-400 p-2  w-96 m-auto rounded-sm'>{error}</p>
                    </div>

                    <form className="space-y-3 relative" onSubmit={handleSubmit}>
                        <div className='md:px-32 p-6'>

                            <div className="md:grid md:grid-cols-2 gap-4 ">


                                <div className='mb-2'>
                                    <Input
                                        type="firstName"
                                        name="firstName"
                                        id="firstName"
                                        placeholder="First Name"
                                        value={data.firstName}
                                        onChange={(e) => setData((data) => ({...data, firstName: e.target.value}))}
                                        disabled={isProcessing}
                                        required={true}
                                        className="w-full border-gray-300 rounded-lg p-3 disabled:bg-slate-300 min-h-12 focus:border-none"
                                    />
                                </div>

                                <div className='mb-2'>
                                    <Input
                                        type="lastName"
                                        name="lastName"
                                        id="lastName"
                                        placeholder="Last Name"
                                        value={data.lastName}
                                        onChange={(e) => setData((data) => ({...data, lastName: e.target.value}))}
                                        disabled={isProcessing}
                                        required={true}
                                        className="w-full border-gray-300 rounded-lg p-3 disabled:bg-slate-300 min-h-12 focus:border-none"
                                    />
                                </div>
                                <div>

                                </div>

                            </div>

                            <div className="md:grid md:grid-cols-2 gap-4 ">

                                <div className='mb-2'>
                                    <Input
                                        type="businessName"
                                        name="businessName"
                                        id="businessName"
                                        placeholder="Business Name"
                                        value={data.businessName}
                                        onChange={(e) => setData((data) => ({...data, businessName: e.target.value}))}
                                        disabled={isProcessing}
                                        required={true}
                                        className="w-full border-gray-300 rounded-lg p-3 disabled:bg-slate-300 min-h-12 focus:border-none"
                                    />
                                </div>

                                <div className='mb-2'>
                                    <Input
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Business email address"
                                        value={data.email}
                                        onChange={(e) => setData((data) => ({...data, email: e.target.value}))}
                                        disabled={isProcessing}
                                        required={true}
                                        className="w-full border-gray-300 rounded-lg p-3 disabled:bg-slate-300 min-h-12 focus:border-none"
                                    />
                                </div>
                                <div>

                                </div>

                            </div>

                            <div className="md:grid md:grid-cols-2 gap-4 ">

                                <div className='mb-2'>
                                    <Input
                                        type="phone_number"
                                        name="phone_number"
                                        id="phone_number"
                                        placeholder="Business phone number"
                                        value={data.phone_number}
                                        onChange={(e) => setData((data) => ({...data, phone_number: e.target.value}))}
                                        disabled={isProcessing}
                                        required={true}
                                        className="w-full border-gray-300 rounded-lg p-3 disabled:bg-slate-300 min-h-12 focus:border-none"
                                    />
                                </div>

                                <div className='mb-2'>
                                    <Input
                                        type="address"
                                        name="address"
                                        id="address"
                                        placeholder="Business address"
                                        value={data.address}
                                        onChange={(e) => setData((data) => ({...data, address: e.target.value}))}
                                        disabled={isProcessing}
                                        required={true}
                                        className="w-full border-gray-300 rounded-lg p-3 disabled:bg-slate-300 min-h-12 focus:border-none"
                                    />
                                </div>

                            </div>

                            <div className='md:grid md:grid-cols-2 gap-4 mt-2'>


                                <div className='mb-2'>
                                    <SelectInput
                                        id='state'
                                        disabled={isProcessing}
                                        required={true}
                                        onChange={handleStateChange}
                                        className='w-full border-gray-300 rounded-lg px-2 h-12'
                                    >
                                        <option value=''>Select State</option>
                                        {states.map((state: { id: number, name: string }) => (
                                            <option key={state.id} value={state.name}>{state.name}</option>
                                        ))}

                                    </SelectInput>
                                </div>

                                <div className='mb-2'>
                                    <SelectInput
                                        id='lga'
                                        disabled={isProcessing}
                                        required={true}
                                        onChange={(e) => setData((data) => ({...data, lga: e.target.value}))}
                                        className='w-full border-gray-300 rounded-lg px-2 h-12'
                                    >
                                        <option value=''>Select LGA</option>
                                        {lgas.map((lga: { id: number, name: string }) => (
                                            <option key={lga.id} value={lga.name}>{lga.name}</option>
                                        ))}

                                    </SelectInput>
                                </div>

                            </div>

                            <div className='m-2'>
                                <SelectInput
                                    id='sector'
                                    disabled={isProcessing}
                                    required={true}
                                    onChange={(e) => setData((data) => ({...data, sector: e.target.value}))}
                                    className='w-full border-gray-300 rounded-lg px-2 h-12'
                                >
                                    <option value=''>What sector is your business in?</option>
                                    {sectors.map((sector: string, index: number) => (
                                        <option key={index} value={sector}>{sector}</option>
                                    ))}

                                </SelectInput>
                            </div>

                            <div className='mt-4 p-2 '>
                                <Button
                                    type="submit"
                                    className="rounded-lg m-auto bg-[#5A7E69] hover:bg-primary  font-semibold text-white text-md p-3 px-5 flex place-content-center w-32 h-12"
                                >
                                    {" "}
                                    {isProcessing ? <Spinner/> : <span>Submit</span>}
                                </Button>
                            </div>


                        </div>
                    </form>

                </>
            }

            {isSubmitted &&
                <div>

                    <div className='mt-10 text-center'>
                        <p className='text-4xl font-extrabold'>Thank you for your interest.</p>

                        <p className='text-slate-400  p-4'>
                            A rep will reach you shortly. Keep your lines open 👍🏽
                        </p>

                        <div className='mt-4 p-2 '>
                            <Button
                                type="button"
                                onClick={closeModal}
                                className="rounded-lg m-auto bg-[#5A7E69] hover:bg-primary  font-semibold text-white text-md p-3 px-5 flex place-content-center w-32 h-12"
                            >
                                Finish
                            </Button>
                        </div>
                    </div>
                </div>
            }

        </>
    )
}