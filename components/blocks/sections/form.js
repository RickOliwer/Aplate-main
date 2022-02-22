import axios from "axios";
import isEmpty from "lodash.isempty";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Form = ( {subject, heading} ) => {
    const router = useRouter()
    const {register, handleSubmit, reset, formState: { errors }} = useForm()
    const [isSubmitted, setSubmitted] = useState(false)

    async function onSubmitForm(values){
        let config = {
            method: 'post',
            url: `${process.env.NEXT_PUBLIC_API_URL}`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: values,
        }

        try {
            const response = await axios(config);
            if(response.status == 200){
                setSubmitted(true)
                reset()
            }
        } catch (error) {
            console.log(error);
        }
        
    }
    return (
        <div>
                <h4 className="mb-2 text-xl">Gör en förfrågan på <span className="text-aplate-price">{subject}.</span></h4>
                <p className="mb-6">Använd formuläret nedan eller kontakta oss på info@aplate.se eller på 0709 - 99 91 83.</p>
                <form action="" className="" onSubmit={handleSubmit(onSubmitForm)}>
                    {isSubmitted && isEmpty(errors) ? (
                        <div className="w-full px-6 py-4 my-4 text-xl opacity-50 text-aplate-white bg-aplate-rost">Meddelande har skickats</div>
                    ) : null}
                    <input type="text" defaultValue={subject} hidden
                        name="subject"
                        {...register("subject", {
                            required: "Required",
                        })}
                    />
                    <input type="text" defaultValue={heading} hidden
                        name="heading"
                        {...register("heading", {
                            required: "Required",
                        })}
                    />
                    <input type="text" defaultValue={router.asPath} hidden
                        name="url"
                        {...register("url", {
                            required: "Required",
                        })}
                    />
                    <div className="grid grid-cols-2 gap-8 input_container">
                        <div className="col-span-2 md:col-span-1 ">
                            <div className="input_border">
                                <span className="border_text">Namn</span>

                                <input 
                                    type="text"
                                    name="namn"
                                    {...register("namn", {
                                        required: {
                                            value: true,
                                            message: 'Obligatoriskt',
                                        },
                                        minLength: {
                                            value: 2,
                                            message: 'Namnet är för kort',
                                        },
                                        maxLength: {
                                            value: 15,
                                            message: "Namnet är för långt",
                                        },
                                        pattern: {
                                            value: /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/,
                                            message: "Symboler som 123-#€&%/ är inte tillåtet"
                                        }
                                    })}  
                                    className="w-full col-span-2 p-4 md:col-span-1"
                                />
                            </div>
                            {errors.namn ? (
                            <span className="text-aplate-rost">{errors.namn.message}</span>
                            ) : null}
                        </div>
                        <div className="col-span-2 md:col-span-1">
                        <div className="input_border">
                            <span className="border_text">Telefon</span>

                            <input 
                                type="text"
                                name="telefon" 
                                className="w-full col-span-2 p-4 md:col-span-1"
                                {...register("telefon", {
                                    minLength: {
                                        value: 10,
                                        message: 'numret är för kort',
                                    },
                                    maxLength: {
                                        value: 15,
                                        message: "numtet är för långt",
                                    },
                                    pattern: {
                                        value: /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
                                        message: "Detta är inte ett giltigt telefonnummer"
                                    }
                                })} 
                            />
                        </div>
                        {errors.telefon ? (
                            <span className="text-aplate-rost">{errors.telefon.message}</span>
                        ) : null}

                        </div>

                        <div className="col-span-2 md:col-span-1">

                            <div className="input_border">
                                <span className="border_text">E&minus;mail</span>

                                <input 
                                    type="email" 
                                    name="email" 
                                    className="w-full col-span-2 p-4 md:col-span-1"
                                    {...register("email", {
                                        required: {
                                            value: true,
                                            message: 'Obligatoriskt',
                                        },
                                        minLength: {
                                            value: 10,
                                            message: 'E-mailet är för kort',
                                        },
                                        pattern: {
                                            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                            message: "exemple@exemple.test"
                                        }
                                    })}  
                                />
                            </div>
                            {errors.email ? (
                                <span className="text-aplate-rost">{errors.email.message}</span>
                            ) : null}
                        </div>

                        <div className="col-span-2 md:col-span-1">

                            <div className="input_border">
                                <span className="border_text">Antal&nbsp;personer</span>

                                <input 
                                    type="number" 
                                    name="antal" 
                                    className="w-full col-span-2 p-4 md:col-span-1"
                                    {...register("antal", {
                                        required: {
                                            value: true,
                                            message: 'Obligatoriskt',
                                        },
                                        
                                    })}
                                />
                            </div>
                            {errors.antal ? (
                                <span className="text-aplate-rost">{errors.antal.message}</span>
                            ) : null}
                        </div>

                        <div className="col-span-2">
                            <div className="texteara_border">
                                <span className="border_text">Meddelande&nbsp;&#40;frivilligt&#41;</span>
                                <textarea 
                                    type="textarea"  
                                    name="meddelande" 
                                    className="w-full p-4 h-52"
                                    {...register("meddelande", {
                                        minLength: {
                                            value: 0,
                                            message: 'meddelandet är för kort',
                                        },
                                        maxLength: {
                                            value: 950,
                                            message: "meddelandet är för långt",
                                        },
                                    })} 
                                />
                            </div>
                            {errors.meddelande ? (
                                <span className="text-aplate-rost">{errors.meddelande.message}</span>
                            ) : null}
                        </div>

                    </div>
                    <div className="text-center">
                        <input
                            type="submit" 
                            name="submit"
                            className="py-3 mt-8 rounded cursor-pointer special-elite px-14 bg-aplate-rost text-aplate-white"
                            value="Skicka"
                        />

                    </div>
                </form>

            </div>
    );
}
 
export default Form;