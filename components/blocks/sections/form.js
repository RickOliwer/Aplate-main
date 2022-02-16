import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Form = ( {subject} ) => {
    const {register, handleSubmit, reset, formState: { errors }} = useForm()
    const [isSubmitted, setSubmitted] = useState(false)

    async function onSubmitForm(values){
        console.log('you got mail', values);
        // let config = {
        //     method: 'post',
        //     url: `${process.env.NEXT_PUBLIC_API_URL}`,
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     data: values,
        // }

        // try {
        //     const response = await axios(config);
        //     if(response.status == 200){
        //         //setSubmitted(isSubmitted)
        //         console.log(response);
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
        
    }
    return (
        <div>
                <h4 className="mb-2 text-xl">Gör en förfrågan på <span className="text-aplate-price">{subject}.</span></h4>
                <p className="mb-6">Använd formuläret nedan eller kontakta oss på info@aplate.se eller på 0709 - 99 91 83.</p>
                <form action="" className="" onSubmit={handleSubmit(onSubmitForm)}>
                    {isSubmitted ? (
                        <div className="w-full px-6 py-10 my-4 text-xl text-aplate-white bg-aplate-rost">Meddelande har skickats</div>
                    ) : null}
                    <input type="text" defaultValue={subject} hidden
                        name="subject"
                        {...register("subject", {
                            required: "Required",
                        })}
                    />
                    <div className="grid grid-cols-2 gap-8">
                        <div className="">

                            <input 
                                type="text" 
                                placeholder="Namn" 
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
                                className="w-full col-span-2 p-4 border md:col-span-1 border-aplate-black"
                            />
                            {errors.namn ? (
                            <span className="text-aplate-rost">{errors.namn.message}</span>
                            ) : null}
                        </div>
                        <div className="">

                            <input 
                                type="text" 
                                placeholder="Telefon" 
                                name="telefon" 
                                className="w-full col-span-2 p-4 border md:col-span-1 border-aplate-black"
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
                            {errors.telefon ? (
                                <span className="text-capace-oranges">{errors.telefon.message}</span>
                            ) : null}
                        </div>
                        <div className="">

                            <input 
                                type="email" 
                                placeholder="E-post" 
                                name="email" 
                                className="w-full col-span-2 p-4 border md:col-span-1 border-aplate-black"
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
                            {errors.email ? (
                                <span className="text-aplate-rost">{errors.email.message}</span>
                            ) : null}
                        </div>
                        <div className="">

                            <input 
                                type="number" 
                                placeholder="Antal personer" 
                                name="antal" 
                                className="w-full col-span-2 p-4 border md:col-span-1 border-aplate-black"
                                {...register("antal", {
                                    required: {
                                        value: true,
                                        message: 'Obligatoriskt',
                                    },
                                    
                                })}
                            />
                            {errors.antal ? (
                                <span className="text-aplate-rost">{errors.antal.message}</span>
                            ) : null}
                        </div>
                        <div className="col-span-2">

                            <input 
                                type="textarea" 
                                placeholder="Meddelande (frivilligt)" 
                                name="meddelande" 
                                className="w-full p-4 border border-aplate-black h-52"
                                {...register("meddelande", {
                                    minLength: {
                                        value: 0,
                                        message: 'meddelandet är för kort',
                                    },
                                    maxLength: {
                                        value: 350,
                                        message: "meddelandet är för långt",
                                    },
                                })} 
                            />
                            {errors.meddelande ? (
                                <span className="text-capace-oranges">{errors.meddelande.message}</span>
                            ) : null}
                        </div>

                    </div>
                    <div className="text-center">
                        <input
                            type="submit" 
                            name="submit"
                            className="py-3 mt-8 rounded cursor-pointer special-elite px-14 bg-aplate-rost text-aplate-white"
                            value="Skicka"
                            onClick={() => setSubmitted(!isSubmitted)}
                        />

                    </div>
                </form>

            </div>
    );
}
 
export default Form;