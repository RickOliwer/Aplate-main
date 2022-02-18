import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

const ContactForm = () => {
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
        <div className="grid grid-cols-2 gap-10 layout layout-top">
            <div className="col-span-2 py-10 border md:col-span-1 border-aplate-black">
                <div className="flex flex-col items-center justify-around h-full text-center">
                    <div className="mb-16 md:mb-0">
                        <h3 className="mb-2 text-3xl">telefon.</h3>
                        <p className="">0709 - 99 91 83</p>
                    </div>

                    <div className="mb-16 md:mb-0">
                        <h3 className="mb-2 text-3xl">mail.</h3>
                        <p className="">info@aplate.se</p>
                    </div>

                    <div className="mb-16 md:mb-0">
                        <h3 className="mb-2 text-3xl">adress.</h3>
                        <p className="">Medeon Science Park,</p>
                        <p className="">Per Albin Hanssons väg 41, 205 12</p>
                        <p className="">Malmö</p>
                    </div>

                </div>
            </div>
            <div className="col-span-2 md:col-span-1">

                <h4 className="mb-2 text-xl">Kontaktformulär.</h4>
                <p className="">Använd gärna vårt formulär nedan för att</p>
                <p className="mb-6">komma i kontakt med oss.</p>

                <TheForm 
                    register={register} 
                    handleSubmit={handleSubmit} 
                    reset={reset} errors={errors} 
                    isSubmitted={isSubmitted} 
                    setSubmitted={setSubmitted} 
                    onSubmitForm={onSubmitForm}
                />
            </div>
        </div>
    );
}

export const TheForm = ({ register, handleSubmit, reset, errors, isSubmitted, setSubmitted, onSubmitForm }) => {
    return (
        <form action="" className="" onSubmit={handleSubmit(onSubmitForm)}>
        {isSubmitted ? (
            <div className="w-full px-6 py-10 my-4 text-xl text-aplate-white bg-aplate-rost">Meddelande har skickats</div>
        ) : null}
        <input type="text" defaultValue="yey" hidden
            name="subject"
            {...register("subject", {
                required: "Required",
            })}
        />
        <div className="grid grid-cols-2 gap-8 input_container">
            <section className="col-span-2 input_border">
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
            </section>
            {errors.namn ? (
            <span className="text-aplate-rost">{errors.namn.message}</span>
            ) : null}
            <section className="col-span-2 input_border">
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
            </section>
            {errors.telefon ? (
                <span className="text-aplate-rost">{errors.telefon.message}</span>
            ) : null}
            <section className="col-span-2 input_border">
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
            </section>
            {errors.email ? (
                <span className="text-aplate-rost">{errors.email.message}</span>
            ) : null}
            
            <section className="col-span-2 input_border">
                <span className="border_text">Meddelande</span>

                <input 
                    type="textarea"
                    name="meddelande" 
                    className="w-full p-4 h-52"
                    rows="4"
                    cols="50"
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
            </section>
            {errors.meddelande ? (
                <span className="text-capace-oranges">{errors.meddelande.message}</span>
            ) : null}

        </div>
        <div className="text-center">
            <input
                type="submit" 
                name="submit"
                className="w-full py-3 mt-8 transition duration-500 ease-in-out rounded cursor-pointer hover:scale-105 special-elite px-14 bg-aplate-rost text-aplate-white"
                value="Skicka"
                onClick={() => setSubmitted(!isSubmitted)}
            />

        </div>
    </form>
    )
}
export default ContactForm;