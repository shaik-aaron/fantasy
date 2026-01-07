import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useForm, type SubmitHandler } from "react-hook-form"
import { Link, useNavigate } from "react-router"
import api from '../api/posts'

type LoginDetails = {
    email: string,
    password: string
}

function Login() {

    let navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginDetails>()
    const onSubmit: SubmitHandler<LoginDetails> = async (data) => {
        console.log(data)
        try {
            const response = await api.post('/login', data)
            console.log(response)
            if (response.status == 200) {
                navigate('/home')
            }
        }
        catch (err) {
            console.log("Error: ", err)
        }
    }

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="flex flex-col items-center">
                <div className="flex items-center gap-4">
                    <div className="w-10 border"></div>
                    <h1 className="font-lust text-4xl font-bold">OBFIRMARE</h1>
                    <div className="w-10 border"></div>
                </div>
                <p className="font-geist-semibold mt-2 text-[#6b7280]">Focus better. Acheive more.</p>
                <p className="font-geist-semibold mt-2">Don't have an account? <Link className="underline" to='/signup'>Sign up</Link> here!</p>
                <div className="w-full mt-6">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FieldGroup className="gap-8">
                            <Field className="flex flex-col gap-1">
                                <FieldLabel htmlFor="email" className="font-geist-bold">Email</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    {...register("email", { required: true })}
                                />
                                {errors.email && <FieldError>Email is required</FieldError>}
                            </Field>
                            <Field className="flex flex-col gap-1">
                                <FieldLabel htmlFor="password" className="font-geist-bold">Password</FieldLabel>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="password"
                                    {...register("password", { required: true })}
                                />
                                {errors.password && <FieldError>Password is required</FieldError>}
                            </Field>
                            <Field>
                                <Button type="submit" className="cursor-pointer font-geist-bold">Login</Button>
                            </Field>
                        </FieldGroup>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login